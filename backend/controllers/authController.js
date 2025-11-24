import User from '../models/User.js';
import Category from '../models/Category.js';
import pkg from 'jsonwebtoken';
const { sign } = pkg;

// Generate JWT token
const generateToken = (userId) => {
  return sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

// Create default categories for new user
const createDefaultCategories = async (userId) => {
  const defaultCategories = [
    { name: 'Food & Dining', icon: 'F', color: '#ef4444', userId },
    { name: 'Transportation', icon: 'T', color: '#3b82f6', userId },
    { name: 'Shopping', icon: 'S', color: '#ec4899', userId },
    { name: 'Entertainment', icon: 'E', color: '#8b5cf6', userId },
    { name: 'Bills & Utilities', icon: 'B', color: '#f59e0b', userId },
    { name: 'Healthcare', icon: 'H', color: '#10b981', userId },
    { name: 'Education', icon: 'D', color: '#6366f1', userId },
    { name: 'Travel', icon: 'V', color: '#06b6d4', userId },
    { name: 'Personal Care', icon: 'C', color: '#d946ef', userId },
    { name: 'Other', icon: 'O', color: '#64748b', userId }
  ];

  await Category.insertMany(defaultCategories);
};

// Register new user
export async function register(req, res) {
  try {
    const { name, email, password } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Create new user
    const user = new User({ name, email, password });
    await user.save();
    
    // Create default categories for the new user
    await createDefaultCategories(user._id);
    
    // Generate token
    const token = generateToken(user._id);
    
    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Login user
export async function login(req, res) {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Generate token
    const token = generateToken(user._id);
    
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Get current user
export async function getMe(req, res) {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
