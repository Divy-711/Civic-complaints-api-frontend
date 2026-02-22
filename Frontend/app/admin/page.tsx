"use client";

import { useState, useEffect } from "react";
import { getComplaints, updateComplaintStatus } from "@/lib/api";

type Complaint = {
  id: number;
  citizen_name: string;
  phone: string;
  issue_type: string;
  description: string;
  status: string;
  priority?: string;
  created_at: string;
};

const STATUS_OPTIONS = ["Submitted", "Pending_AI", "In Progress", "Resolved", "Closed"];

export default function AdminPage() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const [updating, setUpdating] = useState<number | null>(null);

  useEffect(() => {
    getComplaints()
      .then((data) => setComplaints(Array.isArray(data) ? data : []))
      .catch(() => setComplaints([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered =
    filter === "all"
      ? complaints
      : filter === "pending"
        ? complaints.filter((c) => /pending|submitted/i.test(c.status || ""))
        : filter === "progress"
          ? complaints.filter((c) => /progress/i.test(c.status || ""))
          : complaints.filter((c) => /resolved|closed/i.test(c.status || ""));

  async function handleStatusChange(id: number, newStatus: string) {
    setUpdating(id);
    try {
      await updateComplaintStatus(id, newStatus);
      setComplaints((prev) => prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c)));
    } finally {
      setUpdating(null);
    }
  }

  const stats = [
    { label: "Total", value: complaints.length, key: "all" },
    { label: "Pending", value: complaints.filter((c) => /pending|submitted/i.test(c.status || "")).length, key: "pending" },
    { label: "In progress", value: complaints.filter((c) => /progress/i.test(c.status || "")).length, key: "progress" },
    { label: "Resolved", value: complaints.filter((c) => /resolved|closed/i.test(c.status || "")).length, key: "resolved" },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold text-stone-800">Admin dashboard</h1>
      <p className="mt-1 text-stone-600">Manage complaints and status</p>

      {loading ? (
        <p className="mt-8 text-stone-500">Loading…</p>
      ) : (
        <>
          <div className="mt-8 flex flex-wrap gap-2">
            {stats.map(({ label, value, key }) => (
              <button
                key={key}
                type="button"
                onClick={() => setFilter(key)}
                className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
                  filter === key ? "border-primary bg-primary/10 text-primary" : "border-stone-300 bg-white text-stone-600 hover:bg-stone-50"
                }`}
              >
                {label}: {value}
              </button>
            ))}
          </div>

          <div className="mt-8 overflow-x-auto">
            <table className="w-full border-collapse rounded-lg border border-stone-200 bg-white">
              <thead>
                <tr className="bg-stone-50">
                  <th className="border-b border-stone-200 px-4 py-3 text-left text-sm font-medium text-stone-700">ID</th>
                  <th className="border-b border-stone-200 px-4 py-3 text-left text-sm font-medium text-stone-700">Citizen</th>
                  <th className="border-b border-stone-200 px-4 py-3 text-left text-sm font-medium text-stone-700">Issue</th>
                  <th className="border-b border-stone-200 px-4 py-3 text-left text-sm font-medium text-stone-700">Status</th>
                  <th className="border-b border-stone-200 px-4 py-3 text-left text-sm font-medium text-stone-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr key={c.id} className="border-b border-stone-100 last:border-0">
                    <td className="px-4 py-3 text-sm text-stone-600">#{c.id}</td>
                    <td className="px-4 py-3 text-sm text-stone-800">{c.citizen_name}</td>
                    <td className="px-4 py-3 text-sm text-stone-800">{c.issue_type}</td>
                    <td className="px-4 py-3 text-sm text-stone-600">{c.status}</td>
                    <td className="px-4 py-3">
                      <select
                        value={c.status}
                        onChange={(e) => handleStatusChange(c.id, e.target.value)}
                        disabled={updating === c.id}
                        className="rounded border border-stone-300 bg-white px-2 py-1 text-sm"
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && <p className="py-8 text-center text-stone-500">No complaints match the filter.</p>}
          </div>
        </>
      )}
    </div>
  );
}
