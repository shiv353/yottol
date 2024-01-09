const AccessManagment = require("express").Router()
const { CustomerEmailValidationController, CustomerGenerateOtpController } = require("./controllers/CustomerLogin")



AccessManagment.get("/emailvalidation", CustomerEmailValidationController)
AccessManagment.get("/generateotp", CustomerGenerateOtpController)


exports.AccessManagment = AccessManagment;