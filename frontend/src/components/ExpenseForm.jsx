import { useState, useEffect } from 'react';
import './ExpenseForm.css';

const ExpenseForm = ({ }) => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    paymentMethod: 'cash'
  });
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: '', color: '#3b82f6', icon: '$' });

  const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div className="expense-form-container">
      <h3>Add New Expense</h3>
      
      <form onSubmit={handleSubmit} className="expense-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="amount">Amount ($)</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              placeholder="0.00"
            />
          </div>
          
        
        <div  className = "form-group">
            <label htmlFor="description">Description</label>
            <input type="text"
            id= "description"
            value={form.description}
            onchange={handleChange}
            required
            placeholder="what did you spend on?"
             /> 
             </div>
    </form>  
 </div>
 
  );
};

export default ExpenseForm;
