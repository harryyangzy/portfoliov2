import type { ReactNode } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import DesignEngineeringCanvasTools, {
  type CanvasToolId,
} from './DesignEngineeringCanvasTools'
import { Link, NavLink, useLocation } from 'react-router-dom'
import {
  designEngineeringChevronToolIcons,
  designEngineeringSoloToolIcons,
  type ToolbarIconTrio,
} from './assets/design-engineering/toolbar-icons'
import navFigmaIcon from './assets/figma icon.png'
import navEmailIcon from './assets/email favicon.png'
import navInstagramIcon from './assets/Instagram_logo_2016.svg'
import { trackClick, type AnalyticsClickEvent } from './analytics'
import {
  DESIGN_ENGINEERING_PATH,
  getSidebarGreeting,
  isDesignEngineeringPath,
  isStudioHomePath,
} from './personalizedGreeting'
import { MOBILE_LAYOUT_BREAKPOINT_PX, useMobileLayout } from './useMobileLayout'
import './productDesignHomepage.css'

/** CSS-drawn menu icon — crisp on high-DPI; no raster/SVG downscale or filter blur. */
function MobileMenuIcon() {
  return (
    <span className="pd-mobile-top__menu-icon" aria-hidden>
      <span className="pd-mobile-top__menu-bar" />
      <span className="pd-mobile-top__menu-bar" />
    </span>
  )
}

type ToolId = CanvasToolId

type RouteMeta = {
  title: string
  description: string
  image?: string
}

const SITE_URL = 'https://harryyang.ca'
const DEFAULT_SHARE_IMAGE = `${SITE_URL}/social-preview.png`
const DEFAULT_ROUTE_META: RouteMeta = {
  title: 'Harry Yang - designing + building',
  description:
    'Portfolio of Harry Yang across product design, engineering, community leadership, and marketing campaigns.',
  image: DEFAULT_SHARE_IMAGE,
}

const ROUTE_META: Record<string, RouteMeta> = {
  '/': {
    title: 'Harry Yang - designing + building',
    description:
      'Portfolio of Harry Yang across product design, engineering, community leadership, and marketing campaigns.',
    image: DEFAULT_SHARE_IMAGE,
  },
  '/design-engineering': {
    title: 'Design Engineering | Harry Yang',
    description:
      'Product design and engineering case studies by Harry Yang — STUSH Foods, Coeur, and Stumbl.',
    image: DEFAULT_SHARE_IMAGE,
  },
  '/work/stush': {
    title: 'STUSH Foods Case Study | Harry Yang',
    description:
      'How Harry Yang redesigned the STUSH Foods ecommerce experience through brand systems, UX, and front-end execution.',
    image: DEFAULT_SHARE_IMAGE,
  },
  '/work/coeur': {
    title: 'Coeur Case Study | Harry Yang',
    description:
      'A case study on Coeur, a memory-capture app concept shaped through research, prototyping, storytelling, and interface design.',
    image: DEFAULT_SHARE_IMAGE,
  },
  '/work/stumbl': {
    title: 'Stumbl Case Study | Harry Yang',
    description:
      'A case study on Stumbl, a transit app concept focused on glanceable bus arrivals, saved routes, and home screen widgets.',
    image: DEFAULT_SHARE_IMAGE,
  },
  '/community': {
    title: 'Community Projects | Harry Yang',
    description:
      'Community leadership, events, and student initiatives from Harry Yang presented through an interactive post-office experience.',
    image: DEFAULT_SHARE_IMAGE,
  },
  '/marketing': {
    title: 'Campaigns | Harry Yang',
    description:
      'Marketing campaigns and brand storytelling across STUSH, Yee Hong, CSA, TSAC, and other creative work by Harry Yang.',
    image: DEFAULT_SHARE_IMAGE,
  },
  '/marketing/stush': {
    title: 'Campaigns / STUSH | Harry Yang',
    description:
      'Campaign strategy, creative, and brand storytelling work created for STUSH Foods by Harry Yang.',
    image: DEFAULT_SHARE_IMAGE,
  },
  '/marketing/yee-hong': {
    title: 'Campaigns / Yee Hong Foundation | Harry Yang',
    description:
      'Marketing and communications work for Yee Hong Foundation focused on storytelling, outreach, and campaign design.',
    image: DEFAULT_SHARE_IMAGE,
  },
  '/marketing/tsac': {
    title: 'Campaigns / TSAC | Harry Yang',
    description:
      'Creative campaign and communications work for Trudeau Student Activities Council by Harry Yang.',
    image: DEFAULT_SHARE_IMAGE,
  },
  '/marketing/csa': {
    title: 'Campaigns / CSA at Western | Harry Yang',
    description:
      'Campaign design and marketing work for the Chinese Students’ Association at Western by Harry Yang.',
    image: DEFAULT_SHARE_IMAGE,
  },
  '/marketing/other': {
    title: 'Campaigns / Other Work | Harry Yang',
    description:
      'A collection of additional campaign, social, and brand storytelling work from Harry Yang.',
    image: DEFAULT_SHARE_IMAGE,
  },
}

