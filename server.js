var express = require("express");
var app = express();
var expressWs = require("express-ws")(app);

const PORT = process.env.PORT || 3000;


app.use(function (req, res, next) {
  console.log("middleware");
  req.testing = "testing";
  return next();
});

app.get("/", function (req, res, next) {
  console.log("get route", req.testing);
  res.end();
});

app.ws("/test-ws", function (ws, req) {
  ws.on("message", function (msg) {
    console.log(msg);
  });
  console.log("socket", req.testing);
});

// Echo
app.ws("/", function (ws, req) {
  ws.on("message", function (msg) {
    console.log(msg);

    ws.send(msg);
  });
});

app.listen(PORT, () => {
  console.log(`>> Listening on ${PORT}`);
});

