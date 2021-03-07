const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  socket.emit("init_event", { message: "A new user has joined!" });

  console.log(">> Client Connected");
  socket.on("disconnect", () => {
    console.log(">> Client Disconnected");
  });

  socket.on("event_id", (data) => {
    console.log("Event Data: " + data);
  });

  setInterval(() => {
    socket.emit("switch_01", { state: true });
  }, 2000);
});

http.listen(PORT, () => {
  console.log(`>> Listening on ${PORT}`);
});
