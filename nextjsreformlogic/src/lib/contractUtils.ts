import type { ContractSection } from "./contracts";

/** HTML-escape a string to prevent XSS in contract text */
export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Interpolate {{variable}} placeholders in contract sections.
 * All values are HTML-escaped before insertion.
 * Missing variables are replaced with "[TO BE DETERMINED]".
 */
export function interpolateContract(
  sections: ContractSection[],
  variables: Record<string, string>,
): ContractSection[] {
  return sections.map((section) => ({
    title: section.title,
    content: section.content.replace(/\{\{(\w+)\}\}/g, (_match, key) => {
      const value = variables[key];
      if (value) return escapeHtml(value);
      return `<span style="color: #f59e0b; font-style: italic;">[TO BE DETERMINED]</span>`;
    }),
  }));
}

/**
 * Render interpolated contract sections to a single HTML string.
 */
export function renderContractHtml(
  title: string,
  version: string,
  sections: ContractSection[],
): string {
  const sectionsHtml = sections
    .map(
      (s) =>
        `<div style="margin-bottom: 24px;"><h3 style="color: #e2e8f0; font-size: 16px; margin-bottom: 8px;">${s.title}</h3><div style="color: #94a3b8; line-height: 1.7; font-size: 14px;">${s.content}</div></div>`,
    )
    .join("");

  return `<div style="font-family: 'Georgia', serif; max-width: 720px; margin: 0 auto; padding: 32px;"><h1 style="color: #e2e8f0; font-size: 24px; border-bottom: 2px solid #334155; padding-bottom: 12px; margin-bottom: 24px;">${title}</h1><p style="color: #64748b; font-size: 12px; margin-bottom: 32px;">Version ${version}</p>${sectionsHtml}</div>`;
}

/**
 * Generate a unique signature ID.
 * Format: SIG-YYYYMMDD-XXXXX (5 random alphanumeric chars)
 */
export function generateSignatureId(): string {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let random = "";
  for (let i = 0; i < 5; i++) {
    random += chars[Math.floor(Math.random() * chars.length)];
  }
  return `SIG-${date}-${random}`;
}

/**
 * Parse contract-related query parameters from URL search params.
 */
export function parseContractParams(
  searchParams: URLSearchParams,
): Record<string, string> {
  const params: Record<string, string> = {};
  const mapping: Record<string, string> = {
    client: "clientName",
    email: "clientEmail",
    company: "clientCompany",
    project: "projectName",
    description: "projectDescription",
    rate: "rate",
    start: "startDate",
    end: "endDate",
    fee: "fee",
    total: "totalFee",
    payment: "paymentSchedule",
    task: "taskDescription",
    deliverable: "deliverableSpec",
    timeline: "timeline",
    date: "sessionDate",
    topic: "sessionTopic",
  };

  for (const [shortKey, fullKey] of Object.entries(mapping)) {
    const value = searchParams.get(shortKey);
    if (value) params[fullKey] = value;
  }

  if (!params.effectiveDate) {
    params.effectiveDate = new Date().toISOString().slice(0, 10);
  }

  return params;
}
