import { Server } from "socket.io";

export const setupNoteSocket = (io: Server) => {
  io.on("connection", (socket) => {
    socket.on("join_note", ({ noteId }) => {
      socket.join(noteId);
    });

    socket.on("leave_note", ({ noteId }) => {
      socket.leave(noteId);
    });

    socket.on("edit_note", ({ noteId, content }) => {
      socket.to(noteId).emit("edit_note", { content });
    });

    socket.on("disconnect", () => {});
  });
};
