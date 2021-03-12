const express = require("express");
const app = express();
const expressWs = require("express-ws")(app);
const cors = require("cors");

const PORT = process.env.PORT || 3000;

app.use(cors());

/*
If you would rather have a list of allowed origins, you can use a function instead of a string as the origin value:

*/
// var allowedOrigins = ['http://localhost:3000',
//                       'http://yourapp.com'];
// app.use(cors({
//   origin: function(origin, callback){
//     // allow requests with no origin
//     // (like mobile apps or curl requests)
//     if(!origin) return callback(null, true);
//     if(allowedOrigins.indexOf(origin) === -1){
//       var msg = 'The CORS policy for this site does not ' +
//                 'allow access from the specified Origin.';
//       return callback(new Error(msg), false);
//     }
//     return callback(null, true);
//   }
// }));

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

  ws.on('error', console.log);
});

app.listen(PORT, () => {
  console.log(`>> Listening on ${PORT}`);
});
