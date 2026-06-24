"use client";

import {
  FormCheckboxField,
  FormFileUpload,
  FormSectionTitle,
  FormSelectField,
  FormSubmitButton,
  FormTextarea,
  FormTextInput,
} from "@/components/experiences/submit/ExperienceFormFields";
import { ibm, araBold } from "@/components/experiences/submit/experienceFormStyles";
import { useId, useMemo, useState, type FormEvent } from "react";
import { useLocale, useTranslations } from "next-intl";

const CATEGORY_KEYS = [
  "cultural",
  "adventure",
  "gastronomy",
  "business",
  "entertainment",
  "sports",
  "other",
] as const;

const PERIOD_KEYS = ["temporary", "seasonal", "permanent"] as const;
const FEE_KEYS = ["free", "paid"] as const;
const CHILD_SUITABLE_KEYS = ["yes", "no", "supervised"] as const;

type CategoryKey = (typeof CATEGORY_KEYS)[number];
type PeriodKey = (typeof PERIOD_KEYS)[number];
type FeeKey = (typeof FEE_KEYS)[number];
type ChildSuitableKey = (typeof CHILD_SUITABLE_KEYS)[number];

type FormValues = {
  titleAr: string;
  titleEn: string;
  category: "" | CategoryKey;
  descriptionAr: string;
  descriptionEn: string;
  period: "" | PeriodKey;
  address: string;
  startDate: string;
  endDate: string;
  locationLink: string;
  entranceFees: "" | FeeKey;
  childrenEntranceFees: "" | FeeKey;
  suitableForChildren: "" | ChildSuitableKey;
  ticketBookingLink: string;
  operatingHoursFrom: string;
  operatingHoursTo: string;
  email: string;
  companyName: string;
  contactName: string;
  contactPhone: string;
  permitCommitment: boolean;
};

const EMPTY_VALUES: FormValues = {
  titleAr: "",
  titleEn: "",
  category: "",
  descriptionAr: "",
  descriptionEn: "",
  period: "",
  address: "",
  startDate: "",
  endDate: "",
  locationLink: "",
  entranceFees: "",
  childrenEntranceFees: "",
  suitableForChildren: "",
  ticketBookingLink: "",
  operatingHoursFrom: "",
  operatingHoursTo: "",
  email: "",
  companyName: "",
  contactName: "",
  contactPhone: "",
  permitCommitment: false,
};

function isValidPhone(phone: string): boolean {
  return phone.replace(/\D/g, "").length >= 9;
}

