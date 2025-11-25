import { useState } from 'react';
import { expenseAPI } from '../services/api';
import './ExpenseList.css';


const ExpenseList = ({ expenses, onExpenseDeleted, onExpenseUpdated }) => {
  const [editingId, setEditingId] = useState(null);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        await expenseAPI.delete(id);
        onExpenseDeleted();
      } catch (error) {
        console.error('Error deleting expense:', error);
      }
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="expense-list-container">
      <h3>Recent Expenses</h3>
      {expenses.length === 0 ? (
        <div className="no-expenses">
          <p>No expenses found. Start by adding your first expense!</p>
        </div>
      ) : (
        <div className="expense-list">
          {expenses.map((expense) => (
            <div key={expense._id} className="expense-item">
              <div className="expense-icon" style={{ background: expense.category?.color || '#3b82f6' }}>
                {expense.category?.icon || '💰'}
              </div>
              
              <div className="expense-details">
                <h4>{expense.description}</h4>
                <div className="expense-meta">
                  <span className="category-name">{expense.category?.name}</span>
                  <span className="separator">•</span>
                  <span className="expense-date">{formatDate(expense.date)}</span>
                  <span className="separator">•</span>
                  <span className="payment-method">{expense.paymentMethod}</span>
                </div>
              </div>
              
              <div className="expense-amount">
                ${expense.amount.toFixed(2)}
              </div>
              
              <div className="expense-actions">
                <button
                  onClick={() => handleDelete(expense._id)}
                  className="btn-delete"
                  title="Delete expense"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExpenseList;

