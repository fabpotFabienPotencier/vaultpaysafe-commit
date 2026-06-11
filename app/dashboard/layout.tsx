"use client";

import { useBank } from "../context/BankContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { currentUser, logout } = useBank();
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push("/login");
    }
  }, [currentUser, router]);

  if (!currentUser) return null;

  return (
    <>
      <header className="docked full-width top-0 border-b-[0.5px] border-outline-variant bg-background text-primary z-50 sticky">
        <div className="flex justify-between items-center w-full px-container-padding h-16 max-w-md mx-auto">
          <button onClick={() => logout()} className="text-primary hover:opacity-80 transition-opacity active:scale-95 duration-200">
            <span className="material-symbols-outlined text-screen-title">logout</span>
          </button>
          <h1 className="font-screen-title text-screen-title text-primary font-semibold">VaultPaySafe</h1>
          <div className="font-display-balance text-screen-title border-[1.5px] border-primary rounded-full w-8 h-8 flex items-center justify-center bg-secondary text-white text-xs">
            {currentUser.name.charAt(0).toUpperCase()}
          </div>
        </div>
      </header>

      <main className="flex-grow px-container-padding pt-section-margin pb-32 max-w-md mx-auto w-full">
        {children}
      </main>

      <nav className="fixed bottom-0 w-full z-50 flex justify-around items-center px-container-padding pb-8 pt-4 bg-surface border-t-[0.5px] border-outline-variant rounded-t-lg max-w-md left-1/2 -translate-x-1/2">
        <Link href="/dashboard" className="flex flex-col items-center hover:bg-surface-container rounded-full p-2 text-secondary scale-110 active:scale-90 transition-transform duration-150">
          <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>account_balance_wallet</span>
        </Link>
        <button className="flex flex-col items-center hover:bg-surface-container rounded-full p-2 text-on-surface-variant opacity-50 active:scale-90 transition-transform duration-150">
          <span className="material-symbols-outlined">swap_horiz</span>
        </button>
        <button className="flex flex-col items-center hover:bg-surface-container rounded-full p-2 text-on-surface-variant opacity-50 active:scale-90 transition-transform duration-150">
          <span className="material-symbols-outlined">insert_chart</span>
        </button>
        <button className="flex flex-col items-center hover:bg-surface-container rounded-full p-2 text-on-surface-variant opacity-50 active:scale-90 transition-transform duration-150">
          <span className="material-symbols-outlined">person</span>
        </button>
      </nav>
    </>
  );
}
