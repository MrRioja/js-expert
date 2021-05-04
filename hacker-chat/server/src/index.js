import SocketServer from "./socket.js";
import Event from "events";

const eventEmitter = new Event();

async function testServer() {
  const options = {
    port: 9898,
    host: "localhost",
    headers: {
      Connection: "Upgrade",
      Upgrade: "websocket",
    },
  };

  const http = await import("http");
}

const port = process.env.PORT || 9898;
const socketServer = new SocketServer({ port });
const server = await socketServer.initialize(eventEmitter);
console.log("socket server is running at", server.address().port);
