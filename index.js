require("dotenv").config();
const express = require("express");
const cors = require("cors");
// const bodyParser = require("body-parser");
const { sequelize } = require("./config/db");

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).json({ message: "You are on sequelize server home." });
});

app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({force:true});
    console.log("Connected to the server.\nConneted to the DB.");
  } catch (error) {
    console.log(error);
  }
});
