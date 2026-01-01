const express = require('express')
const app = express()
const port = 3000

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

app.get('/courses', (req, res)=>{
    res.send(courses);
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})