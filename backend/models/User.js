import { Schema, model } from 'mongoose';
import { hash, compare } from 'bcryptjs';

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await hash(this.password, 10);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await compare(candidatePassword, this.password);
};

export default model('User', userSchema);
