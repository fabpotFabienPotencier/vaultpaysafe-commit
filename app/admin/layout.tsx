import Link from "next/link";
import { ShieldAlert, Users, ArrowLeft } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-[#080909] text-white p-6 flex flex-col">
        <div className="flex items-center gap-3 font-bold text-xl mb-12 text-accent-blueSoft">
          <ShieldAlert className="w-6 h-6 text-accent-blue" />
          Vault Admin
        </div>
        <nav className="flex-1 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-full bg-white/10 font-medium text-white">
            <Users className="w-5 h-5" /> User Management
          </Link>
        </nav>
        <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-full text-white/50 hover:bg-white/5 transition-colors mt-auto text-left">
          <ArrowLeft className="w-5 h-5" /> Exit Admin
        </Link>
      </aside>
      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
