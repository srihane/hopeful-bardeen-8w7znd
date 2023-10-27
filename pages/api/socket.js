// https://codedamn.com/news/nextjs/how-to-use-socket-io

import { Server } from "socket.io";

const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    console.log("Socket is already running");
  } else {
    console.log("Socket is initializing");
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log("New user", socket.id);

      socket.on("message-server", (msg) => {
        console.log(msg);

        socket.broadcast.emit("message-client", msg);
      });
    });
  }
  res.end();
};

export default SocketHandler;
