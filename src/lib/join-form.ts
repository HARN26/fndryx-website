// Shared by the join form (src/components/FounderForgeForm.tsx) and its API
// route (src/app/api/founder-forge/route.ts) so the page and the server check
// the same fields against the same lists.

export type Role = "founder" | "operator" | "capital_provider";

// Role values are stable: ?role= links and Formspree history depend on them.
// Only the labels changed.
export const ROLE_OPTIONS: { value: Role; label: string }[] = [
  { value: "founder", label: "Founder" },
  { value: "operator", label: "Program, university or event organizer" },
  { value: "capital_provider", label: "Investor or capital partner" },
];

export const VALID_ROLES: ReadonlySet<string> = new Set<Role>(
  ROLE_OPTIONS.map((r) => r.value),
);

export const FOUNDER_STAGES = [
  "Pre-Revenue",
  "Revenue <$100K",
  "Revenue $100K–$1M",
  "Revenue $1M+",
];

export const CAPITAL_TYPES = [
  "Angel Investor",
  "Venture Capital",
  "Family Office",
  "Lender",
  "Other",
];

export const OPERATOR_TYPES: { value: string; label: string }[] = [
  { value: "accelerator", label: "Accelerator" },
  { value: "incubator", label: "Incubator" },
  { value: "venture_studio", label: "Venture Studio" },
  { value: "university_program", label: "University Program" },
  { value: "corporate_program", label: "Corporate Innovation Program" },
  { value: "event_organizer", label: "Event organizer" },
  { value: "economic_development", label: "Economic development organization" },
  { value: "other", label: "Other" },
];

export const GENERIC_ERROR =
  "Something went wrong. Please try again, or email kevin@fndryx.io.";

export type JoinFields = {
  role?: unknown;
  fullName?: unknown;
  email?: unknown;
  company?: unknown;
  stage?: unknown;
  type?: unknown;
  operatorType?: unknown;
};

export type JoinField =
  | "role"
  | "fullName"
  | "email"
  | "company"
  | "stage"
  | "type"
  | "operatorType";

export type JoinValidation =
  | { ok: true }
  | { ok: false; field: JoinField; message: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const filled = (v: unknown): v is string =>
  typeof v === "string" && v.trim().length > 0;

// Returns the first problem, in the order the fields appear on the page.
// Messages are shown to visitors, so they stay plain.
export function validateJoin(data: JoinFields): JoinValidation {
  if (!filled(data.role) || !VALID_ROLES.has(data.role)) {
    return { ok: false, field: "role", message: GENERIC_ERROR };
  }
  if (!filled(data.fullName)) {
    return { ok: false, field: "fullName", message: "Please enter your full name." };
  }
  if (!filled(data.email) || !EMAIL_RE.test(data.email.trim())) {
    return {
      ok: false,
      field: "email",
      message: "Please enter a valid email address.",
    };
  }
  if (!filled(data.company)) {
    return {
      ok: false,
      field: "company",
      message: "Please enter your company or organization.",
    };
  }
  if (data.role === "founder") {
    if (!filled(data.stage) || !FOUNDER_STAGES.includes(data.stage)) {
      return { ok: false, field: "stage", message: "Please choose your stage." };
    }
  }
  if (data.role === "operator") {
    if (
      !filled(data.operatorType) ||
      !OPERATOR_TYPES.some((o) => o.value === data.operatorType)
    ) {
      return {
        ok: false,
        field: "operatorType",
        message: "Please choose your organization type.",
      };
    }
  }
  if (data.role === "capital_provider") {
    if (!filled(data.type) || !CAPITAL_TYPES.includes(data.type)) {
      return {
        ok: false,
        field: "type",
        message: "Please choose your capital type.",
      };
    }
  }
  return { ok: true };
}
