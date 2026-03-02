const mongoose = require("mongoose");

const DBurl="mongodb+srv://munaf5a1:ocPKFYRTFuVlRFeF@cluster0.aelcpio.mongodb.net/Scaler?appName=Cluster0" 



//How to add Data in our DB

//Schema blue print->model-=>create dat

const courseSchema = new mongoose.Schema({
  name: String,
  creator: String,
  isPublished: Boolean,
  publishedDate: {type: Date, default: Date.now()},
  Ratings: Number
})

//Model- Model is used for create, delete and update data
const CourseModel = mongoose.model("Course", courseSchema);

//Since, mongoose DB is external so, it will take time do the operation
//so, we are using async await function 

async function createCourse() {
  const course = new CourseModel({
    name: 'Python',
    creator:'Mark',
    isPublished: true,
    Ratings: 4.3
  })
  await course.save()
}

mongoose.connect(DBurl, {
    serverSelectionTimeoutMS: 60000,
    socketTimeoutMS: 85000,
  })
  .then(async () => {
    console.log("✅ Connection Successful");
    await createCourse();
    await mongoose.disconnect();
  })
  .catch((err) => {
    console.log("❌ Connection Unsuccessful");
    console.log(err);
  });
