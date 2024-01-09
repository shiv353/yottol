const {connection} = require("../connection/index")
const ExecuteQuery = (query) =>{
    connection.query(query,(error,result)=>{
        
    })
}

module.exports = {ExecuteQuery}