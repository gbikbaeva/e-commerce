import { loadCollections } from "../products/data.js";

// API: GET /api/collections — list all collections (uses public/products/collections.json)
export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const collections = await loadCollections();
    res.status(200).json({ data: collections });
  } catch (error) {
    console.error("Error loading collections:", error);
    res.status(500).json({ error: "Failed to load collections" });
  }
}
