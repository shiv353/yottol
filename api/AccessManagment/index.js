const AccessManagment = require("express").Router()
const {CustomerLoginController} = require("./controllers/CustomerLogin")

AccessManagment.get("/",(req,res)=>{
    res.send("hello");
})

AccessManagment.get("/login",CustomerLoginController)

exports.AccessManagment = AccessManagment;