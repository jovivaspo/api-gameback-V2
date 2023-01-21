const express = require("express");
const path = require("path");
const cors = require("cors");
const notFound = require("./middlewares/notFound");
const handleError = require("./middlewares/handleError");
const helmet = require("helmet");

const nameFile = "DC2B0F6B913F64385D45F37DBA78B5FE.txt";

const app = express();

//Settings
app.set("port", process.env.PORT || 8000);

//Middleware
app.use(cors());
app.use(express.json());
app.use(helmet());

//SSL
app.get(
  "/.well-known/pki-validation/DC2B0F6B913F64385D45F37DBA78B5FE.txt",
  (req, res) => {
    res.sendFile(path.resolve("./" + nameFile));
  }
);

//Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/videogame", require("./routes/videogame"));

//Errors
app.use(notFound);
app.use(handleError);

module.exports = app;
