const bcrypt = require("bcryptjs");

const hashPassword = async (password) => {
  try {
    return await bcrypt.hash(password, 8);
  } catch (e) {
    throw new Error("Bad Password");
  }
};

module.exports = hashPassword;
