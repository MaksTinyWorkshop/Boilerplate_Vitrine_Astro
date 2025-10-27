import { existsSync, mkdirSync, readFileSync } from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import Database from "better-sqlite3";

const databaseUrl = new URL("../data/catalogue.db", import.meta.url);
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

type CatalogueSeedItem = {
  id: string;
  title: string;
  description?: string | null;
  price?: string | null;
  image_src?: string | null;
  image_alt?: string | null;
  category?: string | null;
};

const seedDataUrl = new URL("../data/catalogue-seed.json", import.meta.url);

try {
  const { count } = db
    .prepare<{ count: number }>(`SELECT COUNT(*) as count FROM catalogue_items`)
    .get();

  if (count === 0 && existsSync(seedDataUrl)) {
    const seedDataRaw = readFileSync(seedDataUrl, "utf-8");
    const seedItems = JSON.parse(seedDataRaw) as CatalogueSeedItem[];

    if (Array.isArray(seedItems) && seedItems.length > 0) {
      const insertSeedItem = db.prepare(
        `INSERT OR IGNORE INTO catalogue_items (
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

      const seedTransaction = db.transaction((items: CatalogueSeedItem[]) => {
        for (const item of items) {
          insertSeedItem.run({
            id: item.id,
            title: item.title,
            description: item.description ?? null,
            price: item.price ?? null,
            image_src: item.image_src ?? null,
            image_alt: item.image_alt ?? null,
            category: item.category ?? null,
          });
        }
      });

      seedTransaction(seedItems);
    }
  }
} catch (error) {
  console.warn(
    "Impossible de charger les données d'exemple du catalogue:",
    error
  );
}

export default db;
