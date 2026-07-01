/// <reference types="vite/client" />

interface Window {
  dataLayer?: unknown[]
  gtag?: (...args: unknown[]) => void
}

declare const Typekit: {
  load: (config: { kitId: string }) => void
}
