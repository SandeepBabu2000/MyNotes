import http from "http";
import { Server } from "socket.io";
import app from "./app";
import { setupNoteSocket } from "./sockets/notes.socket";
import { loadEnv } from "./config/env";

loadEnv();

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

setupNoteSocket(io);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
