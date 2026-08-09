import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow ? (
        <p className="text-sm font-bold uppercase tracking-wide text-brand-red">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-2 font-heading text-3xl font-extrabold text-brand-black sm:text-4xl">
        {title}
      </h2>
      {intro ? <p className="mt-3 text-base text-muted">{intro}</p> : null}
    </div>
  );
}
