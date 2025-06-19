import prisma from "../config/db";
import {
  NotFoundError,
  AuthorizationError,
  ValidationError,
} from "../utils/errors";

export interface CreateNoteData {
  title: string;
  content: string;
  ownerId: number;
}

export interface UpdateNoteData {
  title?: string;
  content?: string;
  lastEdited?: Date;
}

export interface ShareNoteData {
  noteId: number;
  ownerId: number;
  userEmail: string;
}

export class NoteService {
  static async getNotes(userId: number) {
    return await prisma.note.findMany({
      where: {
        OR: [{ ownerId: userId }, { shared: { some: { id: userId } } }],
      },
      include: {
        owner: {
          select: {
            id: true,
            email: true,
          },
        },
        shared: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });
  }

  static async createNote(data: CreateNoteData) {
    return await prisma.note.create({
      data: {
        title: data.title,
        content: data.content,
        owner: {
          connect: {
            id: data.ownerId,
          },
        },
      },
    });
  }

  static async updateNote(
    noteId: number,
    data: UpdateNoteData,
    userId: number
  ) {
    const note = await prisma.note.findFirst({
      where: {
        id: noteId,
        ownerId: userId,
      },
    });

    if (!note) {
      throw new AuthorizationError("Note not found or access denied");
    }

    return await prisma.note.update({
      where: { id: noteId },
      data: {
        ...data,
        lastEdited: new Date(),
      },
    });
  }

  static async deleteNote(noteId: number, userId: number) {
    // Verify ownership
    const note = await prisma.note.findFirst({
      where: {
        id: noteId,
        ownerId: userId,
      },
    });

    if (!note) {
      throw new AuthorizationError("Note not found or access denied");
    }

    await prisma.note.delete({
      where: { id: noteId },
    });
  }

  static async shareNote(data: ShareNoteData) {
    const { noteId, ownerId, userEmail } = data;

    // Verify note ownership
    const note = await prisma.note.findFirst({
      where: {
        id: noteId,
        ownerId: ownerId,
      },
    });

    if (!note) {
      throw new AuthorizationError("Note not found or access denied");
    }

    // Find user to share with
    const userToShareWith = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    if (!userToShareWith) {
      throw new NotFoundError("User not found");
    }

    // Prevent sharing with self
    if (userToShareWith.id === ownerId) {
      throw new ValidationError("Cannot share note with yourself");
    }

    // Share the note
    await prisma.note.update({
      where: { id: noteId },
      data: {
        shared: {
          connect: { id: userToShareWith.id },
        },
      },
    });

    return { message: "Note shared successfully" };
  }

  static async getNoteById(noteId: number, userId: number) {
    const note = await prisma.note.findFirst({
      where: {
        id: noteId,
        OR: [{ ownerId: userId }, { shared: { some: { id: userId } } }],
      },
      include: {
        owner: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });

    if (!note) {
      throw new AuthorizationError("Note not found or access denied");
    }

    return note;
  }
}
