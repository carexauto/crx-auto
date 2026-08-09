/**
 * Generate a short, non-sensitive request reference ID such as "CX-3F9K2Q".
 * Used only for customer-facing confirmation and email correlation. Contains
 * no personal data.
 */
export function createReferenceId(): string {
  const alphabet = "ABCDEFGHJKMNPQRSTUVWXYZ23456789"; // no easily confused chars
  let out = "";
  for (let i = 0; i < 6; i += 1) {
    out += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return `CX-${out}`;
}
