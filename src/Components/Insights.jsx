
// src/components/Insights.jsx
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Insights = () => {
  const { transactions } = useContext(AppContext);

  const expensesOnly = transactions.filter(t => t.type === 'Expense');

  // Algorithm 1: Find Highest Spending Category
  const categoryTotals = {};
  expensesOnly.forEach(t => {
    categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
  });
  
  let topCategory = 'None yet';
  let topCategoryAmount = 0;
  
  for (const category in categoryTotals) {
    if (categoryTotals[category] > topCategoryAmount) {
      topCategoryAmount = categoryTotals[category];
      topCategory = category;
    }
  }

  // Algorithm 2: Find the Largest Single Expense Transaction
  let largestSingleExpense = null;
  if (expensesOnly.length > 0) {
    largestSingleExpense = expensesOnly.reduce((prev, current) => 
      (prev.amount > current.amount) ? prev : current
    );
  }

  // Algorithm 3: Check if they saved money overall
  const savedThisMonth = transactions
    .filter(t => t.type === 'Income')
    .reduce((sum, t) => sum + t.amount, 0) - 
    expensesOnly.reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="card insights-card">
      <h3>Quick Insights 💡</h3>
      <div className="insights-grid">
        
        {/* Insight 1 */}
        <div className="insight-item">
          <p className="insight-label">Top Spending Category</p>
          <p className="insight-value">{topCategory}</p>
          <p className="insight-subtext">${topCategoryAmount.toFixed(2)} total</p>
        </div>

        {/* Insight 2 */}
        <div className="insight-item">
          <p className="insight-label">Largest Single Expense</p>
          <p className="insight-value">{largestSingleExpense ? largestSingleExpense.description : 'N/A'}</p>
          <p className="insight-subtext">${largestSingleExpense ? largestSingleExpense.amount.toFixed(2) : '0.00'}</p>
        </div>

        {/* Insight 3 */}
        <div className="insight-item">
          <p className="insight-label">Net Savings Check</p>
          <p className={`insight-value ${savedThisMonth >= 0 ? 'positive' : 'negative'}`}>
            {savedThisMonth >= 0 ? 'Surplus' : 'Deficit'}
          </p>
          <p className="insight-subtext">
            ${Math.abs(savedThisMonth).toFixed(2)} {savedThisMonth >= 0 ? 'saved' : 'overspent'}
          </p>
        </div>

      </div>
    </div>
  );
};

export default Insights;
