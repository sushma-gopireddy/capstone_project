import { useState } from 'react';
import './ExpenseList.css';

const ExpenseList = ({ expenses }) => {

  return (
    <div className="expense-list-container">
      <h3>Recent Expenses</h3>
       <div className="no-expenses">
          <p>No expenses found. Start by adding your first expense!</p>
        </div>
    </div>
  );
};

export default ExpenseList;
