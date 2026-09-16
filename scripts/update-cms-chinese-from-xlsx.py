#!/usr/bin/env python3
"""Fill existing Directus *_cn fields from proofread Excel batches.

Does not create or delete items. Does not create schema fields.
Only PATCHes *_cn columns that already exist, on existing rows matched
by English name/title. Unmatched sheet rows are skipped.

Usage:
  python3 scripts/update-cms-chinese-from-xlsx.py           # dry run
  python3 scripts/update-cms-chinese-from-xlsx.py --apply   # write to Directus
"""

from __future__ import annotations

import argparse
import json
import os
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from collections import Counter
from html import unescape
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ENV_PATH = ROOT / ".env"

SHEETS = [
    Path(
        "/Users/ahmadshaker/Downloads/Aseer_Content_English_Chinese_2nd batch_proofreading completed.xlsx"
    ),
    Path(
        "/Users/ahmadshaker/Downloads/Aseer_Content_English_Chinese_3rd batch_proofreading completed.xlsx"
    ),
    Path(
        "/Users/ahmadshaker/Downloads/Chinese translation 4th Batch_Translated_proofreading completed and attention on hotel tab with possible duplication.xlsx"
    ),
    Path(
        "/Users/ahmadshaker/Downloads/Chinese Translation 5th Batch_Translated_proofreading completed.xlsx"
    ),
    Path(
        "/Users/ahmadshaker/Downloads/Chinese Translation 6th Batch_translated_proofreading completed.xlsx"
    ),
    Path(
        "/Users/ahmadshaker/Downloads/Chinese Translation 7th batch_translated_proofreading completed.xlsx"
    ),
]

# Only these collections already have *_cn columns. Never create fields.
KNOWN_CN_FIELDS = {
    "attractions": {
        "name_cn",
        "type_cn",
        "city_cn",
        "content_cn",
        "sub_title_cn",
        "content_home_page_card_content_cn",
    },
    "destination": {
        "title_cn",
        "content_cn",
        "content_of_home_page_cn",
        "subtitle_cn",
        "destination_filter_cn",
    },
    "pages": {"title_cn", "subtitle_cn"},
}

# Known English spelling variants so city names still match existing CMS titles.
CITY_ALIASES = {
    "ahad rafida": "ahad rafidah",
    "dhahran al janub": "dhahran al janoub",
    "al haridhah": "al haridah",
    "almajaridah": "al majardah",
    "al majaridah": "al majardah",
    "bariq": "bareq",
    "namas": "al namas",
}


def load_env() -> None:
    if not ENV_PATH.exists():
        return
    for line in ENV_PATH.read_text().splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        os.environ.setdefault(key.strip(), value.strip().strip('"').strip("'"))


def cell(value) -> str:
    if value is None:
        return ""
    text = str(value).strip()
    if text.lower() in {"none", "nan", "null"}:
        return ""
    return text


def norm(value: str) -> str:
    text = unescape(cell(value))
    text = re.sub(r"<[^>]+>", " ", text)
    text = text.lower()
    text = re.sub(r"[\u200f\u200e]", "", text)
    text = re.sub(r"[^\w\u4e00-\u9fff]+", " ", text, flags=re.UNICODE)
    return re.sub(r"\s+", " ", text).strip()


def city_key(value: str) -> str:
    key = norm(value)
    return CITY_ALIASES.get(key, key)


def merge_patch(dest: dict, incoming: dict) -> None:
    for key, value in incoming.items():
        if cell(value):
            dest[key] = cell(value)


def request(method: str, url: str, token: str | None = None, body=None, timeout=60):
    data = None
    headers = {}
    if token:
        headers["Authorization"] = f"Bearer {token}"
    if body is not None:
        data = json.dumps(body).encode("utf-8")
        headers["Content-Type"] = "application/json"
    req = urllib.request.Request(url, data=data, headers=headers, method=method)
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            raw = resp.read().decode("utf-8")
            return resp.status, json.loads(raw) if raw.strip() else {}
    except urllib.error.HTTPError as exc:
        raw = exc.read().decode("utf-8", errors="replace")
        try:
            parsed = json.loads(raw) if raw.strip() else {}
        except json.JSONDecodeError:
            parsed = {"raw": raw[:300]}
        return exc.code, parsed


