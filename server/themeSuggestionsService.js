const extractOutputText = (data) => {
  if (typeof data?.output_text === "string" && data.output_text.trim()) {
    return data.output_text;
  }

  const output = Array.isArray(data?.output) ? data.output : [];
  for (const item of output) {
    const content = Array.isArray(item?.content) ? item.content : [];
    for (const part of content) {
      if (part?.type === "output_text" && typeof part.text === "string") {
        return part.text;
      }
      if (part?.type === "text" && typeof part.text === "string") {
        return part.text;
      }
    }
  }

  return "";
};

export const generateThemeSuggestions = async ({ theme, locale }) => {
  if (!theme || typeof theme !== "string") {
    return { status: 400, body: { error: "theme is required" } };
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return { status: 500, body: { error: "OPENAI_API_KEY not set" } };
  }

  const model = process.env.OPENAI_MODEL ?? "gpt-4o-mini";
  const targetLocale = typeof locale === "string" ? locale : "pt-BR";

  const systemPrompt =
    "You are a helpful assistant that returns JSON only. " +
    "Return a JSON object with keys: theme (string) and suggestions (array). " +
    "Each suggestion must have reference, text, and insight strings. " +
    "Do not include markdown or extra text.";

  const userPrompt =
    `Tema: ${theme}. ` +
    `Idioma: ${targetLocale}. ` +
    "Gere 3 sugestoes de textos biblicos relevantes. " +
    "Cada sugestao deve ter referencia, texto e insight breve. ";

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        input: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.7,
        max_output_tokens: 600,
      }),
    });

    if (!response.ok) {
      const details = await response.text();
      return { status: 502, body: { error: "OpenAI error", details } };
    }

    const data = await response.json();
    const outputText = extractOutputText(data);

    let parsed;
    try {
      parsed = JSON.parse(outputText);
    } catch {
      return {
        status: 502,
        body: { error: "Invalid model response", details: outputText },
      };
    }

    if (!parsed || !Array.isArray(parsed.suggestions)) {
      return {
        status: 502,
        body: { error: "Invalid model response", details: outputText },
      };
    }

    return { status: 200, body: parsed };
  } catch {
    return { status: 500, body: { error: "Unexpected server error" } };
  }
};