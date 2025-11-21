import mongoose, { Document, Schema } from 'mongoose';

export interface IQuote extends Document {
  name: string;
  email: string;
  phone: string;
  company?: string;
  services: string[];
  projectDescription: string;
  budget?: string;
  timeline?: string;
  status: 'pending' | 'reviewed' | 'quoted' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

const QuoteSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    company: {
      type: String,
      trim: true,
    },
    services: {
      type: [String],
      required: [true, 'At least one service is required'],
      validate: {
        validator: function(v: string[]) {
          return v && v.length > 0;
        },
        message: 'Please select at least one service',
      },
    },
    projectDescription: {
      type: String,
      required: [true, 'Project description is required'],
      trim: true,
    },
    budget: {
      type: String,
      trim: true,
    },
    timeline: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['pending', 'reviewed', 'quoted', 'rejected'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IQuote>('Quote', QuoteSchema);
