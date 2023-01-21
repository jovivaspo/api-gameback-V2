const express = require("express");
const path = require("path");
const cors = require("cors");
const notFound = require("./middlewares/notFound");
const handleError = require("./middlewares/handleError");
const helmet = require("helmet");
const createAdmin = require("./services/createAdmin");

const app = express();

const nameFile = "03AE6B7A9F3CD4C727A91AF0D9EAC481";

/*Verify or created admin*/
createAdmin();

//Settings
app.set("port", process.env.PORT || 8000);

//Middleware
app.use(cors());
app.use(express.json());
app.use(helmet());

//SSL VERIFCATION
//SSL
app.get("/.well-known/pki-validation/" + nameFile, (req, res) => {
  res.sendFile(path.resolve("./" + nameFile));
});

//Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/videogame", require("./routes/videogame"));

//Errors
app.use(notFound);
app.use(handleError);

module.exports = app;
