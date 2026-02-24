import fs from "fs/promises";
import path from "path";

const PRODUCTS_DIR = path.join(process.cwd(), "public", "products");

async function readJson(name) {
  const filePath = path.join(PRODUCTS_DIR, `${name}.json`);
  const contents = await fs.readFile(filePath, "utf8");
  return JSON.parse(contents);
}

export async function loadCollections() {
  const raw = await readJson("collections");
  return Array.isArray(raw) ? raw : [];
}

export async function loadProductsData() {
  const [
    products,
    collections,
    categories,
    productImages,
    productInfo,
    inventory,
    productReviews,
  ] = await Promise.all([
    readJson("products"),
    readJson("collections"),
    readJson("categories"),
    readJson("product-images"),
    readJson("product-info"),
    readJson("inventory"),
    readJson("product-reviews"),
  ]);

  const collectionMap = new Map(
    Array.isArray(collections) ? collections.map((c) => [c.collection_id, c]) : [],
  );
  const categoryMap = new Map(
    Array.isArray(categories) ? categories.map((c) => [c.category_id, c]) : [],
  );

  const imagesByProduct = new Map();
  for (const row of Array.isArray(productImages) ? productImages : []) {
    const pid = row.product_id;
    if (!imagesByProduct.has(pid)) imagesByProduct.set(pid, []);
    imagesByProduct.get(pid).push({ color: row.color, image_url: row.image_url });
  }

  const infoByProduct = new Map();
  for (const row of Array.isArray(productInfo) ? productInfo : []) {
    const pid = row.product_id;
    if (!infoByProduct.has(pid)) infoByProduct.set(pid, []);
    infoByProduct.get(pid).push({
      title: row.title,
      description: Array.isArray(row.description) ? row.description : [],
    });
  }

  const inventoryByProduct = new Map();
  for (const row of Array.isArray(inventory) ? inventory : []) {
    const pid = row.product_id;
    if (!inventoryByProduct.has(pid)) inventoryByProduct.set(pid, []);
    inventoryByProduct.get(pid).push(row);
  }

  const reviewsByProduct = new Map();
  for (const row of Array.isArray(productReviews) ? productReviews : []) {
    const pid = row.product_id;
    if (!reviewsByProduct.has(pid)) reviewsByProduct.set(pid, []);
    reviewsByProduct.get(pid).push(row);
  }

  return {
    products: Array.isArray(products) ? products : [],
    collectionMap,
    categoryMap,
    imagesByProduct,
    infoByProduct,
    inventoryByProduct,
    reviewsByProduct,
  };
}

export function buildFullProduct(base, data, options = {}) {
  const { includeInfo = false } = options;
  const {
    collectionMap,
    categoryMap,
    imagesByProduct,
    infoByProduct,
    inventoryByProduct,
    reviewsByProduct,
  } = data;

  const id = base.product_id;
  const category = base.category ? categoryMap.get(base.category) : null;
  const collection = base.collection ? collectionMap.get(base.collection) : null;
  const images = imagesByProduct.get(id) ?? [];
  const inv = inventoryByProduct.get(id) ?? [];
  const reviews = reviewsByProduct.get(id) ?? [];

  const prices = inv
    .map((i) => (i.sale_price != null ? i.sale_price : i.list_price))
    .filter(Number.isFinite);
  const lowest = prices.length ? Math.min(...prices) : null;
  const highest = prices.length ? Math.max(...prices) : null;
  const priceRange =
    lowest != null && highest != null ? { highest, lowest } : null;

  const ratingSum = reviews.reduce((s, r) => s + (r.rating ?? 0), 0);
  const rating = reviews.length
    ? Math.round((ratingSum / reviews.length) * 100) / 100
    : null;
  const sold = inv.reduce((s, i) => s + (i.sold ?? 0), 0);
  const sizes = [...new Set(inv.map((i) => i.size).filter(Boolean))];
  const colors = [...new Set(images.map((i) => i.color).filter(Boolean))];

  // Inventory items in response match original shape (no product_id)
  const inventoryForResponse = inv.map(
    ({ product_id: _pid, ...item }) => item,
  );

  const result = {
    product_id: id,
    name: base.name,
    description: base.description,
    category: category || null,
    collection: collection || null,
    created_at: base.created_at,
    colors,
    images,
    inventory: inventoryForResponse,
    priceRange,
    rating: rating ?? null,
    reviews: reviews.length,
    sizes,
    sold,
  };

  if (includeInfo) {
    result.info = infoByProduct.get(id) ?? [];
  }

  return result;
}
