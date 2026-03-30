import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/motosdb');
    console.log('MongoDB conectado: motosdb');
  } catch (error) {
    console.error('Erro MongoDB:', error.message);
    process.exit(1);
  }
};

export default connectDB;
