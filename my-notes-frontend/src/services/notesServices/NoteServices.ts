import httpService from "../httpService/HttpService";
import type { AddNote, Note } from "../../types/CommonTypes";
import type { ApiResponse } from "../../types/ConfigTypes";

export const noteService = {
  getNotes: async (): Promise<Note[]> => {
    const response: ApiResponse = await httpService("GET", "/notes/");
    return response.data as Note[];
  },
  addNote: async (note: AddNote): Promise<ApiResponse> => {
    const response: ApiResponse = await httpService("POST", "/notes/", note);
    return response;
  },
  updateNote: async (note: Note): Promise<ApiResponse> => {
    const response: ApiResponse = await httpService(
      "PUT",
      `/notes/${note.id}`,
      note
    );
    return response;
  },
  deleteNote: async (id: string): Promise<ApiResponse> => {
    const response: ApiResponse = await httpService("DELETE", `/notes/${id}`);
    return response;
  },
  shareNote: async (noteId: string, email: string): Promise<ApiResponse> => {
    const response: ApiResponse = await httpService(
      "POST",
      `/notes/${noteId}/share`,
      { email }
    );
    return response;
  },
};
