// const UserModel = import("../models/UserModel");
const { createFactory, getAllFactory, updateFactory, deleteFactory, getFactory }= require("../utils/resourceFactory")
const UserModel = require("../models/UserModel");

const getAllUsers = getAllFactory(UserModel)

const updateUser = updateFactory(UserModel);

const deleteUser = deleteFactory(UserModel)

const createUser = createFactory(UserModel);

const getUser = getFactory(UserModel)


module.exports={
    createUser,deleteUser, getAllUsers, updateUser, getUser
}