const mongoose = require("mongoose");

const DBurl="mongodb+srv://abdulmunaf1226_db_user:qKstGAbSt8g9avEo@cluster0.uh2p9ui.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

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


