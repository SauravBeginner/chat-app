import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

interface User {
  socket: WebSocket;
  room: string;
}

let allSockets: User[] = [];
wss.on("connection", (socket) => {
  console.log("WebSocket connection established!");
  socket.on("message", (message) => {
    const parsedMessage = JSON.parse(message as unknown as string);
    // socket.send(messege.toString() + ":sent from server");
    if (parsedMessage.type === "join") {
      allSockets.push({
        socket,
        room: parsedMessage.payload.roomId,
      });
    }
    if (parsedMessage.type === "chat") {
      const currentRoom = allSockets.find((x) => x.socket === socket)?.room;

      allSockets.forEach((x) => {
        if (x.room === currentRoom) {
          x.socket.send(JSON.stringify(parsedMessage.payload.message)); // Serialize before sending
        }
      });
    }

    socket.on("disconnect", () => {
      allSockets.filter((x) => x != (socket as unknown));
    });
  });
});
