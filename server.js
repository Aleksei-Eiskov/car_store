import jsonServer from "json-server";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3001;
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();

// Basic request logger
server.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

server.use(middlewares);

// Simple validation for POST and PUT on /cars
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if ((req.method === "POST" || req.method === "PUT" || req.method === "PATCH") && req.path.startsWith("/cars")) {
    const { model, brandId, year, price } = req.body || {};
    if (!model || !brandId || !year || typeof price !== "number") {
      return res.status(400).json({error: "Invalid car payload - required fields: model, brandId, year, price (number)"});
    }
  }
  next();
});

// Quick healthcheck
server.get("/health", (req, res) => res.json({status: "ok"}));

// Reset endpoint - restore db.json from db.seed.json
server.post("/reset", (req, res) => {
  const seedPath = path.join(__dirname, "db.seed.json");
  const dbPath = path.join(__dirname, "db.json");
  fs.copyFile(seedPath, dbPath, (err) => {
    if (err) return res.status(500).json({error: "Failed to reset database"});
    res.json({status: "reset ok"});
  });
});

// Mount /api prefix if you want - but keeping root for simplicity
server.use(jsonServer.rewriter({
  "/api/*": "/$1"
}));

// Enable _expand and _embed usage via json-server built-ins
server.use(router);

server.listen(PORT, () => {
  console.log(`Car_store API running on http://localhost:${PORT}`);
});
