import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-stone-200 bg-stone-50">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="font-semibold text-stone-800">AI Grievance Portal</h3>
            <p className="mt-2 text-sm text-stone-600">
              Making grievance redressal accessible, efficient, and transparent for all citizens.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-stone-800">Quick Links</h4>
            <ul className="mt-2 space-y-1 text-sm text-stone-600">
              <li><Link href="/" className="hover:text-primary">Home</Link></li>
              <li><Link href="/file-complaint" className="hover:text-primary">File Complaint</Link></li>
              <li><Link href="/track" className="hover:text-primary">Track Complaint</Link></li>
              <li><Link href="/analytics" className="hover:text-primary">Analytics</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-stone-800">Departments</h4>
            <ul className="mt-2 space-y-1 text-sm text-stone-600">
              <li><Link href="/file-complaint?dept=roads" className="hover:text-primary">Roads & Infrastructure</Link></li>
              <li><Link href="/file-complaint?dept=water" className="hover:text-primary">Water & Sanitation</Link></li>
              <li><Link href="/file-complaint?dept=electricity" className="hover:text-primary">Electricity</Link></li>
              <li><Link href="/file-complaint?dept=environment" className="hover:text-primary">Environment</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-stone-800">Contact</h4>
            <p className="mt-2 text-sm text-stone-600">📞 Helpline: 1800-123-4567</p>
            <p className="text-sm text-stone-600">📧 support@grievance.gov.in</p>
            <p className="text-sm text-stone-600">⏰ 24/7 Support</p>
          </div>
        </div>
        <div className="mt-8 border-t border-stone-200 pt-6 text-center text-sm text-stone-500">
          © {new Date().getFullYear()} AI Grievance Portal. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
