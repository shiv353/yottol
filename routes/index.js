const express = require('express')
const app = express()


const {AccessManagment} = require("../api/AccessManagment")

app.use("/access",AccessManagment);

// app.get("/hello", (req, res) =>
//     res.send(
//         `hello`
//     )
// );

module.exports =app