const AccessManagment = require("express").Router()
const {CustomerEmailController,CustomerGenerateOtpController,CustomerPinController,CustomerVarifyOtpController} = require("./controllers/CustomerSignup")


AccessManagment.get("/signup/email-validation",CustomerEmailController)
AccessManagment.post("/signup/generate-otp",CustomerGenerateOtpController)
AccessManagment.get("/signup/set-pin",CustomerPinController)
AccessManagment.get("/signup/varify-otp",CustomerVarifyOtpController)

exports.AccessManagment = AccessManagment;