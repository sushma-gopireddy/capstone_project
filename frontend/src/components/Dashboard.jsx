import { useState, useEffect } from "react";
import './Dashboard.css';
import ExpenseForm from "./ExpenseForm";
import ExpenseList from './ExpenseList';
import { expenseAPI } from '../services/api';

const Dashboard = ({  }) => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({ totalExpenses: 0, categoryBreakdown: [] });
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    fetchData();
  }, [selectedMonth, selectedYear]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const startDate = new Date(selectedYear, selectedMonth - 1, 1);
      const endDate = new Date(selectedYear, selectedMonth, 0);
      
      const [expensesRes, statsRes] = await Promise.all([
        expenseAPI.getAll({ 
          startDate: startDate.toISOString(), 
          endDate: endDate.toISOString() 
        }),
        expenseAPI.getStats({ month: selectedMonth, year: selectedYear })
      ]);
      
      setExpenses(expensesRes.data);
      setStats(statsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExpenseAdded = async (formData) => {
    try {
      await expenseAPI.create(formData);
      fetchData();
    } catch (error) {
      console.error('Error adding expense:', error);
      throw error;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    onLogout();
  };


  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-left">
          <h1> Expense Tracker</h1>
          <p className="welcome-text">Welcome, Sushma!</p>
        </div>
        
        <div className="header-right">
        </div>
      </header>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
          <div className="summary-cards">
            <div className="summary-card">
              <div className="card-icon">E</div>
              <div className="card-content">
                <h3>Total Expenses</h3>
                <p className="amount">${stats.totalExpenses.toFixed(2)}</p>
              </div>
            </div>
            <div className="summary-card">
              <div className="card-icon">T</div>
              <div className="card-content">
                <h3>Transactions</h3>
                <p className="count">{expenses.length}</p>
              </div>
            </div>
            <div className="summary-card">
              <div className="card-icon">C</div>
              <div className="card-content">
                <h3>Categories</h3>
                <p className="count">{stats.categoryBreakdown.length}</p>
              </div>
            </div>
          </div>

          <div className="dashboard-grid">
            <div className="dashboard-section">
              <ExpenseForm onExpenseAdded={handleExpenseAdded}/>
            </div>
          </div>
          <ExpenseList 
            expenses={expenses} 
          />

        </>
      )}
    </div>
  );
};

export default Dashboard;