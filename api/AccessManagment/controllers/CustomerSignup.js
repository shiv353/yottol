const {CustomerEmailValidation} = require("../services/CustomerEmailValidation")
const { isEmpty, validateEmail, checkLength } = require("../../../utils/Validation");
const {CustomerGenerateOtp} = require("../services/CustomerGenerateOtp")
const {CustomerPinset} = require("../services/CustomerPinset")
const {CustomerValidateOtp} = require("../services/CustomerValidateOtp")
const { SendEmail } = require("../../../utils/SendEmail");
const { LoginOTPEmail } = require("../../../utils/Templetes/LoginOtpEmail")



const CustomerEmailController = async (req, res,next) => {
  const { email_id } = req.body;
  if (!validateEmail(email_id)) {
    return res.json({ error: true, message: "Enter Valid Email" })
  }
  
  console.log(email_id);
  if(isEmpty(email_id)){
    return res.json({ error: true, message: "email id can't be empty" });
  }

  // const emailRegex = /^[a-zA-Z0-9. _-]+@[a-zA-Z0-9. -]+\.[a-zA-Z]{2,4}$/;

  // if (email_id == "") {
  //   return res.json({ error: true, message: "email id can't be empty" });
  // }
  // if (!emailRegex.test(email_id)) {
  //   return res.json({error:true,message:"enter valid email"})
  // }

  try {
    const data = await CustomerEmailValidation(email_id);
    if (data.length == 0) {
      return res.json({ error:false, message: "Email is validated" });
    } else {
      return res.json({ error: true, message: "Email is already registered" });
    }
  } catch (error) {
    console.log(error);
    return res.json({ error: true, message: error });
  }


};

const CustomerGenerateOtpController = async (req, res, next) => {
    const { email_id } = req.body;

    const otp = Math.floor(Math.random() * 900000) + 100000;

    if (isEmpty(email_id)){
      return res.json({ error: true, message: "email id can't be empty" })
    }

    const subject = `${otp} is your Swiftfolios OTP`
    const html = LoginOTPEmail(otp);
    const to = email_id
    SendEmail({ to, subject, html });

    try {
        await CustomerGenerateOtp(email_id, otp);
        return res.json({ error:false, message: 'Otp Generated' });
    } catch (error) {
        console.log(error);
        return res.json({ error: true, message: error });
    }
}


const CustomerPinController = async(req,res,next)=>{
    const {email_id,pin,confirmPin} = req.query;

    if(!checkLength(pin,4) || !checkLength(confirmPin,4)){
      res.json({error:true,message:"PIN must be 4 digit"});
      return;
    }

    // if(pin.length !=4 || confirmPin.length !=4){
    //     res.json({error:true,message:"PIN must be 4 digit"});
    //     return;
    // }

    if(pin != confirmPin){
        res.json({error:true,message:"PIN does not match"});
        return;
    }
    try {
       const result =  await CustomerPinset(email_id,pin);
        return res.json({ error:false, message: "PIN set successfully", result });
    } catch (error) {
       return res.json({ error: true, message: error });
    }
}

const CustomerValidateOtpController = async (req, res, next) => {
    const { email_id, otp } = req.body;
    console.log(req.body)

    if (isEmpty(email_id))
        return res.json({ error: true, message: "email id can't be empty" })
    if (!checkLength(otp, 6))
        return res.json({ error: true, message: "OTP should be 6 length" })

    try {
        const data = await CustomerValidateOtp(email_id);
        if (data[0].otp == otp)
            return res.json({ error: false, message: 'Otp Valid' });
        else
            return res.json({ error: true, message: 'Otp is incorrect' });

    } catch (error) {
        console.log(error);
        return res.json({ error: true, message: error });
    }
}
module.exports = { CustomerEmailController,CustomerGenerateOtpController,CustomerPinController,CustomerValidateOtpController };
