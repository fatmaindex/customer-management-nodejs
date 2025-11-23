const mongoose = require('mongoose');

async function connectDB() {
  try {
    await mongoose.connect(
"mongodb+srv://fatmagamal:PRYHWRhwcFySi5ND@cluster0.e9cwbhd.mongodb.net/?appName=Cluster0"
    );
    console.log('✅ MongoDB connected successfully');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  }
}

module.exports = connectDB;
