"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, Phone, X } from "lucide-react";
import { business, nav } from "@/content/site";
import { Logo } from "./Logo";

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const solid = scrolled || menuOpen || !isHome;
  // On sub-pages, anchor links must first navigate to the home route.
  const to = (hash: string) => (isHome ? hash : `/${hash}`);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        solid
          ? "bg-brand-black/95 shadow-md backdrop-blur"
          : "bg-transparent",
      ].join(" ")}
    >
      <div className="container-px mx-auto flex h-16 max-w-content items-center justify-between">
        <a href={to("#top")} className="flex items-center rounded focus-visible:ring-2 focus-visible:ring-brand-yellow">
          <span className="sm:hidden">
            <Logo variant="mark" onDark />
          </span>
          <span className="hidden sm:inline-flex">
            <Logo variant="full" onDark />
          </span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={to(item.href)}
              className="text-sm font-semibold text-white/90 transition hover:text-brand-yellow"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={business.phones.primary.href}
            className="hidden items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-white transition hover:text-brand-yellow sm:inline-flex"
          >
            <Phone aria-hidden className="h-4 w-4" />
            {business.phones.primary.display}
          </a>
          <a
            href={business.phones.primary.href}
            aria-label={`Call Carex Auto at ${business.phones.primary.display}`}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-white transition hover:text-brand-yellow sm:hidden"
          >
            <Phone aria-hidden className="h-5 w-5" />
          </a>

          <a
            href={to("#quote")}
            className="hidden rounded-lg bg-brand-yellow px-4 py-2 text-sm font-bold text-brand-black transition hover:brightness-95 focus-visible:ring-2 focus-visible:ring-white lg:inline-flex"
          >
            Get a Quote
          </a>

          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((o) => !o)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-white transition hover:text-brand-yellow lg:hidden"
          >
            {menuOpen ? <X aria-hidden className="h-6 w-6" /> : <Menu aria-hidden className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div id="mobile-menu" className="border-t border-white/10 bg-brand-black lg:hidden">
          <nav aria-label="Mobile" className="container-px mx-auto max-w-content py-3">
            <ul className="flex flex-col">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={to(item.href)}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-lg px-2 py-3 text-base font-semibold text-white transition hover:bg-white/5 hover:text-brand-yellow"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="mt-2">
                <a
                  href={to("#quote")}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-lg bg-brand-yellow px-4 py-3 text-center text-base font-bold text-brand-black"
                >
                  Get a Quote
                </a>
              </li>
            </ul>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
