import type { CatalogueItem } from "@app-types/catalogue";

import db from "@lib/db";

type CatalogueItemRow = {
  id: string;
  title: string;
  description: string | null;
  price: string | null;
  image_src: string | null;
  image_alt: string | null;
  category: string | null;
};

const selectAllItems = db.prepare<CatalogueItemRow>(
  `SELECT id, title, description, price, image_src, image_alt, category FROM catalogue_items`
);

const selectItemsByCategory = db.prepare<CatalogueItemRow>(
  `SELECT id, title, description, price, image_src, image_alt, category
   FROM catalogue_items
   WHERE category = ?`
);

const selectDistinctCategories = db.prepare<{ category: string | null }>(
  `SELECT DISTINCT category FROM catalogue_items ORDER BY category ASC`
);

const mapRowToItem = (row: CatalogueItemRow): CatalogueItem & { id: string; category?: string } => {
  const { image_src, image_alt, category, ...rest } = row;

  return {
    ...rest,
    ...(image_src
      ? {
          image: {
            src: image_src,
            alt: image_alt ?? undefined,
          },
        }
      : {}),
    ...(category ? { category } : {}),
  };
};

export const getCatalogueItems = (category?: string) => {
  const rows = category
    ? selectItemsByCategory.all(category)
    : selectAllItems.all();

  return rows.map(mapRowToItem);
};

export const getCategories = () => {
  const rows = selectDistinctCategories.all();
  return rows
    .filter(({ category }) => Boolean(category))
    .map(({ category }) => ({ category: category as string }));
};
