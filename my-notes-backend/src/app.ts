import express from "express";
import cors from "cors";
import morgan from "morgan";
import { json } from "body-parser";
import authRoutes from "./routes/auth.routes";
import noteRoutes from "./routes/note.routes";
import { errorHandler } from "./middleware/error.middleware";

const app = express();

app.use(cors());
app.use(json());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

app.use(errorHandler);

export default app;
