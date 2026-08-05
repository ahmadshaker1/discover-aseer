"use client";

import Image from "next/image";

import {
  Button,
  Checkbox,
  Field,
  Input,
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Textarea,
} from "@headlessui/react";
import type {
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
} from "react";
import { useEffect, useState } from "react";
import {
  araBold,
  CHECK_ROW,
  FIELD_GROUP,
  FIELD_INPUT,
  FIELD_TEXTAREA,
  ibm,
  SUBMIT_BUTTON,
} from "@/components/experiences/submit/experienceFormStyles";
const FIELD_CONTROL = `${FIELD_INPUT} data-focus:outline-none data-focus:ring-2 data-focus:ring-primary data-focus:ring-offset-2`;

const FIELD_TEXTAREA_CONTROL = `${FIELD_TEXTAREA} data-focus:outline-none data-focus:ring-2 data-focus:ring-primary data-focus:ring-offset-2`;

function RequiredMark() {
  return <span className="text-red-600"> *</span>;
}

export function FormSectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2
      className="mb-6 text-2xl font-bold text-foreground text-start"
      style={{ fontFamily: araBold }}
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
  type,
  ...inputProps
}: FormTextInputProps & { type?: string }) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <Field className={`${FIELD_GROUP} ${className}`.trim()}>
      <Label
        htmlFor={id}
        className="text-base font-bold text-foreground"
        style={{ fontFamily: araBold }}
      >
        {label}
        {required ? <RequiredMark /> : null}
      </Label>
      <div className="relative flex items-center">
        <Input
          id={id}
          type={inputType}
          className={`${FIELD_CONTROL} w-full ${isPassword ? "pr-10" : ""} ${inputProps.readOnly ? "bg-muted text-muted-foreground" : ""}`.trim()}
          style={{ fontFamily: ibm }}
          {...inputProps}
        />
        {isPassword && (
          <button
            type="button"
            className="absolute right-3 flex h-10 w-10 items-center justify-center text-muted-foreground hover:text-foreground"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <Image
                src="/assets/tourist-form-portal/invisible.png"
                alt="Hide password"
                width={20}
                height={20}
              />
            ) : (
              <Image
                src="/assets/tourist-form-portal/show.png"
                alt="Show password"
                width={20}
                height={20}
              />
            )}
          </button>
        )}
      </div>
      {hint ? (
        <p
          className="text-xs text-muted-foreground"
          style={{ fontFamily: ibm }}
        >
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
        style={{ fontFamily: araBold }}
      >
        {label}
        {required ? <RequiredMark /> : null}
      </Label>
      <Textarea
        id={id}
        className={FIELD_TEXTAREA_CONTROL}
        style={{ fontFamily: ibm }}
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
  disabled?: boolean;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
};

function SelectChevron() {
  return (
    <svg
      className="h-4 w-4 shrink-0 text-muted-foreground"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function FormSelectField({
  id,
  label,
  required,
  disabled,
  placeholder,
  value,
  onChange,
  options,
}: FormSelectFieldProps) {
  const selectedLabel =
    options.find((option) => option.value === value)?.label ?? placeholder;

  return (
    <Field className={FIELD_GROUP} disabled={disabled}>
      <Label
        htmlFor={id}
        className="text-base font-bold text-foreground"
        style={{ fontFamily: araBold }}
      >
        {label}
        {required ? <RequiredMark /> : null}
      </Label>
      <Listbox value={value} onChange={onChange} disabled={disabled}>
        <div className="relative">
          <ListboxButton
            id={id}
            aria-required={required}
            disabled={disabled}
            className={`${FIELD_CONTROL} flex items-center justify-between gap-2 ${
              disabled
                ? "cursor-not-allowed bg-muted text-muted-foreground"
                : "cursor-pointer"
            }`}
            style={{ fontFamily: ibm }}
          >
            <span
              className={`min-w-0 truncate text-start ${
                value ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {selectedLabel}
            </span>
            <SelectChevron />
          </ListboxButton>
          <ListboxOptions
            anchor="bottom start"
            transition
            modal={false}
            className="z-50 max-h-56 w-(--button-width) overflow-auto rounded-lg border border-border bg-background py-1 shadow-lg [--anchor-gap:4px] transition duration-100 ease-out data-closed:scale-95 data-closed:opacity-0 data-[anchor~=end]:origin-top-end"
          >
            <ListboxOption
              value=""
              className="cursor-pointer px-4 py-2.5 text-muted-foreground data-focus:bg-muted data-selected:bg-primary/10"
              style={{ fontFamily: ibm }}
            >
              {placeholder}
            </ListboxOption>
            {options.map((option) => (
              <ListboxOption
                key={option.value}
                value={option.value}
                className="cursor-pointer px-4 py-2.5 text-foreground data-focus:bg-muted data-selected:bg-primary/10 data-selected:font-semibold"
                style={{ fontFamily: ibm }}
              >
                {option.label}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </Listbox>
    </Field>
  );
}

type FormMultiSelectFieldProps = {
  id: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
  placeholder: string;
  value: string[];
  onChange: (value: string[]) => void;
  options: SelectOption[];
};

export function FormMultiSelectField({
  id,
  label,
  required,
  disabled,
  placeholder,
  value,
  onChange,
  options,
}: FormMultiSelectFieldProps) {
  const selectedLabels = options
    .filter((option) => value.includes(option.value))
    .map((option) => option.label);
  const buttonLabel =
    selectedLabels.length > 0 ? selectedLabels.join("، ") : placeholder;

  return (
    <Field className={FIELD_GROUP} disabled={disabled}>
      <Label
        htmlFor={id}
        className="text-base font-bold text-foreground"
        style={{ fontFamily: araBold }}
      >
        {label}
        {required ? <RequiredMark /> : null}
      </Label>
      <Listbox value={value} onChange={onChange} multiple disabled={disabled}>
        <div className="relative">
          <ListboxButton
            id={id}
            aria-required={required}
            disabled={disabled}
            className={`${FIELD_CONTROL} flex min-h-12 items-center justify-between gap-2 ${
              disabled
                ? "cursor-not-allowed bg-muted text-muted-foreground"
                : "cursor-pointer"
            }`}
            style={{ fontFamily: ibm }}
          >
            <span
              className={`min-w-0 text-start ${
                selectedLabels.length > 0
                  ? "text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {buttonLabel}
            </span>
            <SelectChevron />
          </ListboxButton>
          <ListboxOptions
            anchor="bottom start"
            transition
            modal={false}
            className="z-50 max-h-64 w-(--button-width) overflow-auto rounded-lg border border-border bg-background py-1 shadow-lg [--anchor-gap:4px] transition duration-100 ease-out data-closed:scale-95 data-closed:opacity-0 data-[anchor~=end]:origin-top-end"
          >
            {options.map((option) => (
              <ListboxOption
                key={option.value}
                value={option.value}
                className="group flex cursor-pointer items-center gap-3 px-4 py-2.5 text-foreground data-focus:bg-muted data-selected:bg-primary/10"
                style={{ fontFamily: ibm }}
              >
                <span className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded border-2 border-border bg-surface group-data-selected:border-primary group-data-selected:bg-primary">
                  <svg
                    className="h-3 w-3 stroke-white opacity-0 group-data-selected:opacity-100"
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
                </span>
                <span className="min-w-0 flex-1 text-start group-data-selected:font-semibold">
                  {option.label}
                </span>
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </Listbox>
    </Field>
  );
}

type FormFileUploadProps = {
  id: string;
  label: string;
  accept: string;
  hint: string;
  required?: boolean;
  file?: File | null;
  existingFileUrl?: string | null;
  existingFileLabel?: string;
  previewAsImage?: boolean;
  onChange: (selected: FileList | null) => void;
  chooseFileLabel: string;
  noFileLabel: string;
  viewFileLabel?: string;
};

export function FormFileUpload({
  id,
  label,
  accept,
  hint,
  required,
  file,
  existingFileUrl,
  existingFileLabel,
  previewAsImage = false,
  onChange,
  chooseFileLabel,
  noFileLabel,
  viewFileLabel = "View file",
}: FormFileUploadProps) {
  const [objectUrl, setObjectUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      setObjectUrl(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setObjectUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const previewUrl = objectUrl ?? existingFileUrl ?? null;
  const showImagePreview =
    Boolean(previewUrl) &&
    (previewAsImage ||
      Boolean(file?.type?.startsWith("image/")) ||
      /\.(jpe?g|png|webp|gif)(\?|#|$)/i.test(previewUrl ?? ""));

  return (
    <Field className={FIELD_GROUP}>
      <Label
        htmlFor={id}
        className="text-base font-bold text-foreground"
        style={{ fontFamily: araBold }}
      >
        {label}
        {required ? <RequiredMark /> : null}
      </Label>
      <Label
        htmlFor={id}
        className="flex min-h-[130px] cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-border bg-surface px-6 py-8 text-center transition-colors hover:border-primary/50 hover:bg-primary/5 has-[:focus-visible]:border-primary/50 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary has-[:focus-visible]:ring-offset-2"
      >
        <Input
          id={id}
          type="file"
          className="sr-only"
          accept={accept}
          onChange={(e) => onChange(e.target.files)}
        />
        {showImagePreview && previewUrl ? (
          // eslint-disable-next-line @next/next/no-img-element -- Directus / legacy CMS URLs
          <img
            src={previewUrl}
            alt=""
            className="max-h-36 w-auto max-w-full rounded-lg object-contain"
          />
        ) : null}
        <Button
          type="button"
          className="pointer-events-none text-center text-[14px] font-bold leading-[120%] text-primary"
          style={{ fontFamily: araBold }}
        >
          {chooseFileLabel}
        </Button>
        <span
          className="text-xs text-muted-foreground"
          style={{ fontFamily: ibm }}
        >
          {hint}
        </span>
        {file?.name ? (
          <span
            className="mt-2 text-xs text-primary"
            style={{ fontFamily: ibm }}
          >
            {file.name}
          </span>
        ) : previewUrl && !showImagePreview ? (
          <a
            href={previewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 text-xs text-primary underline"
            style={{ fontFamily: ibm }}
            onClick={(e) => e.stopPropagation()}
          >
            {existingFileLabel ?? viewFileLabel}
          </a>
        ) : previewUrl && showImagePreview && !file ? (
          <span
            className="mt-2 text-xs text-primary"
            style={{ fontFamily: ibm }}
          >
            {existingFileLabel ?? viewFileLabel}
          </span>
        ) : noFileLabel ? (
          <span
            className="text-xs text-muted-foreground"
            style={{ fontFamily: ibm }}
          >
            {noFileLabel}
          </span>
        ) : null}
      </Label>
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
        style={{ fontFamily: ibm }}
      >
        {children}
      </Label>
    </Field>
  );
}

export function FormSubmitButton({
  children,
  disabled,
}: {
  children: ReactNode;
  disabled?: boolean;
}) {
  return (
    <Button
      type="submit"
      disabled={disabled}
      className={`${SUBMIT_BUTTON} disabled:cursor-not-allowed disabled:opacity-50`}
      style={{ fontFamily: araBold }}
    >
      {children}
    </Button>
  );
}
