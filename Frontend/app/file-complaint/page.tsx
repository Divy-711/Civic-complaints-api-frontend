"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { submitComplaintWithImage } from "@/lib/api";
import { departments, type DepartmentId } from "@/lib/departments";

export default function FileComplaintPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { phone, isLoggedIn } = useAuth();
  const [name, setName] = useState("");
  const [issueType, setIssueType] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"Low" | "Medium" | "High">("Medium");
  const [selectedDept, setSelectedDept] = useState<DepartmentId | null>(null);
  const [subcategory, setSubcategory] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successId, setSuccessId] = useState<number | null>(null);

  const deptFromUrl = searchParams.get("dept") as DepartmentId | null;
  const validDept = deptFromUrl && departments[deptFromUrl] ? deptFromUrl : null;

  useEffect(() => {
    if (validDept) {
      setSelectedDept(validDept);
      const d = departments[validDept];
      if (d.subcategories.length) setSubcategory(d.subcategories[0]);
    }
  }, [validDept]);

  const subcategories = selectedDept ? departments[selectedDept].subcategories : [];

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!isLoggedIn || !phone) {
        router.push("/login?redirect=/file-complaint");
        return;
      }
      if (!name.trim() || !issueType.trim() || !description.trim()) {
        setError("Please fill name, issue type, and description.");
        return;
      }
      setError("");
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append("citizen_name", name.trim());
        formData.append("phone", phone);
        formData.append("issue_type", issueType.trim());
        formData.append("description", description.trim());
        formData.append("priority", priority);
        if (selectedDept) formData.append("department", selectedDept);
        if (subcategory) formData.append("subcategory", subcategory);
        if (imageFile) formData.append("image", imageFile);

        const data = await submitComplaintWithImage(formData);
        if (data.error) {
          setError(data.error);
          return;
        }
        setSuccessId(data.complaint_id ?? data.id ?? null);
      } finally {
        setLoading(false);
      }
    },
    [phone, isLoggedIn, name, issueType, description, imageFile, router]
  );

  if (successId !== null) {
    return (
      <div className="mx-auto max-w-lg px-4 py-12">
        <div className="card p-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl text-green-600">✓</div>
          <h1 className="mt-4 text-2xl font-bold text-stone-800">Complaint submitted</h1>
          <p className="mt-2 text-stone-600">Your tracking ID: <strong>{successId}</strong></p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button type="button" onClick={() => { setSuccessId(null); setName(""); setIssueType(""); setDescription(""); setImageFile(null); }} className="btn btn-secondary py-2.5 px-4">
              File another
            </button>
            <Link href="/track" className="btn btn-primary py-2.5 px-4">
              Track this complaint
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-3xl font-bold text-stone-800">File a complaint</h1>
      <p className="mt-1 text-stone-600">Select department and describe the issue</p>

      {!isLoggedIn && (
        <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4">
          <p className="text-sm text-stone-700">You need to log in to file a complaint.</p>
          <Link href="/login?redirect=/file-complaint" className="mt-2 inline-block text-sm font-medium text-primary hover:underline">
            Log in →
          </Link>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div>
          <label className="block text-sm font-medium text-stone-700">Department</label>
          <div className="mt-2 flex flex-wrap gap-2">
            {(Object.keys(departments) as DepartmentId[]).map((id) => {
              const d = departments[id];
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => { setSelectedDept(id); setSubcategory(d.subcategories[0] ?? ""); }}
                  className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
                    selectedDept === id
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-stone-300 bg-white text-stone-600 hover:bg-stone-50"
                  }`}
                >
                  {d.icon} {d.name}
                </button>
              );
            })}
          </div>
        </div>

        {selectedDept && (
          <div>
            <label className="block text-sm font-medium text-stone-700">Subcategory</label>
            <select value={subcategory} onChange={(e) => setSubcategory(e.target.value)} className="input mt-1" required>
              {departments[selectedDept].subcategories.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-stone-700">Your name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className="input mt-1" required />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700">Issue type / title</label>
          <input type="text" value={issueType} onChange={(e) => setIssueType(e.target.value)} placeholder="e.g. Pothole on Main Road" className="input mt-1" required />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe the issue in detail..." rows={4} className="input mt-1" required />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700">Photo (optional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
            className="mt-1 block w-full text-sm text-stone-500 file:mr-4 file:rounded-lg file:border-0 file:bg-primary/10 file:px-4 file:py-2 file:text-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700">Priority</label>
          <div className="mt-2 flex gap-4">
            {(["Low", "Medium", "High"] as const).map((p) => (
              <label key={p} className="flex items-center gap-2">
                <input type="radio" name="priority" checked={priority === p} onChange={() => setPriority(p)} className="h-4 w-4 text-primary" />
                <span className="text-sm text-stone-700">{p}</span>
              </label>
            ))}
          </div>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}
        <button type="submit" className="btn btn-primary w-full py-3" disabled={loading || !isLoggedIn}>
          {loading ? "Submitting…" : "Submit complaint"}
        </button>
      </form>
    </div>
  );
}
