import { useState, useEffect } from "react";
import './Dashboard.css';
import ExpenseForm from "./ExpenseForm";

const Dashboard = ({  }) => {
  const [loading, setLoading] = useState(false);


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
                <p className="amount">0</p>
              </div>
            </div>
            <div className="summary-card">
              <div className="card-icon">T</div>
              <div className="card-content">
                <h3>Transactions</h3>
                <p className="count">0</p>
              </div>
            </div>
            <div className="summary-card">
              <div className="card-icon">C</div>
              <div className="card-content">
                <h3>Categories</h3>
                <p className="count">0</p>
              </div>
            </div>
          </div>

          <div className="dashboard-grid">
            <div className="dashboard-section">
              <ExpenseForm />
            </div>
          </div>

        </>
      )}
    </div>
  );
};

export default Dashboard;