import { Server } from "socket.io";

export const setupNoteSocket = (io: Server) => {
  io.on("connection", (socket) => {
    console.log("Connected:", socket.id);

    socket.on("join_note", ({ noteId }) => {
      socket.join(noteId);
      console.log(`Socket ${socket.id} joined note ${noteId}`);
    });

    socket.on("leave_note", ({ noteId }) => {
      socket.leave(noteId);
      console.log(`Socket ${socket.id} left note ${noteId}`);
    });

    socket.on("edit_note", ({ noteId, content }) => {
      console.log(`Note ${noteId} edited by ${socket.id}`);
      socket.to(noteId).emit("edit_note", { content });
    });

    socket.on("disconnect", () => {
      console.log("Disconnected:", socket.id);
    });
  });
};
