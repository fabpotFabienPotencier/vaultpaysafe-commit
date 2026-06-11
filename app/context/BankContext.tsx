"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type VirtualAccount = {
  id: string;
  currency: 'USD' | 'EUR';
  accountNumber: string;
  routingNumber?: string;
  bankName: string;
};

export type VirtualCard = {
  id: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
  brand: 'Visa' | 'Mastercard';
  status: 'Active' | 'Frozen';
};

export type User = {
  id: string;
  name: string;
  email: string;
  balances: {
    USD: number;
    EUR: number;
  };
  virtualAccounts: VirtualAccount[];
  virtualCards: VirtualCard[];
  withdrawalsLocked: boolean;
};

type BankContextType = {
  currentUser: User | null;
  users: User[];
  login: (email: string) => void;
  logout: () => void;
  signup: (name: string, email: string) => void;
  // Admin functions
  loadFunds: (userId: string, currency: 'USD' | 'EUR', amount: number) => void;
  toggleWithdrawalLock: (userId: string) => void;
  assignVirtualAccount: (userId: string, currency: 'USD' | 'EUR') => void;
  generateVirtualCard: (userId: string) => void;
};

const defaultUsers: User[] = [
  {
    id: "user_1",
    name: "John Doe",
    email: "john@example.com",
    balances: { USD: 1500.00, EUR: 350.00 },
    virtualAccounts: [
      { id: "va_1", currency: 'USD', accountNumber: "1234567890", routingNumber: "098765432", bankName: "VaultBank US" }
    ],
    virtualCards: [
      { id: "vc_1", cardNumber: "4111 1111 1111 1234", expiry: "12/28", cvv: "123", brand: "Visa", status: 'Active' }
    ],
    withdrawalsLocked: false
  }
];

const BankContext = createContext<BankContextType | undefined>(undefined);

export const BankProvider = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState<User[]>(defaultUsers);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Persistence simulation (localStorage could be used, but keeping it simple memory for now)

  const login = (email: string) => {
    const user = users.find(u => u.email === email);
    if (user) {
      setCurrentUser(user);
    } else {
      alert("User not found");
    }
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const signup = (name: string, email: string) => {
    const newUser: User = {
      id: `user_${Date.now()}`,
      name,
      email,
      balances: { USD: 0, EUR: 0 },
      virtualAccounts: [],
      virtualCards: [],
      withdrawalsLocked: false
    };
    setUsers([...users, newUser]);
    setCurrentUser(newUser);
  };

  const loadFunds = (userId: string, currency: 'USD' | 'EUR', amount: number) => {
    setUsers(users.map(u => {
      if (u.id === userId) {
        return { ...u, balances: { ...u.balances, [currency]: u.balances[currency] + amount } };
      }
      return u;
    }));
    // Also update current user if needed
    if (currentUser?.id === userId) {
      setCurrentUser(prev => prev ? { ...prev, balances: { ...prev.balances, [currency]: prev.balances[currency] + amount } } : null);
    }
  };

  const toggleWithdrawalLock = (userId: string) => {
    setUsers(users.map(u => {
      if (u.id === userId) {
        return { ...u, withdrawalsLocked: !u.withdrawalsLocked };
      }
      return u;
    }));
    if (currentUser?.id === userId) {
      setCurrentUser(prev => prev ? { ...prev, withdrawalsLocked: !prev.withdrawalsLocked } : null);
    }
  };

  const assignVirtualAccount = (userId: string, currency: 'USD' | 'EUR') => {
    const newAccount: VirtualAccount = {
      id: `va_${Date.now()}`,
      currency,
      accountNumber: Math.floor(Math.random() * 10000000000).toString().padStart(10, '0'),
      routingNumber: currency === 'USD' ? "121000358" : undefined,
      bankName: currency === 'USD' ? "VaultBank US" : "VaultBank Europe"
    };
    setUsers(users.map(u => {
      if (u.id === userId) {
        return { ...u, virtualAccounts: [...u.virtualAccounts, newAccount] };
      }
      return u;
    }));
    if (currentUser?.id === userId) {
      setCurrentUser(prev => prev ? { ...prev, virtualAccounts: [...prev.virtualAccounts, newAccount] } : null);
    }
  };

  const generateVirtualCard = (userId: string) => {
    const newCard: VirtualCard = {
      id: `vc_${Date.now()}`,
      cardNumber: `4${Math.floor(Math.random() * 1000000000000000).toString().padStart(15, '0')}`,
      expiry: `12/${new Date().getFullYear() + 4 - 2000}`,
      cvv: Math.floor(Math.random() * 1000).toString().padStart(3, '0'),
      brand: 'Visa',
      status: 'Active'
    };
    setUsers(users.map(u => {
      if (u.id === userId) {
        return { ...u, virtualCards: [...u.virtualCards, newCard] };
      }
      return u;
    }));
    if (currentUser?.id === userId) {
      setCurrentUser(prev => prev ? { ...prev, virtualCards: [...prev.virtualCards, newCard] } : null);
    }
  };

  return (
    <BankContext.Provider value={{
      currentUser, users, login, logout, signup,
      loadFunds, toggleWithdrawalLock, assignVirtualAccount, generateVirtualCard
    }}>
      {children}
    </BankContext.Provider>
  );
};

export const useBank = () => {
  const context = useContext(BankContext);
  if (context === undefined) {
    throw new Error("useBank must be used within a BankProvider");
  }
  return context;
};
