// API: PUT /api/coupons/apply — apply coupon (payload: { coupon_code })

async function getBody(req) {
  if (req.body && typeof req.body === "object" && !(req.body instanceof ReadableStream)) {
    return req.body;
  }
  if (typeof req.json === "function") {
    return await req.json();
  }
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString("utf8");
  if (!raw.trim()) return {};
  return JSON.parse(raw);
}

// Mock valid coupon; extend with real validation/store as needed
const VALID_COUPONS = {
  GR8FRNTND24: { discount_amount: 5, discount_percentage: null },
};

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const body = await getBody(req);
    const couponCode =
      typeof body.coupon_code === "string" ? body.coupon_code.trim() : "";

    if (!couponCode) {
      res.status(400).json({ error: "coupon_code is required" });
      return;
    }

    const upperCode = couponCode.toUpperCase();
    const coupon = VALID_COUPONS[upperCode];

    if (!coupon) {
      res.status(200).json({ error: "Invalid coupon" });
      return;
    }

    res.status(200).json({
      coupon_code: upperCode,
      discount_amount: coupon.discount_amount,
      discount_percentage: coupon.discount_percentage,
    });
  } catch (error) {
    if (error instanceof SyntaxError) {
      res.status(400).json({ error: "Invalid JSON payload" });
      return;
    }
    console.error("Coupons apply error:", error);
    res.status(500).json({ error: "Failed to apply coupon" });
  }
}
