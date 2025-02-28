const mongoose = require("mongoose");

const db = async () => {
  try {
    await mongoose.connect(`${process.env.URI}`);
    console.log("connected to Database")
  } catch (error) {
    console.error(error);
  }
};
db();