const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose")
dotenv.config();
const app = express();
app.use(express.json())
const {DB_USER, DB_PASSWORD} = process.env
const dbUrl = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.aelcpio.mongodb.net/?appName=Cluster0`

mongoose.connect(dbUrl).then(function(){
    console.log("connection successfull")
}).catch(err=>console.log(err))


const userSchemaObj ={
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true,
        minLength: 8
    },
    confirmPassword:{
        type: String,
        required: true,
        minLength: 8,
        validate: function(){
          return this.password == this.confirmPassword
        }
    }
}

const userSchema = new mongoose.Schema(userSchemaObj);
//UserModel
const UserModel=mongoose.model("UserModel", userSchema)

const createUser = async (req, res) => {
    try {
        // id 
        const userDetails = req.body;
        const user = await UserModel.create(userDetails);
        console.log(req.body);
        res.status(201).json({
            message: "user created",
            user: user
        })
    } catch (err) {
        res.status(500).json({
            status: "Internal server error",
            message: err.message
        })
    }

}

app.post("/api/user", createUser);

app.listen(3000, function () {
    console.log("Listening to port 3000");
})