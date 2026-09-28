/** Greedily groups words into display lines of at most `max` characters, never splitting a word. */
export function groupWords(text: string, max: number) {
  const lines: string[] = []
  for (const word of text.trim().split(/\s+/)) {
    const last = lines[lines.length - 1]
    if (last && `${last} ${word}`.length <= max) lines[lines.length - 1] = `${last} ${word}`
    else lines.push(word)
  }
  return lines
}

/** Font size (vw) that keeps the longest line inside roughly `span` vw of wide display type. */
export function fitVw(lines: string[], span: number, cap: number, charWidth = 0.78) {
  const longest = Math.max(...lines.map((l) => l.length))
  return Math.min(cap, span / (longest * charWidth))
}
