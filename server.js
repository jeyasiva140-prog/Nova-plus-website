import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.json({ limit: "20kb" }));

// Demo-only credentials. Replace this mock with a real identity provider before production use.
const DEMO_USER = {
  email: process.env.DEMO_EMAIL || "demo@novapulse.dev",
  password: process.env.DEMO_PASSWORD || "Nova@12345",
  name: "Alex Morgan"
};

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "novapulse-api" });
});

app.post("/api/login", (req, res) => {
  const email = String(req.body?.email || "").trim().toLowerCase();
  const password = String(req.body?.password || "");

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  if (email !== DEMO_USER.email.toLowerCase() || password !== DEMO_USER.password) {
    return res.status(401).json({ message: "That email and password don't match. Try the demo account." });
  }

  return res.json({
    success: true,
    user: { name: DEMO_USER.name, email: DEMO_USER.email }
  });
});

// Serve the Vite production build from the same Express service.
const distPath = path.join(__dirname, "dist");
app.use(express.static(distPath));
app.get("*", (_req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`NovaPulse server listening on port ${PORT}`);
});