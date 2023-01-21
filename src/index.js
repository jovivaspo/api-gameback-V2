require("dotenv").config();
const app = require("./app");
require("./database");
const fs = require("fs");
const https = require("https");

const key = fs.readFileSync("private.key");
const cert = fs.readFileSync("certificate.crt");

const cred = {
  key,
  cert,
};

app.listen(app.get("port"), () => {
  console.log("Server on port: ", app.get("port"));
});

const httpsServer = https.createServer(cred, app);

httpsServer.listen(8443);
