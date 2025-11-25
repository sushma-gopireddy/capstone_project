# Expense Tracker - Full Stack Application

A full-stack expense tracking application built with React, Node.js, Express, and MongoDB.

## Features

-  User authentication (Register/Login)
-  Add, edit, and delete expenses
-  Custom categories with icons and colors
-  Multiple payment methods
-  Monthly expense tracking

## Tech Stack

### Frontend
- ReactJS
- Axios for API calls
- CSS3 for styling
- Vite as build tool

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (MongoDB Atlas)
- npm

### Backend Setup

1. Navigate to the server directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the server directory:
```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster0.oglnz4m.mongodb.net/expenses?appName=ClusterName
```

4. Start the server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the client directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## Usage

1. **Register/Login**: Create a new account or login with existing credentials
2. **Add Expenses**: Add new expenses
2. **Add Categories**: Create custom categories with icons and colors
3. **Track Expenses**: Add your daily expenses with descriptions and payment methods
4. **Filter by Month**: View expenses for different months/years

## API Endpoints

### Expenses
- `GET /api/expenses` - Get all expenses (with filters)
- `POST /api/expenses` - Create new expense
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense
- `GET /api/expenses/stats` - Get expense statistics

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create new category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

## Project Structure

```
expense-tracker/
├── frontend/            # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── services/    # API service layer
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
├── backend/            # Node.js backend
│   ├── config/         # Database configuration
│   ├── controllers/    # Route controllers
│   ├── models/         # MongoDB models
│   ├── routes/         # API routes
│   ├── middleware/     # Custom middleware
│   ├── server.js       # Entry point
│   └── package.json
└── README.md
```


## Future Enhancements
- Charts
- Budget Alerts
- Export expenses to CSV/PDF
- Multiple currency support
- Mobile app version
-  Analytics and reports

