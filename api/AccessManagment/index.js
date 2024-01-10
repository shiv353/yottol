const AccessManagment = require("express").Router()
const {CustomerEmailController,CustomerGenerateOtpController,CustomerPinController,CustomerValidateOtpController} = require("./controllers/CustomerSignup")


AccessManagment.post("/signup/email-validation",CustomerEmailController)
AccessManagment.post("/signup/generate-otp",CustomerGenerateOtpController)
AccessManagment.get("/signup/set-pin",CustomerPinController)
AccessManagment.post("/signup/varify-otp",CustomerValidateOtpController)

exports.AccessManagment = AccessManagment;