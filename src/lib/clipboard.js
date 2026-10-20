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

// Reads text from the clipboard for one-click AI reply paste-back. Returns
// null if the browser blocks clipboard reading or the clipboard is empty.
export async function readClipboardText() {
  try {
    const text = await navigator.clipboard.readText();
    return text?.trim() ? text.trim() : null;
  } catch {
    return null;
  }
}
