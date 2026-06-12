"use client";

import { useState } from "react";
import { useBank } from "../../context/BankContext";

export default function ProfilePage() {
  const { currentUser, updateProfile, toggleCardStatus } = useBank();
  
  if (!currentUser) return null;

  const [name, setName] = useState(currentUser.name);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (name) {
      updateProfile(currentUser.id, name);
      alert("Profile updated successfully.");
    }
  };

  return (
    <>
      <section className="mb-section-margin">
        <h2 className="font-section-header text-2xl font-semibold mb-6">Profile Settings</h2>
        
        <form onSubmit={handleUpdate} className="space-y-6 bg-surface-container rounded-[24px] p-6 border border-outline-variant">
          <div>
            <label className="block text-xs font-semibold text-muted mb-2 tracking-wide uppercase">Full Name</label>
            <input 
              type="text" 
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full bg-[#F6F7F8] px-4 py-3 rounded-full outline-none focus:ring-2 focus:ring-accent-blue/20 transition-all border border-transparent focus:border-accent-blue/30"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-muted mb-2 tracking-wide uppercase">Email Address (Read-only)</label>
            <input 
              type="email" 
              value={currentUser.email}
              readOnly
              className="w-full bg-surface-container-low text-muted px-4 py-3 rounded-full outline-none border border-transparent"
            />
          </div>
          <button type="submit" className="w-full bg-primary text-white py-4 rounded-full font-medium hover:bg-primary/90 transition-transform active:scale-[0.98]">
            Save Changes
          </button>
        </form>
      </section>

      <section className="mb-section-margin">
        <h2 className="font-section-header text-xl font-semibold mb-6">Card Management</h2>
        
        <div className="space-y-4">
          {currentUser.virtualCards.length > 0 ? currentUser.virtualCards.map(card => (
            <div key={card.id} className="bg-surface-container rounded-[16px] p-4 border border-outline-variant flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center shadow-inner">
                  <span className="material-symbols-outlined">credit_card</span>
                </div>
                <div>
                  <p className="font-semibold text-primary">{card.brand} Virtual</p>
                  <p className="text-sm font-mono text-muted">•••• {card.cardNumber.slice(-4)}</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className={`text-xs font-semibold uppercase tracking-widest px-2 py-1 rounded-full ${card.status === 'Active' ? 'bg-accent-green/10 text-accent-green' : 'bg-error-container text-error'}`}>
                  {card.status}
                </span>
                <button 
                  onClick={() => toggleCardStatus(currentUser.id, card.id)}
                  className="text-sm font-medium text-accent-blue hover:underline"
                >
                  {card.status === 'Active' ? 'Freeze Card' : 'Unfreeze Card'}
                </button>
              </div>
            </div>
          )) : (
            <p className="text-muted text-sm text-center py-4 bg-surface-container rounded-[16px] border border-outline-variant">No active cards.</p>
          )}
        </div>
      </section>

      <section className="mb-section-margin">
        <h2 className="font-section-header text-xl font-semibold mb-6">Account Details</h2>
        <div className="space-y-4">
          {currentUser.virtualAccounts.length > 0 ? currentUser.virtualAccounts.map(va => (
            <div key={va.id} className="bg-surface-container rounded-[16px] p-4 border border-outline-variant">
               <div className="flex justify-between items-center mb-3">
                  <p className="font-semibold text-primary">{va.bankName}</p>
                  <span className="text-xs font-semibold bg-surface-container-low px-2 py-1 rounded text-muted">{va.currency}</span>
               </div>
               <div className="space-y-2">
                 <div className="flex justify-between text-sm">
                   <span className="text-muted">Account Number</span>
                   <span className="font-mono text-primary font-medium">{va.accountNumber}</span>
                 </div>
                 {va.routingNumber && (
                   <div className="flex justify-between text-sm">
                     <span className="text-muted">Routing Number</span>
                     <span className="font-mono text-primary font-medium">{va.routingNumber}</span>
                   </div>
                 )}
               </div>
            </div>
          )) : (
            <p className="text-muted text-sm text-center py-4 bg-surface-container rounded-[16px] border border-outline-variant">No virtual accounts assigned.</p>
          )}
        </div>
      </section>
    </>
  );
}
