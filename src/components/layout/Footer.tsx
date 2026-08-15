import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { business, nav } from "@/content/site";
import { Logo } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-brand-black text-white">
      <div className="container-px mx-auto max-w-content py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <Logo variant="full" onDark />
            <p className="mt-3 max-w-xs text-sm text-white/70">
              Nationwide and international vehicle transportation and dispatch
              coordination.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-wide text-brand-yellow">
              Contact
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-white/80">
              <li className="flex items-start gap-2">
                <MapPin aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-white/50" />
                <span className="break-words">{business.address.full}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail aria-hidden className="h-4 w-4 shrink-0 text-white/50" />
                <a href={`mailto:${business.email}`} className="break-all hover:text-brand-yellow">
                  {business.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone aria-hidden className="h-4 w-4 shrink-0 text-white/50" />
                <a href={business.phones.primary.href} className="hover:text-brand-yellow">
                  {business.phones.primary.display}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone aria-hidden className="h-4 w-4 shrink-0 text-white/50" />
                <a href={business.phones.secondary.href} className="hover:text-brand-yellow">
                  {business.phones.secondary.display}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-wide text-brand-yellow">
              Explore
            </h2>
            <ul className="mt-3 grid grid-cols-2 gap-2 text-sm text-white/80">
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="hover:text-brand-yellow">
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#quote" className="hover:text-brand-yellow">
                  Get a Quote
                </a>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-brand-yellow">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-brand-yellow">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-xs text-white/50">
          <p>{business.legalNote}</p>
          <p className="mt-1">
            &copy; {year} {business.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
