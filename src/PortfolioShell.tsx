import type { ReactNode } from 'react'
import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import {
  designEngineeringChevronToolIcons,
  designEngineeringSoloToolIcons,
  type ToolbarIconTrio,
} from './assets/design-engineering/toolbar-icons'
import navFigmaIcon from './assets/figma icon.png'
import './productDesignHomepage.css'

type ToolId = 'pointer' | 'frame' | 'line' | 'pen' | 'comment' | 'text' | 'search'

const CHEVRON_IDS: ToolId[] = ['pointer', 'frame', 'line', 'pen', 'comment']

const CHEVRON_LABELS = ['Pointer', 'Frame', 'Line', 'Pen', 'Comment'] as const

/** Active → active asset; else pointer over control → hover; else default. */
function pickIconSrc(icons: ToolbarIconTrio, active: boolean, hovered: boolean) {
  if (active) return icons.active
  if (hovered) return icons.hover
  return icons.default
}

function ToolbarToolButton({
  toolId,
  icons,
  active,
  iconLayout,
  label,
  onSelect,
}: {
  toolId: ToolId
  icons: ToolbarIconTrio
  active: boolean
  /** Figma: flyout tools use 111×84 assets (glyph + chevron in one); text/search use 84×84. */
  iconLayout: 'flyout' | 'solo'
  label: string
  onSelect: (id: ToolId) => void
}) {
  const [hovered, setHovered] = useState(false)
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
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onPointerCancel={() => setHovered(false)}
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
  return (
    <div
      className="pd-toolbar"
      role="toolbar"
      aria-label="Canvas tools"
      aria-orientation="horizontal"
    >
      {CHEVRON_IDS.map((id, i) => (
        <ToolbarToolButton
          key={id}
          toolId={id}
          icons={designEngineeringChevronToolIcons[i]!}
          active={activeTool === id}
          iconLayout="flyout"
          label={CHEVRON_LABELS[i]!}
          onSelect={onToolChange}
        />
      ))}
      <ToolbarToolButton
        toolId="text"
        icons={designEngineeringSoloToolIcons.text}
        active={activeTool === 'text'}
        iconLayout="solo"
        label="Text"
        onSelect={onToolChange}
      />
      <ToolbarToolButton
        toolId="search"
        icons={designEngineeringSoloToolIcons.search}
        active={activeTool === 'search'}
        iconLayout="solo"
        label="Search"
        onSelect={onToolChange}
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

  if (item.id === 'de') {
    return (
      <Link
        to={item.path}
        className={`pd-nav-item${designEngineeringActive ? ' pd-nav-item--active' : ' pd-nav-item--default'}`}
      >
        <span className="pd-nav-item__icon-box">
          <img src={navFigmaIcon} alt="" className="pd-nav-item__icon" />
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
        <img src={navFigmaIcon} alt="" className="pd-nav-item__icon" />
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
              i spent all my time working on clubs this year and now I don’t have a job.
            </p>
            <a className="pd-more-btn" href="#about">
              more about me&nbsp;&nbsp;&nbsp;→
            </a>
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
