// username : ashokranka30
// password : E_Bjh3jTSFSh5bk
// connection string : "mongodb+srv://ashokranka30:E_Bjh3jTSFSh5bk@cluster0.zv0qp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://ashokranka30:E_Bjh3jTSFSh5bk@cluster0.zv0qp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/devtinder"
  );
};
module.exports = connectDB;
