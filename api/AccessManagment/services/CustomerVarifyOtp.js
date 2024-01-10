const {ExecuteQuery}  = require("../../../utils/ExecuteQuery")

const CustomerVarifyOtp = (email_id,otp) => {
    return new Promise (async (resolve,reject)=>{
        try {
            const verifyQuery = 'SELECT * FROM swiftfoliosuk.swiftfolios_emailotp WHERE email_id = ? AND otp = ?';
            const verifyParams = [email_id, otp];

            const result = await ExecuteQuery(verifyQuery, verifyParams);

            if (result && result.length > 0) {
                resolve();
            } else {
                reject('Otp is not correct');
            }
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {CustomerVarifyOtp}