import { useEffect, useState } from "react";
import io from "socket.io-client";
let socket;

const Home = () => {
  const [msg, setMsg] = useState("");
  const [serverMsg, setServerMsg] = useState("");

  useEffect(() => {
    socketInitializer();
  }, []);

  const socketInitializer = async () => {
    await fetch("/api/socket");
    socket = io();

    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("message-client", (msg) => {
      console.log("message-client");
      console.log(msg);
      setServerMsg(msg);
    });
  };

  async function sendMsg() {
    socket.emit("message-server", msg);
  }

  return (
    <>
      <h4>{serverMsg}</h4>
      <br />
      <input type="text" onChange={(e) => setMsg(e.target.value)} />
      <br />
      <button onClick={sendMsg}>Ping socket server</button>
    </>
  );
};

export default Home;
