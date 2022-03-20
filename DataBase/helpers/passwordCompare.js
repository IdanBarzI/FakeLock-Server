const bcrypt = require("bcryptjs");

const passwordCompare = async (password, userPassword) => {
  try {
    return await bcrypt.compare(password, userPassword);
  } catch (e) {
    throw new Error("Bad Password");
  }
};

module.exports = passwordCompare;
