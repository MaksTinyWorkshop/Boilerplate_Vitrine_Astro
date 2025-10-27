import db from "@lib/db";
import { getCatalogueItems } from "@lib/catalogue";

export const prerender = false;

const insertCatalogueItem = db.prepare(
  `INSERT INTO catalogue_items (
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

const jsonHeaders = {
  "Content-Type": "application/json",
};

export async function GET() {
  const catalogueItems = getCatalogueItems();
  return new Response(JSON.stringify(catalogueItems), {
    status: 200,
    headers: jsonHeaders,
  });
}

export async function POST({ request }: { request: Request }) {
  try {
    const payload = await request.json();

    const item = {
      id: payload.id,
      title: payload.title,
      description: payload.description ?? null,
      price: payload.price ?? null,
      image_src: payload.image_src ?? payload.image?.src ?? null,
      image_alt: payload.image_alt ?? payload.image?.alt ?? null,
      category: payload.category ?? null,
    };

    if (!item.id || !item.title) {
      return new Response(
        JSON.stringify({ error: "Les champs 'id' et 'title' sont requis." }),
        {
          status: 400,
          headers: jsonHeaders,
        }
      );
    }

    insertCatalogueItem.run(item);

    return new Response(JSON.stringify({ success: true }), {
      status: 201,
      headers: jsonHeaders,
    });
  } catch (error) {
    console.error("Erreur lors de l'insertion dans catalogue_items:", error);
    return new Response(
      JSON.stringify({ error: "Erreur lors de l'insertion du produit." }),
      {
        status: 500,
        headers: jsonHeaders,
      }
    );
  }
}
