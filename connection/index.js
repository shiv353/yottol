const mysql = require("mysql");
const connection = mysql.createPool({
  host: "yottol-rds.copzpeo4bk3d.ap-south-1.rds.amazonaws.com",
  user: "root",
  password: "BxCdkbmW8gVG1Cj5jpA0",
  database: "swiftfoliosuk",
  multipleStatements: true,
});

module.exports = {connection}
