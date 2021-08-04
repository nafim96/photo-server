const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../../.env" });

const protected = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decode = jwt.verify(token, `${process.env.TOKEN_SECRET}`);
    req.user = decode;
    next();
  } catch (err) {
    res.json({
      message: "Authentication Failed",
    });
  }
};

module.exports = { protected };
