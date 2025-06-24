// src/utils/textUtils.js

export const convertToHtml = (text) => {
  if (!text) return ''

  let html = text

  // Headings like ### Title
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>')

  // Bold (e.g. **Bold text**)
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')

  // Bullet points (- or •)
  html = html.replace(/^- (.+)$/gm, '<li>$1</li>')
  html = html.replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>') // wrap list

  // Paragraphs (any standalone lines)
  html = html.replace(/^([^<\n].+)$/gm, '<p>$1</p>')

  // Clean up double <ul>
  html = html.replace(/<\/ul>\s*<ul>/g, '')

  return html
}
