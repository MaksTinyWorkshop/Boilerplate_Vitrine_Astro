import { existsSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import Database from "better-sqlite3";
import seedItems from "../src/data/catalogue-seed.json" assert { type: "json" };

const databaseUrl = new URL("../src/data/catalogue.db", import.meta.url);
const databasePath = fileURLToPath(databaseUrl);
const databaseDirectory = dirname(databasePath);

if (!existsSync(databaseDirectory)) {
  mkdirSync(databaseDirectory, { recursive: true });
}

const db = new Database(databasePath);

db.prepare(
  `CREATE TABLE IF NOT EXISTS catalogue_items (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    price TEXT,
    image_src TEXT,
    image_alt TEXT,
    category TEXT
  )`
).run();

const insertItem = db.prepare(
  `INSERT OR REPLACE INTO catalogue_items (
    id,
    title,
    description,
    price,
    image_src,
    image_alt,
    category
  ) VALUES (
    @id,
    @title,
    @description,
    @price,
    @image_src,
    @image_alt,
    @category
  )`
);

const insertItems = db.transaction((items) => {
  for (const item of items) {
    insertItem.run(item);
  }
});

insertItems(
  seedItems.map((item) => ({
    ...item,
    description: item.description ?? null,
    price: item.price ?? null,
    image_src: item.image_src ?? null,
    image_alt: item.image_alt ?? null,
    category: item.category ?? null,
  }))
);

console.log("✅ Catalogue SQLite initialisé avec des exemples de produits.");

db.close();
