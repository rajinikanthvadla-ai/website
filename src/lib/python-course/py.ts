/**
 * Tag for Python code inside TypeScript. Keeps backslashes as written (like String.raw),
 * drops the first and last blank line, and removes the shared indentation so code can be
 * indented to match the surrounding TypeScript.
 *
 * A multi-line value inserted with ${...} is indented to match the line it sits on,
 * so shared snippets can be reused inside functions, classes and other snippets.
 */
export function py(strings: TemplateStringsArray, ...values: unknown[]): string {
  let raw = "";
  strings.raw.forEach((chunk, index) => {
    raw += chunk;
    if (index < values.length) {
      const lineStart = raw.slice(raw.lastIndexOf("\n") + 1);
      const indent = /^[ \t]*$/.test(lineStart) ? lineStart : "";
      raw += String(values[index])
        .split("\n")
        .map((line, lineIndex) => (lineIndex === 0 || line === "" ? line : indent + line))
        .join("\n");
    }
  });
  const lines = raw.replace(/^[ \t]*\n/, "").replace(/\n[ \t]*$/, "").split("\n");
  const indents = lines.filter((line) => line.trim().length > 0).map((line) => line.match(/^ */)![0].length);
  const indent = indents.length ? Math.min(...indents) : 0;
  return lines.map((line) => line.slice(indent)).join("\n");
}
