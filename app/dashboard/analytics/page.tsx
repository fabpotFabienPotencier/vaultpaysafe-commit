"use client";

import { useBank } from "../../context/BankContext";

export default function AnalyticsPage() {
  const { currentUser } = useBank();
  
  if (!currentUser) return null;

  const getStats = () => {
    let totalDepositsUSD = 0;
    let totalWithdrawalsUSD = 0;
    let totalTransfersUSD = 0;

    currentUser.transactions.forEach(tx => {
      // Mock normalize everything to USD for basic stats
      const amount = tx.currency === 'EUR' ? tx.amount * 1.08 : tx.amount;
      if (tx.type === 'Deposit') totalDepositsUSD += amount;
      else if (tx.type === 'Withdrawal') totalWithdrawalsUSD += amount;
      else if (tx.type === 'Transfer') totalTransfersUSD += amount;
    });

    return { totalDepositsUSD, totalWithdrawalsUSD, totalTransfersUSD };
  };

  const stats = getStats();

  return (
    <>
      <section className="mb-section-margin">
        <h2 className="font-section-header text-2xl font-semibold mb-6">Analytics</h2>
        
        <div className="bg-primary text-white rounded-[24px] p-8 border border-outline-variant shadow-lg mb-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/3 -translate-x-1/4"></div>
          
          <div className="relative z-10">
            <p className="text-white/80 text-sm font-semibold tracking-wide uppercase mb-2">Total Inflow (USD EQ)</p>
            <h3 className="font-screen-title text-4xl font-semibold tracking-tight">${stats.totalDepositsUSD.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</h3>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-surface-container rounded-[16px] p-5 border border-outline-variant">
            <div className="flex items-center gap-2 text-error mb-2">
              <span className="material-symbols-outlined text-sm">north_east</span>
              <p className="text-xs font-bold uppercase tracking-widest">Outflow</p>
            </div>
            <p className="font-mono text-xl font-semibold">${stats.totalWithdrawalsUSD.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
          </div>
          
          <div className="bg-surface-container rounded-[16px] p-5 border border-outline-variant">
            <div className="flex items-center gap-2 text-accent-blue mb-2">
              <span className="material-symbols-outlined text-sm">swap_horiz</span>
              <p className="text-xs font-bold uppercase tracking-widest">Transfers</p>
            </div>
            <p className="font-mono text-xl font-semibold">${stats.totalTransfersUSD.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
          </div>
        </div>
      </section>

      <section className="mb-section-margin">
        <h2 className="font-section-header text-xl font-semibold mb-6">Recent Volume</h2>
        
        {/* Mock Chart Area */}
        <div className="bg-surface-container rounded-[24px] p-6 border border-outline-variant h-64 flex items-end justify-between gap-2">
           {[40, 70, 45, 90, 60, 100, 80].map((height, i) => (
             <div key={i} className="w-full bg-accent-blueSoft rounded-t flex flex-col justify-end" style={{ height: '100%' }}>
               <div className="w-full bg-accent-blue rounded-t transition-all duration-1000" style={{ height: `${height}%` }}></div>
             </div>
           ))}
        </div>
        <div className="flex justify-between text-xs text-muted mt-3 px-2 font-medium">
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
          <span>Sun</span>
        </div>
      </section>
    </>
  );
}
