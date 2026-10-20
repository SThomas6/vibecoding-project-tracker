// True only for web links (http:// or https://). Anything else, such as
// javascript: links, is refused, so a saved link can never run code (NFR12).
export function isWebLink(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}
