"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useLanguage, languages, type Language } from "@/context/LanguageContext";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/file-complaint", label: "File Complaint" },
  { href: "/track", label: "Track" },
  { href: "/analytics", label: "Analytics" },
  { href: "/admin", label: "Admin" },
  { href: "/whatsapp", label: "WhatsApp" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { language, setLanguage } = useLanguage();

  return (
    <nav className="sticky top-0 z-50 border-b border-stone-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🇮🇳</span>
          <span className="font-semibold text-stone-800">AI Grievance Portal</span>
          <span className="rounded bg-primary/10 px-1.5 py-0.5 text-xs font-medium text-primary">
            Beta
          </span>
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                pathname === href
                  ? "bg-primary/10 text-primary"
                  : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
              }`}
            >
              {label}
            </Link>
          ))}
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
            className="rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
            aria-label="Select language"
          >
            {Object.entries(languages).map(([code, name]) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>
          <Link
            href="/login"
            className="ml-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark"
          >
            Login
          </Link>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
        >
          <span className={`block h-0.5 w-6 rounded bg-stone-700 transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`block h-0.5 w-6 rounded bg-stone-700 transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-6 rounded bg-stone-700 transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      {open && (
        <div className="border-t border-stone-200 bg-white px-4 py-3 md:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`rounded-lg px-3 py-2 text-sm font-medium ${
                  pathname === href ? "bg-primary/10 text-primary" : "text-stone-600"
                }`}
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            ))}
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="mt-2 rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm font-medium text-stone-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
              aria-label="Select language"
            >
              {Object.entries(languages).map(([code, name]) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </select>
            <Link href="/login" className="mt-2 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-white" onClick={() => setOpen(false)}>
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
