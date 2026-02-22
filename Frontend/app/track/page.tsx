"use client";

import { useState } from "react";
import { getComplaintById } from "@/lib/api";

type Complaint = {
  id: number;
  citizen_name: string;
  phone: string;
  issue_type: string;
  description: string;
  status: string;
  priority?: string;
  image_url?: string;
  department?: string;
  subcategory?: string;
  created_at: string;
};

export default function TrackPage() {
  const [trackingId, setTrackingId] = useState("");
  const [complaint, setComplaint] = useState<Complaint | null>(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");

  async function handleTrack(e: React.FormEvent) {
    e.preventDefault();
    const id = trackingId.trim();
    if (!id) return;
    setLoading(true);
    setSearched(true);
    setComplaint(null);
    setError("");
    
    const num = parseInt(id, 10);
    if (Number.isNaN(num)) {
      setError("Please enter a valid complaint ID");
      setLoading(false);
      return;
    }

    try {
      const data = await getComplaintById(num);
      setComplaint(data);
    } catch (err: any) {
      setComplaint(null);
      setError(err.message || "Complaint not found");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-3xl font-bold text-stone-800">Track your complaint</h1>
      <p className="mt-1 text-stone-600">Enter your complaint ID to check status</p>

      <form onSubmit={handleTrack} className="mt-8 flex flex-wrap gap-2">
        <input
          type="text"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
          placeholder="e.g. 1 or complaint ID"
          className="input flex-1 min-w-[200px]"
        />
        <button type="submit" className="btn btn-primary px-6 py-2.5" disabled={loading}>
          {loading ? "Searching…" : "Track"}
        </button>
      </form>


      {searched && (
        <div className="mt-8">
          {complaint ? (
            <div className="card overflow-hidden">
              <div className="border-b border-stone-200 bg-stone-50 px-6 py-3">
                <span className="text-sm font-medium text-stone-500">Complaint #{complaint.id}</span>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <span className="text-sm text-stone-500">Status</span>
                  <p className="font-medium text-stone-800">{complaint.status}</p>
                </div>
                {complaint.department && (
                  <div>
                    <span className="text-sm text-stone-500">Department</span>
                    <p className="font-medium text-stone-800">{complaint.department}</p>
                  </div>
                )}
                {complaint.subcategory && (
                  <div>
                    <span className="text-sm text-stone-500">Subcategory</span>
                    <p className="font-medium text-stone-800">{complaint.subcategory}</p>
                  </div>
                )}
                <div>
                  <span className="text-sm text-stone-500">Issue</span>
                  <p className="font-medium text-stone-800">{complaint.issue_type}</p>
                </div>
                <div>
                  <span className="text-sm text-stone-500">Description</span>
                  <p className="text-stone-700">{complaint.description}</p>
                </div>
                {complaint.image_url && (
                  <div>
                    <span className="text-sm text-stone-500">Photo</span>
                    <div className="mt-2">
                      <img 
                        src={`http://127.0.0.1:5055/uploads/${complaint.image_url}`} 
                        alt="Complaint photo" 
                        className="max-w-full rounded-lg border border-stone-200"
                      />
                    </div>
                  </div>
                )}
                <div>
                  <span className="text-sm text-stone-500">Submitted</span>
                  <p className="text-stone-700">{new Date(complaint.created_at).toLocaleString()}</p>
                </div>
                {complaint.priority && (
                  <div>
                    <span className="text-sm text-stone-500">Priority</span>
                    <p className="text-stone-700">{complaint.priority}</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="card p-8 text-center">
              <p className="text-stone-600">{error || "No complaint found with this ID."}</p>
              <p className="mt-1 text-sm text-stone-500">Check the ID and try again.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
