// models/Transactions.ts
import mongoose, { Schema, model, models } from 'mongoose';

const TransactionSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  reference: { type: String, required: true, unique: true },
  amount: { type: Number, required: true },
  status: { type: String, default: "pending" }, // "pending", "success", "failed"
  
  plan: { type: String, required: true }, // "bundle" or "single"
  
  // NEW: Which bucket does this bundle go into?
  // Values: "corporate", "creative", "basic", "pro", or "multi"
  targetCategory: { type: String }, 
  
  creditsPurchased: { type: Number, default: 0 },
  resumeId: { type: Schema.Types.ObjectId, ref: 'Resume' }, // Only for "single" plans
}, { timestamps: true });

export const Transaction = models.Transaction || model('Transaction', TransactionSchema);