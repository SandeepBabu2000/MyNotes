import { Request, Response } from "express";
import prisma from "../config/db";

export const getNotes = async (req: Request, res: Response) => {
  const notes = await prisma.note.findMany({
    where: {
      OR: [{ ownerId: req.userId }, { shared: { some: { id: req.userId } } }],
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
  res.json(notes);
};

export const createNote = async (req: Request, res: Response) => {
  const { title, content } = req.body;
  const note = await prisma.note.create({
    data: {
      title,
      content,
      owner: {
        connect: {
          id: req.userId,
        },
      },
    },
  });
  res.status(201).json(note);
};

export const updateNote = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content, lastEdited } = req.body;
  const note = await prisma.note.update({
    where: { id: Number(id) },
    data: { title, content, lastEdited },
  });
  res.json(note);
};

export const deleteNote = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.note.delete({ where: { id: Number(id) } });
  res.status(204).send();
};

export const shareNote = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { email } = req.body;

    const note = await prisma.note.findFirst({
      where: {
        id: Number(id),
        ownerId: req.userId,
      },
    });

    if (!note) {
      return res.status(404).json({ error: "Note not found or access denied" });
    }

    const userToShareWith = await prisma.user.findUnique({
      where: { email },
    });

    if (!userToShareWith) {
      return res.status(404).json({ error: "User not found" });
    }

    if (userToShareWith.id === req.userId) {
      return res.status(400).json({ error: "Cannot share note with yourself" });
    }

    await prisma.note.update({
      where: { id: Number(id) },
      data: {
        shared: {
          connect: { id: userToShareWith.id },
        },
      },
    });

    res.json({ message: "Note shared successfully" });
  } catch (error) {
    console.error("Share note error:", error);
    res.status(500).json({ error: "Failed to share note" });
  }
};
