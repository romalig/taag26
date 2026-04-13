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

// ---------------------------------------------------------------------------
// Unicode super/subscript maps — NotoSans renders these glyphs correctly and
// they are positioned as true superscripts/subscripts by the font itself.
// ---------------------------------------------------------------------------
const SUPERSCRIPT_MAP: Record<string, string> = {
  "0": "\u2070", "1": "\u00B9", "2": "\u00B2", "3": "\u00B3", "4": "\u2074",
  "5": "\u2075", "6": "\u2076", "7": "\u2077", "8": "\u2078", "9": "\u2079",
  "+": "\u207A", "-": "\u207B", "=": "\u207C", "(": "\u207D", ")": "\u207E",
  "n": "\u207F", "i": "\u2071",
};

const SUBSCRIPT_MAP: Record<string, string> = {
  "0": "\u2080", "1": "\u2081", "2": "\u2082", "3": "\u2083", "4": "\u2084",
  "5": "\u2085", "6": "\u2086", "7": "\u2087", "8": "\u2088", "9": "\u2089",
  "+": "\u208A", "-": "\u208B", "=": "\u208C", "(": "\u208D", ")": "\u208E",
};

function toUnicodeSup(content: string): string {
  return Array.from(content).map((c) => SUPERSCRIPT_MAP[c] || c).join("");
}

function toUnicodeSub(content: string): string {
  return Array.from(content).map((c) => SUBSCRIPT_MAP[c] || c).join("");
}

export function formatPdfInline(value: string): React.ReactNode[] {
  // Pre-process: convert <sup>/<sub> to Unicode chars BEFORE splitting,
  // so the result is a flat string with no HTML tags except <br>.
  let cleaned = stripUnsupportedTags(decodeHtmlEntities(value));
  cleaned = cleaned.replace(/<sup\b[^>]*>(.*?)<\/sup>/gi, (_, c: string) => toUnicodeSup(c));
  cleaned = cleaned.replace(/<sub\b[^>]*>(.*?)<\/sub>/gi, (_, c: string) => toUnicodeSub(c));

  cleaned = cleaned.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

  // Split on explicit <br> or newline (e.g. from Excel Alt+Enter via API/DB)
  const segments = cleaned.split(/<br\s*\/?>|\n/gi);

  const nodes: React.ReactNode[] = [];

  segments.forEach((segment, i) => {
    if (i > 0) nodes.push("\n");
    if (!segment) return;

    // Check if segment contains non-ASCII chars (Unicode super/sub, µ, –, etc.)
    if (/[^\x00-\x7F]/.test(segment)) {
      // Split into runs of ASCII vs non-ASCII so only special chars use NotoSans
      const runs = segment.split(/([^\x00-\x7F]+)/);
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
    } else {
      nodes.push(segment);
    }
  });

  return nodes;
}

// ---------------------------------------------------------------------------
// Legacy plain-text formatter (kept for any non-PDF contexts)
// ---------------------------------------------------------------------------
export function formatPdfInlineText(value: string): string {
  return stripUnsupportedTags(decodeHtmlEntities(value))
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<sup\b[^>]*>(.*?)<\/sup>/gi, (_, content: string) => toUnicodeSup(content))
    .replace(/<sub\b[^>]*>(.*?)<\/sub>/gi, (_, content: string) => toUnicodeSub(content));
}
