import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongooseURI = process.env.MONGODB_URI || '';

const connectDB = async () => {
  try {
    await mongoose.connect(mongooseURI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    throw error;
  }
};

export default connectDB;