def existing_cn_fields(_base: str, _token: str | None, collection: str) -> set[str]:
    return set(KNOWN_CN_FIELDS.get(collection, set()))


def fetch_all_items(
    base: str, token: str | None, collection: str, fields: str
) -> list[dict]:
    items: list[dict] = []
    page = 1
    while True:
        qs = urllib.parse.urlencode(
            {"fields": fields, "limit": 100, "page": page}
        )
        status, payload = request(
            "GET", f"{base}/items/{collection}?{qs}", token
        )
        if status != 200:
            raise RuntimeError(f"GET {collection} failed ({status})")
        data = payload.get("data")
        if isinstance(data, dict):
            items.append(data)
            break
        batch = data or []
        items.extend(batch)
        if len(batch) < 100:
            break
        page += 1
        if page > 50:
            break
    return items


def load_workbook_rows(path: Path) -> dict[str, list[list]]:
    import openpyxl

    wb = openpyxl.load_workbook(path, read_only=True, data_only=True)
    out: dict[str, list[list]] = {}
    for name in wb.sheetnames:
        ws = wb[name]
        rows = []
        for row in ws.iter_rows(values_only=True):
            rows.append(list(row))
        out[name] = rows
    wb.close()
    return out


def pick_most_common(values: list[str]) -> str:
    cleaned = [cell(v) for v in values if cell(v)]
    if not cleaned:
        return ""
    return Counter(cleaned).most_common(1)[0][0]


def collect_from_sheets() -> tuple[
    dict[str, dict[str, str]],
    dict[str, dict[str, str]],
    dict[str, str],
    dict[str, str],
]:
    """Return (attractions_by_en, pages_by_en, cities_en_to_cn, pages_original_en)."""
    attractions: dict[str, dict[str, str]] = {}
    pages: dict[str, dict[str, str]] = {}
    pages_original_en: dict[str, str] = {}
    city_values: dict[str, list[str]] = {}

    def put_city(english: str, chinese: str) -> None:
        key = city_key(english)
        cn = cell(chinese)
        if key and cn:
            city_values.setdefault(key, []).append(cn)

    def put(bucket: dict[str, dict[str, str]], english: str, patch: dict) -> None:
        key = norm(english)
        cleaned = {k: cell(v) for k, v in patch.items() if cell(v)}
        if not key or not cleaned:
            return
        merge_patch(bucket.setdefault(key, {}), cleaned)

    for path in SHEETS:
        if not path.exists():
            print(f"! missing workbook {path.name}")
            continue
        sheets = load_workbook_rows(path)
        name = path.name.lower()

        if "2nd batch" in name:
            for row in sheets.get("Support Services", [])[1:]:
                put_city(cell(row[6] if len(row) > 6 else None), row[7] if len(row) > 7 else "")

        if "3rd batch" in name:
            for row in sheets.get("Restaurants", [])[1:]:
                put_city(cell(row[6] if len(row) > 6 else None), row[7] if len(row) > 7 else "")
            for row in sheets.get("Events", [])[1:]:
                put_city(cell(row[6] if len(row) > 6 else None), row[7] if len(row) > 7 else "")
            for row in sheets.get("Acommodations", [])[1:]:
                put_city(cell(row[4] if len(row) > 4 else None), row[5] if len(row) > 5 else "")
            for row in sheets.get("Locations", [])[1:]:
                put(
                    attractions,
                    cell(row[0] if len(row) > 0 else None),
                    {
                        "name_cn": row[1] if len(row) > 1 else "",
                        "type_cn": row[5] if len(row) > 5 else "",
                        "content_cn": row[7] if len(row) > 7 else "",
                        "content_home_page_card_content_cn": row[7] if len(row) > 7 else "",
                    },
                )

        if "4th batch" in name:
            for row in sheets.get("Hotels", [])[1:]:
                put_city(cell(row[6] if len(row) > 6 else None), row[7] if len(row) > 7 else "")

        if "7th batch" in name:
            for row in sheets.get("Pages", [])[1:]:
                english = cell(row[0] if len(row) > 0 else None)
                put(
                    pages,
                    english,
                    {
                        "title_cn": row[1] if len(row) > 1 else "",
                        "subtitle_cn": row[3] if len(row) > 3 else "",
                    },
                )
                if norm(english):
                    pages_original_en[norm(english)] = english

    cities = {key: pick_most_common(vals) for key, vals in city_values.items()}
    return attractions, pages, cities, pages_original_en


