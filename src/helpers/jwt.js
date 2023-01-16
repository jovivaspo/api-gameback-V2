const jwt = require("jsonwebtoken");

const createToken = (id, email) => {
  const token = jwt.sign({ id, email }, process.env.JWT_SECRET, {
    expiresIn: 86400,
  });

  return token;
};

module.exports = createToken;
