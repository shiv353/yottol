const {ExecuteQuery}  = require("../../../utils/ExecuteQuery")

const CustomerGenerateOtp =  (email_id,otp) =>{
    return new Promise (async (resolve,reject)=>{
        const checkEmailQuery = 'SELECT * FROM swiftfoliosuk.swiftfolios_emailotp WHERE email_id = ?';
        const checkEmailParams = [email_id];

        try {
            const existingData = await ExecuteQuery(checkEmailQuery, checkEmailParams);

            if (existingData.length > 0) {

                const updateOtpQuery = 'UPDATE swiftfoliosuk.swiftfolios_emailotp SET otp = ? WHERE email_id = ?';
                const updateOtpParams = [otp, email_id];
                await ExecuteQuery(updateOtpQuery, updateOtpParams);
                resolve('OTP updated successfully.');
            } else {

                const insertOtpQuery = 'INSERT INTO swiftfoliosuk.swiftfolios_emailotp (email_id, otp) VALUES (?, ?)';
                const insertOtpParams = [email_id, otp];
                await ExecuteQuery(insertOtpQuery, insertOtpParams);
                resolve('OTP inserted successfully.');
            }
        } catch (error) {
            reject(error);
        }
    })
}


module.exports = {CustomerGenerateOtp}