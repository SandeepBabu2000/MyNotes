import { RequestHandler, Router } from "express";
import {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
} from "../controllers/note.controller";
import { requireAuth } from "../middleware/auth.middleware";

const router = Router();

router.use(requireAuth as RequestHandler);
router.get("/", getNotes);
router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;
