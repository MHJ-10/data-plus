function parseInsights(text: string): string[] {
  try {
    const parsed = JSON.parse(text);

    // case: stringified JSON
    if (typeof parsed === "string") {
      return JSON.parse(parsed);
    }

    // case: already correct
    if (Array.isArray(parsed)) return parsed;

    return [];
  } catch {
    return [];
  }
}

export async function POST(req: Request) {
  const { summary } = await req.json();

  if (!summary) {
    return Response.json({ error: "No summary provided" }, { status: 400 });
  }

  const prompt = `
You are a professional data analyst.

TASK:
Generate insights from the dataset.

STRICT OUTPUT FORMAT:
Return ONLY a valid JSON array of strings.

REQUIREMENTS:
- Output MUST start with [ and end with ]
- Do NOT wrap the JSON in quotes
- Do NOT use brackets like [Insight 1]
- Do NOT include numbering
- Do NOT include explanations or extra text

VALID EXAMPLE:
["Insight one", "Insight two"]

INVALID EXAMPLES:
"[\"Insight one\"]"
[Insight 1] Something
Insight one

INSIGHT RULES:
- Max 5 insights
- Max 15 words each
- Focus only on meaningful numeric columns
- Ignore ID-like fields (id, index, EAN, internal)
- Each insight must reference real data behavior (range, distribution, comparison)
- Avoid vague phrases like "strong trends" or "data consistency"

DATA:
${JSON.stringify(summary)}
`;

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization:
        "Bearer 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",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "arcee-ai/trinity-large-preview:free",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    }),
  });

  const data = await res.json();

  return Response.json({
    data: parseInsights(data.choices[0].message.content),
  });
}
