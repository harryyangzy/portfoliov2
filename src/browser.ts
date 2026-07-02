/**
 * Safari (desktop + iOS) is the only engine that supports transparent HEVC (hvc1)
 * video but NOT VP9-with-alpha WebM — it plays VP9 WebM opaquely and renders the
 * alpha channel as black. So we must feed Safari the HEVC-alpha source and every
 * other browser the VP9-alpha WebM. Chrome on macOS can also decode HEVC (without
 * alpha), which rules out relying on <source> order alone.
 */
export const isSafari = (() => {
  if (typeof navigator === 'undefined') return false
  const ua = navigator.userAgent
  return /^((?!chrome|chromium|android|crios|fxios|edg|opr).)*safari/i.test(ua)
})()