def filter_existing_cn(patch: dict[str, str], cn_fields: set[str]) -> dict[str, str]:
    return {k: v for k, v in patch.items() if k in cn_fields and cell(v)}


def needed_patch(item: dict, patch: dict[str, str]) -> dict[str, str]:
    out = {}
    for key, value in patch.items():
        if cell(value) and cell(item.get(key)) != cell(value):
            out[key] = cell(value)
    return out


def patch_item(base, token, collection, item_id, patch, apply) -> bool:
    if not patch:
        return False
    if not apply:
        return True
    st, _res = request(
        "PATCH",
        f"{base}/items/{collection}/{urllib.parse.quote(str(item_id), safe='')}",
        token,
        patch,
    )
    if st not in (200, 204):
        print(f"  ! PATCH {collection}/{item_id} failed ({st})")
        return False
    time.sleep(0.05)
    return True


def patch_pages_by_title(base, token, title_en: str, patch: dict, apply: bool) -> bool:
    """Update an existing pages row without listing the collection."""
    if not patch:
        return False
    if not apply:
        return True
    qs = urllib.parse.urlencode({"filter[title_en][_eq]": title_en})
    st, _res = request("PATCH", f"{base}/items/pages?{qs}", token, patch)
    if st in (200, 204):
        time.sleep(0.05)
        return True
    # Directus bulk-update by keys query (v10+)
    st, _res = request(
        "PATCH",
        f"{base}/items/pages",
        token,
        {"query": {"filter": {"title_en": {"_eq": title_en}}}, "data": patch},
    )
    if st in (200, 204):
        time.sleep(0.05)
        return True
    print(f"  ! PATCH pages by title_en failed ({st})")
    return False


