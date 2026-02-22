import Link from "next/link";

export default function WhatsAppPage() {
  const number = "+91 98765 43210";
  const waLink = `https://wa.me/919876543210`;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold text-stone-800">WhatsApp complaint</h1>
      <p className="mt-1 text-stone-600">File complaints via WhatsApp — no app download needed</p>

      <div className="mt-10 card overflow-hidden">
        <div className="bg-[#25D366] p-8 text-white">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
            <span className="text-6xl">💬</span>
            <div className="text-center sm:text-left">
              <h2 className="text-xl font-bold">Report via WhatsApp</h2>
              <p className="mt-2 text-white/90">
                Save our number and send your complaint with photos. Get a tracking ID and updates.
              </p>
              <p className="mt-4 text-2xl font-semibold">{number}</p>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 font-medium text-[#25D366] hover:bg-white/90"
              >
                Open WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <div className="card p-6">
          <span className="text-3xl">📸</span>
          <h3 className="mt-2 font-semibold text-stone-800">Send photos</h3>
          <p className="mt-1 text-sm text-stone-600">Attach images of the issue for faster resolution.</p>
        </div>
        <div className="card p-6">
          <span className="text-3xl">🆔</span>
          <h3 className="mt-2 font-semibold text-stone-800">Tracking ID</h3>
          <p className="mt-1 text-sm text-stone-600">Receive a tracking ID to check status later.</p>
        </div>
      </div>

      <p className="mt-8 text-center text-stone-600">
        No WhatsApp? <Link href="/file-complaint" className="text-primary hover:underline">File via web</Link>
      </p>
    </div>
  );
}
