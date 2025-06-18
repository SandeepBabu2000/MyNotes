import { Request, Response } from "express";
import { NoteService } from "../services/note.service";
import { AppError } from "../utils/errors";
import { Validator } from "../utils/validation";

export const getNotes = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.userId) {
      res.status(401).json({ status: 401, message: "User not authenticated" });
      return;
    }
    const notes = await NoteService.getNotes(req.userId);
    res.json({
      status: 200,
      message: "Notes fetched successfully",
      data: notes,
    });
  } catch (error) {
    if (error instanceof AppError) {
      res.json({ status: error.statusCode, message: error.message });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

export const createNote = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.userId) {
      res.status(401).json({ status: 401, message: "User not authenticated" });
      return;
    }

    const validation = Validator.validateNoteCreationData(req.body);
    if (!validation.isValid) {
      res.status(400).json({
        status: 400,
        message: validation.errors,
      });
      return;
    }

    const { title, content } = req.body;
    const note = await NoteService.createNote({
      title,
      content,
      ownerId: req.userId,
    });
    res.status(201).json({
      status: 201,
      message: "Note created successfully",
      data: note,
    });
  } catch (error) {
    if (error instanceof AppError) {
      res.json({ status: error.statusCode, message: error.message });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

export const updateNote = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.userId) {
      res.status(401).json({ status: 401, message: "User not authenticated" });
      return;
    }

    const idValidation = Validator.validateId(req.params.id);
    if (!idValidation.isValid) {
      res.status(400).json({
        status: 400,
        message: idValidation.errors,
      });
      return;
    }

    const validation = Validator.validateNoteUpdateData(req.body);
    if (!validation.isValid) {
      res.status(400).json({
        status: 400,
        message: validation.errors,
      });
      return;
    }

    const { id } = req.params;
    const { title, content } = req.body;
    const note = await NoteService.updateNote(
      Number(id),
      { title, content },
      req.userId
    );
    res.json({
      status: 200,
      message: "Note Edited successfully",
      data: note,
    });
  } catch (error) {
    if (error instanceof AppError) {
      res.json({ status: error.statusCode, message: error.message });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

export const deleteNote = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.userId) {
      res.status(401).json({ status: 401, message: "User not authenticated" });
      return;
    }

    const idValidation = Validator.validateId(req.params.id);
    if (!idValidation.isValid) {
      res.status(400).json({
        status: 400,
        message: idValidation.errors,
      });
      return;
    }

    const { id } = req.params;
    await NoteService.deleteNote(Number(id), req.userId);
    res.json({
      status: 204,
      message: "Note deleted successfully",
    });
  } catch (error) {
    if (error instanceof AppError) {
      res.json({ status: error.statusCode, message: error.message });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

export const shareNote = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.userId) {
      res.status(401).json({ status: 401, message: "User not authenticated" });
      return;
    }

    const idValidation = Validator.validateId(req.params.id);
    if (!idValidation.isValid) {
      res.status(400).json({
        status: 400,
        message: idValidation.errors,
      });
      return;
    }

    const validation = Validator.validateShareNoteData(req.body);
    if (!validation.isValid) {
      res.status(400).json({
        status: 400,
        message: validation.errors,
      });
      return;
    }

    const { id } = req.params;
    const { email } = req.body;

    const result = await NoteService.shareNote({
      noteId: Number(id),
      ownerId: req.userId,
      userEmail: email,
    });

    res.json({
      status: 200,
      message: "Note shared successfully",
      data: result,
    });
  } catch (error) {
    if (error instanceof AppError) {
      res.json({ status: error.statusCode, message: error.message });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};
