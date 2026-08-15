import Image from "next/image";

/**
 * Brand lockup: the company-owned "X" mark (public/brand/carex-auto-logo.png)
 * next to the two-line wordmark. The "mark" variant shows the icon only (used
 * on small/mobile surfaces) with an accessible name.
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

  if (variant === "mark") {
    return (
      <Image
        src="/brand/carex-auto-logo.png"
        alt="Carex Auto Transport"
        width={48}
        height={48}
        className="h-11 w-11 object-contain"
      />
    );
  }

  return (
    <span className="inline-flex items-center gap-2.5">
      <Image
        src="/brand/carex-auto-logo.png"
        alt=""
        width={56}
        height={56}
        className="h-12 w-12 object-contain"
      />
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
    </span>
  );
}
