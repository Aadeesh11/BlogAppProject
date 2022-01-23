const mongoose = require("mongoose");

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI);
  console.log(`mongo COnnected------------------------------------`);
};

module.exports = { connectDB };
