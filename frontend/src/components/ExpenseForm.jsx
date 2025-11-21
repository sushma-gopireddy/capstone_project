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
        </div>
          
        
        <div  className = "form-group">
            <label htmlFor="date">Date</label>
            <input type="date"
            id= "date"
            value={formData.date}
            onchange={handleChange}
            required
             /> 
              </div>
             <div classname = "form-group">
                <label htmlFor="description">Description</label>
              <input type = "text"
                      id = "description"
                       name = "description"
                       value = {formData.description}
                       onchange = {handleChange}
                       required placeholder = "what did you spend on?"></input>  
                 </div>

                 <div classname ="form-row">
                    <div classname = "form-group">
                        <label htmlFor="category">Category</label>
                        <div classname = "category-select-wrapper">
                            <select id = "category"
                            name= "category"
                            value={formData.category}
                            onchange = {handleChange}
                            required
                            >
                                <option value="">select category</option>
                            </select>

                            <button type="button"
                            onClick={() => setShowCategoryForm(!showCategoryForm)}
                            classnmae = "btn-add-category"
                            title="add new category"
                            >
                                +
                            </button>
                            <div className = "form-group">
                                <label htmlFor="paymentmethod">payment Method</label>
                                <select id="paymentMethod"
                                name="paymentmethod"
                                value={formData.paymentMethod}
                                onchange={handleChange}>
                                    <option value="cash">cash</option>
                                    <option value="debit">creditcard</option>
                                    <option value="credit"></option>
                                    <option value="upi">UPI</option>
                                    <option value="0ther">Other</option>
                                </select>
                            </div>

                        </div>
                                 <div classname="form-actions">
                                    <button type="submit" classname="btn-submit">
                                        add Expense
                                    </button>
                                 </div>
                    </div>
                 </div>
    </form>  
 </div>
 
  );
};

export default ExpenseForm;
