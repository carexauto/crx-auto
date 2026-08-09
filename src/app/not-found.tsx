import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="grid min-h-[70vh] place-items-center bg-white px-6 pt-24">
      <div className="text-center">
        <p className="font-heading text-6xl font-extrabold text-brand-black">404</p>
        <h1 className="mt-3 font-heading text-2xl font-bold text-brand-black">
          Page not found
        </h1>
        <p className="mt-2 text-muted">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex min-h-[44px] items-center rounded-lg bg-brand-yellow px-6 py-2.5 font-bold text-brand-black transition hover:brightness-95"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
