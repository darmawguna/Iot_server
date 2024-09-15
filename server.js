import websocketSetup from "./websocket.js";

const WS_PORT = 3030;
const expressServer = "http://localhost:3000/water-levels";

websocketSetup(WS_PORT, expressServer);