const ExperienceSubmitForm = () => {
  const t = useTranslations("experienceSubmit");
  const locale = useLocale();
  const baseId = useId();
  const [values, setValues] = useState<FormValues>(EMPTY_VALUES);
  const [eventLogoFile, setEventLogoFile] = useState<File | null>(null);
  const [eventPhotosFiles, setEventPhotosFiles] = useState<File[]>([]);
  const [eventProfileFile, setEventProfileFile] = useState<File | null>(null);
  const [permitFile, setPermitFile] = useState<File | null>(null);
  const [commercialRegistrationFile, setCommercialRegistrationFile] =
    useState<File | null>(null);
  const [companyProfileFile, setCompanyProfileFile] = useState<File | null>(null);
  const [submitState, setSubmitState] = useState<"idle" | "success" | "error">(
    "idle",
  );
  const [submitMessage, setSubmitMessage] = useState("");

  const setField = <K extends keyof FormValues>(key: K, value: FormValues[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const categoryOptions = useMemo(
    () =>
      CATEGORY_KEYS.map((key) => ({
        value: key,
        label: t(`form.categories.${key}`),
      })),
    [t],
  );

  const periodOptions = useMemo(
    () =>
      PERIOD_KEYS.map((key) => ({
        value: key,
        label: t(`form.periods.${key}`),
      })),
    [t],
  );

  const feeOptions = useMemo(
    () =>
      FEE_KEYS.map((key) => ({
        value: key,
        label: t(`form.fees.${key}`),
      })),
    [t],
  );

  const childSuitableOptions = useMemo(
    () =>
      CHILD_SUITABLE_KEYS.map((key) => ({
        value: key,
        label: t(`form.childSuitable.${key}`),
      })),
    [t],
  );

  const canSubmit =
    values.titleAr.trim() !== "" &&
    values.titleEn.trim() !== "" &&
    values.category !== "" &&
    values.descriptionAr.trim() !== "" &&
    values.period !== "" &&
    values.address.trim() !== "" &&
    values.startDate !== "" &&
    values.endDate !== "" &&
    values.locationLink.trim() !== "" &&
    values.entranceFees !== "" &&
    eventLogoFile != null &&
    eventPhotosFiles.length > 0 &&
    eventProfileFile != null &&
    permitFile != null &&
    values.companyName.trim() !== "" &&
    commercialRegistrationFile != null &&
    companyProfileFile != null &&
    values.email.trim() !== "" &&
    values.contactName.trim() !== "" &&
    isValidPhone(values.contactPhone) &&
    values.permitCommitment;

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit) {
      setSubmitState("error");
      setSubmitMessage(t("form.errorRequired"));
      return;
    }
    setSubmitState("success");
    setSubmitMessage(t("form.success"));
  };

  const textDir = locale === "ar" ? "rtl" : "ltr";

  return (
    <form className="mx-auto w-full max-w-[1026px]" onSubmit={onSubmit} noValidate>
      <div className="mb-10">
        <FormSectionTitle>{t("form.sectionDetails")}</FormSectionTitle>
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2">
          <FormTextInput
            id={`${baseId}-title-ar`}
            label={t("form.titleAr")}
            required
            value={values.titleAr}
            onChange={(e) => setField("titleAr", e.target.value)}
            dir="rtl"
          />
          <FormTextInput
            id={`${baseId}-title-en`}
            label={t("form.titleEn")}
            required
            value={values.titleEn}
            onChange={(e) => setField("titleEn", e.target.value)}
            dir="ltr"
          />
          <FormSelectField
            id={`${baseId}-category`}
            label={t("form.category")}
            required
            placeholder={t("form.select")}
            value={values.category}
            onChange={(value) =>
              setField("category", value as FormValues["category"])
            }
            options={categoryOptions}
          />
          <FormSelectField
            id={`${baseId}-period`}
            label={t("form.period")}
            required
            placeholder={t("form.select")}
            value={values.period}
            onChange={(value) => setField("period", value as FormValues["period"])}
            options={periodOptions}
          />
          <FormTextarea
            id={`${baseId}-desc-ar`}
            label={t("form.descriptionAr")}
            required
            className="md:col-span-2"
            value={values.descriptionAr}
            onChange={(e) => setField("descriptionAr", e.target.value)}
            dir="rtl"
          />
          <FormTextarea
            id={`${baseId}-desc-en`}
            label={t("form.descriptionEn")}
            className="md:col-span-2"
            value={values.descriptionEn}
            onChange={(e) => setField("descriptionEn", e.target.value)}
            dir="ltr"
          />
        </div>
      </div>

      <div className="mb-10">
        <FormSectionTitle>{t("form.sectionScheduleLocation")}</FormSectionTitle>
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2">
          <FormTextInput
            id={`${baseId}-address`}
            label={t("form.address")}
            required
            className="md:col-span-2"
            value={values.address}
            onChange={(e) => setField("address", e.target.value)}
            dir={textDir}
          />
          <FormTextInput
            id={`${baseId}-start-date`}
            label={t("form.startDate")}
            required
            type="date"
            value={values.startDate}
            onChange={(e) => setField("startDate", e.target.value)}
          />
          <FormTextInput
            id={`${baseId}-end-date`}
            label={t("form.endDate")}
            required
            type="date"
            value={values.endDate}
            onChange={(e) => setField("endDate", e.target.value)}
          />
          <FormTextInput
            id={`${baseId}-location-link`}
            label={t("form.locationLink")}
            required
            type="url"
            value={values.locationLink}
            onChange={(e) => setField("locationLink", e.target.value)}
            dir="ltr"
            placeholder="https://maps.google.com/..."
            hint={t("form.locationLinkHint")}
            className="md:col-span-2"
          />
          <FormTextInput
            id={`${baseId}-hours-from`}
            label={t("form.operatingHoursFrom")}
            type="time"
            value={values.operatingHoursFrom}
            onChange={(e) => setField("operatingHoursFrom", e.target.value)}
          />
          <FormTextInput
            id={`${baseId}-hours-to`}
            label={t("form.operatingHoursTo")}
            type="time"
            value={values.operatingHoursTo}
            onChange={(e) => setField("operatingHoursTo", e.target.value)}
          />
          <FormSelectField
            id={`${baseId}-entrance-fees`}
            label={t("form.entranceFees")}
            required
            placeholder={t("form.select")}
            value={values.entranceFees}
            onChange={(value) =>
              setField("entranceFees", value as FormValues["entranceFees"])
            }
            options={feeOptions}
          />
          <FormSelectField
            id={`${baseId}-children-fees`}
            label={t("form.childrenEntranceFees")}
            placeholder={t("form.select")}
            value={values.childrenEntranceFees}
            onChange={(value) =>
              setField(
                "childrenEntranceFees",
                value as FormValues["childrenEntranceFees"],
              )
            }
            options={feeOptions}
          />
          <FormSelectField
            id={`${baseId}-child-suitable`}
            label={t("form.suitableForChildren")}
            placeholder={t("form.select")}
            value={values.suitableForChildren}
            onChange={(value) =>
              setField(
                "suitableForChildren",
                value as FormValues["suitableForChildren"],
              )
            }
            options={childSuitableOptions}
          />
          <FormTextInput
            id={`${baseId}-ticket-link`}
            label={t("form.ticketBookingLink")}
            type="url"
            value={values.ticketBookingLink}
            onChange={(e) => setField("ticketBookingLink", e.target.value)}
            dir="ltr"
          />
        </div>
      </div>

      <div className="mb-10">
        <FormSectionTitle>{t("form.sectionMedia")}</FormSectionTitle>
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2">
          <FormFileUpload
            id={`${baseId}-event-logo`}
            label={t("form.eventLogo")}
            accept=".jpg,.jpeg,.png,.pdf,.svg,.ai"
            hint={t("form.fileTypesLogo")}
            required
            file={eventLogoFile}
            onChange={(files) => setEventLogoFile(files?.[0] ?? null)}
          />
          <FormFileUpload
            id={`${baseId}-event-photos`}
            label={t("form.eventPhotos")}
            accept=".jpg,.jpeg,.png"
            hint={t("form.fileTypesPhotos")}
            required
            multiple
            files={eventPhotosFiles}
            onChange={(files) =>
              setEventPhotosFiles(files ? Array.from(files) : [])
            }
          />
          <div className="md:col-span-2">
            <FormFileUpload
              id={`${baseId}-event-profile`}
              label={t("form.eventProfile")}
              accept=".pdf,.ppt,.pptx,.doc,.docx"
              hint={t("form.fileTypesProfile")}
              required
              file={eventProfileFile}
              onChange={(files) => setEventProfileFile(files?.[0] ?? null)}
            />
          </div>
          <div className="md:col-span-2">
            <FormFileUpload
              id={`${baseId}-permit`}
              label={t("form.permitFile")}
              accept=".jpg,.jpeg,.png,.pdf"
              hint={t("form.fileTypesPermit")}
              required
              file={permitFile}
              onChange={(files) => setPermitFile(files?.[0] ?? null)}
            />
          </div>
        </div>
      </div>

      <div className="mb-10">
        <FormSectionTitle>{t("form.sectionCompany")}</FormSectionTitle>
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2">
          <FormTextInput
            id={`${baseId}-company-name`}
            label={t("form.companyName")}
            required
            className="md:col-span-2"
            value={values.companyName}
            onChange={(e) => setField("companyName", e.target.value)}
            dir={textDir}
          />
          <FormFileUpload
            id={`${baseId}-commercial-reg`}
            label={t("form.commercialRegistration")}
            accept=".jpg,.jpeg,.png,.pdf"
            hint={t("form.fileTypesCommercial")}
            required
            file={commercialRegistrationFile}
            onChange={(files) =>
              setCommercialRegistrationFile(files?.[0] ?? null)
            }
          />
          <FormFileUpload
            id={`${baseId}-company-profile`}
            label={t("form.companyProfile")}
            accept=".pdf,.ppt,.pptx,.doc,.docx"
            hint={t("form.fileTypesCompanyProfile")}
            required
            file={companyProfileFile}
            onChange={(files) => setCompanyProfileFile(files?.[0] ?? null)}
          />
        </div>
      </div>

      <div className="mb-10">
        <FormSectionTitle>{t("form.sectionContact")}</FormSectionTitle>
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2">
          <FormTextInput
            id={`${baseId}-contact-name`}
            label={t("form.contactName")}
            required
            value={values.contactName}
            onChange={(e) => setField("contactName", e.target.value)}
            dir={textDir}
          />
          <FormTextInput
            id={`${baseId}-email`}
            label={t("form.email")}
            required
            type="email"
            value={values.email}
            onChange={(e) => setField("email", e.target.value)}
            dir="ltr"
          />
          <FormTextInput
            id={`${baseId}-contact-phone`}
            label={t("form.contactPhone")}
            required
            type="tel"
            value={values.contactPhone}
            onChange={(e) => setField("contactPhone", e.target.value)}
            dir="ltr"
            inputMode="tel"
            hint={t("form.contactPhoneHint")}
          />
        </div>
      </div>

      <div className="mb-10">
        <p
          className="mb-4 text-base font-bold text-foreground text-start"
          style={{ fontFamily: araBold }}
        >
          {t("form.permitCommitmentTitle")} <span className="text-red-600">*</span>
        </p>
        <FormCheckboxField
          checked={values.permitCommitment}
          onChange={(checked) => setField("permitCommitment", checked)}
        >
          {t("form.permitCommitment")}
        </FormCheckboxField>
      </div>

      <section
        className="mx-auto mt-12 w-full max-w-[962px] rounded-[12px] sm:mt-16 lg:mt-20"
        aria-label={t("form.formActionsAria")}
      >
        {submitMessage ? (
          <p
            className={`mb-3 text-start text-sm ${
              submitState === "success" ? "text-green-700" : "text-red-600"
            }`}
            style={{ fontFamily: ibm }}
            role="status"
          >
            {submitMessage}
          </p>
        ) : null}
        <FormSubmitButton disabled={!canSubmit}>
          {t("form.submit")}
        </FormSubmitButton>
      </section>
    </form>
  );
};

export default ExperienceSubmitForm;
