"use client";

import { useState, useSyncExternalStore, type FormEvent } from "react";
import Link from "next/link";
import {
  CAPITAL_TYPES,
  FOUNDER_STAGES,
  GENERIC_ERROR,
  OPERATOR_TYPES,
  ROLE_OPTIONS,
  VALID_ROLES,
  validateJoin,
  type JoinField,
  type Role,
} from "@/lib/join-form";

type FormData = {
  fullName: string;
  email: string;
  company: string;
  stage: string;
  type: string;
  operatorType: string;
};

const initialData: FormData = {
  fullName: "",
  email: "",
  company: "",
  stage: "",
  type: "",
  operatorType: "",
};

const SUBMIT_LABEL: Record<Role, string> = {
  founder: "Join the founder list",
  operator: "Talk to us",
  capital_provider: "Stay in touch",
};

const SUCCESS: Record<Role, { heading: string; message: string }> = {
  founder: {
    heading: "You’re on the list.",
    message:
      "We’ll email you when a program or event fits your company. Attending Midwest House Summit? Your personal link is in your FNDRYx invitation email.",
  },
  operator: {
    heading: "Thanks for reaching out.",
    message: "We’ll reply personally within two business days.",
  },
  capital_provider: {
    heading: "Thanks for reaching out.",
    message: "We’ll reply personally within two business days.",
  },
};

const FIELD_IDS: Record<JoinField, string> = {
  role: "ff-role",
  fullName: "ff-name",
  email: "ff-email",
  company: "ff-company",
  stage: "ff-stage",
  type: "ff-type",
  operatorType: "ff-operator-type",
};

const ERROR_ID = "ff-error";

// ?role= in the URL (search or hash) pre-selects the role, e.g. /?role=operator#join.
// Read through useSyncExternalStore so the server render and hydration agree
// (no role from the URL on the server), without setting state inside an effect.
function subscribeToUrl(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  window.addEventListener("popstate", onChange);
  return () => {
    window.removeEventListener("hashchange", onChange);
    window.removeEventListener("popstate", onChange);
  };
}

