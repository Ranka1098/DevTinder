// username : ashokranka30
// password : E_Bjh3jTSFSh5bk
// connection = "mongodb+srv://ashokranka30:E_Bjh3jTSFSh5bk@cluster0.zv0qp.mongodb.net/"

const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://ashokranka30:E_Bjh3jTSFSh5bk@cluster0.zv0qp.mongodb.net/devTinder"
  );
};
module.exports = connectDB;
