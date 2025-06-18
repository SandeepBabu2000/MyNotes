import { Request, Response } from "express";
import prisma from "../config/db";

export const getNotes = async (req: Request, res: Response) => {
  const notes = await prisma.note.findMany({
    where: {
      OR: [{ ownerId: req.userId }, { shared: { some: { id: req.userId } } }],
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
