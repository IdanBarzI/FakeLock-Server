require("dotenv").config();
require("./db/connection");
const express = require("express");
const cors = require("cors");
const corsOptions = require("./options/corsOptions");

const userRouter = require("./server/routes");

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors(corsOptions));

app.use(userRouter);

app.listen(port, () => {
  console.log(`app listen on port ${port}`);
});
