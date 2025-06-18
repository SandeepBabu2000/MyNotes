import { Request, Response } from "express";
import { NoteService } from "../services/note.service";
import { AppError } from "../utils/errors";

export const getNotes = async (req: Request, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }
    const notes = await NoteService.getNotes(req.userId);
    res.json(notes);
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

export const createNote = async (req: Request, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }
    const { title, content } = req.body;
    const note = await NoteService.createNote({
      title,
      content,
      ownerId: req.userId,
    });
    res.status(201).json(note);
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

export const updateNote = async (req: Request, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }
    const { id } = req.params;
    const { title, content } = req.body;
    const note = await NoteService.updateNote(
      Number(id),
      { title, content },
      req.userId
    );
    res.json(note);
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

export const deleteNote = async (req: Request, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }
    const { id } = req.params;
    await NoteService.deleteNote(Number(id), req.userId);
    res.status(204).send();
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

export const shareNote = async (req: Request, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }
    const { id } = req.params;
    const { email } = req.body;

    const result = await NoteService.shareNote({
      noteId: Number(id),
      ownerId: req.userId,
      userEmail: email,
    });

    res.json(result);
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};
