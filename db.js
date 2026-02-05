const mongoose = require("mongoose");

//const DBurl="?retryWrites=true&w=majority&appName=Cluster0"

mongoose
  .connect(DBurl)
  .then(() => {
    console.log("Connection Successful");
  })
  .catch(() => {
    console.log("Connection Unsuccesful");
  });

//Course Schema

const courseSchema = new mongoose.Schema({
    name: String,
    creator: String,
    isPublished: Boolean,
    publishedDate: {type: Date, default: Date.now},
    ratings: Number
});


