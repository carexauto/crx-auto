import { AlertCircle } from "lucide-react";
import type { ReactNode } from "react";

export const inputClass =
  "w-full min-h-[44px] rounded-lg border border-border bg-white px-3 py-2 text-brand-black " +
  "outline-none transition focus:border-brand-black focus:ring-2 focus:ring-brand-yellow " +
  "aria-[invalid=true]:border-error aria-[invalid=true]:ring-error/30 placeholder:text-muted";

export function Label({
  htmlFor,
  children,
  hint,
}: {
  htmlFor: string;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-semibold text-brand-black">
      {children}
      {hint ? <span className="ml-1 font-normal text-muted">{hint}</span> : null}
    </label>
  );
}

export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p
      id={id}
      className="mt-1.5 flex items-start gap-1.5 text-sm font-medium text-error"
    >
      <AlertCircle aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
      <span>{message}</span>
    </p>
  );
}

export function HelpText({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="mt-1 text-xs text-muted">
      {children}
    </p>
  );
}
