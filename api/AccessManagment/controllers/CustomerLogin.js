const { sendEmail } = require("../../../utils/sendEmail");
const { CustomerEmailValidation, CustomerGenerateOtp, CustomerValidateOtp, CustomerValidatePin, CustomerResetPin } = require("../services/CustomerLogin")


const CustomerEmailValidationController = async (req, res, next) => {
    const { email_id } = req.query;
    console.log(req.query)
    if (!email_id)

        return res.json({ "error": true, "message": "Email id can't be empty" })
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email_id)) {
        return res.json({ "error": true, "message": "Enter Valid Email" })
    }
    try {
        const data = await CustomerEmailValidation(email_id);
        if (data.length > 0) {
            return res.json({ success: true, message: 'Email Validate', data });
        }
        else {
            return res.json({ error: true, message: 'This Email is not registered' });
        }
    } catch (error) {
        console.log(error);
        return res.json({ "error": true, "message": error });
    }
}

const CustomerGenerateOtpController = async (req, res, next) => {
    const { email_id, otp } = req.query;
    console.log(req.query)
    if (!email_id)
        return res.json({ "error": true, "message": "email id can't be empty" })
    if (!otp)
        return res.json({ "error": true, "message": "otp can't be empty" })
    sendEmail(email_id, otp)
    try {
        await CustomerGenerateOtp(email_id, otp);
        return res.json({ success: true, message: 'Otp Generated' });
    } catch (error) {
        console.log(error);
        return res.json({ "error": true, "message": error });
    }
}

const CustomerValidateOtpController = async (req, res, next) => {
    const { email_id, otp } = req.query;
    console.log(req.query)

    if (!email_id)
        return res.json({ "error": true, "message": "email id can't be empty" })
    if (!otp)
        return res.json({ "error": true, "message": "otp can't be empty" })
    if (otp.length != 6)
        return res.json({ "error": true, "message": "OTP should be 6 length" })

    try {
        const data = await CustomerValidateOtp(email_id);
        if (data[0].otp == otp)
            return res.json({ success: true, message: 'Otp Valid' });
        else
            return res.json({ error: true, message: 'Otp is incorrect' });

    } catch (error) {
        console.log(error);
        return res.json({ "error": true, "message": error });
    }
}

const CustomerValidatePinController = async (req, res, next) => {
    const { email_id, pin } = req.query;
    console.log(req.query)

    if (!email_id)
        return res.json({ "error": true, "message": "email id can't be empty" })
    if (!pin)
        return res.json({ "error": true, "message": "pin can't be empty" })
    if (pin.length != 4)
        return res.json({ "error": true, "message": "PIN should be 4 length" })


    try {
        const data = await CustomerValidatePin(email_id);
        // console.log(data)
        if (data[0].pin == pin)
            return res.json({ success: true, message: 'Pin Valid' });
        else
            return res.json({ error: true, message: 'Pin is incorrect' });

    } catch (error) {
        console.log(error);
        return res.json({ "error": true, "message": error });
    }
}

const CustomerResetPinController = async (req, res, next) => {
    const { email_id, pin } = req.query;
    console.log(req.query)

    if (!email_id)
        return res.json({ "error": true, "message": "email id can't be empty" })
    if (!pin)
        return res.json({ "error": true, "message": "pin can't be empty" })
    if (pin.length != 4)
        return res.json({ "error": true, "message": "PIN should be 4 length" })

    try {
        await CustomerResetPin(email_id, pin);
        return res.json({ success: true, message: 'Pin Reset' });
    } catch (error) {
        console.log(error);
        return res.json({ "error": true, "message": error });
    }
}



module.exports = { CustomerEmailValidationController, CustomerGenerateOtpController, CustomerValidateOtpController, CustomerValidatePinController, CustomerResetPinController }