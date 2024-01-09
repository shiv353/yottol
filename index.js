const dotenv = require("dotenv");
const routes = require("./routes/index.js");
const express = require('express');
const { connectDB } = require("./connection/index.js");

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 3000;

dotenv.config({
  path: "./.env",
});

connectDB();

app.use("/api/v1", routes);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});


