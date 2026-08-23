export interface GlobalAsset {
  name: string;
  video: string;
}

interface ApiGlobalAssetsResponse {
  data: GlobalAsset[];
}

export async function fetchGlobalAssets(): Promise<Record<string, string>> {
  const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_APP_URL?.replace(
    /\/$/,
    "",
  );
  if (!directusUrl) {
    console.warn("NEXT_PUBLIC_DIRECTUS_APP_URL is not set");
    return {};
  }

  try {
    const response = await fetch(
      `${directusUrl}/items/global_assets?filter[status][_eq]=published&fields=name,video&limit=50`,
      {
        next: { revalidate: 3600 },
      },
    );

    if (!response.ok) {
      console.error(
        "Failed to fetch global_assets from Directus:",
        response.statusText,
      );
      return {};
    }

    const json = (await response.json()) as ApiGlobalAssetsResponse;

    if (!json.data || !Array.isArray(json.data)) {
      return {};
    }

    const assetsMap: Record<string, string> = {};
    for (const item of json.data) {
      if (item.name && item.video) {
        assetsMap[item.name] = `${directusUrl}/assets/${item.video}`;
      }
    }

    return assetsMap;
  } catch (error) {
    console.error("Error fetching global_assets:", error);
    return {};
  }
}
