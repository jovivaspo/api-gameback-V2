const jwt = require("jsonwebtoken");
const Users = require("../models/Users");

const protect = (req, res, next) => {
  try {
    const path = req.route.path;

    const authorization = req.get("Authorization");

    let token = "";

    if (authorization && authorization.toLowerCase().startsWith("bearer")) {
      token = authorization.substring(7);
      //console.log(token)
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        res.status(401);
        const error = new Error(err.name);
        return next(error);
      }

      const user = await Users.findOne({ email: decodedToken.email });

      if (!user) {
        res.status(401);
        const error = new Error("Permission denied");
        return next(error);
      }

      if (path === "/" && !user.role.includes("admin")) {
        res.status(401);
        const error = new Error("You dont have permission for this action");
        return next(error);
      }

      next();
    });
  } catch (error) {
    console.log(error);
    res.status(401);
    return next(error);
  }
};

module.exports = protect;
