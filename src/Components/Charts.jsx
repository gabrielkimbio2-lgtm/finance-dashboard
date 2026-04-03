// src/components/Charts.jsx
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Charts = () => {
  const { transactions } = useContext(AppContext);

  // --- 1. Prepare Data for Bar Chart (Balance Trend) ---
  const sortedTransactions = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));
  let runningBalance = 0;
  const trendData = sortedTransactions.map(t => {
    runningBalance += t.type === 'Income' ? t.amount : -t.amount;
    // .slice(5) cuts '2026-04-01' down to '04-01' for cleaner labels
    return { date: t.date.slice(5), balance: runningBalance }; 
  });

  // Find max balance so we know how tall to draw our highest bar (fallback to 1 to avoid dividing by 0)
  const maxBalance = Math.max(...trendData.map(d => d.balance), 1);

  // --- 2. Prepare Data for Horizontal Bars (Expenses by Category) ---
  const expensesOnly = transactions.filter(t => t.type === 'Expense');
  const categoryTotals = {};
  let totalExpense = 0;
  
  expensesOnly.forEach(t => {
    categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
    totalExpense += t.amount;
  });

  const categories = Object.keys(categoryTotals).map(key => ({
    name: key,
    amount: categoryTotals[key],
    percentage: ((categoryTotals[key] / (totalExpense || 1)) * 100).toFixed(0)
  }));

  return (
    <div className="charts-container">
      
      {/* Balance Trend (Custom Vertical Bar Chart) */}
      <div className="card chart-card">
        <h3>Balance Trend</h3>
        <div className="custom-chart-area">
          {trendData.map((data, index) => {
            // Calculate height percentage, making sure bar is at least 5% visibly tall
            const heightPercent = Math.max((data.balance / maxBalance) * 100, 5); 
            return (
              <div key={index} className="bar-wrapper">
                <div 
                  className="bar" 
                  style={{ height: `${heightPercent}%` }}
                  title={`$${data.balance}`}
                ></div>
                <span className="bar-label">{data.date}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Expenses by Category (Custom Horizontal Progress Bars) */}
      <div className="card chart-card">
        <h3>Expenses by Category</h3>
        <div className="category-list">
          {categories.map((cat, index) => (
            <div key={index} className="category-item">
              <div className="category-header">
                <span>{cat.name}</span>
                <span>${cat.amount} ({cat.percentage}%)</span>
              </div>
              <div className="progress-bar-bg">
                <div 
                  className="progress-bar-fill" 
                  style={{ width: `${cat.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Charts;
