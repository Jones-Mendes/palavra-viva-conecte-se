import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { generateThemeSuggestions } from "./themeSuggestionsService.js";

dotenv.config();

const app = express();
const port = Number(process.env.PORT ?? 5174);
const corsOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map((origin) => origin.trim())
  : ["http://localhost:5173"];

app.use(
  cors({
    origin: corsOrigins,
  })
);
app.use(express.json({ limit: "1mb" }));

app.post("/api/theme-suggestions", async (req, res) => {
  const result = await generateThemeSuggestions(req.body ?? {});
  return res.status(result.status).json(result.body);
});

app.listen(port, () => {
  console.log(`AI server listening on http://localhost:${port}`);
});
