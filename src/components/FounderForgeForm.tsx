"use client";

import { useState, type FormEvent } from "react";
import { ChevronDown, CheckCircle2 } from "lucide-react";

type Role = "Founder" | "Capital Provider";

type FormData = {
  role: Role;
  fullName: string;
  email: string;
  company: string;
  stage: string;
  type: string;
};

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
  "Accelerator / Incubator",
  "Lender",
  "Other",
];

const initialData: FormData = {
  role: "Founder",
  fullName: "",
  email: "",
  company: "",
  stage: "",
  type: "",
};

const inputClass =
  "w-full bg-steel-900 border border-steel-700 rounded-lg px-4 py-3 text-steel-100 text-sm placeholder:text-steel-500 focus:outline-none focus:border-fire-400 transition-colors";

const labelClass = "block text-sm font-body font-medium text-steel-200 mb-2";

export default function FounderForgeForm() {
  const [formData, setFormData] = useState<FormData>(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = <K extends keyof FormData>(key: K, value: FormData[K]) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

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
      if (formData.role === "Founder") payload.stage = formData.stage;
      if (formData.role === "Capital Provider") payload.type = formData.type;

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
          Founder Forge
        </p>

        <div className="mx-auto max-w-2xl rounded-2xl border border-steel-700 bg-steel-800 p-8 md:p-12">
          {isSubmitted ? (
            <div className="flex flex-col items-center text-center">
              <CheckCircle2 size={48} className="text-fire-400" />
              <h2 className="mt-6 font-display font-extrabold text-3xl text-fire-400">
                Access Requested.
              </h2>
              <p className="mt-4 text-steel-300">
                Our team will reach out with next steps.
              </p>
            </div>
          ) : (
            <>
              <h2 className="mb-6 font-display font-extrabold text-3xl md:text-4xl leading-tight">
                <span className="block text-steel-100">Request Access to</span>
                <span className="block text-fire-400">Founder Forge</span>
              </h2>
              <p className="mb-10 text-sm leading-relaxed text-steel-400">
                Founders receive a direct link to the assessment. Capital
                providers receive information on joining the capital ecosystem
                and referring founders.
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
                      onChange={(e) => update("role", e.target.value as Role)}
                      className={`${inputClass} appearance-none pr-10`}
                    >
                      <option value="Founder">Founder</option>
                      <option value="Capital Provider">Capital Provider</option>
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

                {formData.role === "Founder" && (
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

                {formData.role === "Capital Provider" && (
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

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-lg bg-[linear-gradient(135deg,#ea580c_0%,#f97316_100%)] py-4 font-body font-semibold text-white shadow-[0_4px_14px_rgba(249,115,22,0.4)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(249,115,22,0.5)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                  >
                    {isSubmitting ? "Sending..." : "Request Access"}
                  </button>
                  <p className="mt-4 text-center text-xs text-steel-500">
                    Free for founders. Our team will follow up within 48 hours.
                  </p>
                  {error && (
                    <p className="mt-3 text-center text-sm text-red-400">
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
