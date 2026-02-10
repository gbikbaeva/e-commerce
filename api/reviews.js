import fs from "fs/promises";
import path from "path";

// Vercel serverless function to serve paginated reviews
export default async function handler(req, res) {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const pageParam = url.searchParams.get("page") || "1";
    const perPageParam = url.searchParams.get("per_page") || "12";
    const ratingParam = url.searchParams.get("rating");

    const page = Math.max(parseInt(pageParam, 10) || 1, 1);
    const perPage = Math.max(parseInt(perPageParam, 10) || 1, 1);

    const filePath = path.join(process.cwd(), "public", "reviews.json");
    const fileContents = await fs.readFile(filePath, "utf8");
    const json = JSON.parse(fileContents);

    const allReviews = Array.isArray(json.data) ? json.data : [];

    const filteredReviews =
      ratingParam != null
        ? allReviews.filter(
            (review) => review.rating === Number.parseInt(ratingParam, 10),
          )
        : allReviews;

    const total = filteredReviews.length;

    const start = (page - 1) * perPage;
    const end = start + perPage;
    const pageData = filteredReviews.slice(start, end);

    res.status(200).json({
      aggregate: json.aggregate,
      data: pageData,
      pagination: {
        page,
        per_page: perPage,
        total,
        has_more: end < total,
      },
    });
  } catch (error) {
    console.error("Error loading reviews:", error);
    res.status(500).json({ error: "Failed to load reviews" });
  }
}
