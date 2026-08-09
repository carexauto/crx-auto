import { Truck } from "lucide-react";

/**
 * Text-based brand wordmark used as a dependable fallback so the site renders
 * without binary assets. Once the licensed logo PNG is placed at
 * /public/brand/carex-auto-logo.png, swap this for a next/image logo.
 * See ASSET-SOURCES.md.
 */
export function Logo({
  variant = "full",
  onDark = false,
}: {
  variant?: "full" | "mark";
  onDark?: boolean;
}) {
  const wordColor = onDark ? "text-white" : "text-brand-black";
  return (
    <span className="inline-flex items-center gap-2" aria-hidden={false}>
      <span className="flex h-8 w-8 items-center justify-center rounded-md bg-brand-red text-white ring-2 ring-brand-yellow">
        <Truck className="h-4 w-4" aria-hidden />
      </span>
      {variant === "full" ? (
        <span className={`font-heading text-xl font-extrabold uppercase tracking-tight ${wordColor}`}>
          Carex<span className="text-brand-red"> Auto</span>
        </span>
      ) : (
        <span className="sr-only">Carex Auto</span>
      )}
    </span>
  );
}
