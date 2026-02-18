import fs from "fs/promises";
import path from "path";

const VALID_SORT = new Set(["created", "rating", "popularity", "price"]);
const VALID_DIRECTION = new Set(["asc", "desc"]);

// Vercel serverless function to serve products
export default async function handler(req, res) {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const sort = VALID_SORT.has(url.searchParams.get("sort") || "")
      ? url.searchParams.get("sort")
      : "created";
    const direction = VALID_DIRECTION.has(
      url.searchParams.get("direction") || "",
    )
      ? url.searchParams.get("direction")
      : "desc";

    const collectionParam = url.searchParams.get("collection");
    const categoryParam = url.searchParams.get("category");
    const colorParam = url.searchParams.get("color");
    const ratingParam = url.searchParams.get("rating");

    const collections = collectionParam
      ? collectionParam
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      : [];
    const categories = categoryParam
      ? categoryParam
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      : [];
    const colors = colorParam
      ? colorParam
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      : [];
    const ratings = ratingParam
      ? ratingParam
          .split(",")
          .map((s) => parseInt(s.trim(), 10))
          .filter((n) => !Number.isNaN(n))
      : [];

    const filePath = path.join(process.cwd(), "public", "products.json");
    const fileContents = await fs.readFile(filePath, "utf8");
    const json = JSON.parse(fileContents);
    let products = Array.isArray(json.data) ? [...json.data] : [];

    if (collections.length > 0) {
      const hasLatest = collections.includes("latest");
      const collectionIds = collections.filter((c) => c !== "latest");
      products = products.filter((p) => {
        const inLatest = hasLatest;
        const inCollection =
          collectionIds.length === 0 ||
          (p.collection && collectionIds.includes(p.collection.collection_id));
        return inLatest || inCollection;
      });
    }

    if (categories.length > 0) {
      products = products.filter(
        (p) => p.category && categories.includes(p.category.category_id),
      );
    }

    if (colors.length > 0) {
      products = products.filter(
        (p) =>
          Array.isArray(p.colors) && colors.some((c) => p.colors.includes(c)),
      );
    }

    if (ratings.length > 0) {
      const minRating = Math.min(...ratings);
      products = products.filter(
        (p) => typeof p.rating === "number" && p.rating >= minRating,
      );
    }

    const sortKey = sort;
    const mult = direction === "asc" ? 1 : -1;
    products.sort((a, b) => {
      let aVal;
      let bVal;
      switch (sortKey) {
        case "created":
          aVal = a.created_at || "";
          bVal = b.created_at || "";
          return mult * (aVal < bVal ? -1 : aVal > bVal ? 1 : 0);
        case "rating":
          aVal = typeof a.rating === "number" ? a.rating : 0;
          bVal = typeof b.rating === "number" ? b.rating : 0;
          return mult * (aVal - bVal);
        case "popularity":
          aVal = typeof a.sold === "number" ? a.sold : 0;
          bVal = typeof b.sold === "number" ? b.sold : 0;
          return mult * (aVal - bVal);
        case "price":
          aVal =
            a.priceRange && typeof a.priceRange.lowest === "number"
              ? a.priceRange.lowest
              : 0;
          bVal =
            b.priceRange && typeof b.priceRange.lowest === "number"
              ? b.priceRange.lowest
              : 0;
          return mult * (aVal - bVal);
        default:
          return 0;
      }
    });

    const total = products.length;

    res.status(200).json({
      data: products,
      pagination: {
        total,
        has_more: false,
      },
    });
  } catch (error) {
    console.error("Error loading products:", error);
    res.status(500).json({ error: "Failed to load products" });
  }
}
