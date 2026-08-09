import { Check } from "lucide-react";

const steps = [
  { n: 1, label: "Route" },
  { n: 2, label: "Vehicle" },
  { n: 3, label: "Contact" },
] as const;

export function ProgressIndicator({ current }: { current: 1 | 2 | 3 }) {
  return (
    <ol className="flex items-center gap-2" aria-label="Quote request progress">
      {steps.map((s, i) => {
        const state =
          s.n < current ? "complete" : s.n === current ? "current" : "upcoming";
        return (
          <li
            key={s.n}
            className="flex flex-1 items-center gap-2"
            aria-current={state === "current" ? "step" : undefined}
          >
            <span
              className={[
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold transition",
                state === "complete"
                  ? "bg-success text-white"
                  : state === "current"
                    ? "bg-brand-yellow text-brand-black ring-2 ring-brand-black"
                    : "bg-white text-muted ring-1 ring-border",
              ].join(" ")}
            >
              {state === "complete" ? (
                <>
                  <Check aria-hidden className="h-4 w-4" />
                  <span className="sr-only">Completed: </span>
                </>
              ) : (
                s.n
              )}
            </span>
            <span
              className={[
                "text-xs font-semibold sm:text-sm",
                state === "upcoming" ? "text-muted" : "text-brand-black",
              ].join(" ")}
            >
              {s.label}
            </span>
            {i < steps.length - 1 ? (
              <span
                aria-hidden
                className={[
                  "ml-1 hidden h-0.5 flex-1 rounded sm:block",
                  s.n < current ? "bg-success" : "bg-border",
                ].join(" ")}
              />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