function getUrlRole(): Role | null {
  const haystack = `${window.location.search}${window.location.hash}`;
  const match = haystack.match(/[?&#]role=([^&#]+)/);
  if (!match) return null;
  let candidate: string;
  try {
    candidate = decodeURIComponent(match[1]);
  } catch {
    return null;
  }
  return VALID_ROLES.has(candidate) ? (candidate as Role) : null;
}

const getServerUrlRole = (): Role | null => null;

// Small inline chevron for the select fields (no icon library on the homepage).
function SelectChevron() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-steel-400"
    >
      <path
        d="M2.5 4.5 6 8l3.5-3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const inputClass =
  "w-full bg-steel-900 border border-steel-700 rounded-lg px-4 py-3 text-steel-100 text-sm placeholder:text-steel-400 focus:outline-none focus:border-fire-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fire-400 focus-visible:ring-offset-2 focus-visible:ring-offset-steel-800 transition-colors";

const labelClass = "block text-sm font-body font-medium text-steel-200 mb-2";

export default function FounderForgeForm() {
  const urlRole = useSyncExternalStore(
    subscribeToUrl,
    getUrlRole,
    getServerUrlRole,
  );
  const [chosenRole, setChosenRole] = useState<Role | null>(null);
  const role: Role = chosenRole ?? urlRole ?? "founder";
  const [formData, setFormData] = useState<FormData>(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRole, setSubmittedRole] = useState<Role | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [errorField, setErrorField] = useState<JoinField | null>(null);

  const clearError = () => {
    setError(null);
    setErrorField(null);
  };

  const update = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    if (errorField === key) clearError();
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const changeRole = (next: Role) => {
    clearError();
    setChosenRole(next);
    setFormData((prev) => ({
      ...prev,
      stage: "",
      type: "",
      operatorType: "",
    }));
  };

  const showError = (message: string, field: JoinField | null) => {
    setError(message);
    setErrorField(field);
    if (field) document.getElementById(FIELD_IDS[field])?.focus();
  };

  const fieldA11y = (field: JoinField) =>
    errorField === field
      ? { "aria-invalid": true as const, "aria-describedby": ERROR_ID }
      : {};

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearError();

    const payload: Record<string, string> = {
      role,
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      company: formData.company.trim(),
    };
    if (role === "founder") payload.stage = formData.stage;
    if (role === "capital_provider") payload.type = formData.type;
    if (role === "operator") payload.operatorType = formData.operatorType;

    const check = validateJoin(payload);
    if (!check.ok) {
      showError(check.message, check.field === "role" ? null : check.field);
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/founder-forge", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        let message = GENERIC_ERROR;
        let field: JoinField | null = null;
        try {
          const data = (await res.json()) as {
            error?: string;
            field?: JoinField;
          };
          // The server only returns plain, visitor-facing messages.
          if (data?.error) message = data.error;
          if (data?.field && data.field in FIELD_IDS) field = data.field;
        } catch {
          // Body wasn't JSON; keep the generic message.
        }
        showError(message, field === "role" ? null : field);
        return;
      }

      setSubmittedRole(role);
      setFormData(initialData);
    } catch {
      showError(GENERIC_ERROR, null);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="join"
      aria-labelledby="join-heading"
      className="relative bg-steel-900 py-20 md:py-28"
    >
      {/* Old links point at #founder-forge; keep the anchor so they still land here. */}
      <span id="founder-forge" aria-hidden="true" className="absolute top-0" />
      {/* Join (plan section 10): the promise on the left, the form in a calm panel on the right. */}
      <div className="mx-auto grid max-w-content gap-10 px-4 md:px-6 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <h2
            id="join-heading"
            className="font-display text-h2 font-bold text-steel-100"
          >
            Get on the list.
          </h2>
          <p className="mt-6 max-w-md font-body text-body text-steel-300">
            FNDRYx opens through partner programs and events. Tell us who you
            are, and we&apos;ll be in touch when one fits.
          </p>
        </div>
        <div className="rounded-md border border-steel-700 bg-steel-800 p-6 md:p-10 lg:col-span-7">
          {submittedRole ? (
            <div aria-live="polite">
              <h3 className="font-display text-2xl font-bold text-steel-100">
                {SUCCESS[submittedRole].heading}
              </h3>
              <p className="mt-3 max-w-md font-body text-body text-steel-300">
                {SUCCESS[submittedRole].message}
              </p>
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div>
                  <label htmlFor="ff-role" className={labelClass}>
                    I am a
                  </label>
                  <div className="relative">
                    <select
                      id="ff-role"
                      value={role}
                      onChange={(e) => changeRole(e.target.value as Role)}
                      className={`${inputClass} appearance-none pr-10`}
                    >
                      {ROLE_OPTIONS.map((r) => (
                        <option key={r.value} value={r.value}>
                          {r.label}
                        </option>
                      ))}
                    </select>
                    <SelectChevron />
                  </div>
                </div>

                <div>
                  <label htmlFor="ff-name" className={labelClass}>
                    Full name
                  </label>
                  <input
                    id="ff-name"
                    type="text"
                    required
                    autoComplete="name"
                    value={formData.fullName}
                    onChange={(e) => update("fullName", e.target.value)}
                    placeholder="Jane Doe"
                    className={inputClass}
                    {...fieldA11y("fullName")}
                  />
                </div>

                <div>
                  <label htmlFor="ff-email" className={labelClass}>
                    Email
                  </label>
                  <input
                    id="ff-email"
                    type="email"
                    required
                    autoComplete="email"
                    value={formData.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="jane@company.com"
                    className={inputClass}
                    {...fieldA11y("email")}
                  />
                </div>

                <div>
                  <label htmlFor="ff-company" className={labelClass}>
                    Company or organization
                  </label>
                  <input
                    id="ff-company"
                    type="text"
                    required
                    autoComplete="organization"
                    value={formData.company}
                    onChange={(e) => update("company", e.target.value)}
                    placeholder="Acme, Inc."
                    className={inputClass}
                    {...fieldA11y("company")}
                  />
                </div>

                {role === "founder" && (
                  <div>
                    <label htmlFor="ff-stage" className={labelClass}>
                      Stage
                    </label>
                    <div className="relative">
                      <select
                        id="ff-stage"
                        required
                        value={formData.stage}
                        onChange={(e) => update("stage", e.target.value)}
                        className={`${inputClass} appearance-none pr-10`}
                        {...fieldA11y("stage")}
                      >
                        <option value="" disabled>
                          Select stage
                        </option>
                        {FOUNDER_STAGES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                      <SelectChevron />
                    </div>
                  </div>
                )}

                {role === "operator" && (
                  <div>
                    <label htmlFor="ff-operator-type" className={labelClass}>
                      Organization type
                    </label>
                    <div className="relative">
                      <select
                        id="ff-operator-type"
                        required
                        value={formData.operatorType}
                        onChange={(e) =>
                          update("operatorType", e.target.value)
                        }
                        className={`${inputClass} appearance-none pr-10`}
                        {...fieldA11y("operatorType")}
                      >
                        <option value="" disabled>
                          Select your organization type
                        </option>
                        {OPERATOR_TYPES.map((o) => (
                          <option key={o.value} value={o.value}>
                            {o.label}
                          </option>
                        ))}
                      </select>
                      <SelectChevron />
                    </div>
                  </div>
                )}

                {role === "capital_provider" && (
                  <div>
                    <label htmlFor="ff-type" className={labelClass}>
                      Capital type
                    </label>
                    <div className="relative">
                      <select
                        id="ff-type"
                        required
                        value={formData.type}
                        onChange={(e) => update("type", e.target.value)}
                        className={`${inputClass} appearance-none pr-10`}
                        {...fieldA11y("type")}
                      >
                        <option value="" disabled>
                          Select type
                        </option>
                        {CAPITAL_TYPES.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                      <SelectChevron />
                    </div>
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full py-4 text-base"
                  >
                    {isSubmitting ? "Sending..." : SUBMIT_LABEL[role]}
                  </button>
                  <p className="mt-4 text-center font-body text-footnote text-steel-400">
                    We use this to contact you about FNDRYx.{" "}
                    <Link
                      href="/privacy"
                      className="underline underline-offset-4 hover:text-steel-200 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fire-400 focus-visible:ring-offset-2 focus-visible:ring-offset-steel-800"
                    >
                      Privacy Policy
                    </Link>
                  </p>
                  {error && (
                    <p
                      id={ERROR_ID}
                      role="alert"
                      className="mt-3 text-center text-sm text-red-400"
                    >
                      {error}
                    </p>
                  )}
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
