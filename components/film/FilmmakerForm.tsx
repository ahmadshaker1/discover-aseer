"use client";

import { FormEvent, useState } from "react";
import { useTranslations } from "next-intl";

type SubmitState = "idle" | "submitting" | "success" | "error";

const inputClass =
  "w-full rounded-lg border border-border bg-background px-4 py-3 text-[15px] text-foreground outline-none transition-shadow placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/25";

const labelClass = "mb-1.5 block text-start text-sm font-medium text-foreground";

export default function FilmmakerForm() {
  const t = useTranslations("filmmakerForm");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [state, setState] = useState<SubmitState>("idle");
  const [feedback, setFeedback] = useState("");

  const clearStatus = () => {
    if (state === "success" || state === "error") {
      setState("idle");
      setFeedback("");
    }
  };

  const reset = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setMessage("");
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (state === "submitting") return;

    setState("submitting");
    setFeedback("");

    try {
      const response = await fetch("/api/filmmaker-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email,
          phone,
          message,
        }),
      });

      const data = (await response.json().catch(() => null)) as {
        error?: string;
      } | null;

      if (!response.ok) {
        throw new Error(data?.error ?? t("errorGeneric"));
      }

      setState("success");
      setFeedback(t("success"));
      reset();
    } catch (err) {
      setState("error");
      setFeedback(
        err instanceof Error ? err.message : t("errorGeneric"),
      );
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex w-full flex-col gap-6 text-start"
      noValidate
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="filmmaker-first-name" className={labelClass}>
            {t("firstName")}
          </label>
          <input
            id="filmmaker-first-name"
            name="first_name"
            type="text"
            autoComplete="given-name"
            required
            value={firstName}
            onChange={(e) => {
              clearStatus();
              setFirstName(e.target.value);
            }}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="filmmaker-last-name" className={labelClass}>
            {t("lastName")}
          </label>
          <input
            id="filmmaker-last-name"
            name="last_name"
            type="text"
            autoComplete="family-name"
            required
            value={lastName}
            onChange={(e) => {
              clearStatus();
              setLastName(e.target.value);
            }}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="filmmaker-email" className={labelClass}>
          {t("email")}
        </label>
        <input
          id="filmmaker-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => {
            clearStatus();
            setEmail(e.target.value);
          }}
          className={inputClass}
          dir="ltr"
        />
      </div>

      <div>
        <label htmlFor="filmmaker-phone" className={labelClass}>
          {t("phone")}
        </label>
        <input
          id="filmmaker-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          required
          value={phone}
          onChange={(e) => {
            clearStatus();
            setPhone(e.target.value);
          }}
          className={inputClass}
          dir="ltr"
        />
      </div>

      <div>
        <label htmlFor="filmmaker-message" className={labelClass}>
          {t("message")}
        </label>
        <textarea
          id="filmmaker-message"
          name="message"
          required
          rows={6}
          value={message}
          onChange={(e) => {
            clearStatus();
            setMessage(e.target.value);
          }}
          className={`${inputClass} min-h-[140px] resize-y`}
        />
      </div>

      {feedback ? (
        <p
          role="status"
          className={
            state === "success"
              ? "text-sm text-emerald-600 dark:text-emerald-400"
              : "text-sm text-red-600 dark:text-red-400"
          }
        >
          {feedback}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={state === "submitting"}
        className="inline-flex h-[52px] w-full max-w-xs cursor-pointer items-center justify-center rounded-[100px] bg-primary px-6 text-center text-[16px] font-medium leading-6 text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {state === "submitting" ? t("submitting") : t("submit")}
      </button>
    </form>
  );
}
