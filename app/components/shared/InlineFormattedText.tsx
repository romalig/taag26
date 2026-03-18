import { Fragment, ReactNode } from "react";

function stripUnsupportedTags(value: string): string {
  return value.replace(/<(?!\/?(?:sup|sub)\b|br\s*\/?)[^>]*>/gi, "");
}

function parseInlineFormattedText(value: string): ReactNode[] {
  const sanitized = stripUnsupportedTags(value);
  const tokens = sanitized.split(/(<\/?(?:sup|sub)>|<br\s*\/?>)/gi);
  const nodes: ReactNode[] = [];
  let activeTag: "sup" | "sub" | null = null;

  tokens.forEach((token, index) => {
    if (!token) return;

    const lowerToken = token.toLowerCase();

    if (lowerToken === "<sup>") {
      activeTag = "sup";
      return;
    }

    if (lowerToken === "</sup>" && activeTag === "sup") {
      activeTag = null;
      return;
    }

    if (lowerToken === "<sub>") {
      activeTag = "sub";
      return;
    }

    if (lowerToken === "</sub>" && activeTag === "sub") {
      activeTag = null;
      return;
    }

    if (/^<br\s*\/?>$/i.test(token)) {
      nodes.push(<br key={`br-${index}`} />);
      return;
    }

    if (activeTag === "sup") {
      nodes.push(
        <sup key={`sup-${index}`} className="align-super text-[0.7em] leading-none">
          {token}
        </sup>
      );
      return;
    }

    if (activeTag === "sub") {
      nodes.push(
        <sub key={`sub-${index}`} className="align-sub text-[0.7em] leading-none">
          {token}
        </sub>
      );
      return;
    }

    nodes.push(<Fragment key={`text-${index}`}>{token}</Fragment>);
  });

  return nodes;
}

export default function InlineFormattedText({ value }: { value: string }) {
  return <>{parseInlineFormattedText(value)}</>;
}
