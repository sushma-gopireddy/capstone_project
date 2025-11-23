import Expense from '../models/Expenses.js';

// Get all expenses for a user
export async function getExpenses(req, res) {
  try {
    const { startDate, endDate, category } = req.query;
    
    let query = { userId: req.user.id };
    
    // Filter by date range
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }
    
    // Filter by category
    if (category) {
      query.category = category;
    }
    
    const expenses = await Expense.find(query)
      .populate('category')
      .sort({ date: -1 });
    
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Create new expense
export async function createExpense(req, res) {
  try {
    const { amount, description, category, date, paymentMethod } = req.body;
    
    const expense = new Expense({
      amount,
      description,
      category,
      date: date || Date.now(),
      paymentMethod,
      userId: req.user.id
    });
    
    const savedExpense = await expense.save();
    const populatedExpense = await Expense.findById(savedExpense._id).populate('category');
    
    res.status(201).json(populatedExpense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Update expense
export async function updateExpense(req, res) {
  try {
    const { id } = req.params;
    const { amount, description, category, date, paymentMethod } = req.body;
    
    const expense = await Expense.findOne({ _id: id, userId: req.user.id });
    
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    
    if (amount) expense.amount = amount;
    if (description) expense.description = description;
    if (category) expense.category = category;
    if (date) expense.date = date;
    if (paymentMethod) expense.paymentMethod = paymentMethod;
    
    const updatedExpense = await expense.save();
    const populatedExpense = await Expense.findById(updatedExpense._id).populate('category');
    
    res.json(populatedExpense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Delete expense
export async function deleteExpense(req, res) {
  try {
    const { id } = req.params;
    
    const expense = await Expense.findOneAndDelete({ _id: id, userId: req.user.id });
    
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    
    res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Get expense statistics
export async function getExpenseStats(req, res) {
  try {
    const { month, year } = req.query;
    const currentMonth = month || new Date().getMonth() + 1;
    const currentYear = year || new Date().getFullYear();
    
    const startDate = new Date(currentYear, currentMonth - 1, 1);
    const endDate = new Date(currentYear, currentMonth, 0, 23, 59, 59);
    
    // Total expenses
    const totalExpenses = await aggregate([
      {
        $match: {
          userId: req.user.id,
          date: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' }
        }
      }
    ]);
    
    // Expenses by category
    const categoryExpenses = await Expense.aggregate([
      {
        $match: {
          userId: req.user.id,
          date: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: '$category',
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: 'categories',
          localField: '_id',
          foreignField: '_id',
          as: 'categoryInfo'
        }
      },
      {
        $unwind: '$categoryInfo'
      }
    ]);
    
    res.json({
      totalExpenses: totalExpenses[0]?.total || 0,
      categoryBreakdown: categoryExpenses
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
