import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const seed = path.join(__dirname, "..", "db.seed.json");
const db = path.join(__dirname, "..", "db.json");

fs.copyFile(seed, db, (err) => {
  if (err) {
    console.error("Reset failed:", err);
    process.exit(1);
  }
  console.log("Database reset from db.seed.json");
});
