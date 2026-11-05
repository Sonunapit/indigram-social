const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.Gemini_API_KEY || process.env.GEMINI_API_KEY,
});

const MODEL = process.env.GEMINI_MODEL || "gemini-3-flash-preview";

const PROMPT = `Write ONE Instagram caption for this image.
Rules:
- Return ONLY the caption, nothing else. No options, no headings, no explanation, no markdown.
- 2 short sentences (about 25 to 30 words total), natural and engaging, with 2-3 emojis.
- Then on a new line, exactly 6 relevant hashtags.`;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Sirf temporary errors pe retry karo (404/400/401/403 pe nahi)
const isRetryable = (error) =>
  !error.status || [429, 500, 502, 503, 504].includes(error.status);

// Safety net: Gemini lamba text de to bhi caption medium length ka rahe
const cleanCaption = (raw) => {
  let text = raw
    .split(/option\s*2/i)[0]            // pehla option hi rakho
    .replace(/^.*option\s*1.*$/gim, "") // "Option 1: ..." heading hatao
    .replace(/^#{1,6}\s+.*$/gm, "")     // markdown headings hatao
    .replace(/\*\*|__/g, "");           // bold hatao

  const tags = [...new Set(text.match(/#\w+/g) || [])].slice(0, 6);
  let body = text.replace(/#\w+/g, "").replace(/\s+/g, " ").trim();

  if (body.length > 260) {
    body = body.slice(0, 260);
    body = body.slice(0, Math.max(body.lastIndexOf(" "), 0)).trim() + "...";
  }
  return [body, tags.join(" ")].filter(Boolean).join("\n");
};

const generateImageCaption = async (imageBuffer, mimeType, retries = 3, delayTime = 2000) => {
  const base64Data = imageBuffer.toString("base64");

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: MODEL,
        contents: [
          {
            role: "user",
            parts: [
              { text: PROMPT },
              { inlineData: { data: base64Data, mimeType } },
            ],
          },
        ],
      });

      const text = response.text;
      if (!text || !text.trim()) throw new Error("Gemini returned an empty caption");
      return cleanCaption(text);
    } catch (error) {
      console.warn(`[gemini] Attempt ${attempt} failed: ${error.message}`);

      if (!isRetryable(error) || attempt === retries) {
        throw new Error(`Failed to generate AI caption: ${error.message}`);
      }
      await delay(delayTime * attempt); // 2s, 4s, ...
    }
  }
};

module.exports = { generateImageCaption };