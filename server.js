const express = require('express');
const morgan = require("morgan");
const app = express();
const port = 3000;

app.use(express.json());

// Custom Middlewares

function middleware1(req, res, next){
    console.log("Middleware1");
    next();
}

function middleware2(req, res, next){
    console.log("Middleware2");
    next();
}

//Create Logger

function logger(req, res, next){
    console.log(req.method,req.hostname,req.ip, new Date());
    next()
}

app.use(logger)

app.use(middleware1);

app.use(middleware2);

app.use(morgan());

let courses = [
    {id: 1, name: "Learn ReactJS"},
    {id: 2, name: "Learn NodeJS"},
    {id: 3, name: "Learn Angular"},
]

app.get('/', (req, res)=>{
    res.send("Hello Node.JS Backend DEV");
})

app.get('/about', (req, res)=>{
    res.send("Welcome to the About Page");
})

app.get("/courses/:id", (req,res)=>{
    console.log("params", req.params);
    let course = courses.find((course)=>course.id===parseInt(req.params.id));
    if (!course) {
        res.status(404).send("Not Found");        
    }
    res.send(course)
})

//Read

app.get('/courses', (req, res)=>{
    res.send(courses);
});

//Post Method
app.post("/courses", (req, res)=>{
    const course ={
        id: req.body.id,
        name:req.body.name
    }
    courses.push(course)
    res.send(courses)
})

//PUT Method
app.put("/courses/:id", (req,res)=>{
    let course = courses.find((course)=>course.id===parseInt(req.params.id));
    if (!course) {
        res.status(404).send("Not Found");        
    }
    course.name = req.body.name; 
    res.send(course);
})

//Delete Method
app.delete("/courses/:id", (req, res)=>{
    let course = courses.find((course)=>course.id===parseInt(req.params.id));
    console.log(course)
    if (!course) {
        res.status(404).send("Not Found");       
    }
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(courses);
})

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})

