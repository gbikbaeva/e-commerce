import { loadProductsData, buildFullProduct } from "./data.js";

// Vercel serverless function: GET /api/products/:id (uses public/products/*.json)
export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const pathname = url.pathname;
    const id = pathname.replace(/^\/api\/products\//, "").replace(/\/$/, "");
    if (!id) {
      res.status(400).json({ error: "Product ID is required" });
      return;
    }

    const data = await loadProductsData();
    const base = data.products.find(
      (p) => p.product_id === id || String(p.product_id) === id,
    );
    if (!base) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    const product = buildFullProduct(base, data, { includeInfo: true });
    res.status(200).json(product);
  } catch (error) {
    console.error("Error loading product:", error);
    res.status(500).json({ error: "Failed to load product" });
  }
}
