const express = require('express');
const articleApi = require('./routes/article');
const authorApi = require('./routes/author');
const newsletterApi = require('./routes/newsletter');
const app = express();
const cors = require('cors');
require('dotenv').config();
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

connectDB(); // Call the connectDB function to establish the database connection

app.use(cors(
  { origin : 'https://blog-b8q5jbvg0-kareemmoataz02.vercel.app' }
));

app.use(express.json());
app.use('/article', articleApi);
app.use('/author', authorApi);
app.use('/newsletter', newsletterApi);
app.use('/getimage', express.static('./uploads'));


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
