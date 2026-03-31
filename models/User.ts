import mongoose, { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  name: { type: String },
  email: { type: String, unique: true },
  image: { type: String },
  emailVerified: { type: Date },
  
  // Existing Fields
  credits: {
    corporate: { type: Number, default: 0 },
    creative: { type: Number, default: 0 },
    basic: { type: Number, default: 0 },
    pro: { type: Number, default: 0 },
    multi: { type: Number, default: 0 },
  },
  isAdmin: { type: Boolean, default: false },

  // NEW FIELD: Track newsletter subscription
  isSubscribed: { type: Boolean, default: false },

}, { timestamps: true });

export const User = models.User || model('User', UserSchema);