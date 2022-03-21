const DB = require("../config");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const { Pool, Client } = require("pg");
const pool = new Pool({
  user: DB.USER,
  host: DB.HOST,
  database: DB.DATABASE,
  password: DB.PASSWORD,
  port: 5432,
});

const PORT = process.env.PORT || 3001;

var medicines = [];
console.log("config", DB);
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
  res.header("Access-Control-Allow-Origin", "*");
});
app.get(`/medicines/:id`, (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const medicine = medicines.find(
    (medicine) => medicine.medicine_id === parseInt(req.params.id)
  );
  res.json({
    data: medicine,
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
