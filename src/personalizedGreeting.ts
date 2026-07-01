const RESERVED_ROOT_SEGMENTS = new Set(['work', 'community', 'marketing', 'design-engineering'])

export const DESIGN_ENGINEERING_PATH = '/design-engineering'

export function isDesignEngineeringPath(pathname: string): boolean {
  return pathname === DESIGN_ENGINEERING_PATH
}

const DEFAULT_HANDWRITING = 'hey, i’m harry'
const DEFAULT_BIO =
  'i love making, designing and living life, see what my browser looks like'

export type SidebarGreeting = {
  /** Smaller lead line for personalized URLs, e.g. "hey sarah," */
  handwritingLead: string | null
  handwriting: string
  bio: string
  companyLine: string | null
}

/** True for `/` and single-segment paths that render the studio homepage (not /work, etc.). */
export function isStudioHomePath(pathname: string): boolean {
  if (isDesignEngineeringPath(pathname)) return false
  if (pathname === '/') return true
  const match = pathname.match(/^\/([^/]+)\/?$/)
  if (!match) return false
  return !RESERVED_ROOT_SEGMENTS.has(match[1].toLowerCase())
}

function formatDisplayName(nameSlug: string): string {
  return nameSlug.toLowerCase()
}

function formatCompany(companySlug: string): string {
  return companySlug.toLowerCase()
}

/** Parse `/name-company` from a single path segment; returns null if not a valid slug. */
export function parsePersonalizedSlug(pathname: string): {
  displayName: string
  company: string
} | null {
  if (pathname === '/') return null

  const match = pathname.match(/^\/([^/]+)\/?$/)
  if (!match) return null

  const slug = match[1]
  if (slug.toLowerCase() === 'design-engineering') return null

  const hyphenIndex = slug.indexOf('-')
  if (hyphenIndex <= 0 || hyphenIndex === slug.length - 1) return null

  const nameSlug = slug.slice(0, hyphenIndex)
  const companySlug = slug.slice(hyphenIndex + 1)
  if (!nameSlug || !companySlug) return null
  if (RESERVED_ROOT_SEGMENTS.has(nameSlug.toLowerCase())) return null

  return {
    displayName: formatDisplayName(nameSlug),
    company: formatCompany(companySlug),
  }
}

export function getSidebarGreeting(pathname: string, enabled = true): SidebarGreeting {
  const defaults: SidebarGreeting = {
    handwritingLead: null,
    handwriting: DEFAULT_HANDWRITING,
    bio: DEFAULT_BIO,
    companyLine: null,
  }

  if (!enabled) return defaults

  const parsed = parsePersonalizedSlug(pathname)
  if (!parsed) return defaults

  return {
    handwritingLead: `hey ${parsed.displayName},`,
    handwriting: 'i’m harry',
    bio: DEFAULT_BIO,
    companyLine: `i would love to build and create at ${parsed.company}.`,
  }
}
