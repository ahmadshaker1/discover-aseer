"use client";

import {
  Button,
  Checkbox,
  Field,
  Input,
  Label,
  Radio,
  RadioGroup,
  Select,
  Textarea,
} from "@headlessui/react";
import { useTranslations } from "next-intl";
import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";
import {
  araBold,
  CHECK_ROW,
  FIELD_GROUP,
  FIELD_INPUT,
  FIELD_TEXTAREA,
  ibm,
  SUBMIT_BUTTON,
} from "./experienceFormStyles";

function RequiredMark() {
  return <span className="text-red-600"> *</span>;
}

export function FormSectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2
      className="mb-6 text-2xl font-bold text-foreground text-start"
    >
      {children}
    </h2>
  );
}

type FormTextInputProps = {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  className?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "className" | "id">;

export function FormTextInput({
  id,
  label,
  required,
  hint,
  className = "",
  ...inputProps
}: FormTextInputProps) {
  return (
    <Field className={`${FIELD_GROUP} ${className}`.trim()}>
      <Label
        htmlFor={id}
        className="text-base font-bold text-foreground"
      >
        {label}
        {required ? <RequiredMark /> : null}
      </Label>
      <Input
        id={id}
        className={FIELD_INPUT}
        {...inputProps}
      />
      {hint ? (
        <p className="text-xs text-muted-foreground">
          {hint}
        </p>
      ) : null}
    </Field>
  );
}

type FormTextareaProps = {
  id: string;
  label: string;
  required?: boolean;
  className?: string;
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "className" | "id">;

export function FormTextarea({
  id,
  label,
  required,
  className = "",
  ...textareaProps
}: FormTextareaProps) {
  return (
    <Field className={`flex flex-col gap-2 text-start ${className}`}>
      <Label
        htmlFor={id}
        className="text-base font-bold text-foreground"
      >
        {label}
        {required ? <RequiredMark /> : null}
      </Label>
      <Textarea
        id={id}
        className={FIELD_TEXTAREA}
        {...textareaProps}
      />
    </Field>
  );
}

export type SelectOption = { value: string; label: string };

type FormSelectFieldProps = {
  id: string;
  label: string;
  required?: boolean;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
};

export function FormSelectField({
  id,
  label,
  required,
  placeholder,
  value,
  onChange,
  options,
}: FormSelectFieldProps) {
  return (
    <Field className={FIELD_GROUP}>
      <Label
        htmlFor={id}
        className="text-base font-bold text-foreground"
      >
        {label}
        {required ? <RequiredMark /> : null}
      </Label>
      <Select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${FIELD_INPUT} cursor-pointer`}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </Field>
  );
}

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
        fill="currentColor"
      />
      <path
        d="M8.50014 8.5L7.99935 7.9992L8.50014 7.49841L9.00093 7.9992L8.50014 8.5ZM9.20847 14.875C9.20847 15.0629 9.13385 15.243 9.00101 15.3759C8.86817 15.5087 8.688 15.5833 8.50014 15.5833C8.31228 15.5833 8.13211 15.5087 7.99927 15.3759C7.86644 15.243 7.79181 15.0629 7.79181 14.875H9.20847ZM5.16602 10.8325L7.99935 7.9992L9.00093 9.00079L6.1676 11.8341L5.16602 10.8325ZM9.00093 7.9992L11.8343 10.8325L10.8327 11.8341L7.99935 9.00079L9.00093 7.9992ZM9.20847 8.5V14.875H7.79181V8.5H9.20847Z"
        fill="currentColor"
      />
    </svg>
  );
}

type FormFileUploadProps = {
  id: string;
  label: string;
  accept: string;
  hint: string;
  required?: boolean;
  multiple?: boolean;
  file?: File | null;
  files?: File[];
  onChange: (selected: FileList | null) => void;
};

export function FormFileUpload({
  id,
  label,
  accept,
  hint,
  required,
  multiple,
  file,
  files,
  onChange,
}: FormFileUploadProps) {
  const t = useTranslations("experienceSubmit.form");
  const selectedLabel = multiple
    ? files && files.length > 0
      ? files.map((f) => f.name).join(", ")
      : null
    : file?.name;

  return (
    <Field className={FIELD_GROUP}>
      <Label
        htmlFor={id}
        className="text-base font-bold text-foreground"
      >
        {label}
        {required ? <RequiredMark /> : null}
      </Label>
      <label
        htmlFor={id}
        className="flex min-h-[130px] cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-border bg-surface px-6 py-8 text-center transition-colors hover:border-primary/50 hover:bg-primary/5"
      >
        <input
          id={id}
          type="file"
          className="sr-only"
          accept={accept}
          multiple={multiple}
          onChange={(e) => onChange(e.target.files)}
        />
        <span
          className="flex h-[33px] w-[33px] shrink-0 items-center justify-center rounded-[49px] bg-primary/10"
          aria-hidden
        >
          <UploadAreaIcon />
        </span>
        <Button
          type="button"
          className="pointer-events-none text-center text-[14px] font-bold leading-[120%] text-primary"
        >
          {t("chooseFile")}
        </Button>
        <span className="text-xs text-muted-foreground">
          {hint}
        </span>
        {selectedLabel ? (
          <span className="mt-2 text-xs text-primary">
            {selectedLabel}
          </span>
        ) : (
          <span className="text-xs text-muted-foreground">
            {t("noFileChosen")}
          </span>
        )}
      </label>
    </Field>
  );
}

type FormCheckboxFieldProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  children: ReactNode;
};

export function FormCheckboxField({
  checked,
  onChange,
  children,
}: FormCheckboxFieldProps) {
  return (
    <Field className={CHECK_ROW}>
      <Checkbox
        checked={checked}
        onChange={onChange}
        className="group relative mt-1 inline-flex h-4 w-4 shrink-0 cursor-pointer items-center justify-center rounded border-2 border-border bg-surface transition data-checked:border-primary data-checked:bg-primary data-focus:outline-none data-focus:ring-2 data-focus:ring-primary data-focus:ring-offset-2"
      >
        <svg
          className="h-3 w-3 stroke-white opacity-0 group-data-checked:opacity-100"
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden
        >
          <path
            d="M3 8L6 11L11 3.5"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Checkbox>
      <Label
        className="flex-1 cursor-pointer text-sm text-start"
      >
        {children}
      </Label>
    </Field>
  );
}

type FormYesNoFieldProps = {
  label: string;
  required?: boolean;
  value: boolean | null;
  onChange: (value: boolean) => void;
  yesLabel: string;
  noLabel: string;
};

const RADIO_OPTION =
  "group flex cursor-pointer items-center gap-3 rounded-lg border border-border bg-background px-4 py-3 transition-colors data-checked:border-primary data-checked:bg-primary/5 data-focus:outline-none data-focus:ring-2 data-focus:ring-primary data-focus:ring-offset-2";

export function FormYesNoField({
  label,
  required,
  value,
  onChange,
  yesLabel,
  noLabel,
}: FormYesNoFieldProps) {
  return (
    <Field className={FIELD_GROUP}>
      <Label
        className="text-base font-bold text-foreground"
      >
        {label}
        {required ? <RequiredMark /> : null}
      </Label>
      <RadioGroup
        value={value ?? undefined}
        onChange={onChange}
        className="grid grid-cols-1 gap-3 sm:grid-cols-2"
        aria-required={required}
      >
        <Radio value={true} className={RADIO_OPTION}>
          <span
            className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 border-border bg-surface group-data-checked:border-primary"
            aria-hidden
          >
            <span className="h-2 w-2 rounded-full bg-primary opacity-0 group-data-checked:opacity-100" />
          </span>
          <span className="text-base text-foreground">
            {yesLabel}
          </span>
        </Radio>
        <Radio value={false} className={RADIO_OPTION}>
          <span
            className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 border-border bg-surface group-data-checked:border-primary"
            aria-hidden
          >
            <span className="h-2 w-2 rounded-full bg-primary opacity-0 group-data-checked:opacity-100" />
          </span>
          <span className="text-base text-foreground">
            {noLabel}
          </span>
        </Radio>
      </RadioGroup>
    </Field>
  );
}

type FormSubmitButtonProps = {
  disabled?: boolean;
  children: ReactNode;
};

export function FormSubmitButton({ disabled, children }: FormSubmitButtonProps) {
  return (
    <Button
      type="submit"
      disabled={disabled}
      className={SUBMIT_BUTTON}
    >
      {children}
    </Button>
  );
}
