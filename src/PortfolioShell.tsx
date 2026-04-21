import type { ReactNode } from 'react'
import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import {
  designEngineeringChevronToolIcons,
  designEngineeringSoloToolIcons,
  type ToolbarIconDuo,
  type ToolbarIconTrio,
} from './assets/design-engineering/toolbar-icons'
import navFigmaIcon from './assets/figma icon.png'
import './productDesignHomepage.css'

/** Flyout chevron — not in the DE export set; keep from public assets. */
const CHEVRON_SRC = '/assets/group5.png'

type ToolId = 'pointer' | 'frame' | 'line' | 'pen' | 'comment' | 'text' | 'search'

const CHEVRON_IDS: ToolId[] = ['pointer', 'frame', 'line', 'pen', 'comment']

const CHEVRON_LABELS = ['Pointer', 'Frame', 'Line', 'Pen', 'Comment'] as const

function pickIconSrc(icons: ToolbarIconTrio | ToolbarIconDuo, active: boolean, hovered: boolean) {
  if ('active' in icons) {
    if (active) return icons.active
    if (hovered) return icons.hover
    return icons.default
  }
  if (active) return icons.hover
  if (hovered) return icons.hover
  return icons.default
}

function ToolbarToolButton({
  toolId,
  icons,
  active,
  hasChevron,
  label,
  onSelect,
}: {
  toolId: ToolId
  icons: ToolbarIconTrio | ToolbarIconDuo
  active: boolean
  hasChevron: boolean
  label: string
  onSelect: (id: ToolId) => void
}) {
  const [hovered, setHovered] = useState(false)
  const iconSrc = pickIconSrc(icons, active, hovered)

  return (
    <button
      type="button"
      className={`pd-toolbar__btn${active ? ' pd-toolbar__btn--active' : ''}`}
      aria-pressed={active}
      aria-label={label}
      onClick={() => onSelect(toolId)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className="pd-toolbar__icon-wrap">
        <img src={iconSrc} alt="" className="pd-toolbar__icon" />
      </span>
      {hasChevron ? (
        <span className="pd-toolbar__chevron-wrap">
          <img src={CHEVRON_SRC} alt="" className="pd-toolbar__chevron" />
        </span>
      ) : null}
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
    <div className="pd-toolbar" role="toolbar" aria-label="Canvas tools">
      {CHEVRON_IDS.map((id, i) => (
        <ToolbarToolButton
          key={id}
          toolId={id}
          icons={designEngineeringChevronToolIcons[i]!}
          active={activeTool === id}
          hasChevron
          label={CHEVRON_LABELS[i]!}
          onSelect={onToolChange}
        />
      ))}
      <ToolbarToolButton
        toolId="text"
        icons={designEngineeringSoloToolIcons.text}
        active={activeTool === 'text'}
        hasChevron={false}
        label="Text"
        onSelect={onToolChange}
      />
      <ToolbarToolButton
        toolId="search"
        icons={designEngineeringSoloToolIcons.search}
        active={activeTool === 'search'}
        hasChevron={false}
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
  { id: 'mc', label: 'Marketing + Communications', path: '/marketing' },
]

function NavTab({ item }: { item: NavItem }) {
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

export type PortfolioShellVariant = 'studio' | 'community'

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
        </aside>

        <div className={`pd-main${isStudio ? '' : ' pd-main--community'}`}>
          {isStudio ? (
            <>
              <div className="pd-canvas" tabIndex={0} role="region" aria-label="Scrollable canvas">
                <div className="pd-canvas__document">{children}</div>
              </div>
              <div className="pd-toolbar-dock">
                <FigmaToolbar activeTool={activeTool} onToolChange={setActiveTool} />
              </div>
            </>
          ) : (
            <div className="pd-community-body">{children}</div>
          )}
        </div>
      </div>
    </div>
  )
}
