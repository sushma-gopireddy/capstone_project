import { useState, useEffect } from 'react';
import { categoryAPI } from '../services/api';
import './ExpenseForm.css';

const ExpenseForm = ({ onExpenseAdded, expenseToEdit, onCancelEdit }) => {
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

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (expenseToEdit) {
      setFormData({
        amount: expenseToEdit.amount,
        description: expenseToEdit.description,
        category: expenseToEdit.category._id,
        date: new Date(expenseToEdit.date).toISOString().split('T')[0],
        paymentMethod: expenseToEdit.paymentMethod
      });
    }
  }, [expenseToEdit]);

  const fetchCategories = async () => {
    try {
      const response = await categoryAPI.getAll();
      setCategories(response.data);
      if (response.data.length > 0 && !formData.category) {
        setFormData(prev => ({ ...prev, category: response.data[0]._id }));
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onExpenseAdded(formData);
      setFormData({
        amount: '',
        description: '',
        category: categories[0]?._id || '',
        date: new Date().toISOString().split('T')[0],
        paymentMethod: 'cash'
      });
      if (onCancelEdit) onCancelEdit();
    } catch (error) {
      console.error('Error submitting expense:', error);
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      await categoryAPI.create(newCategory);
      setNewCategory({ name: '', color: '#3b82f6', icon: '💰' });
      setShowCategoryForm(false);
      fetchCategories();
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  return (
    <div className="expense-form-container">
      <h3>{expenseToEdit ? 'Edit Expense' : 'Add New Expense'}</h3>
      
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
                        {showCategoryForm && (
                        <div className="new-category-form">
                            <h4>Add New Category</h4>
                            <div className="form-row">
                            <input
                                type="text"
                                placeholder="Category name"
                                value={newCategory.name}
                                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Icon (emoji)"
                                value={newCategory.icon}
                                onChange={(e) => setNewCategory({ ...newCategory, icon: e.target.value })}
                                maxLength="2"
                            />
                            <input
                                type="color"
                                value={newCategory.color}
                                onChange={(e) => setNewCategory({ ...newCategory, color: e.target.value })}
                            />
                            <button type="button" onClick={handleAddCategory} className="btn-save-category">
                                Save
                            </button>
                            </div>
                        </div>
                        )}
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
