const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose")
dotenv.config();
const app = express();
app.use(express.json())
const {DB_USER, DB_PASSWORD, DB_URL} = process.env
const dbUrl = DB_URL

mongoose.connect(dbUrl).then(function(){
    console.log("connection successfull")
}).catch(err=>console.log(err))


const userSchemaObj = {
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
    },
    createdAt:{
        type: Date,
        default: Date.now()
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

const getAllUsers = async (req, res) => {
    try {
        // finding the user
        const users = await UserModel.find()
        
        // if user is present -> send the resp
        if (users.length!=0) {
            res.status(200).json({
                message: users
            })
            // if it's not there then send user not found 
        } else {
            res.status(404).json({
                message: "did not get the user"
            })
        }
    } catch (err) {
        res.status(500).json({
            status: "Internal server error",
            message: err.message
        })
    }

}

const updateUser = async (req, res) => {

    const {id}=req.params
    
    const user = await UserModel.findByIdAndUpdate(id, req.body , {new: true});
    if (!user) {
        res.status(404).json({
            message: "did not get the user"
        })      
    }
    console.log("Received patch request");
    console.log("body", req.body);
    res.json({
        status: "Success",
        message: "Recieved the patch request",
        user:user
    })
}

const deleteUser = async (req, res)=>{

    try{
        let {id} = req.params;
        const user = await UserModel.findByIdAndDelete(id);
        
        if (!user) {
            res.status(404).json({
                status: "Failed",
                message: "did not get the user"
            })
        } else {
                res.status(200).json({
                status: "success",
                message: "user is deleted",
                user: user
            })
        }
    }catch(err){
         res.status(500).json({
            status: "Internal server error",
            message: err.message
        })
    }
}

app.post("/api/user", createUser);
app.get("/api/user", getAllUsers);
app.delete("/api/user/:id", deleteUser);
app.patch("/api/user/:id", updateUser)

app.listen(3000, function () {
    console.log("Listening to port 3000");
})