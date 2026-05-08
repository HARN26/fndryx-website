"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ChevronDown, CheckCircle2 } from "lucide-react";

type Role = "founder" | "capital_provider" | "operator";

type FormData = {
  role: Role;
  fullName: string;
  email: string;
  company: string;
  stage: string;
  type: string;
  operatorType: string;
};

const ROLE_OPTIONS: { value: Role; label: string }[] = [
  { value: "founder", label: "Founder" },
  { value: "capital_provider", label: "Capital Provider" },
  { value: "operator", label: "Accelerator / Program Operator" },
];

const VALID_ROLES: ReadonlySet<string> = new Set<Role>([
  "founder",
  "capital_provider",
  "operator",
]);

const FOUNDER_STAGES = [
  "Pre-Revenue",
  "Revenue <$100K",
  "Revenue $100K–$1M",
  "Revenue $1M+",
];

const CAPITAL_TYPES = [
  "Angel Investor",
  "Venture Capital",
  "Family Office",
  "Lender",
  "Other",
];

const OPERATOR_TYPES: { value: string; label: string }[] = [
  { value: "accelerator", label: "Accelerator" },
  { value: "incubator", label: "Incubator" },
  { value: "venture_studio", label: "Venture Studio" },
  { value: "university_program", label: "University Program" },
  { value: "corporate_program", label: "Corporate Innovation Program" },
  { value: "other", label: "Other" },
];

const initialData: FormData = {
  role: "founder",
  fullName: "",
  email: "",
  company: "",
  stage: "",
  type: "",
  operatorType: "",
};

const inputClass =
  "w-full bg-steel-900 border border-steel-700 rounded-lg px-4 py-3 text-steel-100 text-sm placeholder:text-steel-500 focus:outline-none focus:border-fire-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fire-400 focus-visible:ring-offset-2 focus-visible:ring-offset-steel-800 transition-colors";

const labelClass = "block text-sm font-body font-medium text-steel-200 mb-2";

export default function FounderForgeForm() {
  const [formData, setFormData] = useState<FormData>(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedRole, setSubmittedRole] = useState<Role | null>(null);
  const [error, setError] = useState<string | null>(null);
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

  const update = <K extends keyof FormData>(key: K, value: FormData[K]) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  const changeRole = (role: Role) =>
    setFormData((prev) => ({
      ...prev,
      role,
      stage: "",
      type: "",
      operatorType: "",
    }));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const payload: Record<string, string> = {
        role: formData.role,
        fullName: formData.fullName,
        email: formData.email,
        company: formData.company,
      };
      if (formData.role === "founder") payload.stage = formData.stage;
      if (formData.role === "capital_provider") payload.type = formData.type;
      if (formData.role === "operator") payload.operatorType = formData.operatorType;

      const res = await fetch("/api/founder-forge", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        let message = `Request failed (${res.status})`;
        try {
          const data = (await res.json()) as { error?: string };
          if (data?.error) message = data.error;
        } catch {
          // body wasn't JSON; keep the default message
        }
        throw new Error(message);
      }

      setSubmittedRole(formData.role);
      setFormData(initialData);
      setIsSubmitted(true);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="founder-forge" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <p className="mb-4 text-center font-display font-semibold text-xs uppercase tracking-[0.2em] text-fire-400">
          Capital Readiness Assessment
        </p>

        <div className="mx-auto max-w-2xl rounded-2xl border border-steel-700 bg-steel-800 p-8 md:p-12">
          {isSubmitted ? (
            <div
              className="flex flex-col items-center text-center"
              aria-live="polite"
            >
              <CheckCircle2 size={48} className="text-fire-400" />
              <h2 className="mt-6 font-display font-extrabold text-3xl text-fire-400">
                {submittedRole === "founder" && "Access requested."}
                {submittedRole === "capital_provider" && "Inquiry received."}
                {submittedRole === "operator" && "Conversation started."}
                {!submittedRole && "Access Requested."}
              </h2>
              <p className="mt-4 max-w-md text-steel-300">
                {submittedRole === "founder" && (
                  <>
                    Check your inbox — we&apos;ve sent a confirmation email
                    with your assessment access. The{" "}
                    <span className="text-fire-400">
                      Capital Readiness Assessment
                    </span>{" "}
                    takes about fifteen minutes; complete it whenever you&apos;re
                    ready.
                  </>
                )}
                {submittedRole === "capital_provider" && (
                  <>
                    Check your inbox — we&apos;ve sent a confirmation. Our team
                    will reach out within 48 hours to discuss platform access
                    and the{" "}
                    <span className="text-fire-400">
                      Founding Cohort program
                    </span>
                    .
                  </>
                )}
                {submittedRole === "operator" && (
                  <>
                    Check your inbox — we&apos;ve sent a confirmation. Our team
                    will reach out within 48 hours to scope a{" "}
                    <span className="text-fire-400">pilot engagement</span>{" "}
                    around your cohort size and program length.
                  </>
                )}
                {!submittedRole && "Our team will reach out with next steps."}
              </p>
            </div>
          ) : (
            <>
              <h2 className="mb-6 font-display font-extrabold text-3xl md:text-4xl leading-tight">
                <span className="block text-steel-100">Request Access to the</span>
                <span className="block text-fire-400">Capital Readiness Assessment</span>
              </h2>
              <p className="mb-10 text-sm leading-relaxed text-steel-400">
                Founders receive a direct link to the assessment. Capital
                providers receive details on platform access and founder
                referrals.
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
                    value={formData.fullName}
                    onChange={(e) => update("fullName", e.target.value)}
                    placeholder="Jane Doe"
                    className={inputClass}
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
                    value={formData.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="jane@company.com"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="ff-company" className={labelClass}>
                    Company
                  </label>
                  <input
                    id="ff-company"
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => update("company", e.target.value)}
                    placeholder="Acme, Inc."
                    className={inputClass}
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

                {formData.role === "operator" && (
                  <div>
                    <label htmlFor="ff-operator-type" className={labelClass}>
                      Organization Type
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

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-lg bg-[linear-gradient(135deg,#ea580c_0%,#f97316_100%)] py-4 font-body font-semibold text-white shadow-[0_4px_14px_rgba(249,115,22,0.4)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(249,115,22,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fire-400 focus-visible:ring-offset-2 focus-visible:ring-offset-steel-800 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                  >
                    {isSubmitting ? "Sending..." : "Request Access"}
                  </button>
                  <p className="mt-4 text-center text-xs text-steel-400">
                    Free for founders. Our team will follow up within 48 hours.
                  </p>
                  {error && (
                    <p
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
