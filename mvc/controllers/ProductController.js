// const ProductModel = import("../models/ProductsModel")
const UserModel = require("../models/UserModel");
const ProductModel = require("../models/ProductsModel");
const {createFactory, getAllFactory, getFactory, deleteFactory, updateFactory}= require("../utils/resourceFactory");



// const updateProduct = async (req, res) =>{
//     try {
//         const {id}=req.params
//         const user = await UserModel.findByIdAndUpdate(id, req.body , {new: true});
//         if (!user) {
//             res.status(404).json({
//                 message: "did not get the user"
//             })      
//         }
//     } catch (error) {
//         res.status(500).json({
//             status: "Internal Server Error",
//             message: err.message
//         })
//     }
// }

// const deleteProduct = async (req, res)=>{

//     try{
//         let {id} = req.params;
//         const user = await UserModel.findByIdAndDelete(id);
        
//         if (!user) {
//             res.status(404).json({
//                 status: "Failed",
//                 message: "did not get the user"
//             })
//         } else {
//                 res.status(200).json({
//                 status: "success",
//                 message: "user is deleted",
//                 user: user
//             })
//         }
//     }catch(err){
//          res.status(500).json({
//             status: "Internal server error",
//             message: err.message
//         })
//     }
// }


const getAllProducts= getAllFactory(ProductModel);

const getProduct = getFactory(ProductModel)

const createProduct = createFactory(ProductModel);

const deleteProduct = deleteFactory(ProductModel);


const updateProduct = updateFactory(ProductModel)


module.exports={
    getAllProducts, createProduct, getProduct, deleteProduct, updateProduct
}

