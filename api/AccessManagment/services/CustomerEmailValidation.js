const {ExecuteQuery}  = require("../../../utils/ExecuteQuery")

const CustomerEmailValidation =  async (email) => {
    return new Promise (async (resolve,reject) =>{
        const query = `SELECT * FROM  swiftfoliosuk.swiftfolios_accounts WHERE email_id = ?`;
        const param = [email];

        try {
            const data = await ExecuteQuery(query,param);
            console.log(data);
            resolve(data);
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {CustomerEmailValidation}