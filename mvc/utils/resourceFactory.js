
const createFactory = function (ElementModel) {
    console.log("called factory function");
    return async (req, res) => {
        try {
            // id 
            const resourceDetails = req.body;
            const resource = await
                ElementModel.create(resourceDetails);
            console.log(req.body);
            res.status(201).json({
                message: "user created",
                resource: resource
            })
        } catch (err) {
            res.status(500).json({
                status: "Internal server error",
                message: err.message
            })
        }
    }
}

const getAllFactory = function(ElementModel){
    return async (req, res) => {
        try {
            // finding the user
            const users = await ElementModel.find()
            
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

}


const updateFactory = function (ElementModel) {
    return async (req, res) => {
        try {
            /***
            * 1. you will need -> id 
            * 2. you have pass the keys that they want to update
            * **/
            const id = req.params.id;
            const toUpdateObject = req.body;

            const user = await ElementModel.findByIdAndUpdate(id, toUpdateObject, { new: true });

            console.log("Received patch request");
            res.json({
                status: "success",
                message: user
            })
        } catch (err) {
            res.status(500).json({
                status: "Internal server error",
                message: err.message
            })
        }

    }
}

const deleteFactory = async (ElementModel)=>{
    return async (req, res) => {
    try{
        let {id} = req.params;
        const user = await ElementModel.findByIdAndDelete(id);
        
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
}

const getFactory = function (ElementModel) {
    return async (req, res) => {
        try {
            // template -> get the data from req.params
            const id = req.params.id;
            const product = await ElementModel.findById(id);
            // if user is present -> send the resp
            if (product) {
                res.status(200).json({
                    message: product
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
}


module.exports={
   createFactory, getAllFactory, updateFactory, deleteFactory, getFactory
};

// const createUser = 
