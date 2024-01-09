const routes  =require("./routes/index.js")
const express = require('express')
const app = express()
const port = 3000

app.use("/api/v1",routes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})