function upsertMetaByName(name: string, content: string) {
  let el = document.head.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('name', name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertMetaByProperty(property: string, content: string) {
  let el = document.head.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('property', property)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertCanonical(href: string) {
  let el = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

const MOBILE_TOOLBAR_ORDER: ToolId[] = ['pointer', 'pen', 'text', 'comment']

type ToolbarToolConfig = {
  id: ToolId
  icons: ToolbarIconTrio
  iconLayout: 'flyout' | 'solo'
  label: string
}

const FIGMA_TOOLBAR_TOOLS: ToolbarToolConfig[] = [
  {
    id: 'pointer',
    icons: designEngineeringChevronToolIcons[0]!,
    iconLayout: 'flyout',
    label: 'Pointer',
  },
  {
    id: 'frame',
    icons: designEngineeringChevronToolIcons[1]!,
    iconLayout: 'flyout',
    label: 'Frame',
  },
  {
    id: 'line',
    icons: designEngineeringChevronToolIcons[2]!,
    iconLayout: 'flyout',
    label: 'Line',
  },
  {
    id: 'pen',
    icons: designEngineeringChevronToolIcons[3]!,
    iconLayout: 'flyout',
    label: 'Pen',
  },
  {
    id: 'comment',
    icons: designEngineeringChevronToolIcons[4]!,
    iconLayout: 'flyout',
    label: 'Comment',
  },
  {
    id: 'text',
    icons: designEngineeringSoloToolIcons.text,
    iconLayout: 'solo',
    label: 'Text',
  },
  {
    id: 'search',
    icons: designEngineeringSoloToolIcons.search,
    iconLayout: 'solo',
    label: 'Search',
  },
]

/** Active -> active; else hovered -> hover; else default. */
function pickIconSrc(icons: ToolbarIconTrio, active: boolean, hovered: boolean) {
  if (active) return icons.active
  if (hovered) return icons.hover
  return icons.default
}

function ToolbarToolButton({
  toolId,
  icons,
  active,
  hovered,
  iconLayout,
  label,
  onSelect,
  onHoverStart,
  onHoverEnd,
}: {
  toolId: ToolId
  icons: ToolbarIconTrio
  active: boolean
  hovered: boolean
  /** Figma: flyout tools use 111×84 assets (glyph + chevron in one); text/search use 84×84. */
  iconLayout: 'flyout' | 'solo'
  label: string
  onSelect: (id: ToolId) => void
  onHoverStart: (id: ToolId) => void
  onHoverEnd: (id: ToolId) => void
}) {
  const iconSrc = pickIconSrc(icons, active, hovered)
  const slotClass =
    iconLayout === 'flyout'
      ? 'pd-toolbar__icon-slot pd-toolbar__icon-slot--flyout'
      : 'pd-toolbar__icon-slot pd-toolbar__icon-slot--solo'

  return (
    <button
      type="button"
      className="pd-toolbar__group"
      aria-pressed={active}
      aria-label={label}
      onClick={() => onSelect(toolId)}
      onMouseEnter={() => onHoverStart(toolId)}
      onMouseLeave={() => onHoverEnd(toolId)}
      onBlur={() => onHoverEnd(toolId)}
    >
      <span className={slotClass} aria-hidden>
        <img src={iconSrc} alt="" className="pd-toolbar__icon" draggable={false} />
      </span>
    </button>
  )
}

function FigmaToolbar({
  activeTool,
  onToolChange,
}: {
  activeTool: ToolId
  onToolChange: (id: ToolId) => void
}) {
  const isMobile = useMobileLayout()
  const [hoveredTool, setHoveredTool] = useState<ToolId | null>(null)
  const toolsById = useMemo(
    () => new Map(FIGMA_TOOLBAR_TOOLS.map((tool) => [tool.id, tool])),
    [],
  )
  const visibleTools = isMobile
    ? MOBILE_TOOLBAR_ORDER.map((id) => toolsById.get(id)).filter(
        (tool): tool is ToolbarToolConfig => tool !== undefined,
      )
    : FIGMA_TOOLBAR_TOOLS

  useEffect(() => {
    if (!isMobile || MOBILE_TOOLBAR_ORDER.includes(activeTool)) return
    onToolChange('pointer')
  }, [activeTool, isMobile, onToolChange])

  const handleToolSelect = (id: ToolId) => {
    setHoveredTool(null)
    onToolChange(id)
  }

  return (
    <div
      className="pd-toolbar"
      role="toolbar"
      aria-label="Canvas tools"
      aria-orientation="horizontal"
      onPointerLeave={() => setHoveredTool(null)}
      onPointerCancel={() => setHoveredTool(null)}
    >
      {visibleTools.map((tool) => (
        <ToolbarToolButton
          key={tool.id}
          toolId={tool.id}
          icons={tool.icons}
          active={activeTool === tool.id}
          hovered={hoveredTool === tool.id}
          iconLayout={tool.iconLayout}
          label={tool.label}
          onSelect={handleToolSelect}
          onHoverStart={setHoveredTool}
          onHoverEnd={(toolId) => {
            setHoveredTool((prev) => (prev === toolId ? null : prev))
          }}
        />
      ))}
    </div>
  )
}

type NavItem = {
  id: string
  label: string
  path: string
  end?: boolean
}

const NAV_ITEMS: NavItem[] = [
  { id: 'de', label: 'Design Engineering', path: '/design-engineering', end: true },
  { id: 'cp', label: 'Community Projects', path: '/community' },
  { id: 'mc', label: 'Campaigns', path: '/marketing' },
]

const SOCIAL_LINKS: ReadonlyArray<{
  label: string
  href: string
  event: AnalyticsClickEvent
}> = [
  { label: '/in/', href: 'https://www.linkedin.com/in/harryyangzy/', event: 'linkedin_click' },
  { label: '.git', href: 'https://github.com/harryyangzy', event: 'github_click' },
  { label: '@uwo.ca', href: 'mailto:hyang746@uwo.ca', event: 'email_click' },
]

function trackSocialLinkClick(
  event: AnalyticsClickEvent,
  href: string,
  pathname: string,
  onNavigate?: () => void,
) {
  trackClick(event, pathname, { link_url: href })
  onNavigate?.()
}

function SidebarIntro({ greeting }: { greeting: ReturnType<typeof getSidebarGreeting> }) {
  return (
    <div className="pd-sidebar__intro">
      {greeting.handwritingLead ? (
        <p className="pd-sidebar__bio">{greeting.handwritingLead}</p>
      ) : null}
      <p className="pd-sidebar__handwriting">{greeting.handwriting}</p>
      <p className="pd-sidebar__bio">{greeting.bio}</p>
      {greeting.companyLine ? <p className="pd-sidebar__bio">{greeting.companyLine}</p> : null}
    </div>
  )
}

function SidebarSocial({
  pathname,
  onNavigate,
}: {
  pathname: string
  onNavigate?: () => void
}) {
  return (
    <div className="pd-sidebar__social" aria-label="Social links">
      <p className="pd-sidebar__social-label">find me at</p>
      {SOCIAL_LINKS.map((link) => {
        const isExternal = link.href.startsWith('http')
        return (
          <a
            key={link.label}
            className="pd-sidebar__social-link"
            href={link.href}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noreferrer noopener' : undefined}
            onClick={() => trackSocialLinkClick(link.event, link.href, pathname, onNavigate)}
          >
            {link.label}
          </a>
        )
      })}
    </div>
  )
}

function MobileSidebarPanel({
  greeting,
  pathname,
  onNavigate,
  includeSocial = true,
}: {
  greeting: ReturnType<typeof getSidebarGreeting>
  pathname: string
  onNavigate?: () => void
  includeSocial?: boolean
}) {
  return (
    <>
      <SidebarIntro greeting={greeting} />
      <nav className="pd-sidebar__nav" aria-label="Sections">
        {NAV_ITEMS.map((item) => (
          <NavTab key={item.id} item={item} onNavigate={onNavigate} />
        ))}
      </nav>
      {includeSocial ? <SidebarSocial pathname={pathname} onNavigate={onNavigate} /> : null}
    </>
  )
}

function NavTab({ item, onNavigate }: { item: NavItem; onNavigate?: () => void }) {
  const { pathname } = useLocation()
  const isMobileLayout = useMobileLayout()
  const designEngineeringActive =
    item.id === 'de' &&
    (isDesignEngineeringPath(pathname) ||
      pathname.startsWith('/work') ||
      (!isMobileLayout && isStudioHomePath(pathname)))
  const navIconSrc =
    item.id === 'cp' ? navEmailIcon : item.id === 'mc' ? navInstagramIcon : navFigmaIcon
  const navIconClass =
    item.id === 'cp'
      ? 'pd-nav-item__icon pd-nav-item__icon--email'
      : item.id === 'mc'
        ? 'pd-nav-item__icon pd-nav-item__icon--instagram'
        : 'pd-nav-item__icon pd-nav-item__icon--figma'

  if (item.id === 'de') {
    return (
      <Link
        to={item.path}
        className={`pd-nav-item${designEngineeringActive ? ' pd-nav-item--active' : ' pd-nav-item--default'}`}
        onClick={onNavigate}
      >
        <span className="pd-nav-item__icon-box">
          <img src={navIconSrc} alt="" className={navIconClass} />
        </span>
        <span className="pd-nav-item__label">{item.label}</span>
      </Link>
    )
  }

  return (
    <NavLink
      to={item.path}
      end={item.end}
      className={({ isActive }) =>
        `pd-nav-item${isActive ? ' pd-nav-item--active' : ' pd-nav-item--default'}`
      }
      onClick={onNavigate}
    >
      <span className="pd-nav-item__icon-box">
        <img src={navIconSrc} alt="" className={navIconClass} />
      </span>
      <span className="pd-nav-item__label">{item.label}</span>
    </NavLink>
  )
}

export type PortfolioShellVariant = 'studio' | 'community' | 'case-study'

export default function PortfolioShell({
  children,
  pageName,
  shellVariant = 'studio',
}: {
  children: ReactNode
  pageName: string
  shellVariant?: PortfolioShellVariant
}) {
  const { pathname } = useLocation()
  const [activeTool, setActiveTool] = useState<ToolId>('pointer')
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const mobileCloseRef = useRef<HTMLButtonElement>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
  const canvasDocumentRef = useRef<HTMLDivElement>(null)
  const isMobileLayout = useMobileLayout()
  const isStudio = shellVariant === 'studio'
  const isDesktopStudioLanding =
    isStudio && !isMobileLayout && isStudioHomePath(pathname)
  const shellRoute =
    isStudio &&
    (isDesignEngineeringPath(pathname) || isDesktopStudioLanding)
      ? DESIGN_ENGINEERING_PATH
      : pathname
  const isStudioHome = isStudio && isStudioHomePath(pathname) && isMobileLayout
  const showStudioProjects =
    isStudio &&
    (isDesignEngineeringPath(pathname) || isDesktopStudioLanding)
  const sidebarGreeting = useMemo(
    () => getSidebarGreeting(pathname, isStudio),
    [pathname, isStudio],
  )
  const useCommunityMain = shellVariant === 'community' || shellVariant === 'case-study'
  const isCaseStudy = shellVariant === 'case-study'
  const caseStudyBodyClass = shellVariant === 'case-study' ? 'pd-case-study-body' : 'pd-community-body'

  useEffect(() => {
    setMobileNavOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!mobileNavOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileNavOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [mobileNavOpen])

  useEffect(() => {
    if (!mobileNavOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [mobileNavOpen])

  useEffect(() => {
    if (!mobileNavOpen) return
    mobileCloseRef.current?.focus()
  }, [mobileNavOpen])

  useEffect(() => {
    const routeMeta = ROUTE_META[shellRoute] ?? {
      ...DEFAULT_ROUTE_META,
      title: `${pageName} | Harry Yang`,
    }
    const canonicalUrl = `${SITE_URL}${pathname === '/' ? '/' : pathname}`
    const shareImage = routeMeta.image ?? DEFAULT_SHARE_IMAGE

    document.title = routeMeta.title
    upsertMetaByName('description', routeMeta.description)
    upsertMetaByProperty('og:title', routeMeta.title)
    upsertMetaByProperty('og:description', routeMeta.description)
    upsertMetaByProperty('og:url', canonicalUrl)
    upsertMetaByProperty('og:image', shareImage)
    upsertMetaByProperty('og:site_name', 'Harry Yang')
    upsertMetaByName('twitter:title', routeMeta.title)
    upsertMetaByName('twitter:description', routeMeta.description)
    upsertMetaByName('twitter:image', shareImage)
    upsertCanonical(canonicalUrl)
  }, [pageName, pathname, shellRoute])

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_LAYOUT_BREAKPOINT_PX}px)`)
    const onChange = () => {
      if (!mq.matches) setMobileNavOpen(false)
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (!showStudioProjects) return
    const canvas = canvasRef.current
    const canvasDocument = canvasDocumentRef.current
    if (!canvas || !canvasDocument) return

    const centerCanvasOnProjects = () => {
      const contentNode = canvasDocument.firstElementChild as HTMLElement | null
      if (!contentNode) return

      const contentLeft = contentNode.offsetLeft
      const contentWidth = contentNode.offsetWidth
      const targetScrollLeft = contentLeft + contentWidth / 2 - canvas.clientWidth / 2
      const maxScrollLeft = Math.max(0, canvas.scrollWidth - canvas.clientWidth)
      canvas.scrollLeft = Math.max(0, Math.min(targetScrollLeft, maxScrollLeft))

      if (window.innerWidth > 1100) return

      const documentRect = canvasDocument.getBoundingClientRect()
      const contentRect = contentNode.getBoundingClientRect()
      const contentTopInDocument = contentRect.top - documentRect.top
      canvas.scrollTop = Math.max(0, contentTopInDocument - 16)
    }

    let outerFrame = 0
    let innerFrame = 0
    outerFrame = window.requestAnimationFrame(() => {
      innerFrame = window.requestAnimationFrame(centerCanvasOnProjects)
    })

    return () => {
      window.cancelAnimationFrame(outerFrame)
      window.cancelAnimationFrame(innerFrame)
    }
  }, [showStudioProjects, pathname, isMobileLayout])

  const closeMobileNav = () => setMobileNavOpen(false)

  return (
    <div
      className="pd-page"
      data-name={pageName}
      data-route={shellRoute}
      data-shell={shellVariant}
      data-mobile-home={isStudioHome ? 'true' : undefined}
    >
      {!isStudioHome ? (
      <header className="pd-mobile-top" aria-label="Site">
        <div className="pd-mobile-top__row">
          <div className="pd-mobile-top__title">
            {sidebarGreeting.handwritingLead ? (
              <p className="pd-sidebar__bio pd-mobile-top__lead">{sidebarGreeting.handwritingLead}</p>
            ) : null}
            <p className="pd-mobile-top__name">{sidebarGreeting.handwriting}</p>
          </div>
          <button
            type="button"
            className={`pd-mobile-top__menu-btn${mobileNavOpen ? ' pd-mobile-top__menu-btn--open' : ''}`}
            aria-expanded={mobileNavOpen}
            aria-controls="pd-mobile-menu"
            aria-label={mobileNavOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileNavOpen((o) => !o)}
          >
            {mobileNavOpen ? (
              <span className="pd-mobile-top__burger pd-mobile-top__burger--close" aria-hidden>
                <span className="pd-mobile-top__burger-line" />
                <span className="pd-mobile-top__burger-line" />
              </span>
            ) : (
              <MobileMenuIcon />
            )}
          </button>
        </div>
      </header>
      ) : null}

      {!isStudioHome && mobileNavOpen ? (
        <div
          className="pd-mobile-menu"
          id="pd-mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
        >
          <div className="pd-mobile-menu__inner">
            <div className="pd-mobile-menu__upper">
              <div className="pd-mobile-menu__back-row">
                <button
                  ref={mobileCloseRef}
                  type="button"
                  className="pd-mobile-menu__back"
                  aria-label="Close menu"
                  onClick={closeMobileNav}
                >
                  <span className="pd-mobile-menu__back-label">back</span>
                </button>
              </div>
              <div className="pd-mobile-menu__body">
                <MobileSidebarPanel
                  greeting={sidebarGreeting}
                  pathname={pathname}
                  onNavigate={closeMobileNav}
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <div className="pd-shell">
        {isStudioHome ? (
          <section className="pd-mobile-home" aria-label="Site navigation">
            <div className="pd-mobile-home__inner">
              <div className="pd-mobile-home__upper">
                <MobileSidebarPanel
                  greeting={sidebarGreeting}
                  pathname={pathname}
                  includeSocial={false}
                />
              </div>
              <div className="pd-mobile-home__social-dock">
                <SidebarSocial pathname={pathname} />
              </div>
            </div>
          </section>
        ) : null}
        <aside className="pd-sidebar" aria-label="Site">
          <SidebarIntro greeting={sidebarGreeting} />
          <nav className="pd-sidebar__nav" aria-label="Sections">
            {NAV_ITEMS.map((item) => (
              <NavTab key={item.id} item={item} />
            ))}
          </nav>
          <div className="pd-sidebar__social" aria-label="Social links">
            <p className="pd-sidebar__social-label">find me at</p>
            {SOCIAL_LINKS.map((link) => {
              const isExternal = link.href.startsWith('http')
              return (
                <a
                  key={link.label}
                  className="pd-sidebar__social-link"
                  href={link.href}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noreferrer noopener' : undefined}
                  onClick={() => trackSocialLinkClick(link.event, link.href, pathname)}
                >
                  {link.label}
                </a>
              )
            })}
          </div>
        </aside>

        <div
          className={`pd-main${useCommunityMain ? ' pd-main--community' : ''}${isCaseStudy ? ' pd-main--case-study' : ''}`}
        >
          {showStudioProjects ? (
            <div className="pd-canvas-workspace">
              <div
                ref={canvasRef}
                className="pd-canvas"
                tabIndex={0}
                role="region"
                aria-label="Scrollable canvas"
              >
                <div ref={canvasDocumentRef} className="pd-canvas__document">
                  {children}
                  <DesignEngineeringCanvasTools activeTool={activeTool} />
                </div>
              </div>
              <div className="pd-toolbar-dock">
                <FigmaToolbar activeTool={activeTool} onToolChange={setActiveTool} />
              </div>
            </div>
          ) : !isStudio ? (
            <div className={caseStudyBodyClass}>{children}</div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
