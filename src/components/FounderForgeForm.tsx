"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { ChevronDown, CheckCircle2 } from "lucide-react";
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
  role: Role;
  fullName: string;
  email: string;
  company: string;
  stage: string;
  type: string;
  operatorType: string;
};

const initialData: FormData = {
  role: "founder",
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
    message: "We’ll email you when a program or event fits your company.",
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

const inputClass =
  "w-full bg-steel-900 border border-steel-700 rounded-lg px-4 py-3 text-steel-100 text-sm placeholder:text-steel-500 focus:outline-none focus:border-fire-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fire-400 focus-visible:ring-offset-2 focus-visible:ring-offset-steel-800 transition-colors";

const labelClass = "block text-sm font-body font-medium text-steel-200 mb-2";

export default function FounderForgeForm() {
  const [formData, setFormData] = useState<FormData>(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRole, setSubmittedRole] = useState<Role | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [errorField, setErrorField] = useState<JoinField | null>(null);
  const didApplyUrlRole = useRef(false);

  useEffect(() => {
    if (didApplyUrlRole.current) return;
    didApplyUrlRole.current = true;

    if (typeof window === "undefined") return;
    const haystack = `${window.location.search}${window.location.hash}`;
    const match = haystack.match(/[?&#]role=([^&#]+)/);
    if (!match) return;
    const candidate = decodeURIComponent(match[1]);
    if (!VALID_ROLES.has(candidate)) return;
    setFormData((prev) => ({ ...prev, role: candidate as Role }));
  }, []);

  const clearError = () => {
    setError(null);
    setErrorField(null);
  };

  const update = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    if (errorField === key) clearError();
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const changeRole = (role: Role) => {
    clearError();
    setFormData((prev) => ({
      ...prev,
      role,
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
      role: formData.role,
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      company: formData.company.trim(),
    };
    if (formData.role === "founder") payload.stage = formData.stage;
    if (formData.role === "capital_provider") payload.type = formData.type;
    if (formData.role === "operator") payload.operatorType = formData.operatorType;

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

      setSubmittedRole(formData.role);
      setFormData(initialData);
    } catch {
      showError(GENERIC_ERROR, null);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="join" className="relative py-24 md:py-32">
      {/* Old links point at #founder-forge; keep the anchor so they still land here. */}
      <span id="founder-forge" aria-hidden="true" className="absolute top-0" />
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl rounded-2xl border border-steel-700 bg-steel-800 p-8 md:p-12">
          {submittedRole ? (
            <div
              className="flex flex-col items-center text-center"
              aria-live="polite"
            >
              <CheckCircle2 size={48} className="text-fire-400" />
              <h2 className="mt-6 font-display font-extrabold text-3xl text-fire-400">
                {SUCCESS[submittedRole].heading}
              </h2>
              <p className="mt-4 max-w-md text-steel-300">
                {SUCCESS[submittedRole].message}
              </p>
            </div>
          ) : (
            <>
              <h2 className="mb-6 font-display font-extrabold text-3xl md:text-4xl leading-tight text-steel-100">
                Get on the list.
              </h2>
              <p className="mb-10 text-sm leading-relaxed text-steel-400">
                FNDRYx opens through partner programs and events. Tell us who
                you are, and we&apos;ll be in touch when one fits.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div>
                  <label htmlFor="ff-role" className={labelClass}>
                    I am a
                  </label>
                  <div className="relative">
                    <select
                      id="ff-role"
                      value={formData.role}
                      onChange={(e) => changeRole(e.target.value as Role)}
                      className={`${inputClass} appearance-none pr-10`}
                    >
                      {ROLE_OPTIONS.map((r) => (
                        <option key={r.value} value={r.value}>
                          {r.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={18}
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-steel-500"
                    />
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

                {formData.role === "founder" && (
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
                      <ChevronDown
                        size={18}
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-steel-500"
                      />
                    </div>
                  </div>
                )}

                {formData.role === "operator" && (
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
                      <ChevronDown
                        size={18}
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-steel-500"
                      />
                    </div>
                  </div>
                )}

                {formData.role === "capital_provider" && (
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
                      <ChevronDown
                        size={18}
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-steel-500"
                      />
                    </div>
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-lg bg-[linear-gradient(135deg,#ea580c_0%,#f97316_100%)] py-4 font-body font-semibold text-white shadow-[0_4px_14px_rgba(249,115,22,0.4)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(249,115,22,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fire-400 focus-visible:ring-offset-2 focus-visible:ring-offset-steel-800 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                  >
                    {isSubmitting ? "Sending..." : SUBMIT_LABEL[formData.role]}
                  </button>
                  <p className="mt-4 text-center text-xs text-steel-400">
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
