const mongoose = require("mongoose");

const connectDB = async () => {
  const development = JSON.parse(process.env.DEVELOPMENT);
  const local = "mongodb://localhost:27017/marzone";
  const remote = `mongodb+srv://kareemmoataz13:${process.env.MONGODB_PASSWORD}@cluster0.ptqqlb4.mongodb.net/?retryWrites=true&w=majority`;
  const url = development ? local : remote;

  try {
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log("Error connecting to MongoDB", err);
  }
};

module.exports = connectDB;
