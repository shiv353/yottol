const dotenv = require("dotenv");
const routes = require("./routes/index.js");
const express = require('express');
const cors = require('cors')
const { connectDB } = require("./connection/index.js");

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

dotenv.config({
  path: "./.env",
});

connectDB();

app.use("/api/v1", routes);

app.listen(process.env.PORT, () => {
  console.log(`app listening on port ${process.env.PORT}`);
});


