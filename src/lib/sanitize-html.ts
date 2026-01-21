import DOMPurify from "dompurify";

/**
 * Sanitizes HTML content from the API for use with Tiptap editor.
 *
 * The API may return:
 * - Full HTML documents with <!DOCTYPE>, <html>, <head>, <body> tags
 * - Embedded <style> tags
 * - HTML entities inside <pre><code> blocks that should be actual HTML
 * - Other unsupported elements
 *
 * This utility extracts and cleans the content for Tiptap compatibility.
 */

/**
 * Decodes HTML entities to their actual characters
 * e.g., &lt;strong&gt; becomes <strong>
 */
function decodeHtmlEntities(text: string): string {
  const entities: Record<string, string> = {
    "&lt;": "<",
    "&gt;": ">",
    "&amp;": "&",
    "&quot;": '"',
    "&#39;": "'",
    "&nbsp;": " ",
  };

  return text.replace(
    /&lt;|&gt;|&amp;|&quot;|&#39;|&nbsp;/g,
    (match) => entities[match] || match
  );
}

/**
 * Extracts content from <body> tag if present, otherwise returns the full content
 */
function extractBodyContent(html: string): string {
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  return bodyMatch ? bodyMatch[1] : html;
}

/**
 * Removes unwanted HTML elements that Tiptap can't handle
 */
function removeUnsupportedElements(html: string): string {
  // Remove DOCTYPE, html, head tags and their contents
  const cleaned = html
    .replace(/<!DOCTYPE[^>]*>/gi, "")
    .replace(/<html[^>]*>/gi, "")
    .replace(/<\/html>/gi, "")
    .replace(/<head[^>]*>[\s\S]*?<\/head>/gi, "")
    .replace(/<body[^>]*>/gi, "")
    .replace(/<\/body>/gi, "")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<meta[^>]*>/gi, "")
    .replace(/<title[^>]*>[\s\S]*?<\/title>/gi, "");

  return cleaned;
}

/**
 * Processes <pre><code> blocks that may contain escaped HTML
 * Converts them to regular content by decoding entities and splitting into paragraphs
 */
function processCodeBlocks(html: string): string {
  // Match <pre><code>...</code></pre> blocks
  return html.replace(
    /<pre[^>]*>\s*<code[^>]*>([\s\S]*?)<\/code>\s*<\/pre>/gi,
    (_match, content) => {
      // Decode HTML entities inside code blocks
      const decoded = decodeHtmlEntities(content);

      // Sanitize the decoded content to prevent executable HTML
      const sanitized = DOMPurify.sanitize(decoded);

      // Split on <br><br> or double newlines to create separate paragraphs
      const paragraphs = sanitized
        .split(/(?:<br\s*\/?>\s*){2,}|\n{2,}/gi)
        .map((p) => p.trim())
        .filter((p) => p.length > 0);

      // Wrap each segment in a <p> tag
      return paragraphs.map((p) => `<p>${p}</p>`).join("\n");
    }
  );
}

/**
 * Converts unsupported tags to supported equivalents
 */
function convertUnsupportedTags(html: string): string {
  return (
    html
      // Convert <div> to <p> (Tiptap doesn't support div by default)
      .replace(/<div[^>]*>/gi, "<p>")
      .replace(/<\/div>/gi, "</p>")
      // Convert <span> content (just remove the span tags, keep content)
      .replace(/<span[^>]*>/gi, "")
      .replace(/<\/span>/gi, "")
      // Ensure <br> tags are self-closing for consistency
      .replace(/<br\s*\/?>/gi, "<br />")
  );
}

/**
 * Cleans up whitespace and formatting
 */
function cleanWhitespace(html: string): string {
  return (
    html
      // Remove excessive newlines
      .replace(/\n{3,}/g, "\n\n")
      // Remove leading/trailing whitespace
      .trim()
  );
}

/**
 * Main function to sanitize HTML for Tiptap editor
 */
export function sanitizeHtmlForTiptap(html: string): string {
  if (!html || typeof html !== "string") {
    return "";
  }

  let sanitized = html;

  // Step 1: Extract body content if it's a full HTML document
  sanitized = extractBodyContent(sanitized);

  // Step 2: Remove unsupported elements
  sanitized = removeUnsupportedElements(sanitized);

  // Step 3: Process code blocks with escaped HTML
  sanitized = processCodeBlocks(sanitized);

  // Step 4: Convert unsupported tags
  sanitized = convertUnsupportedTags(sanitized);

  // Step 5: Clean up whitespace
  sanitized = cleanWhitespace(sanitized);

  return sanitized;
}
