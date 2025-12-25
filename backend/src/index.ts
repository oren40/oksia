import cors from "cors";
import express, { type Request, type Response } from "express";

const app = express();

app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({ ok: true });
});

app.post("/leads/apply", (req: Request, res: Response) => {
  const payload = req.body;

  if (!payload || typeof payload !== "object") {
    res.status(400).json({ ok: false, error: "Invalid payload" });
    return;
  }

  console.log("New apply lead:", payload);
  res.status(201).json({ ok: true });
});

app.use((req: Request, res: Response) => {
  res.status(404).json({ ok: false, error: `Not found: ${req.method} ${req.path}` });
});

const port = Number(process.env.PORT ?? 4000);

app.listen(port, () => {
  console.log(`oksia-backend listening on http://localhost:${port}`);
});
