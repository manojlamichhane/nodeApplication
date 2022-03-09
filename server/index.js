const dotenv = require("dotenv");
const express = require("express");
dotenv.config();
const { Pool, Client } = require("pg");
const pool = new Pool({
  user: "ece",
  host: "database-1.ciivyj7ykn79.us-east-1.rds.amazonaws.com",
  database: "Medicine_list",
  password: "Inspiron11",
  port: 5432,
});

const PORT = process.env.PORT || 3001;
const app = express();
var medicines = [];
pool.connect((err, client, done) => {
  if (err) throw err;
  client.query("SELECT * FROM medicines ", (err, res) => {
    done();
    if (err) {
      console.log("err", err);
    } else {
      res.rows.map((row) => {
        console.log("data", row);
        medicines.push(row);
      });
    }
  });
});

app.get("/medicines", (req, res) => {
  res.json({
    data: medicines,
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
