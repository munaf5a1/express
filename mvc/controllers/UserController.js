const UserModel = import("../models/UserModel");
const { createFactory }= require("../utils/resourceFactory")

// const createUser = async (req, res) => {
//     try {
//         // id 
//         const userDetails = req.body;
//         const user = await UserModel.create(userDetails);
//         console.log(req.body);
//         res.status(201).json({
//             message: "user created",
//             user: user
//         })
//     } catch (err) {
//         res.status(500).json({
//             status: "Internal server error",
//             message: err.message
//         })
//     }
// }

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
    try {
        const {id}=req.params
        const user = await UserModel.findByIdAndUpdate(id, req.body , {new: true});
        if (!user) {
            res.status(404).json({
                message: "did not get the user"
            })      
        }
    } catch (error) {
        res.status(500).json({
            status: "Internal Server Error",
            message: err.message
        })
    }
}

const deleteUser = async (req, res) => {
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

const createUser = createFactory(UserModel);


module.exports={
    createUser,deleteUser, getAllUsers, updateUser
}