const { ExecuteQuery } = require("../../../utils/ExecuteQuery")

const CustomerEmailValidation = (email_id) => {
    return new Promise(async (resolve, reject) => {
        const query = 'SELECT * FROM swiftfoliosuk.swiftfolios_accounts WHERE email_id = ?';
        const params = [email_id];
        try {
            const data = await ExecuteQuery(query, params);
            resolve(data);
        } catch (error) {
            reject(error)
        }
    });
}

const CustomerGenerateOtp = (email_id, otp) => {
    return new Promise(async (resolve, reject) => {
        // Check if the email exists in swiftfolios_emailotp table
        const checkEmailQuery = 'SELECT * FROM swiftfoliosuk.swiftfolios_emailotp WHERE email_id = ?';
        const checkEmailParams = [email_id];

        try {
            const existingData = await ExecuteQuery(checkEmailQuery, checkEmailParams);

            if (existingData.length > 0) {
                // Email exists, update the OTP
                const updateOtpQuery = 'UPDATE swiftfoliosuk.swiftfolios_emailotp SET otp = ? WHERE email_id = ?';
                const updateOtpParams = [otp, email_id];
                await ExecuteQuery(updateOtpQuery, updateOtpParams);
                resolve('OTP updated successfully.');
            } else {
                // Email doesn't exist, insert a new record
                const insertOtpQuery = 'INSERT INTO swiftfoliosuk.swiftfolios_emailotp (email_id, otp) VALUES (?, ?)';
                const insertOtpParams = [email_id, otp];
                await ExecuteQuery(insertOtpQuery, insertOtpParams);
                resolve('OTP inserted successfully.');
            }
        } catch (error) {
            reject(error);
        }
    });
}

const CustomerValidateOtp = (email_id) => {
    return new Promise(async (resolve, reject) => {
        // Check if the email exists in swiftfolios_emailotp table
        const checkEmailQuery = 'SELECT * FROM swiftfoliosuk.swiftfolios_emailotp WHERE email_id = ?';
        const checkEmailParams = [email_id];

        try {
            const data = await ExecuteQuery(checkEmailQuery, checkEmailParams);
            resolve(data)

        } catch (error) {
            reject(error);
        }
    });
}

const CustomerValidatePin = (email_id) => {
    return new Promise(async (resolve, reject) => {
        // Check if the email exists in swiftfolios_emailotp table
        const checkEmailQuery = 'SELECT * FROM swiftfoliosuk.swiftfolios_accounts WHERE email_id = ?';
        const checkEmailParams = [email_id];

        try {
            const data = await ExecuteQuery(checkEmailQuery, checkEmailParams);
            resolve(data)

        } catch (error) {
            reject(error);
        }
    });
}

const CustomerResetPin = (email_id, pin) => {
    return new Promise(async (resolve, reject) => {
        // Check if the email exists in swiftfolios_emailotp table
        const updatePinQuery = 'UPDATE swiftfoliosuk.swiftfolios_accounts SET pin = ? WHERE email_id = ?';
        const updatePinParams = [pin, email_id];
        try {
            await ExecuteQuery(updatePinQuery, updatePinParams);
            resolve('PIN reset successfully.');
        } catch (error) {
            reject(error);
        }
    });
}



module.exports = { CustomerEmailValidation, CustomerGenerateOtp, CustomerValidateOtp, CustomerValidatePin, CustomerResetPin }