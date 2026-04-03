
// src/context/AppContext.jsx
import React, { createContext, useState, useEffect } from 'react';

// Basic initial data
const initialMockData = [
  { id: '1', date: '2026-04-01', amount: 10000, category: 'Salary', type: 'Income', description: 'Monthly Salary' },
  { id: '2', date: '2026-04-02', amount: 1500, category: 'Housing', type: 'Expense', description: 'Rent' },
  { id: '3', date: '2026-04-05', amount: 200, category: 'Groceries', type: 'Expense', description: 'Supermarket' },
  { id: '4', date: '2026-04-10', amount: 120, category: 'Utilities', type: 'Expense', description: 'Electric Bill' },
  { id: '5', date: '2026-04-15', amount: 300, category: 'Entertainment', type: 'Expense', description: 'Concert Tickets' },
];

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Load from localStorage if it exists, otherwise use mock data
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('transactions');
    return saved ? JSON.parse(saved) : initialMockData;
  });

  const [role, setRole] = useState('VIEWER');
  
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  // Automatically save to localStorage whenever transactions change
  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  // Handle theme changes
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.setAttribute('data-theme', theme); // this applies our dark mode CSS override!
  }, [theme]);

  // Actions
  const addTransaction = (transaction) => {
    setTransactions([transaction, ...transactions]);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <AppContext.Provider value={{
      transactions,
      role,
      theme,
      setRole,
      addTransaction,
      deleteTransaction,
      toggleTheme
    }}>
      {children}
    </AppContext.Provider>
  );
};
