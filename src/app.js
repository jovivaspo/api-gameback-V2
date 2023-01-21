const express = require("express");
const fs = require("fs");
const cors = require("cors");
const notFound = require("./middlewares/notFound");
const handleError = require("./middlewares/handleError");
const helmet = require("helmet");
const createAdmin = require("./services/createAdmin");

const app = express();

const file = fs.readFile("./DC2B0F6B913F64385D45F37DBA78B5FE.txt");

console.log(file);

/*Verify or created admin*/
createAdmin();

//Settings
app.set("port", process.env.PORT || 8000);

//Middleware
app.use(cors());
app.use(express.json());
app.use(helmet());

//SSL VERIFCATION
app.get(
  "/.well-known/pki-validation/DC2B0F6B913F64385D45F37DBA78B5FE.txt",
  (req, res, next) => {
    try {
      res.sendFile(file);
    } catch (error) {
      next(error);
    }
  }
);

//Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/videogame", require("./routes/videogame"));

//Errors
app.use(notFound);
app.use(handleError);

module.exports = app;
