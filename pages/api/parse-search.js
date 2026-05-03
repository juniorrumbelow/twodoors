import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

const EXTRACT_TOOL = {
  name: "extract_property_filters",
  description:
    "Extract structured property search filters from a natural language query for a UK property listing site",
  input_schema: {
    type: "object",
    properties: {
      location: {
        type: "string",
        description:
          "Geographic location: city, town, postcode, or area name (e.g. Norwich, NR1, Cotswolds, London Bridge)",
      },
      minBeds: {
        type: "integer",
        description: "Minimum number of bedrooms required",
      },
      minPrice: {
        type: "integer",
        description:
          "Minimum property price in GBP as a full integer (e.g. 200000 for £200k, 1200000 for £1.2m)",
      },
      maxPrice: {
        type: "integer",
        description:
          "Maximum property price in GBP as a full integer (e.g. 400000 for £400k, 600000 for £600k)",
      },
      propertyType: {
        type: "string",
        enum: ["House", "Flat", "Apartment", "Bungalow"],
        description:
          "Type of property. Map: cottage → House, detached/semi/terraced → House, studio → Flat",
      },
      channel: {
        type: "string",
        enum: ["buy", "rent"],
        description: "Whether the user wants to buy or rent",
      },
      keywords: {
        type: "array",
        items: { type: "string" },
        description:
          "Specific property features or amenities mentioned (e.g. fireplace, garden, garage, parking, sea view, south-facing)",
      },
    },
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { query } = req.body;

  if (!query || typeof query !== "string" || !query.trim()) {
    return res.status(400).json({ error: "Query is required" });
  }

  const sanitizedQuery = query.trim().slice(0, 500);

  try {
    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 300,
      tools: [EXTRACT_TOOL],
      tool_choice: { type: "tool", name: "extract_property_filters" },
      messages: [
        {
          role: "user",
          content: `Extract property search filters from this query: "${sanitizedQuery}"`,
        },
      ],
    });

    const toolUse = message.content.find((b) => b.type === "tool_use");
    if (!toolUse) {
      return res.status(200).json({});
    }

    const input = toolUse.input;
    const filters = {};

    if (typeof input.location === "string" && input.location.trim()) {
      filters.location = input.location.trim();
    }
    if (Number.isInteger(input.minBeds) && input.minBeds > 0) {
      filters.minBeds = String(input.minBeds);
    }
    if (Number.isInteger(input.minPrice) && input.minPrice > 0) {
      filters.minPrice = String(input.minPrice);
    }
    if (Number.isInteger(input.maxPrice) && input.maxPrice > 0) {
      filters.maxPrice = String(input.maxPrice);
    }
    if (["House", "Flat", "Apartment", "Bungalow"].includes(input.propertyType)) {
      filters.propertyType = input.propertyType;
    }
    if (["buy", "rent"].includes(input.channel)) {
      filters.channel = input.channel;
    }
    if (Array.isArray(input.keywords)) {
      filters.keywords = input.keywords
        .filter((k) => typeof k === "string" && k.trim())
        .map((k) => k.toLowerCase().trim())
        .slice(0, 4);
    }

    return res.status(200).json(filters);
  } catch {
    return res.status(500).json({ error: "Failed to parse search query" });
  }
}
