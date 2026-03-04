/***
 * npm init -y
 * npm install express
 * ***/
const express = require("express");
const mongoose = require("mongoose");
/**********env variables **********/
const dotenv = require("dotenv");
dotenv.config();
const { DB_USER, DB_PASSWORD, DB_URL } = process.env;
/*****************************/

const app = express();
// reading the content
/*****connect to the DB******/
const dbUrl = DB_URL
mongoose.connect(dbUrl)
    .then(function (conn) {
        console.log("connected to db")
    }).catch(err => console.log(err))
/************************************/
const { getAllUsers, createUser, updateUser, deleteUser } = require("./controllers/UserController");
const { getProduct, getAllProducts, createProduct } = require("./controllers/ProductController");
const {sanityMiddleWare}=require("./middleware/sanityReqObj");
/**********payload -> req.body**************/
app.use(express.json());

// app.post("/api/v1/user", sanityMiddleWare, createUser);// profile page -> user
app.post("/api/user", sanityMiddleWare, createUser);

app.get("/api/v1/user", getAllUsers);
// 2. get the user
// app.get("/api/v1/user/:id", getUser);
// 3. update the user
app.patch("/api/v1/user/:id", updateUser);
// 4 delete the user
app.delete("/api/v1/user/:id", deleteUser);
/***********************product*********************/
//1. create a product
// app.post("/api/v1/product", sanityMiddleWare, createProduct);// profile page -> user
// app.get("/api/v1/product", getAllProduct);
// // 2. get the user
// app.get("/api/v1/product/:id", getProduct);
// // 5. resource not found 
// app.use(function (req, res) {
//     console.log("recieved the request");
//     res.status(404).json({
//         message: "resource not found"
//     })
// })


app.post("/api/v1/product", createProduct);

app.get("/api/v1/product", getAllProducts);

app.get("/api/v1/product/:id", getProduct);

// app.patch("/api/v1/product/:id", updateUser);

// app.delete("/api/v1/product/:id", deleteUser);

console.log("hello");
// listening for all the http request 
app.listen(3000, function () {
    console.log("Listening to port 3000");
})