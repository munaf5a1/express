// const ProductModel = import("../models/ProductsModel")
const UserModel = require("../models/UserModel");
const ProductModel = require("../models/ProductsModel");
const {createFactory, getAllFactory, getFactory}= require("../utils/resourceFactory");

// const createProduct = async (req, res) => {
//     try {
//         // id 
//         const productDetails = req.body;
//         const product = await ProductModel.create(productDetails);
//         console.log(req.body);
//         res.status(201).json({
//             message: "Product created",
//             user: product
//         })
//     } catch(err) {
//         res.status(500).json({
//             status: "Internal server error",
//             message: err.message
//         })
//     }
// }

const getAllProducts= getAllFactory(ProductModel);

// const getAllProducts = async (req, res) => {
//     try {
//         // finding the user
//         const products = await ProductModel.find()
        
//         // if user is present -> send the resp
//         if (products.length!=0) {
//             res.status(200).json({
//                 message: products
//             })
//             // if it's not there then send user not found 
//         } else {
//             res.status(404).json({
//                 message: "did not get the Products"
//             })
//         }
//     } catch (err) {
//         res.status(500).json({
//             status: "Internal server error",
//             message: err.message
//         })
//     }
// }

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

// const getProduct = async (req, res)=>{
//     try{
//         const id = req.param.id;
//         const product = await ProductModel.findById(id);
//         if (product) {
//             res.status(200).json({
//                 message: product
//             })            
//         }else{
//             res.status(404).json({
//                 message: "Did not get the user"
//             })
//         }
//     }catch(err){
//         res.status(500).json({
//             status: "Internal Server Error",
//             message: err.message
//         })

//     }
// }

const getProduct = getFactory(ProductModel)

const createProduct = createFactory(ProductModel);

module.exports={
    getAllProducts, createProduct, getProduct, getAllProducts
}

