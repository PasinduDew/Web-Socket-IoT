
const PORT = process.env.PORT || 3000;

var WebSocketServer = require('ws').Server
  , wss = new WebSocketServer({ port: PORT });

  console.log("Port:", PORT);

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log(message);
    ws.send(message);
  });
});