const mongoose=require("mongoose");
/*********************userSchema**************************/
let productSchemaObject = {
    name: {
        type: String,
        required: true,
        minLength:[4, "Product name should above min. 4 charchters"]
    },
    price:{
        type: Number,
        required: true,
        min: [0, "Price can't be negative"]
    },
    discount:{
        type: Number,
        default: 0,
        validate:[function(){
            return this.price>=this.discount
        }, "discount can't be more than price"]
    },
    brand:String,
    description:String,
    category:{
        type: String,
        required: true
    },
    skunumber:{
    
    },
    createAt: {
        type: Date,
        default: Date.now()
    },
    role: {
        type: String,
        default: "product"
    }
}
const productSchema = new mongoose.Schema(productSchemaObject);

/**********************pre-hooks*****************/
productSchema.pre("save", function () {
    this.confirmPassword = undefined;
})
const roles = ["admin", "buyer", "seller"];
productSchema.pre("save", function (next) {
    let isPresent = roles.find((cRole) => { return cRole == this.role })
    if (isPresent == undefined) {
        const error = new Error("role is invalid");
        next(error);
    }
})

    // USERMODEL 
    // const UserModel = mongoose.model("MarchUserModel", userSchema);
    const ProductModel=mongoose.model("productModel", productSchema);

    /**********************pre-hooks*****************/
    const catgories  = ["electronics","furniture","clothing","educational"];
    productSchema.pre("save", function (next) {
        let isPresent = catgories.find((cCategory) => { return cCategory == this.category })

        if (isPresent == undefined) {
            const error = new Error("category is invalid");
            next(error);
        }
    })


module.exports = ProductModel;
