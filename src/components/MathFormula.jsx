import { useMemo } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

/**
 * Renders LaTeX as typeset math, the way it appears in textbooks.
 * Falls back to the raw source (never throws) if the expression is invalid.
 */
export default function MathFormula({ latex, formula, display = false, className = "" }) {
  const source = latex ?? formula ?? "";
  const html = useMemo(() => {
    try {
      return katex.renderToString(source, {
        displayMode: display,
        throwOnError: false,
        strict: "ignore",
        output: "htmlAndMathml", // MathML keeps equations readable by screen readers
      });
    } catch {
      return null;
    }
  }, [source, display]);

  if (html === null) {
    return <code className={className}>{source}</code>;
  }

  return (
    <span
      className={className}
      // KaTeX output is generated from our own trusted registry strings
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
