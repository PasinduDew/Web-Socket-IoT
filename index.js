const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Ayubowan!, I'm Working");
});

io.on("connection", (socket) => {
  console.log(">> Client Connected");
  socket.on("disconnect", () => {
    console.log(">> Client Disconnected");
  });

  socket.on('event_id', (data) => {
    console.log('Event Data: ' + data);
  });
});

http.listen(PORT, () => {
  console.log(`>> Listening on ${PORT}`);
});
