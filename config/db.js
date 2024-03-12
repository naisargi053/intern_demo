const mongoose = require("mongoose");

const db = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.Mongo_URL);
    console.log("Database connected");
  } catch (error) {
    console.log("DB connection error");
  }
};
module.exports = { db };

