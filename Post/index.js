require("dotenv").config();
const express = require("express");
const cors = require("cors");
const corsOptions = require("./options/corsOptions");

const postRouter = require("./server/routes");

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors(corsOptions));

app.use(postRouter);

app.listen(port, () => {
  console.log(`app listen on port ${port}`);
});
