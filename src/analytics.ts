import { parsePersonalizedSlug } from './personalizedGreeting'

export const GA_MEASUREMENT_ID = 'G-3QMEQBF6KM'

export type AnalyticsClickEvent =
  | 'resume_click'
  | 'linkedin_click'
  | 'email_click'
  | 'github_click'
  | 'project_click'
  | 'contact_click'

export type PageAnalyticsContext = {
  page_path: string
  personalized_name?: string
  personalized_company?: string
}

let initialized = false

export function isAnalyticsEnabled(): boolean {
  return import.meta.env.PROD
}

function cleanParams(params: Record<string, string | undefined>): Record<string, string> {
  return Object.fromEntries(
    Object.entries(params).filter((entry): entry is [string, string] => {
      const value = entry[1]
      return value !== undefined && value !== ''
    }),
  )
}

function gtag(...args: unknown[]) {
  if (!isAnalyticsEnabled() || typeof window.gtag !== 'function') return
  window.gtag(...args)
}

export function initAnalytics(): void {
  if (!isAnalyticsEnabled() || initialized) return
  initialized = true

  window.dataLayer = window.dataLayer ?? []
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer?.push(args)
  }

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
  document.head.appendChild(script)

  gtag('js', new Date())
  gtag('config', GA_MEASUREMENT_ID, { send_page_view: false })
}

export function getPageAnalyticsContext(pathname: string): PageAnalyticsContext {
  const parsed = parsePersonalizedSlug(pathname)
  const context: PageAnalyticsContext = { page_path: pathname }

  if (parsed) {
    context.personalized_name = parsed.displayName
    context.personalized_company = parsed.company
  }

  return context
}

export function trackPageView(pathname: string): void {
  if (!isAnalyticsEnabled()) return

  const context = getPageAnalyticsContext(pathname)

  gtag('event', 'page_view', cleanParams({
    page_path: context.page_path,
    page_title: document.title,
    page_location: `${window.location.origin}${pathname}`,
    personalized_name: context.personalized_name,
    personalized_company: context.personalized_company,
  }))
}

export function trackPersonalizedPageView(pathname: string): void {
  if (!isAnalyticsEnabled()) return

  const parsed = parsePersonalizedSlug(pathname)
  if (!parsed) return

  gtag('event', 'personalized_page_view', cleanParams({
    name: parsed.displayName,
    company: parsed.company,
    page_path: pathname,
  }))
}

export function trackEvent(
  eventName: string,
  params: Record<string, string | undefined> = {},
): void {
  if (!isAnalyticsEnabled()) return
  gtag('event', eventName, cleanParams(params))
}

export function trackRoute(pathname: string): void {
  trackPageView(pathname)
  trackPersonalizedPageView(pathname)
}

export function trackClick(
  eventName: AnalyticsClickEvent,
  pathname: string,
  extra: Record<string, string | undefined> = {},
): void {
  if (!isAnalyticsEnabled()) return

  const context = getPageAnalyticsContext(pathname)

  trackEvent(eventName, {
    page_path: context.page_path,
    personalized_name: context.personalized_name,
    personalized_company: context.personalized_company,
    ...extra,
  })
}
