require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 8080;

app.use(cors);
app.use(express.json());
app.use(bodyParser);

app.listen(port, async () => {
  try {
    console.log("Connected to the server.\nConneted to the DB.");
  } catch (error) {
    console.log(error);
  }
});
