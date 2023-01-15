const express = require("express");
const cors = require("cors");
const notFound = require("./middlewares/notFound");
const handleError = require("./middlewares/handleError");
const helmet = require("helmet");

const app = express();

//Settings
app.set("port", process.env.PORT || 8000);

//Middleware
app.use(cors());
app.use(express.json());
app.use(helmet());

//Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/videogame", require("./routes/videogame"));

//Errors
app.use(notFound);
app.use(handleError);

module.exports = app;
