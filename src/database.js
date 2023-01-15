const mongoose = require("mongoose");

const MONGO_INITDB_ROOT_USERNAME = process.env.MONGO_INITDB_ROOT_USERNAME;
const MONGO_INITDB_ROOT_PASSWORD = process.env.MONGO_INITDB_ROOT_PASSWORD;

const uriMongo = `mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@mongodb:27017/miapp?authSource=admin`;

console.log(uriMongo);

/*DB CONNECTION*/
mongoose.connect(uriMongo);

/*DB EVENTS*/
mongoose.connection.on("connected", () => {
  console.log("DB connected");
});

mongoose.connection.on("error", (error) => {
  console.log(error);
});
