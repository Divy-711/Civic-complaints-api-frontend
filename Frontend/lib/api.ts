const API = "/api";

export async function sendOtp(phone: string) {
  const res = await fetch(`${API}/auth/send-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone }),
  });
  return res.json();
}

export async function verifyOtp(phone: string, otp: string) {
  const res = await fetch(`${API}/auth/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone, otp }),
  });
  return res.json();
}

export async function setPassword(phone: string, password: string) {
  const res = await fetch(`${API}/auth/set-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone, password }),
  });
  return res.json();
}

export async function loginPassword(phone: string, password: string) {
  const res = await fetch(`${API}/auth/login-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone, password }),
  });
  return res.json();
}

export async function submitComplaint(data: {
  citizen_name: string;
  phone: string;
  issue_type: string;
  description: string;
  priority?: string;
}) {
  const res = await fetch(`${API}/complaint`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function submitComplaintWithImage(formData: FormData) {
  const res = await fetch(`${API}/complaint-image`, {
    method: "POST",
    body: formData,
  });
  return res.json();
}

export async function getComplaints() {
  const res = await fetch(`${API}/complaints`);
  return res.json();
}

export async function getComplaintById(id: number) {
  const res = await fetch(`${API}/complaint/${id}`);
  if (!res.ok) {
    throw new Error("Complaint not found");
  }
  return res.json();
}

export async function updateComplaintStatus(id: number, status: string) {
  const res = await fetch(`${API}/complaint/${id}/status`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  return res.json();
}
