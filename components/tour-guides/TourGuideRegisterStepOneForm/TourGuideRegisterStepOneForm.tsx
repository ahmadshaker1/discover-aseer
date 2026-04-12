"use client";

import { useEffect, useId, useMemo, useState } from "react";

const TOTAL_FIELDS = 7;

const ibm = "var(--font-ibm-plex-sans-arabic), sans-serif";
const araBold = "var(--font-ara-hamah-1964), sans-serif";

const FIELD_COUNT = 6;

function UploadAreaIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.50033 1.41667C7.68049 1.41659 6.87813 1.65359 6.18992 2.09911C5.50171 2.54464 4.95702 3.17968 4.62149 3.92771C4.57377 4.03496 4.52489 4.14168 4.47487 4.24787L4.4607 4.24858C4.41537 4.25 4.35374 4.25 4.25033 4.25C3.49888 4.25 2.77821 4.54851 2.24686 5.07986C1.7155 5.61122 1.41699 6.33189 1.41699 7.08333C1.41699 7.83478 1.7155 8.55545 2.24686 9.0868C2.77821 9.61816 3.49888 9.91667 4.25033 9.91667H4.37216L5.78883 8.5H4.25033C3.8746 8.5 3.51427 8.35074 3.24859 8.08507C2.98291 7.81939 2.83366 7.45906 2.83366 7.08333C2.83366 6.70761 2.98291 6.34728 3.24859 6.0816C3.51427 5.81592 3.8746 5.66667 4.25033 5.66667H4.29566C4.44299 5.66667 4.61441 5.66737 4.75608 5.63833C4.93222 5.60745 5.10065 5.54249 5.25191 5.44708C5.42262 5.33658 5.5402 5.19917 5.62945 5.07379C5.68417 4.99305 5.7318 4.90773 5.77183 4.81879C5.80937 4.74087 5.85541 4.63817 5.91066 4.51562L5.91349 4.50854C6.13691 4.00928 6.50004 3.58534 6.95905 3.28787C7.41806 2.9904 7.95335 2.83212 8.50033 2.83212C9.0473 2.83212 9.58259 2.9904 10.0416 3.28787C10.5006 3.58534 10.8637 4.00928 11.0872 4.50854L11.0907 4.51562C11.1452 4.63817 11.1913 4.74017 11.2288 4.81879C11.2614 4.8875 11.3096 4.98737 11.3712 5.07379C11.4605 5.19846 11.5773 5.33658 11.7487 5.44779C11.9202 5.55829 12.0937 5.60858 12.2446 5.63904C12.3862 5.66737 12.5577 5.66738 12.705 5.66738L12.7503 5.66667C13.126 5.66667 13.4864 5.81592 13.7521 6.0816C14.0177 6.34728 14.167 6.70761 14.167 7.08333C14.167 7.45906 14.0177 7.81939 13.7521 8.08507C13.4864 8.35074 13.126 8.5 12.7503 8.5H11.2118L12.6285 9.91667H12.7503C13.5018 9.91667 14.2224 9.61816 14.7538 9.0868C15.2851 8.55545 15.5837 7.83478 15.5837 7.08333C15.5837 6.33189 15.2851 5.61122 14.7538 5.07986C14.2224 4.54851 13.5018 4.25 12.7503 4.25C12.6469 4.25 12.5853 4.25 12.5399 4.24858H12.5258C12.2315 3.41731 11.6859 2.69815 10.9646 2.19075C10.2434 1.68335 9.38216 1.41283 8.50033 1.41667Z"
        fill="#7300CD"
      />
      <path
        d="M8.50014 8.5L7.99935 7.9992L8.50014 7.49841L9.00093 7.9992L8.50014 8.5ZM9.20847 14.875C9.20847 15.0629 9.13385 15.243 9.00101 15.3759C8.86817 15.5087 8.688 15.5833 8.50014 15.5833C8.31228 15.5833 8.13211 15.5087 7.99927 15.3759C7.86644 15.243 7.79181 15.0629 7.79181 14.875H9.20847ZM5.16602 10.8325L7.99935 7.9992L9.00093 9.00079L6.1676 11.8341L5.16602 10.8325ZM9.00093 7.9992L11.8343 10.8325L10.8327 11.8341L7.99935 9.00079L9.00093 7.9992ZM9.20847 8.5V14.875H7.79181V8.5H9.20847Z"
        fill="#7300CD"
      />
    </svg>
  );
}

const employeeFieldLabels = [
  "كم عدد الموظفين *",
  "كم عدد الموظفين *",
  "كم عدد الموظفين *",
  "كم عدد الموظفين *",
  "كم عدد الموظفين *",
  "كم عدد الموظفين *",
] as const;

