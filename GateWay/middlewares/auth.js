const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);

    if (!decoded) {
      throw new Error();
    }

    next();
  } catch (e) {
    console.log(e);
    res.status(401).send({ error: "Please authenticate" });
  }
};

module.exports = auth;
