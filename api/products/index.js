import { loadProductsData, buildFullProduct } from "./data.js";

const VALID_SORT = new Set(["created", "rating", "popularity", "price"]);
const VALID_DIRECTION = new Set(["asc", "desc"]);

// List products: uses public/products/products.json and aggregates from
// public/products/*.json (collections, categories, product-images, inventory,
// product-reviews) so each item has the same structure as original products.json.
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

    const collectionIds = collectionParam
      ? collectionParam
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      : [];
    const categoryIds = categoryParam
      ? categoryParam
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      : [];
    const colorsFilter = colorParam
      ? colorParam
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      : [];
    const ratingsFilter = ratingParam
      ? ratingParam
          .split(",")
          .map((s) => parseInt(s.trim(), 10))
          .filter((n) => !Number.isNaN(n))
      : [];

    const data = await loadProductsData();
    let baseProducts = [...data.products];

    if (collectionIds.length > 0) {
      const hasLatest = collectionIds.includes("latest");
      const ids = collectionIds.filter((c) => c !== "latest");
      baseProducts = baseProducts.filter((p) => {
        const inLatest = hasLatest;
        const inCollection =
          ids.length === 0 || (p.collection && ids.includes(p.collection));
        return inLatest || inCollection;
      });
    }

    if (categoryIds.length > 0) {
      baseProducts = baseProducts.filter(
        (p) => p.category && categoryIds.includes(p.category),
      );
    }

    if (colorsFilter.length > 0) {
      baseProducts = baseProducts.filter((p) => {
        const productColors =
          data.imagesByProduct.get(p.product_id)?.map((i) => i.color) ?? [];
        return colorsFilter.some((c) => productColors.includes(c));
      });
    }

    if (ratingsFilter.length > 0) {
      const minRating = Math.min(...ratingsFilter);
      baseProducts = baseProducts.filter((p) => {
        const reviews = data.reviewsByProduct.get(p.product_id) ?? [];
        const avg =
          reviews.length === 0
            ? 0
            : reviews.reduce((s, r) => s + (r.rating ?? 0), 0) / reviews.length;
        return avg >= minRating;
      });
    }

    const fullProducts = baseProducts.map((p) => buildFullProduct(p, data));

    const sortKey = sort;
    const mult = direction === "asc" ? 1 : -1;
    fullProducts.sort((a, b) => {
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

    const total = fullProducts.length;
    const perPage = Math.min(
      10,
      Math.max(1, parseInt(url.searchParams.get("per_page") || "10", 10) || 10),
    );
    const page = Math.max(
      1,
      parseInt(url.searchParams.get("page") || "1", 10) || 1,
    );
    const offset = (page - 1) * perPage;
    const paginatedProducts = fullProducts.slice(offset, offset + perPage);
    const has_more = offset + paginatedProducts.length < total;

    res.status(200).json({
      data: paginatedProducts,
      pagination: {
        total,
        has_more,
        page,
        per_page: perPage,
      },
    });
  } catch (error) {
    console.error("Error loading products:", error);
    res.status(500).json({ error: "Failed to load products" });
  }
}
