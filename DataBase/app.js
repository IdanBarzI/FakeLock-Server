require("dotenv").config();
require("../DataBaseAccess/setUp");
const express = require("express");

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.listen(port, () => {
  console.log(`app listen on port ${port}`);
});
