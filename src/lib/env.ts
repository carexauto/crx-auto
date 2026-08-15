/**
 * Server-only environment access. Never import this into client components.
 * Secrets must not be exposed through NEXT_PUBLIC_* variables.
 */

import "server-only";

function optional(name: string): string | undefined {
  const value = process.env[name];
  return value && value.trim() !== "" ? value.trim() : undefined;
}

export const serverEnv = {
  // Web3Forms (default, no DNS required). Access key is kept server-side.
  web3formsKey: optional("WEB3FORMS_ACCESS_KEY"),
  // Resend (optional upgrade for domain-verified sending).
  resendApiKey: optional("RESEND_API_KEY"),
  quoteToEmail: optional("QUOTE_TO_EMAIL") ?? "info@carextransport.com",
  quoteFromEmail:
    optional("QUOTE_FROM_EMAIL") ??
    "Carex Auto Quotes <quotes@carextransport.com>",
  turnstileSecret: optional("TURNSTILE_SECRET_KEY"),
};

/**
 * Which delivery provider to use. Web3Forms takes precedence when configured
 * because it needs no DNS; Resend is used if only it is set.
 */
export const emailProvider: "web3forms" | "resend" | "none" =
  serverEnv.web3formsKey ? "web3forms" : serverEnv.resendApiKey ? "resend" : "none";

/** True when some email delivery is configured. */
export const emailConfigured = emailProvider !== "none";
