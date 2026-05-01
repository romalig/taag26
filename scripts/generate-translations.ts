import {readFile, writeFile} from "node:fs/promises";
import path from "node:path";

const SUPPORTED_LOCALES = ["es"] as const;
type TargetLocale = (typeof SUPPORTED_LOCALES)[number];

const targetLocale = process.argv[2] as TargetLocale | undefined;

if (!targetLocale || !SUPPORTED_LOCALES.includes(targetLocale)) {
  throw new Error(`Usage: tsx scripts/generate-translations.ts <${SUPPORTED_LOCALES.join("|")}>`);
}

const apiKey = process.env.CLAUDE_API_KEY || process.env.ANTHROPIC_API_KEY;
if (!apiKey) {
  throw new Error("CLAUDE_API_KEY or ANTHROPIC_API_KEY is required.");
}

const root = process.cwd();
const sourcePath = path.join(root, "messages", "en.json");
const targetPath = path.join(root, "messages", `${targetLocale}.json`);
const source = await readFile(sourcePath, "utf8");

const response = await fetch("https://api.anthropic.com/v1/messages", {
  method: "POST",
  headers: {
    "content-type": "application/json",
    "x-api-key": apiKey,
    "anthropic-version": "2023-06-01",
  },
  body: JSON.stringify({
    model: process.env.CLAUDE_TRANSLATION_MODEL || "claude-3-5-sonnet-latest",
    max_tokens: 8192,
    messages: [
      {
        role: "user",
        content:
          `Translate this next-intl JSON from English to ${targetLocale}. ` +
          "Preserve every key, object shape, placeholders, punctuation needed for UI, and return only valid JSON.\n\n" +
          source,
      },
    ],
  }),
});

if (!response.ok) {
  throw new Error(`Claude API failed: ${response.status} ${await response.text()}`);
}

const json = (await response.json()) as {content?: Array<{type: string; text?: string}>};
const translated = json.content?.find((part) => part.type === "text")?.text;
if (!translated) {
  throw new Error("Claude API response did not include text content.");
}

const parsed = JSON.parse(translated);
await writeFile(targetPath, `${JSON.stringify(parsed, null, 2)}\n`);
console.log(`Wrote ${path.relative(root, targetPath)}`);
