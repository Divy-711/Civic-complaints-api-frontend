"use client";

import { useState, useEffect } from "react";
import { getComplaints } from "@/lib/api";

export default function AnalyticsPage() {
  const [complaints, setComplaints] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getComplaints()
      .then((data) => {
        setComplaints(Array.isArray(data) ? data : []);
      })
      .catch(() => setComplaints([]))
      .finally(() => setLoading(false));
  }, []);

  const total = complaints.length;
  const resolved = complaints.filter((c) => (c.status || "").toLowerCase().includes("resolved")).length;
  const pending = complaints.filter((c) => (c.status || "").toLowerCase().includes("pending") || (c.status || "").toLowerCase().includes("submitted")).length;
  const inProgress = complaints.filter((c) => (c.status || "").toLowerCase().includes("progress")).length;

  const cards = [
    { label: "Total complaints", value: total, icon: "📋", trend: "" },
    { label: "Resolved", value: resolved, icon: "✅", trend: total ? ` ${Math.round((resolved / total) * 100)}%` : "" },
    { label: "Pending", value: pending, icon: "⏳", trend: "" },
    { label: "In progress", value: inProgress, icon: "🔄", trend: "" },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold text-stone-800">Analytics</h1>
      <p className="mt-1 text-stone-600">Overview of grievance redressal</p>

      {loading ? (
        <p className="mt-8 text-stone-500">Loading…</p>
      ) : (
        <>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map(({ label, value, icon, trend }) => (
              <div key={label} className="card flex items-center gap-4 p-6">
                <span className="text-3xl">{icon}</span>
                <div>
                  <p className="text-2xl font-bold text-stone-800">{value}</p>
                  <p className="text-sm text-stone-500">{label}{trend}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <h2 className="text-xl font-semibold text-stone-800">Recent complaints</h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full border-collapse rounded-lg border border-stone-200 bg-white">
                <thead>
                  <tr className="bg-stone-50">
                    <th className="border-b border-stone-200 px-4 py-3 text-left text-sm font-medium text-stone-700">ID</th>
                    <th className="border-b border-stone-200 px-4 py-3 text-left text-sm font-medium text-stone-700">Issue</th>
                    <th className="border-b border-stone-200 px-4 py-3 text-left text-sm font-medium text-stone-700">Status</th>
                    <th className="border-b border-stone-200 px-4 py-3 text-left text-sm font-medium text-stone-700">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {complaints.slice(0, 20).map((c) => (
                    <tr key={c.id} className="border-b border-stone-100 last:border-0">
                      <td className="px-4 py-3 text-sm text-stone-600">#{c.id}</td>
                      <td className="px-4 py-3 text-sm text-stone-800">{c.issue_type}</td>
                      <td className="px-4 py-3 text-sm text-stone-600">{c.status}</td>
                      <td className="px-4 py-3 text-sm text-stone-500">{c.created_at ? new Date(c.created_at).toLocaleDateString() : "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {complaints.length === 0 && (
                <p className="py-8 text-center text-stone-500">No complaints yet.</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
