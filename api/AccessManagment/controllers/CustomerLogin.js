const {CustomerLogin} = require("../services/CustomerLogin")
const  CustomerLoginController =  async (req,res) =>{
    // console.log(req);
    const {email,otp} = req.query;
    // console.log(email);
    // console.log(otp);
    if(email==""){
        res.json({"errot" : true, "message":"email id can't be empty"})
    }
    try {
        const data  = await CustomerLogin(email,otp)
        res.json(data);
    } catch (error) {
        console.log(error);
        res.json({"error":true,"message": error});
    }
     

    // res.send("hellosa");

}

module.exports = {CustomerLoginController}