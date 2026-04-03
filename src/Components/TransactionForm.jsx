
// src/components/TransactionForm.jsx
import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';

const TransactionForm = () => {
  const { role, addTransaction } = useContext(AppContext);

  // Form State
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('Expense');
  const [category, setCategory] = useState('Groceries');

  // ROLE CHECK: ONLY Admins are allowed to see and use this form!
  // If the user is a Viewer, this component renders absolutely nothing.
  if (role !== 'ADMIN') {
    return null; 
  }

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents page reload
    if (!description || !amount) return; // Simple validation

    // Construct the new transaction object
    const newTransaction = {
      id: Date.now().toString(), // Simple trick to get a unique ID
      date: new Date().toISOString().split('T')[0], // Grabs today's date (YYYY-MM-DD)
      description,
      amount: parseFloat(amount),
      category,
      type
    };

    // Save it to Context!
    addTransaction(newTransaction);
    
    // Clear the form for the next entry
    setDescription('');
    setAmount('');
  };

  return (
    <div className="card form-card">
      <h3>Admin Area: Add New Transaction</h3>
      
      <form onSubmit={handleSubmit} className="transaction-form">
        <div className="form-group">
          <label>Description</label>
          <input 
            type="text" 
            value={description} 
            onChange={e => setDescription(e.target.value)} 
            placeholder="e.g. Coffee"
            required
          />
        </div>

        <div className="form-group">
          <label>Amount ($)</label>
          <input 
            type="number" 
            step="0.01" 
            value={amount} 
            onChange={e => setAmount(e.target.value)} 
            placeholder="5.00"
            required
          />
        </div>

        <div className="form-group">
          <label>Type</label>
          <select value={type} onChange={e => setType(e.target.value)}>
            <option value="Expense">Expense</option>
            <option value="Income">Income</option>
          </select>
        </div>

        <div className="form-group">
          <label>Category</label>
          <select value={category} onChange={e => setCategory(e.target.value)}>
            {type === 'Expense' ? (
              <>
                <option value="Groceries">Groceries</option>
                <option value="Housing">Housing</option>
                <option value="Utilities">Utilities</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Other">Other</option>
              </>
            ) : (
              <>
                <option value="Salary">Salary</option>
                <option value="Bonus">Bonus</option>
                <option value="Other">Other</option>
              </>
            )}
          </select>
        </div>

        <button type="submit" className="submit-btn">+ Add</button>
      </form>
    </div>
  );
};

export default TransactionForm;
