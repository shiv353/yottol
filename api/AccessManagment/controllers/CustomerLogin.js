const { sendEmail } = require("../../../utils/sendEmail");
const { CustomerEmailValidation, CustomerGenerateOtp, CustomerValidateOtp, CustomerValidatePin, CustomerResetPin } = require("../services/CustomerLogin")


const CustomerEmailValidationController = async (req, res, next) => {
    const { email_id } = req.body;
    if (!email_id)
        res.json({ "error": true, "message": "email id can't be empty" })
    try {
        const data = await CustomerEmailValidation(email_id);
        if (data.length > 0) {
            res.json({ success: true, message: 'Email Validate', data });
        }
        else {
            res.json({ error: true, message: 'This Email is not registered' });
        }
    } catch (error) {
        console.log(error);
        res.json({ "error": true, "message": error });
    }
}

const CustomerGenerateOtpController = async (req, res, next) => {
    const { email_id, otp } = req.body;
    if (!email_id)
        res.json({ "error": true, "message": "email id can't be empty" })
    if (!otp)
        res.json({ "error": true, "message": "otp can't be empty" })
    sendEmail(email_id, otp)
    try {
        await CustomerGenerateOtp(email_id, otp);
        res.json({ success: true, message: 'Otp Generated' });
    } catch (error) {
        console.log(error);
        res.json({ "error": true, "message": error });
    }
}

const CustomerValidateOtpController = async (req, res, next) => {
    const { email_id, otp } = req.body;
    if (!email_id)
        res.json({ "error": true, "message": "email id can't be empty" })
    if (!otp)
        res.json({ "error": true, "message": "otp can't be empty" })

    try {
        const data = await CustomerValidateOtp(email_id);
        if (data[0].otp == otp)
            res.json({ success: true, message: 'Otp Valid' });
        else
            res.json({ error: true, message: 'Otp is incorrect' });

    } catch (error) {
        console.log(error);
        res.json({ "error": true, "message": error });
    }
}

const CustomerValidatePinController = async (req, res, next) => {
    const { email_id, pin } = req.body;
    if (!email_id)
        res.json({ "error": true, "message": "email id can't be empty" })
    if (!pin)
        res.json({ "error": true, "message": "pin can't be empty" })

    try {
        const data = await CustomerValidatePin(email_id);
        // console.log(data)
        if (data[0].pin == pin)
            res.json({ success: true, message: 'Pin Valid' });
        else
            res.json({ error: true, message: 'Pin is incorrect' });

    } catch (error) {
        console.log(error);
        res.json({ "error": true, "message": error });
    }
}

const CustomerResetPinController = async (req, res, next) => {
    const { email_id, pin } = req.body;
    if (!email_id)
        res.json({ "error": true, "message": "email id can't be empty" })
    if (!pin)
        res.json({ "error": true, "message": "pin can't be empty" })

    try {
        await CustomerResetPin(email_id, pin);
        res.json({ success: true, message: 'Pin Reset' });
    } catch (error) {
        console.log(error);
        res.json({ "error": true, "message": error });
    }
}



module.exports = { CustomerEmailValidationController, CustomerGenerateOtpController, CustomerValidateOtpController, CustomerValidatePinController, CustomerResetPinController }