interface TourGuideRegisterStepOneFormProps {
  onCompletionChange: (completedCount: number) => void;
}

const TourGuideRegisterStepOneForm = ({ onCompletionChange }: TourGuideRegisterStepOneFormProps) => {
  const baseId = useId();
  const [values, setValues] = useState<string[]>(() => Array.from({ length: FIELD_COUNT }, () => ""));
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    const selectsDone = values.filter((v) => v.trim() !== "").length;
    const fileDone = files.length > 0 ? 1 : 0;
    onCompletionChange(selectsDone + fileDone);
  }, [values, files, onCompletionChange]);

  const setSelect = (index: number, value: string) => {
    setValues((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const onFilesChange = (list: FileList | null) => {
    if (!list?.length) {
      setFiles([]);
      return;
    }
    setFiles(Array.from(list));
  };

  const options = useMemo(
    () => [
      { value: "", label: "اختر", disabled: true },
      { value: "1-5", label: "1 – 5" },
      { value: "6-20", label: "6 – 20" },
      { value: "21-50", label: "21 – 50" },
      { value: "51+", label: "51+" },
    ],
    []
  );

  const completedCount = useMemo(() => {
    const selectsDone = values.filter((v) => v.trim() !== "").length;
    const fileDone = files.length > 0 ? 1 : 0;
    return selectsDone + fileDone;
  }, [values, files]);

  const canGoNext = completedCount >= TOTAL_FIELDS;

  return (
    <div className="mx-auto w-full max-w-[1026px]">
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2">
        {employeeFieldLabels.map((label, i) => (
          <div key={`${baseId}-f-${i}`} className="flex flex-col gap-2 text-right" dir="rtl">
            <label
              htmlFor={`${baseId}-select-${i}`}
              className="text-base font-bold text-[#1D1F1F]"
              style={{ fontFamily: araBold }}
            >
              {label}
            </label>
            <select
              id={`${baseId}-select-${i}`}
              value={values[i]}
              onChange={(e) => setSelect(i, e.target.value)}
              className="h-12 w-full rounded-lg border border-[#E5E7EB] bg-white px-4 text-right text-[#1D1F1F] outline-none transition-shadow focus:border-[#7300CD] focus:ring-2 focus:ring-[#7300CD]/20"
              style={{ fontFamily: ibm }}
            >
              {options.map((o) => (
                <option key={o.value || "placeholder"} value={o.value} disabled={o.disabled}>
                  {o.label}
                </option>
              ))}
            </select>
            <p className="text-sm text-[#6B7280]" style={{ fontFamily: ibm }}>
              عدد الموظفين في الكيان الخاص بك
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <p
          className="mb-3 text-right text-base font-bold text-[#1D1F1F]"
          style={{ fontFamily: araBold }}
        >
          إضافة الملفات
        </p>
        <label
          htmlFor={`${baseId}-file`}
          className="flex min-h-[160px] cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-[#D1D5DB] bg-[#FAFAFA] px-6 py-8 text-center transition-colors hover:border-[#7300CD]/50 hover:bg-[#F5F3FF]/30"
          dir="rtl"
        >
          <input
            id={`${baseId}-file`}
            type="file"
            className="sr-only"
            multiple
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            onChange={(e) => onFilesChange(e.target.files)}
          />
          <span
            className="flex h-[33px] w-[33px] shrink-0 items-center justify-center rounded-[49px] bg-[#F6EBFF]"
            aria-hidden
          >
            <UploadAreaIcon />
          </span>
          <span
            className="text-center text-[14px] font-bold leading-[120%] text-[#7300CD]"
            style={{ fontFamily: araBold }}
          >
            تصفح الملفات
          </span>
          <span className="text-xs text-[#6B7280]" style={{ fontFamily: ibm }}>
            PDF, DOC, JPG, PNG
          </span>
          {files.length > 0 && (
            <span className="mt-2 text-xs text-[#7300CD]" style={{ fontFamily: ibm }}>
              {files.length} ملف محدد
            </span>
          )}
        </label>
      </div>

      <section
        className="mx-auto mt-12 w-full max-w-[962px] rounded-[12px] sm:mt-16 lg:mt-20"
        aria-label="إجراءات النموذج"
      >
        <button
          type="button"
          disabled={!canGoNext}
          className="flex h-[62px] w-full items-center justify-center gap-[10px] rounded-[100px] bg-[#280048] px-[22px] py-[14px] text-lg font-bold text-white transition-colors hover:enabled:bg-[#3a0b5c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#280048] disabled:cursor-not-allowed disabled:opacity-45"
          style={{ fontFamily: araBold }}
        >
          التالي
        </button>
      </section>
    </div>
  );
};

export default TourGuideRegisterStepOneForm;
