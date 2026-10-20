// Copies text with the Clipboard API. Returns false if the browser blocks it
// (for example on a page that isn't HTTPS, or when permission is denied), so
// the caller can offer a way to copy it by hand instead.
export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
