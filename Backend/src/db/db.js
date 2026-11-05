const mongoose = require("mongoose");

async function connectDB() {
  await mongoose.connect(process.env.MONGODB_URL);
  try {
    console.log("MongoDb is Connected ");
  } catch (error) {
    console.log("MongoDb is Disconnected");
  }
}

module.exports = connectDB