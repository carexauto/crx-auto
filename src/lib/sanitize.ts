/**
 * Small helpers for safely rendering customer-provided content inside email
 * HTML and for normalizing input. No third-party dependency required.
 */

/** Escape a string for safe insertion into HTML text/attribute contexts. */
export function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Remove control characters except common whitespace (tab, newline, CR). */
export function stripControlChars(input: string): string {
  // eslint-disable-next-line no-control-regex
  return input.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "");
}

/** Trim and remove control characters. */
export function cleanText(input: string): string {
  return stripControlChars(input).trim();
}

/**
 * Normalize a phone number for display in the email while keeping it readable.
 * Tolerates US and international formats; does not enforce a single shape.
 */
export function normalizePhoneForDisplay(input: string): string {
  const cleaned = cleanText(input);
  // Collapse repeated whitespace but preserve punctuation like +, (), -.
  return cleaned.replace(/\s+/g, " ");
}
