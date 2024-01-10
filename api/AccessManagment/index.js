const AccessManagment = require("express").Router()
const { CustomerEmailValidationController, CustomerGenerateOtpController, CustomerValidateOtpController, CustomerValidatePinController, CustomerResetPinController } = require("./controllers/CustomerLogin")



AccessManagment.get("/emailvalidation", CustomerEmailValidationController)
AccessManagment.post("/generateotp", CustomerGenerateOtpController)
AccessManagment.get("/validateotp", CustomerValidateOtpController)
AccessManagment.get("/validatepin", CustomerValidatePinController)
AccessManagment.put("/resetpin", CustomerResetPinController)





exports.AccessManagment = AccessManagment;