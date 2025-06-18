import httpService from "../httpService/HttpService";
import type { AddNote, Note } from "../../types/CommonTypes";

export const noteService = {
  getNotes: async (): Promise<Note[]> => {
    const response = await httpService("GET", "/notes/");
    return response as Note[];
  },
  addNote: async (note: AddNote): Promise<Note> => {
    const response = await httpService("POST", "/notes/", note);
    return response as Note;
  },
  updateNote: async (note: Note): Promise<Note> => {
    const response = await httpService("PUT", `/notes/${note.id}`, note);
    return response as Note;
  },
  deleteNote: async (id: string): Promise<void> => {
    await httpService("DELETE", `/notes/${id}`);
  },
  shareNote: async (noteId: string, email: string): Promise<void> => {
    await httpService("POST", `/notes/${noteId}/share`, { email });
  },
};
