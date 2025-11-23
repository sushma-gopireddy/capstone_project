import { Schema, model } from 'mongoose';

const expenseSchema = new Schema({
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'credit', 'debit', 'upi', 'other'],
    default: 'cash'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default model('Expense', expenseSchema);
