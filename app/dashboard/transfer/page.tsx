"use client";

import { useState } from "react";
import { useBank } from "../../context/BankContext";

export default function TransferPage() {
  const { currentUser, transferFunds, convertCurrency } = useBank();
  const [activeTab, setActiveTab] = useState<'transfer' | 'exchange'>('transfer');

  // Transfer State
  const [recipient, setRecipient] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const [transferCurrency, setTransferCurrency] = useState<'USD' | 'EUR'>('USD');

  // Exchange State
  const [exchangeAmount, setExchangeAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState<'USD' | 'EUR'>('USD');
  const [toCurrency, setToCurrency] = useState<'USD' | 'EUR'>('EUR');

  if (!currentUser) return null;

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipient || !transferAmount) return;
    const res = transferFunds(currentUser.id, recipient, Number(transferAmount), transferCurrency);
    if (res.success) {
      alert(res.message);
      setRecipient("");
      setTransferAmount("");
    } else {
      alert(res.message);
    }
  };

  const handleExchange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!exchangeAmount) return;
    const res = convertCurrency(currentUser.id, fromCurrency, toCurrency, Number(exchangeAmount));
    if (res.success) {
      alert(res.message);
      setExchangeAmount("");
    } else {
      alert(res.message);
    }
  };

  return (
    <>
      <section className="mb-section-margin">
        <h2 className="font-section-header text-2xl font-semibold mb-6">Transfers</h2>
        
        <div className="flex bg-surface-container rounded-full p-1 mb-8">
          <button 
            onClick={() => setActiveTab('transfer')}
            className={`flex-1 py-2 text-sm font-semibold rounded-full transition-colors ${activeTab === 'transfer' ? 'bg-white shadow-sm text-primary' : 'text-muted'}`}
          >
            Send Money
          </button>
          <button 
            onClick={() => setActiveTab('exchange')}
            className={`flex-1 py-2 text-sm font-semibold rounded-full transition-colors ${activeTab === 'exchange' ? 'bg-white shadow-sm text-primary' : 'text-muted'}`}
          >
            Exchange
          </button>
        </div>

        {activeTab === 'transfer' ? (
          <form onSubmit={handleTransfer} className="space-y-6">
            <div>
              <label className="block text-xs font-semibold text-muted mb-2 tracking-wide uppercase">Recipient Email</label>
              <input 
                type="email" 
                value={recipient}
                onChange={e => setRecipient(e.target.value)}
                placeholder="john@example.com"
                className="w-full bg-[#F6F7F8] px-4 py-3 rounded-full outline-none focus:ring-2 focus:ring-accent-blue/20 transition-all border border-transparent focus:border-accent-blue/30"
                required
              />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-xs font-semibold text-muted mb-2 tracking-wide uppercase">Amount</label>
                <input 
                  type="number" 
                  value={transferAmount}
                  onChange={e => setTransferAmount(e.target.value)}
                  placeholder="0.00"
                  min="1"
                  className="w-full bg-[#F6F7F8] px-4 py-3 rounded-full outline-none focus:ring-2 focus:ring-accent-blue/20 transition-all border border-transparent focus:border-accent-blue/30"
                  required
                />
              </div>
              <div className="w-32">
                <label className="block text-xs font-semibold text-muted mb-2 tracking-wide uppercase">Currency</label>
                <select 
                  value={transferCurrency}
                  onChange={e => setTransferCurrency(e.target.value as 'USD' | 'EUR')}
                  className="w-full bg-[#F6F7F8] px-4 py-3 rounded-full outline-none focus:ring-2 focus:ring-accent-blue/20 transition-all border border-transparent focus:border-accent-blue/30 appearance-none"
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                </select>
              </div>
            </div>
            <p className="text-sm text-muted">Available Balance: {transferCurrency === 'USD' ? '$' : '€'}{currentUser.balances[transferCurrency].toFixed(2)}</p>
            <button type="submit" className="w-full bg-primary text-white py-4 rounded-full font-medium text-lg hover:bg-primary/90 transition-transform active:scale-[0.98]">
              Send Funds
            </button>
          </form>
        ) : (
          <form onSubmit={handleExchange} className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-xs font-semibold text-muted mb-2 tracking-wide uppercase">Amount</label>
                <input 
                  type="number" 
                  value={exchangeAmount}
                  onChange={e => setExchangeAmount(e.target.value)}
                  placeholder="0.00"
                  min="1"
                  className="w-full bg-[#F6F7F8] px-4 py-3 rounded-full outline-none focus:ring-2 focus:ring-accent-blue/20 transition-all border border-transparent focus:border-accent-blue/30"
                  required
                />
              </div>
              <div className="w-32">
                <label className="block text-xs font-semibold text-muted mb-2 tracking-wide uppercase">From</label>
                <select 
                  value={fromCurrency}
                  onChange={e => {
                    setFromCurrency(e.target.value as 'USD' | 'EUR');
                    setToCurrency(e.target.value === 'USD' ? 'EUR' : 'USD');
                  }}
                  className="w-full bg-[#F6F7F8] px-4 py-3 rounded-full outline-none focus:ring-2 focus:ring-accent-blue/20 transition-all border border-transparent focus:border-accent-blue/30 appearance-none"
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                </select>
              </div>
            </div>
            <div className="flex justify-center -my-2 relative z-10">
              <div className="bg-white rounded-full p-2 border border-outline-variant text-muted">
                <span className="material-symbols-outlined">swap_vert</span>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-xs font-semibold text-muted mb-2 tracking-wide uppercase">Receive (Approx)</label>
                <input 
                  type="text" 
                  value={exchangeAmount ? (Number(exchangeAmount) * (fromCurrency === 'USD' ? 0.92 : 1.08)).toFixed(2) : ""}
                  readOnly
                  className="w-full bg-surface-container-low text-muted px-4 py-3 rounded-full outline-none border border-transparent"
                />
              </div>
              <div className="w-32">
                <label className="block text-xs font-semibold text-muted mb-2 tracking-wide uppercase">To</label>
                <select 
                  value={toCurrency}
                  disabled
                  className="w-full bg-surface-container-low text-muted px-4 py-3 rounded-full outline-none border border-transparent appearance-none"
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                </select>
              </div>
            </div>
            <button type="submit" className="w-full bg-primary text-white py-4 rounded-full font-medium text-lg hover:bg-primary/90 transition-transform active:scale-[0.98]">
              Exchange
            </button>
          </form>
        )}
      </section>
    </>
  );
}
