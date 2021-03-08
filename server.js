const express = require("express");
const app = express();
const expressWs = require("express-ws")(app);

const PORT = process.env.PORT || 3000;

app.use(function (req, res, next) {
  console.log("middleware");
  req.testing = "testing";
  return next();
});

app.get("/", function (req, res, next) {
try {
  console.log("get route", req.testing);
  
} catch (error) {
  console.log(error);
  
}  res.end();
});

app.ws("/", function (ws, req) {
  ws.on("message", function (msg) {
    console.log(msg);
  });
  console.log("socket", req.testing);
});

app.listen(PORT, () => {
  console.log(`>> Listening on ${PORT}`);
});
