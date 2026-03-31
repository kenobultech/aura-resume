// models/Resume.ts
import mongoose, { Schema, model, models } from 'mongoose';

const ResumeSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, default: 'My Untitled Resume' },
  templateId: { type: String, required: true }, 
  isPaid: { type: Boolean, default: false },
  paidAt: { type: Date },
  
  // NEW FIELD: Tracks who the resume was unlocked for
  unlockedForName: { type: String, lowercase: true },

  themeColor: { type: String, default: '#1a4c78' }, 

  personalInfo: {
    firstName: String,
    lastName: String,
    role: String, 
    email: String,
    phone: String,
    city: String, 
    country: String, 
    address: String, 
    website: String, 
    summary: String,
    photo: String, 
    linkedin: String,
    twitter: String,
    instagram: String,
    facebook: String,
  },
  
  experience:[{
    id: String,
    jobTitle: String,
    employer: String,
    city: String,
    country: String,
    startDate: String,
    endDate: String,
    description: String, 
  }],
  
  education:[{
    id: String,
    school: String,
    degree: String,
    city: String,
    startDate: String,
    endDate: String,
    description: String,
  }],

  certificates:[{
    id: String,
    name: String,
    issuer: String,
    date: String
  }],
  
  aiAnalysis: {
    score: { type: Number, default: 0 }, 
    summaryFeedback: { type: String }, 
    bulletPointsFeedback: { type: String }, 
    generalSuggestions:[String], 
    lastAnalyzedAt: { type: Date }
  },

  skills: [String], 
  languages: [String], 
  hobbies: [String],

}, { timestamps: true });

export const Resume = models.Resume || model('Resume', ResumeSchema);