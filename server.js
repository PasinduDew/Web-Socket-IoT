const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});


// When Client Connects to the WS Server
io.on("connection", (socket) => {
  socket.emit("init_event", { message: "A new user has joined!" });

  console.log(">> Client Connected");

  // Client Disconnected
  socket.on("disconnect", () => {
    console.log(">> Client Disconnected");
  });

  // This is an Example Event Trigger --> event_id
  // socket.on("event_id", (data) => {
  //   console.log("Event Data: ", data);
  // });

  // This is an Example Event Emitter
  // socket.emit("event_id", { message: "A new user has joined!" });

  setInterval(() => {
    socket.emit("switch_01", { state: true });
  }, 2000);
});

http.listen(PORT, () => {
  console.log(`>> Listening on ${PORT}`);
});
