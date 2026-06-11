"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useBank } from "../context/BankContext";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("john@example.com");
  const router = useRouter();
  const { login, currentUser } = useBank();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(email);
    setTimeout(() => {
      router.push("/dashboard");
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface-container">
      <div className="p-8">
        <Link href="/" className="inline-flex items-center gap-2 font-medium text-muted hover:text-primary transition-colors">
          <ArrowLeft className="w-5 h-5" /> Back to Home
        </Link>
      </div>
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="bg-white p-10 rounded-[24px] shadow-sm max-w-md w-full border border-[#E7E8EA]">
          <h1 className="text-3xl font-semibold mb-2">Welcome back</h1>
          <p className="text-muted mb-8">Enter your details to access your account.</p>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-muted mb-2 tracking-wide uppercase">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-[#F6F7F8] px-4 py-3 rounded-full outline-none focus:ring-2 focus:ring-accent-blue/20 focus:bg-white transition-all border border-transparent focus:border-accent-blue/30"
                required
              />
            </div>
            <button type="submit" className="w-full bg-primary text-white py-4 rounded-full font-medium text-lg hover:bg-primary/90 transition-transform hover:scale-[0.98]">
              Sign In
            </button>
          </form>

          <p className="mt-8 text-center text-muted">
            Don't have an account? <Link href="/signup" className="text-primary font-medium hover:underline">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
