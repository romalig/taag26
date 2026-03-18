import React from "react";
import { Text, Font } from "@react-pdf/renderer";

// ---------------------------------------------------------------------------
// Register Noto Sans – comprehensive Unicode coverage for special chars
// (superscripts, µ, en-dash, etc.) that Sora doesn't support.
// ---------------------------------------------------------------------------
Font.register({
  family: "NotoSans",
  fonts: [
    { src: "/fonts/NotoSans-Regular.ttf", fontWeight: 400 },
    { src: "/fonts/NotoSans-Bold.ttf", fontWeight: 700 },
  ],
});

// ---------------------------------------------------------------------------
// HTML pre-processing
// ---------------------------------------------------------------------------
function decodeHtmlEntities(value: string): string {
  return value
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&micro;/gi, "\u00B5");
}

function stripUnsupportedTags(value: string): string {
  return value.replace(/<(?!\/?(?:sup|sub)\b|br\s*\/?)[^>]*>/gi, "");
}

// ---------------------------------------------------------------------------
// React-PDF element-based formatter
// ---------------------------------------------------------------------------
// Instead of converting <sup>/<sub> to Unicode chars (which Sora can't render),
// we return ReactNode[] with nested <Text> elements using NotoSans + reduced
// fontSize for superscript/subscript styling.
// ---------------------------------------------------------------------------

const NOTO_STYLE = { fontFamily: "NotoSans" };
const SUP_STYLE = { fontFamily: "NotoSans", fontSize: "60%" as unknown as number };
const SUB_STYLE = { fontFamily: "NotoSans", fontSize: "60%" as unknown as number };

export function formatPdfInline(value: string): React.ReactNode[] {
  const cleaned = stripUnsupportedTags(decodeHtmlEntities(value));

  // Split keeping the delimiters (sup/sub/br tags) as separate tokens
  const tokens = cleaned.split(
    /(<sup\b[^>]*>.*?<\/sup>|<sub\b[^>]*>.*?<\/sub>|<br\s*\/?>)/gi
  );

  const nodes: React.ReactNode[] = [];

  tokens.forEach((token, i) => {
    if (!token) return;

    // <br>
    if (/^<br\s*\/?>$/i.test(token)) {
      nodes.push("\n");
      return;
    }

    // <sup>…</sup>
    const supMatch = token.match(/<sup\b[^>]*>(.*?)<\/sup>/i);
    if (supMatch) {
      nodes.push(
        React.createElement(Text, { key: `sup-${i}`, style: SUP_STYLE }, supMatch[1])
      );
      return;
    }

    // <sub>…</sub>
    const subMatch = token.match(/<sub\b[^>]*>(.*?)<\/sub>/i);
    if (subMatch) {
      nodes.push(
        React.createElement(Text, { key: `sub-${i}`, style: SUB_STYLE }, subMatch[1])
      );
      return;
    }

    // Plain text – check if it contains chars that Sora can't render
    if (/[^\x00-\x7F]/.test(token)) {
      // Split into runs of ASCII vs non-ASCII so only special chars use NotoSans
      const runs = token.split(/([^\x00-\x7F]+)/);
      runs.forEach((run, j) => {
        if (!run) return;
        if (/[^\x00-\x7F]/.test(run)) {
          nodes.push(
            React.createElement(Text, { key: `noto-${i}-${j}`, style: NOTO_STYLE }, run)
          );
        } else {
          nodes.push(run);
        }
      });
      return;
    }

    nodes.push(token);
  });

  return nodes;
}

// ---------------------------------------------------------------------------
// Legacy plain-text formatter (kept for any non-PDF contexts)
// ---------------------------------------------------------------------------
const SUPERSCRIPT_MAP: Record<string, string> = {
  "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴",
  "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹",
  "+": "⁺", "-": "⁻", "=": "⁼", "(": "⁽", ")": "⁾", "n": "ⁿ", "i": "ⁱ",
};

const SUBSCRIPT_MAP: Record<string, string> = {
  "0": "₀", "1": "₁", "2": "₂", "3": "₃", "4": "₄",
  "5": "₅", "6": "₆", "7": "₇", "8": "₈", "9": "₉",
  "+": "₊", "-": "₋", "=": "₌", "(": "₍", ")": "₎",
};

function mapCharacters(value: string, map: Record<string, string>): string {
  return Array.from(value).map((char) => map[char] || char).join("");
}

export function formatPdfInlineText(value: string): string {
  return stripUnsupportedTags(decodeHtmlEntities(value))
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<sup\b[^>]*>(.*?)<\/sup>/gi, (_, content: string) => mapCharacters(content, SUPERSCRIPT_MAP))
    .replace(/<sub\b[^>]*>(.*?)<\/sub>/gi, (_, content: string) => mapCharacters(content, SUBSCRIPT_MAP));
}