def update_collection(
    *,
    base: str,
    read_token: str | None,
    write_token: str | None,
    collection: str,
    english_keys: list[str],
    cn_fields: set[str],
    translations: dict[str, dict[str, str]],
    apply: bool,
) -> tuple[int, int, int]:
    if not cn_fields:
        print(f"  {collection}: no existing _cn fields, skip")
        return (0, 0, 0)
    fields = ["id", *english_keys, *sorted(cn_fields)]
    items = fetch_all_items(base, read_token, collection, ",".join(fields))
    index: dict[str, list[dict]] = {}
    for item in items:
        for key in english_keys:
            n = city_key(item.get(key) or "") if key == "city" else norm(item.get(key) or "")
            if n:
                index.setdefault(n, []).append(item)

    updated = unmatched = skipped = 0
    used_ids = set()
    for english_key, patch in translations.items():
        matches = index.get(english_key, [])
        if not matches:
            unmatched += 1
            continue
        allowed = filter_existing_cn(patch, cn_fields)
        if not allowed:
            skipped += 1
            continue
        for item in matches:
            ident = item.get("id")
            if ident in used_ids:
                continue
            used_ids.add(ident)
            current = needed_patch(item, allowed)
            if not current:
                skipped += 1
                continue
            if patch_item(base, write_token, collection, ident, current, apply):
                updated += 1
            else:
                skipped += 1
    return updated, unmatched, skipped


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--apply", action="store_true")
    args = parser.parse_args()
    if args.apply:
        load_env()
    base = (
        os.environ.get("DIRECTUS_WRITE_BASE_URL")
        or os.environ.get("NEXT_PUBLIC_DIRECTUS_APP_URL")
        or "https://tool-portal.discoveraseer.com"
    ).rstrip("/")
    token = os.environ.get("DIRECTUS_ADMIN_TOKEN") or ""
    if not base:
        print("Missing Directus URL")
        return 1
    if args.apply and not token:
        print("Missing Directus admin token")
        return 1

    print("Loading workbooks…")
    attraction_rows, page_rows, cities, pages_original_en = collect_from_sheets()
    print(f"  location-sheet attraction keys: {len(attraction_rows)}")
    print(f"  pages-sheet keys: {len(page_rows)}")
    print(f"  city name translations: {len(cities)}")

    print("Using existing _cn fields only (no schema changes)…")
    cn_by_collection = {
        col: existing_cn_fields(base, token or None, col)
        for col in KNOWN_CN_FIELDS
    }
    for col, fields in cn_by_collection.items():
        print(f"  {col}: {', '.join(sorted(fields)) or '(none)'}")

    print("Updating items…", "(APPLY)" if args.apply else "(dry run)")

    # Attractions: exact English name from Locations, plus city_cn from city map.
    attraction_cn = cn_by_collection["attractions"]
    attraction_patches = dict(attraction_rows)
    try:
        public_attractions = fetch_all_items(
            base, None, "attractions", "id,name_en,city,city_cn"
        )
        extra_city = 0
        for item in public_attractions:
            key = norm(item.get("name_en") or "")
            city_cn = cities.get(city_key(item.get("city") or ""))
            if not key or not city_cn:
                continue
            attraction_patches.setdefault(key, {})
            if "city_cn" in attraction_cn:
                attraction_patches[key]["city_cn"] = city_cn
                extra_city += 1
        print(f"  attractions city_cn candidates: {extra_city}")
        updated, unmatched, skipped = update_collection(
            base=base,
            read_token=None,
            write_token=token or None,
            collection="attractions",
            english_keys=["name_en"],
            cn_fields=attraction_cn,
            translations=attraction_patches,
            apply=args.apply,
        )
        print(
            f"  attractions: updated={updated} unmatched_sheet_rows={unmatched} unchanged_or_skipped={skipped}"
        )
    except RuntimeError as exc:
        print(f"  attractions: {exc}")

    # Destinations: title_cn from city-name translations only.
    dest_cn = cn_by_collection["destination"]
    dest_patches: dict[str, dict[str, str]] = {}
    if "title_cn" in dest_cn:
        try:
            dest_items = fetch_all_items(base, None, "destination", "id,title_en,title_cn")
            for item in dest_items:
                en = cell(item.get("title_en"))
                cn = cities.get(city_key(en))
                if en and cn:
                    dest_patches[norm(en)] = {"title_cn": cn}
            updated, unmatched, skipped = update_collection(
                base=base,
                read_token=None,
                write_token=token or None,
                collection="destination",
                english_keys=["title_en"],
                cn_fields=dest_cn,
                translations=dest_patches,
                apply=args.apply,
            )
            print(
                f"  destination: updated={updated} unmatched_sheet_rows={unmatched} unchanged_or_skipped={skipped}"
            )
        except RuntimeError as exc:
            print(f"  destination: {exc}")
    else:
        print("  destination: no title_cn field, skip")

    # Pages: existing title_cn / subtitle_cn only.
    page_cn = cn_by_collection["pages"]
    page_updated = page_unmatched = page_skipped = 0
    if page_rows and page_cn:
        items = []
        try:
            fields = ["id", "title_en", "title", *sorted(page_cn)]
            items = fetch_all_items(base, token or None, "pages", ",".join(fields))
        except RuntimeError:
            items = []
        if items:
            updated, unmatched, skipped = update_collection(
                base=base,
                read_token=token or None,
                write_token=token or None,
                collection="pages",
                english_keys=["title_en", "title"],
                cn_fields=page_cn,
                translations=page_rows,
                apply=args.apply,
            )
            print(
                f"  pages: updated={updated} unmatched_sheet_rows={unmatched} unchanged_or_skipped={skipped}"
            )
        else:
            print("  pages: collection is not listable; matching by title_en filter")
            for english_key, patch in page_rows.items():
                allowed = filter_existing_cn(patch, page_cn)
                if not allowed:
                    page_skipped += 1
                    continue
                title_en = pages_original_en.get(english_key, "")
                if not title_en:
                    page_unmatched += 1
                    continue
                if patch_pages_by_title(base, token or None, title_en, allowed, args.apply):
                    page_updated += 1
                else:
                    page_unmatched += 1
            print(
                f"  pages: updated={page_updated} unmatched_sheet_rows={page_unmatched} unchanged_or_skipped={page_skipped}"
            )
    else:
        print("  pages: skip")

    return 0


if __name__ == "__main__":
    sys.exit(main())
