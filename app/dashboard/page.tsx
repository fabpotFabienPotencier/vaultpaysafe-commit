"use client";

import { useBank } from "../context/BankContext";

export default function Dashboard() {
  const { currentUser } = useBank();

  if (!currentUser) return null;

  const totalBalance = currentUser.balances.USD + (currentUser.balances.EUR * 1.08); // Mock exchange rate

  const handleWithdraw = () => {
    if (currentUser.withdrawalsLocked) {
      alert("Withdrawals are currently locked for your account. Please contact support.");
    } else {
      alert("Withdrawal initiated successfully.");
    }
  };

  return (
    <>
      <section className="mb-section-margin">
        <div className="flex items-center gap-element-gap mb-base">
          <p className="text-on-surface-variant text-sm">Total Balance</p>
          <div className="bg-secondary-fixed text-on-secondary-fixed px-3 py-1 rounded-full text-label-caps font-label-caps flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">arrow_outward</span>
            100%
          </div>
        </div>
        <div className="font-display-balance text-display-balance text-primary">
          ${Math.floor(totalBalance)}.<span className="text-outline">{(totalBalance % 1).toFixed(2).substring(2)}</span>
        </div>
      </section>

      {currentUser.withdrawalsLocked && (
        <section className="mb-section-margin bg-error-container text-on-error-container rounded-lg p-element-gap flex items-center gap-element-gap border-[0.5px] border-error">
          <span className="material-symbols-outlined text-error">lock</span>
          <p className="font-semibold text-sm">Withdrawals Locked</p>
        </section>
      )}

      <section className="mb-section-margin bg-surface-container rounded-lg p-element-gap flex justify-between items-center border-[0.5px] border-outline-variant">
        <div className="flex items-center gap-element-gap">
          <span className="material-symbols-outlined text-secondary text-2xl">trending_up</span>
          <p className="font-semibold text-primary text-sm">Earn up to 8.14% APY</p>
        </div>
        <span className="material-symbols-outlined text-outline">chevron_right</span>
      </section>

      <section className="grid grid-cols-2 gap-element-gap">
        <div className="bg-surface-container-lowest border-[0.5px] border-outline-variant rounded-lg p-element-gap h-[150px] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="material-symbols-outlined text-outline">payments</span>
            <span className="material-symbols-outlined text-outline opacity-50">more_horiz</span>
          </div>
          <div>
            <p className="text-on-surface-variant text-sm mb-1">USD Account</p>
            <p className="font-screen-title text-screen-title text-primary">${currentUser.balances.USD.toFixed(2)}</p>
          </div>
        </div>

        <div className="bg-surface-container-lowest border-[0.5px] border-outline-variant rounded-lg p-element-gap h-[150px] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="material-symbols-outlined text-outline">euro_symbol</span>
            <span className="material-symbols-outlined text-outline opacity-50">more_horiz</span>
          </div>
          <div>
            <p className="text-on-surface-variant text-sm mb-1">EUR Account</p>
            <p className="font-screen-title text-screen-title text-primary">€{currentUser.balances.EUR.toFixed(2)}</p>
          </div>
        </div>

        {currentUser.virtualCards.map((card, i) => (
          <div key={card.id} className="bg-primary text-on-primary border-[0.5px] border-outline-variant rounded-lg p-element-gap h-[150px] flex flex-col justify-between shadow-lg relative overflow-hidden">
             <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3"></div>
            <div className="flex items-center justify-between relative z-10">
              <span className="material-symbols-outlined opacity-80">credit_card</span>
              <span className="text-xs font-semibold uppercase tracking-widest">{card.brand}</span>
            </div>
            <div className="relative z-10">
              <p className="text-on-primary/80 text-sm mb-1">Virtual Card</p>
              <p className="font-screen-title text-screen-title tracking-widest text-sm">•••• {card.cardNumber.slice(-4)}</p>
            </div>
          </div>
        ))}
        
        {currentUser.virtualAccounts.map(va => (
          <div key={va.id} className="bg-surface-container-lowest border-[0.5px] border-outline-variant rounded-lg p-element-gap h-[150px] flex flex-col justify-between">
             <div className="flex items-center justify-between">
              <span className="material-symbols-outlined text-outline">account_balance</span>
            </div>
            <div>
              <p className="text-on-surface-variant text-sm mb-1">{va.currency} {va.bankName}</p>
              <p className="font-mono text-sm font-semibold tracking-widest text-primary">{va.accountNumber.slice(-4)}</p>
            </div>
          </div>
        ))}

        <div className="border border-dashed border-outline-variant rounded-lg p-element-gap h-[150px] flex flex-col justify-center items-center text-center cursor-pointer hover:bg-surface-container-low transition-colors">
          <span className="material-symbols-outlined text-outline mb-2 text-3xl">add</span>
          <p className="text-on-surface-variant text-sm">Add Funds</p>
        </div>
      </section>

      <button onClick={handleWithdraw} className="fixed bottom-24 right-1/2 translate-x-[90px] w-16 h-16 bg-primary text-on-primary rounded-full flex items-center justify-center shadow-lg hover:opacity-90 active:scale-95 transition-all z-40">
        <span className="material-symbols-outlined text-3xl">arrow_upward</span>
      </button>
    </>
  );
}
