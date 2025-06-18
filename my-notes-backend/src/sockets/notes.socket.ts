import { Server } from "socket.io";

export const setupNoteSocket = (io: Server) => {
  io.on("connection", (socket) => {
    console.log("Connected:", socket.id);

    socket.on("join_note", (noteId: string) => {
      socket.join(noteId);
    });

    socket.on("edit_note", ({ noteId, content }) => {
      socket.to(noteId).emit("note_updated", content);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected:", socket.id);
    });
  });
};
