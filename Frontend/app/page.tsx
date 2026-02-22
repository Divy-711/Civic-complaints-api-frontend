import Link from "next/link";
import { departments } from "@/lib/departments";
import type { Metadata } from "next";
import LanguageSelector from "@/components/LanguageSelector";

export const metadata: Metadata = {
  title: "AI Grievance Portal - Home",
  description: "Report issues in your language. Get them resolved faster.",
};

const departmentStats: Record<string, { pending: string; resolved: string; avgTime: string }> = {
  roads: { pending: "234", resolved: "1890", avgTime: "48h" },
  water: { pending: "156", resolved: "2100", avgTime: "36h" },
  electricity: { pending: "89", resolved: "3450", avgTime: "24h" },
  environment: { pending: "112", resolved: "1560", avgTime: "72h" },
};

const departmentDescriptions: Record<string, string> = {
  roads: "Report potholes, damaged roads, missing signage, street lights",
  water: "Water leakage, sewage issues, drainage problems, contaminated water",
  electricity: "Power outages, transformer issues, faulty meters, voltage problems",
  environment: "Garbage dumping, air pollution, tree cutting, noise pollution",
};

const deptStyles: Record<string, { iconBg: string; borderHover: string }> = {
  roads: { iconBg: "bg-sky-500/15 text-sky-700", borderHover: "hover:border-sky-200" },
  water: { iconBg: "bg-teal-500/15 text-teal-700", borderHover: "hover:border-teal-200" },
  electricity: { iconBg: "bg-amber-500/15 text-amber-700", borderHover: "hover:border-amber-200" },
  environment: { iconBg: "bg-emerald-500/15 text-emerald-700", borderHover: "hover:border-emerald-200" },
};

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-900 px-4 pb-24 pt-16 sm:pb-32 sm:pt-24">
        {/* Language Selector - Floating in top right */}
        <div className="absolute top-4 right-4 z-10 sm:top-6 sm:right-6">
          <LanguageSelector />
        </div>

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(20,184,166,0.25),transparent)]" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.04\'/%3E%3C/svg%3E')] opacity-90" />
        <div className="relative mx-auto max-w-5xl text-center">
          <p className="mb-4 inline-block rounded-full border border-teal-400/30 bg-teal-500/10 px-4 py-1 text-sm font-medium text-teal-300">
            AI for Bharat · Grievance Redressal
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="block text-teal-400">AI-Powered</span>
            <span className="mt-1 block">Grievance Redressal</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-slate-300">
            Report issues in your language. Get them resolved faster.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/file-complaint"
              className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3.5 text-base font-semibold text-slate-900 shadow-lg shadow-amber-500/25 transition hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              File a Complaint
            </Link>
            <Link
              href="/track"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-slate-500/50 bg-slate-800/50 px-6 py-3.5 text-base font-semibold text-white backdrop-blur transition hover:border-slate-400 hover:bg-slate-700/50 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              Track Status
            </Link>
          </div>
          <div className="mt-14 flex flex-wrap justify-center gap-6 sm:gap-10">
            <div className="rounded-2xl border border-slate-600/50 bg-slate-800/50 px-6 py-4 backdrop-blur">
              <span className="block text-2xl font-bold text-white sm:text-3xl">8,500+</span>
              <span className="text-sm text-slate-400">Complaints Resolved</span>
            </div>
            <div className="rounded-2xl border border-slate-600/50 bg-slate-800/50 px-6 py-4 backdrop-blur">
              <span className="block text-2xl font-bold text-white sm:text-3xl">4</span>
              <span className="text-sm text-slate-400">Departments</span>
            </div>
            <div className="rounded-2xl border border-slate-600/50 bg-slate-800/50 px-6 py-4 backdrop-blur">
              <span className="block text-2xl font-bold text-white sm:text-3xl">9+</span>
              <span className="text-sm text-slate-400">Languages</span>
            </div>
          </div>
        </div>
      </section>

      {/* Select Department */}
      <section className="relative -mt-12 px-4 pb-20 sm:-mt-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-bold text-stone-800 sm:text-3xl">
              Select Department
            </h2>
            <p className="mt-2 text-stone-600">
              Choose the department your complaint relates to
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {(Object.keys(departments) as Array<keyof typeof departments>).map((id) => {
              const dept = departments[id];
              const stats = departmentStats[id] || { pending: "—", resolved: "—", avgTime: "—" };
              const desc = departmentDescriptions[id] || "";
              const style = deptStyles[id] || deptStyles.roads;
              return (
                <Link
                  key={id}
                  href={`/file-complaint?dept=${id}`}
                  className={`group flex flex-col rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition-all duration-200 ${style.borderHover} hover:shadow-lg hover:-translate-y-0.5`}
                >
                  <div className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl text-2xl ${style.iconBg}`}>
                    {dept.icon}
                  </div>
                  <h3 className="font-semibold text-stone-800">{dept.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-stone-600">{desc}</p>
                  <div className="mt-5 flex gap-4 border-t border-stone-100 pt-4">
                    <div className="flex-1 text-center">
                      <span className="block text-lg font-semibold text-stone-800">{stats.pending}</span>
                      <span className="text-xs text-stone-500">Pending</span>
                    </div>
                    <div className="flex-1 text-center">
                      <span className="block text-lg font-semibold text-stone-800">{stats.resolved}</span>
                      <span className="text-xs text-stone-500">Resolved</span>
                    </div>
                    <div className="flex-1 text-center">
                      <span className="block text-lg font-semibold text-stone-800">{stats.avgTime}</span>
                      <span className="text-xs text-stone-500">Avg Time</span>
                    </div>
                  </div>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-teal-600 group-hover:gap-2 transition-all">
                    Report Issue
                    <span aria-hidden>→</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-t border-stone-200 bg-stone-50/80 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-bold text-stone-800 sm:text-3xl">
              How It Works
            </h2>
            <p className="mt-2 text-stone-600">
              Four simple steps from report to resolution
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { step: 1, icon: "🎤", title: "Report Issue", desc: "Speak or upload photos in your language" },
              { step: 2, icon: "🤖", title: "AI Analysis", desc: "Auto-classification & urgency detection" },
              { step: 3, icon: "📋", title: "Department Routing", desc: "Forwarded to the correct department" },
              { step: 4, icon: "✅", title: "Resolution", desc: "Track status in real-time" },
            ].map(({ step, icon, title, desc }) => (
              <div
                key={step}
                className="relative flex flex-col items-center rounded-2xl border border-stone-200 bg-white p-6 text-center shadow-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-600 text-lg font-bold text-white shadow-md shadow-teal-600/20">
                  {step}
                </div>
                <span className="mt-4 text-3xl" role="img" aria-hidden>{icon}</span>
                <h3 className="mt-3 font-semibold text-stone-800">{title}</h3>
                <p className="mt-1 text-sm text-stone-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency CTA */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <div className="overflow-hidden rounded-3xl border border-red-200 bg-gradient-to-br from-red-50 to-orange-50 p-8 text-center shadow-inner sm:p-10">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-2xl">
              ⚠️
            </div>
            <h2 className="mt-4 text-xl font-bold text-stone-800 sm:text-2xl">
              Emergency Issues?
            </h2>
            <p className="mx-auto mt-2 max-w-md text-stone-600">
              Critical issues like power failures, water pipeline bursts, or road accidents are prioritized immediately.
            </p>
            <Link
              href="/file-complaint?urgency=critical"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 font-semibold text-white shadow-lg shadow-red-600/25 transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Report Emergency
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
