import type { ReactNode } from 'react'
import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import {
  designEngineeringChevronToolIcons,
  designEngineeringSoloToolIcons,
  type ToolbarIconTrio,
} from './assets/design-engineering/toolbar-icons'
import navFigmaIcon from './assets/figma icon.png'
import navEmailIcon from './assets/email favicon.png'
import navInstagramIcon from './assets/Instagram_logo_2016.svg'
import './productDesignHomepage.css'

type ToolId = 'pointer' | 'frame' | 'line' | 'pen' | 'comment' | 'text' | 'search'

const CHEVRON_IDS: ToolId[] = ['pointer', 'frame', 'line', 'pen', 'comment']

const CHEVRON_LABELS = ['Pointer', 'Frame', 'Line', 'Pen', 'Comment'] as const

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
  const [hoveredTool, setHoveredTool] = useState<ToolId | null>(null)
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
      {CHEVRON_IDS.map((id, i) => (
        <ToolbarToolButton
          key={id}
          toolId={id}
          icons={designEngineeringChevronToolIcons[i]!}
          active={activeTool === id}
          hovered={hoveredTool === id}
          iconLayout="flyout"
          label={CHEVRON_LABELS[i]!}
          onSelect={handleToolSelect}
          onHoverStart={setHoveredTool}
          onHoverEnd={(toolId) => {
            setHoveredTool((prev) => (prev === toolId ? null : prev))
          }}
        />
      ))}
      <ToolbarToolButton
        toolId="text"
        icons={designEngineeringSoloToolIcons.text}
        active={activeTool === 'text'}
        hovered={hoveredTool === 'text'}
        iconLayout="solo"
        label="Text"
        onSelect={handleToolSelect}
        onHoverStart={setHoveredTool}
        onHoverEnd={(toolId) => {
          setHoveredTool((prev) => (prev === toolId ? null : prev))
        }}
      />
      <ToolbarToolButton
        toolId="search"
        icons={designEngineeringSoloToolIcons.search}
        active={activeTool === 'search'}
        hovered={hoveredTool === 'search'}
        iconLayout="solo"
        label="Search"
        onSelect={handleToolSelect}
        onHoverStart={setHoveredTool}
        onHoverEnd={(toolId) => {
          setHoveredTool((prev) => (prev === toolId ? null : prev))
        }}
      />
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
  { id: 'de', label: 'Design Engineering', path: '/', end: true },
  { id: 'cp', label: 'Community Projects', path: '/community' },
  { id: 'mc', label: 'Campaigns', path: '/marketing' },
]

const SOCIAL_LINKS = [
  { label: '/in/', href: 'https://www.linkedin.com/in/harryyangzy/' },
  { label: '.git', href: 'https://github.com/harryyangzy' },
  { label: '@uwo.ca', href: 'mailto:hyang746@uwo.ca' },
] as const

function NavTab({ item }: { item: NavItem }) {
  const { pathname } = useLocation()
  const designEngineeringActive =
    item.id === 'de' && (pathname === '/' || pathname.startsWith('/work'))
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
  const isStudio = shellVariant === 'studio'
  const useCommunityMain = shellVariant === 'community' || shellVariant === 'case-study'
  const isCaseStudy = shellVariant === 'case-study'
  const caseStudyBodyClass = shellVariant === 'case-study' ? 'pd-case-study-body' : 'pd-community-body'

  return (
    <div
      className="pd-page"
      data-name={pageName}
      data-route={pathname}
      data-shell={shellVariant}
    >
      <div className="pd-shell">
        <aside className="pd-sidebar" aria-label="Site">
          <div className="pd-sidebar__intro">
            <p className="pd-sidebar__handwriting">hey, i’m harry</p>
            <p className="pd-sidebar__bio">
              i love making, designing and living life, see what my browser looks like
            </p>
          </div>
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
          {isStudio ? (
            <div className="pd-canvas-workspace">
              <div className="pd-canvas" tabIndex={0} role="region" aria-label="Scrollable canvas">
                <div className="pd-canvas__document">{children}</div>
              </div>
              <div className="pd-toolbar-dock">
                <FigmaToolbar activeTool={activeTool} onToolChange={setActiveTool} />
              </div>
            </div>
          ) : (
            <div className={caseStudyBodyClass}>{children}</div>
          )}
        </div>
      </div>
    </div>
  )
}
