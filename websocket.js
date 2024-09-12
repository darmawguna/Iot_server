import { WebSocketServer } from "ws";
import { io as Client } from "socket.io-client";

const websocketSetup = (port, expressSocketURL) => {
  const wss = new WebSocketServer({ port });
  const expressSocket = Client(expressSocketURL);

  wss.on("connection", (ws) => {
    console.log("New WebSocket connection");

    ws.on("message", (message) => {
      try {
        const data = JSON.parse(message);
        // Kirim data ke server Express.js melalui Socket.IO
        expressSocket.emit("sensorData", data);

        ws.send("Message received");
      } catch (error) {
        console.error("Failed to parse message", error);
      }
    });

    ws.on("close", () => {
      console.log("WebSocket connection closed");
    });

    ws.on("error", (error) => {
      console.error("WebSocket error:", error);
    });
  });

  console.log(`WebSocket server running on ws://localhost:${port}`);
};

export default websocketSetup;
