// API: POST /api/newsletter — subscribe to newsletter (payload: { email })

const EMAIL_REGEX = /^[^@]+@[^@]+\.[^@]+$/;

async function parseJsonBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString("utf8");
  if (!raw.trim()) return {};
  return JSON.parse(raw);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    // Support both pre-parsed body (e.g. Vercel) and raw stream
    const body =
      req.body && typeof req.body === "object"
        ? req.body
        : await parseJsonBody(req);
    const email = typeof body.email === "string" ? body.email.trim() : "";

    if (!email) {
      res.status(400).json({ error: "Email is required" });
      return;
    }

    if (!EMAIL_REGEX.test(email)) {
      res.status(400).json({ error: "Please enter a valid email address" });
      return;
    }

    // TODO: persist subscription (e.g. database, mailing provider)
    res.status(200).json({ message: "Successfully subscribed to the newsletter" });
  } catch (error) {
    if (error instanceof SyntaxError) {
      res.status(400).json({ error: "Invalid JSON payload" });
      return;
    }
    console.error("Newsletter subscribe error:", error);
    res.status(500).json({ error: "Failed to subscribe" });
  }
}
