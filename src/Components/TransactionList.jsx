
// src/components/TransactionList.jsx
import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const TransactionList = () => {
  const { transactions } = useContext(AppContext);
  const [filterType, setFilterType] = useState('All'); // 'All', 'Income', or 'Expense'
  const [searchTerm, setSearchTerm] = useState('');

  // 1. Filter the transactions based on selected dropdown and search box
  const filteredTransactions = transactions.filter(t => {
    // Check if the dropdown matches
    const matchesType = filterType === 'All' || t.type === filterType;
    
    // Check if the search term is found in description or category
    const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          t.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesType && matchesSearch;
  });

  return (
    <div className="card list-card">
      <div className="list-header">
        <h3>Recent Transactions</h3>
        
        {/* Filtering Controls */}
        <div className="list-controls">
          <input 
            type="text" 
            placeholder="Search by description..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select 
            value={filterType} 
            onChange={(e) => setFilterType(e.target.value)}
            className="type-filter"
          >
            <option value="All">All Types</option>
            <option value="Income">Income Only</option>
            <option value="Expense">Expense Only</option>
          </select>
        </div>
      </div>

      {/* The Data Table */}
      <div className="table-responsive">
        <table className="transaction-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Type</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map(t => (
                <tr key={t.id}>
                  <td>{t.date}</td>
                  <td>{t.description}</td>
                  <td>{t.category}</td>
                  <td>
                    {/* A nice little colored pill badge! */}
                    <span className={`badge ${t.type.toLowerCase()}`}>
                      {t.type}
                    </span>
                  </td>
                  <td className={t.type === 'Income' ? 'positive' : 'negative'}>
                    ${t.amount.toFixed(2)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="empty-message">No transactions match your filters.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionList;
