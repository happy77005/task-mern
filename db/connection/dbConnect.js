import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    let mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
      throw new Error('MONGO_URI is not defined in environment variables');
    }

    // Clean the URI (remove whitespace and accidental quotes)
    mongoURI = mongoURI.trim().replace(/^["'](.+)["']$/, '$1');

    const usernameMatch = mongoURI.match(/\/\/([^:]+):/);
    const hostMatch = mongoURI.match(/@([^/?]+)/);
    const username = usernameMatch ? usernameMatch[1] : 'unknown';
    const host = hostMatch ? hostMatch[1] : 'unknown';

    console.log(`Connecting to MongoDB Atlas...`);
    console.log(`User: ${username}`);
    console.log(`Host: ${host}`);

    await mongoose.connect(mongoURI);

    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

export const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log('MongoDB disconnected');
  } catch (error) {
    console.error('MongoDB disconnect error:', error.message);
    process.exit(1);
  }
};
