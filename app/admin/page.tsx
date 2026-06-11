"use client";

import { useBank, User } from "../context/BankContext";
import { useState } from "react";
import { Search, CreditCard, Building, Wallet, Lock, Unlock } from "lucide-react";

export default function AdminDashboard() {
  const { users, loadFunds, toggleWithdrawalLock, assignVirtualAccount, generateVirtualCard } = useBank();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <header className="flex justify-between items-end mb-12">
        <div>
          <h1 className="text-3xl font-semibold mb-2">User Management</h1>
          <p className="text-muted">Control accounts, funds, and virtual assets.</p>
        </div>
        <div className="relative w-72">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
          <input 
            type="text" 
            placeholder="Search users..." 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-[#E7E8EA] pl-12 pr-4 py-3 rounded-full outline-none focus:border-accent-blue/50 transition-colors"
          />
        </div>
      </header>

      <div className="space-y-6">
        {filteredUsers.map(user => (
          <UserAdminCard 
            key={user.id} 
            user={user} 
            onLoadFunds={loadFunds}
            onToggleLock={toggleWithdrawalLock}
            onAssignAccount={assignVirtualAccount}
            onGenerateCard={generateVirtualCard}
          />
        ))}
      </div>
    </div>
  );
}

function UserAdminCard({ user, onLoadFunds, onToggleLock, onAssignAccount, onGenerateCard }: { 
  user: User, 
  onLoadFunds: any, 
  onToggleLock: any, 
  onAssignAccount: any, 
  onGenerateCard: any 
}) {
  return (
    <div className="bg-white p-6 rounded-[24px] border border-[#E7E8EA] flex flex-col md:flex-row gap-8">
      <div className="flex-1 space-y-6">
        <div>
          <h3 className="text-xl font-semibold">{user.name}</h3>
          <p className="text-muted">{user.email}</p>
        </div>
        
        <div className="flex gap-8">
          <div>
            <div className="text-xs font-bold text-muted uppercase tracking-widest mb-1">USD Balance</div>
            <div className="font-mono text-xl">${user.balances.USD.toLocaleString(undefined, {minimumFractionDigits:2})}</div>
          </div>
          <div>
            <div className="text-xs font-bold text-muted uppercase tracking-widest mb-1">EUR Balance</div>
            <div className="font-mono text-xl">€{user.balances.EUR.toLocaleString(undefined, {minimumFractionDigits:2})}</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="bg-surface-container px-3 py-1 rounded-full text-xs font-medium text-muted">
            {user.virtualAccounts.length} Accounts
          </span>
          <span className="bg-surface-container px-3 py-1 rounded-full text-xs font-medium text-muted">
            {user.virtualCards.length} Cards
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${user.withdrawalsLocked ? 'bg-accent-red/10 text-accent-red' : 'bg-accent-green/10 text-accent-green'}`}>
            {user.withdrawalsLocked ? 'Locked' : 'Active'}
          </span>
        </div>
      </div>

      <div className="w-full md:w-64 flex flex-col gap-3 justify-center">
        <button onClick={() => {
          const amount = prompt("Enter amount to load (USD):");
          if (amount && !isNaN(Number(amount))) onLoadFunds(user.id, 'USD', Number(amount));
        }} className="w-full bg-[#F6F7F8] hover:bg-[#E7E8EA] text-foreground px-4 py-2.5 rounded-full text-sm font-medium transition-colors flex justify-center items-center gap-2">
          <Wallet className="w-4 h-4" /> Load USD
        </button>

        <button onClick={() => onToggleLock(user.id)} className={`w-full px-4 py-2.5 rounded-full text-sm font-medium transition-colors flex justify-center items-center gap-2 ${user.withdrawalsLocked ? 'bg-primary text-white' : 'bg-accent-red/10 text-accent-red hover:bg-accent-red/20'}`}>
          {user.withdrawalsLocked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
          {user.withdrawalsLocked ? 'Unlock Withdrawals' : 'Lock Withdrawals'}
        </button>

        <button onClick={() => onAssignAccount(user.id, 'USD')} className="w-full bg-accent-blueSoft text-accent-blue hover:bg-accent-blue/20 px-4 py-2.5 rounded-full text-sm font-medium transition-colors flex justify-center items-center gap-2">
          <Building className="w-4 h-4" /> Assign USD Account
        </button>

        <button onClick={() => onGenerateCard(user.id)} className="w-full bg-[#F6F7F8] hover:bg-[#E7E8EA] text-foreground px-4 py-2.5 rounded-full text-sm font-medium transition-colors flex justify-center items-center gap-2">
          <CreditCard className="w-4 h-4" /> Generate Card
        </button>
      </div>
    </div>
  )
}
