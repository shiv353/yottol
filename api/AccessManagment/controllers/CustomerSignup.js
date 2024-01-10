const {CustomerEmailValidation} = require("../services/CustomerEmailValidation")
const {CustomerGenerateOtp} = require("../services/CustomerGenerateOtp")
const {CustomerPinset} = require("../services/CustomerPinset")
const {CustomerVarifyOtp} = require("../services/CustomerVarifyOtp")
const { sendEmail } = require("../../../utils/SendEmail");
const { LoginOTPEmail } = require("../../../utils/Templetes/LoginOtpEmail")



const CustomerEmailController = async (req, res,next) => {
  const { email_id } = req.query;

  const emailRegex = /^[a-zA-Z0-9. _-]+@[a-zA-Z0-9. -]+\.[a-zA-Z]{2,4}$/;

  if (email_id == "") {
    return res.json({ error: true, message: "email id can't be empty" });
  }
  if (!emailRegex.test(email_id)) {
    return res.json({error:true,message:"email is not valid"})
  }

  try {
    const data = await CustomerEmailValidation(email_id);
    if (data.length == 0) {
      return res.json({ success: true, message: "Email is validated" });
    } else {
      return res.json({ error: true, message: "Email is already registered" });
    }
  } catch (error) {
    console.log(error);
    return res.json({ error: true, message: error });
  }


};

const CustomerGenerateOtpController = async (req, res, next) => {
    const { email_id, otp } = req.body;
    if (!email_id){

      return res.json({ error: true, message: "email id can't be empty" })
    }
    if (!otp){
      return res.json({ error: true, message: "otp can't be empty" })
    }
    const subject = `${otp} is your Swiftfolios OTP`
    const html = LoginOTPEmail(otp);
    sendEmail(email_id,subject,html);
    try {
        await CustomerGenerateOtp(email_id, otp);
        return res.json({ success: true, message: 'Otp Generated' });
    } catch (error) {
        console.log(error);
        return res.json({ error: true, message: error });
    }
}


const CustomerPinController = async(req,res,next)=>{
    const {email_id,pin,confirmPin} = req.query;

    if(pin.length !=4 || confirmPin.length !=4){
        res.json({error:true,message:"PIN must be 4 digit"});
        return;
    }
    if(pin != confirmPin){
        res.json({error:true,message:"PIN does not match"});
        return;
    }
    try {
       const result =  await CustomerPinset(email_id,pin);
        return res.json({ success: true, message: "PIN set successfully", result });
    } catch (error) {
       return res.json({ error: true, message: error });
    }
}

const CustomerVarifyOtpController = async (req,res,next) => {
  const { email_id, otp } = req.query;
  if (!email_id){

    return res.json({ error: true, message: "email id can't be empty" })
  }
    if (!otp){

      return res.json({ error: true, message: "otp can't be empty" })
    }
    if(otp.length != 6){
      return res.json({error:true,message:"Otp must be 6 digit"})
    }

    try {
      await CustomerVarifyOtp(email_id,otp);
      return res.json({success:true,message:"Otp varification successfully"})
    } catch (error) {
      return res.json({error:true,message:error})
    }

      
}
module.exports = { CustomerEmailController,CustomerGenerateOtpController,CustomerPinController,CustomerVarifyOtpController };
