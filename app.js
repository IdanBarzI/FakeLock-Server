require("dotenv").config();
require("./DataBase/setUp");
const express = require("express");
const cors = require("cors");
const corsOptions = require("./options/corsOptions");

const userRouter = require("./routers/user");

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors(corsOptions));

app.use(userRouter);

app.listen(port, () => {
  console.log(`app listen on port ${port}`);
});
