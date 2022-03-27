const express = require("express");
const cors = require("cors");
const corsOptions = require("./options/corsOptions");

const userRouter = require("./routers/user");
const postRouter = require("./routers/post");

const app = express();

app.use(express.json());
app.use(cors(corsOptions));

app.use(userRouter);
app.use(postRouter);

module.exports = app;
