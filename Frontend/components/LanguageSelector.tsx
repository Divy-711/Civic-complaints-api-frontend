"use client";

import { useLanguage, languages, type Language } from "@/context/LanguageContext";

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="relative flex items-center gap-2 rounded-full border border-teal-400/30 bg-slate-800/80 backdrop-blur-sm px-4 py-2 shadow-lg">
      <span className="text-sm text-teal-300">🌐</span>
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as Language)}
        className="bg-transparent text-sm font-medium text-white outline-none cursor-pointer appearance-none pr-6"
        aria-label="Select language"
      >
        {Object.entries(languages).map(([code, name]) => (
          <option key={code} value={code} className="bg-slate-800 text-white">
            {name}
          </option>
        ))}
      </select>
      <svg
        className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-teal-300 pointer-events-none"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  );
}
