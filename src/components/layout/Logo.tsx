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
  const taglineColor = onDark ? "text-white/65" : "text-muted";
  return (
    <span className="inline-flex items-center gap-2.5" aria-hidden={false}>
      <span className="flex h-9 w-9 items-center justify-center rounded-md bg-brand-red text-white ring-2 ring-brand-yellow">
        <Truck className="h-4 w-4" aria-hidden />
      </span>
      {variant === "full" ? (
        <span className="flex flex-col leading-none">
          <span
            className={`font-heading text-lg font-extrabold uppercase tracking-tight ${wordColor}`}
          >
            Carex <span className="font-bold text-brand-red">Auto Transport</span>
          </span>
          <span
            className={`mt-1 text-[10px] font-semibold uppercase tracking-[0.14em] ${taglineColor}`}
          >
            Licensed U.S. Auto Dealer
          </span>
        </span>
      ) : (
        <span className="sr-only">Carex Auto Transport — Licensed U.S. Auto Dealer</span>
      )}
    </span>
  );
}
