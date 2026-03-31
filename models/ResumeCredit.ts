import mongoose, { Schema, model, models } from "mongoose";

const ResumeCreditSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  templateId: { type: String, required: true },
  remainingCredits: { type: Number, default: 0 },
  lastPaymentAt: { type: Date, default: null }, // When credits were last purchased
}, { timestamps: true });

export const ResumeCredit = models.ResumeCredit || model("ResumeCredit", ResumeCreditSchema);