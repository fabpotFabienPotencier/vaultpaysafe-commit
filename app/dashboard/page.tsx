"use client";

import { useBank } from "../context/BankContext";

export default function Dashboard() {
  const { currentUser, loadFunds, addTransaction } = useBank();

  if (!currentUser) return null;

  const totalBalance = currentUser.balances.USD + (currentUser.balances.EUR * 1.08); // Mock exchange rate

  const handleWithdraw = () => {
    if (currentUser.withdrawalsLocked) {
      alert("Withdrawals are currently locked for your account. Please contact support.");
    } else {
      const amount = prompt("Enter amount to withdraw (USD):");
      if (amount && !isNaN(Number(amount)) && Number(amount) <= currentUser.balances.USD) {
        loadFunds(currentUser.id, 'USD', -Number(amount));
        addTransaction(currentUser.id, {
          type: 'Withdrawal',
          amount: Number(amount),
          currency: 'USD',
          description: 'ATM Withdrawal'
        });
        alert("Withdrawal initiated successfully.");
      } else if (amount) {
        alert("Invalid amount or insufficient funds.");
      }
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

        <button onClick={() => {
          const amount = prompt("Enter amount to add (USD):");
          if (amount && !isNaN(Number(amount))) {
            loadFunds(currentUser.id, 'USD', Number(amount));
            addTransaction(currentUser.id, {
              type: 'Deposit',
              amount: Number(amount),
              currency: 'USD',
              description: 'Manual Fund Deposit'
            });
          }
        }} className="border border-dashed border-outline-variant rounded-lg p-element-gap h-[150px] flex flex-col justify-center items-center text-center cursor-pointer hover:bg-surface-container-low transition-colors w-full">
          <span className="material-symbols-outlined text-outline mb-2 text-3xl">add</span>
          <p className="text-on-surface-variant text-sm">Add Funds</p>
        </button>
      </section>

      <section className="mt-section-margin">
        <h2 className="font-section-header text-lg font-semibold mb-6">Recent Activity</h2>
        <div className="flex flex-col">
          {currentUser.transactions && currentUser.transactions.length > 0 ? (
            currentUser.transactions.slice(0, 5).map((tx, idx) => (
              <div key={tx.id} className="relative flex items-center justify-between py-4">
                {idx !== currentUser.transactions.length - 1 && idx !== 4 && (
                  <div className="absolute bottom-0 left-[24px] right-0 h-[0.5px] bg-outline-variant opacity-50"></div>
                )}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-secondary">
                    <span className="material-symbols-outlined text-sm">
                      {tx.type === 'Deposit' ? 'south_west' : tx.type === 'Withdrawal' ? 'north_east' : 'payments'}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <p className="font-medium text-sm">{tx.description || tx.type}</p>
                    <p className="text-muted text-xs mt-0.5">
                      {new Date(tx.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-mono text-sm font-semibold ${tx.type === 'Deposit' ? 'text-accent-green' : 'text-primary'}`}>
                    {tx.type === 'Deposit' ? '+' : '-'}{tx.currency === 'USD' ? '$' : '€'}{tx.amount.toFixed(2)}
                  </p>
                  <p className="text-muted text-xs mt-0.5 uppercase tracking-widest">{tx.status}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-muted text-sm text-center py-8">No recent transactions.</p>
          )}
        </div>
      </section>

      <button onClick={handleWithdraw} className="fixed bottom-24 right-1/2 translate-x-[90px] w-16 h-16 bg-primary text-on-primary rounded-full flex items-center justify-center shadow-lg hover:opacity-90 active:scale-95 transition-all z-40">
        <span className="material-symbols-outlined text-3xl">arrow_upward</span>
      </button>
    </>
  );
}
