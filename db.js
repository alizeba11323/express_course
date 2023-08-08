const mongoose = require("mongoose");
const url = "mongodb://127.0.0.1:27017/postnewDB";

const ConnectDB = async () => {
  try {
    await mongoose.connect(url);
    console.log("DB Connected...");
  } catch (err) {
    console.log(err.message);
  }
};
module.exports = ConnectDB;
