const express = require("express");
// const morgan = require("morgan");

const app = express()

let courses = [
  { id: 1, name: "java" },
  { id: 2, name: "JavaScript" },
  { id: 3, name: "Python" },
];


app.get("/courses",(req, res)=>{
    res.send(courses)
})

//Route params

app.get("/courses/:id/", (req, res) => {
  console.log(req.params);
  let course = courses.find(course=>course.id==parseInt(req.params.id)) 
    res.send(course)
});

app.post("/create",(req, res)=>{
  res.send("Create Post")
})

app.listen(8081); 
