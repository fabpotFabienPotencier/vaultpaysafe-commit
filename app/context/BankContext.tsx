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

export type Transaction = {
  id: string;
  type: 'Deposit' | 'Withdrawal' | 'Transfer' | 'Payment';
  amount: number;
  currency: 'USD' | 'EUR';
  date: string;
  description: string;
  status: 'Completed' | 'Pending' | 'Failed';
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
  transactions: Transaction[];
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
  addTransaction: (userId: string, transaction: Omit<Transaction, 'id' | 'date' | 'status'>) => void;
  transferFunds: (fromUserId: string, toEmail: string, amount: number, currency: 'USD' | 'EUR') => { success: boolean; message: string };
  convertCurrency: (userId: string, fromCurrency: 'USD' | 'EUR', toCurrency: 'USD' | 'EUR', amount: number) => { success: boolean; message: string };
  toggleCardStatus: (userId: string, cardId: string) => void;
  updateProfile: (userId: string, name: string) => void;
  isLoaded: boolean;
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
    transactions: [
      { id: "tx_1", type: "Deposit", amount: 1500, currency: "USD", date: new Date().toISOString(), description: "Initial Deposit", status: "Completed" }
    ],
    withdrawalsLocked: false
  }
];

const BankContext = createContext<BankContextType | undefined>(undefined);

export const BankProvider = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState<User[]>(defaultUsers);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const storedUsers = localStorage.getItem('vaultpaysafe_users');
    const storedCurrentUser = localStorage.getItem('vaultpaysafe_currentUser');
    if (storedUsers) setUsers(JSON.parse(storedUsers));
    if (storedCurrentUser) setCurrentUser(JSON.parse(storedCurrentUser));
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('vaultpaysafe_users', JSON.stringify(users));
      if (currentUser) {
        localStorage.setItem('vaultpaysafe_currentUser', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('vaultpaysafe_currentUser');
      }
    }
  }, [users, currentUser, isLoaded]);

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
      transactions: [],
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

  const addTransaction = (userId: string, transaction: Omit<Transaction, 'id' | 'date' | 'status'>) => {
    const newTx: Transaction = {
      ...transaction,
      id: `tx_${Date.now()}`,
      date: new Date().toISOString(),
      status: 'Completed'
    };
    
    setUsers(users.map(u => {
      if (u.id === userId) {
        return { ...u, transactions: [newTx, ...u.transactions] };
      }
      return u;
    }));
    
    if (currentUser?.id === userId) {
      setCurrentUser(prev => prev ? { ...prev, transactions: [newTx, ...prev.transactions] } : null);
    }
  };

  const transferFunds = (fromUserId: string, toEmail: string, amount: number, currency: 'USD' | 'EUR') => {
    const sender = users.find(u => u.id === fromUserId);
    const receiver = users.find(u => u.email === toEmail);
    
    if (!sender) return { success: false, message: "Sender not found." };
    if (!receiver) return { success: false, message: "Recipient not found." };
    if (sender.id === receiver.id) return { success: false, message: "Cannot transfer to yourself." };
    if (sender.balances[currency] < amount) return { success: false, message: "Insufficient funds." };
    
    loadFunds(sender.id, currency, -amount);
    loadFunds(receiver.id, currency, amount);
    
    addTransaction(sender.id, { type: 'Transfer', amount, currency, description: `Sent to ${receiver.name}` });
    addTransaction(receiver.id, { type: 'Transfer', amount, currency, description: `Received from ${sender.name}` });
    
    return { success: true, message: "Transfer successful." };
  };

  const convertCurrency = (userId: string, fromCurrency: 'USD' | 'EUR', toCurrency: 'USD' | 'EUR', amount: number) => {
    const user = users.find(u => u.id === userId);
    if (!user) return { success: false, message: "User not found." };
    if (user.balances[fromCurrency] < amount) return { success: false, message: "Insufficient funds." };
    if (fromCurrency === toCurrency) return { success: false, message: "Same currency." };

    // Mock rates
    const rate = fromCurrency === 'USD' ? 0.92 : 1.08;
    const converted = amount * rate;

    loadFunds(userId, fromCurrency, -amount);
    loadFunds(userId, toCurrency, converted);

    addTransaction(userId, { type: 'Transfer', amount, currency: fromCurrency, description: `Exchanged to ${toCurrency}` });
    
    return { success: true, message: "Exchange successful." };
  };

  const toggleCardStatus = (userId: string, cardId: string) => {
    setUsers(users.map(u => {
      if (u.id === userId) {
        return {
          ...u,
          virtualCards: u.virtualCards.map(c => c.id === cardId ? { ...c, status: c.status === 'Active' ? 'Frozen' : 'Active' } : c)
        };
      }
      return u;
    }));
    
    if (currentUser?.id === userId) {
      setCurrentUser(prev => prev ? {
        ...prev,
        virtualCards: prev.virtualCards.map(c => c.id === cardId ? { ...c, status: c.status === 'Active' ? 'Frozen' : 'Active' } : c)
      } : null);
    }
  };

  const updateProfile = (userId: string, name: string) => {
    setUsers(users.map(u => u.id === userId ? { ...u, name } : u));
    if (currentUser?.id === userId) {
      setCurrentUser(prev => prev ? { ...prev, name } : null);
    }
  };

  return (
    <BankContext.Provider value={{
      currentUser, users, login, logout, signup,
      loadFunds, toggleWithdrawalLock, assignVirtualAccount, generateVirtualCard, addTransaction,
      transferFunds, convertCurrency, toggleCardStatus, updateProfile, isLoaded
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
