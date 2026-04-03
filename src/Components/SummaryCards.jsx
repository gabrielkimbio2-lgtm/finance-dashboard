
// src/components/SummaryCards.jsx
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const SummaryCards = () => {
  const { transactions } = useContext(AppContext);

  // Calculate Total Income
  const totalIncome = transactions
    .filter(t => t.type === 'Income')
    .reduce((sum, t) => sum + t.amount, 0);

  // Calculate Total Expenses
  const totalExpense = transactions
    .filter(t => t.type === 'Expense')
    .reduce((sum, t) => sum + t.amount, 0);

  // Calculate Balance
  const balance = totalIncome - totalExpense;

  return (
    <div className="summary-cards-container">
      {/* Balance Card */}
      <div className="card summary-card">
        <h3>Total Balance</h3>
        <p className={balance >= 0 ? 'positive' : 'negative'}>
          ${balance.toFixed(2)}
        </p>
      </div>

      {/* Income Card */}
      <div className="card summary-card">
        <h3>Total Income</h3>
        <p className="positive">+${totalIncome.toFixed(2)}</p>
      </div>

      {/* Expense Card */}
      <div className="card summary-card">
        <h3>Total Expenses</h3>
        <p className="negative">-${totalExpense.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default SummaryCards;
