const dotenv = require("dotenv");
const routes  =require("./routes/index.js")
const { connectDB } = require("./connection/index.js");


dotenv.config({
  path: "./.env",
});

const express = require('express')
const app = express()
const port = process.env.PORT


app.use(express.json());
app.use(express.urlencoded({ extended: true }));




connectDB();

app.use("/api/v1",routes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})