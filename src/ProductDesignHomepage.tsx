import { useState } from 'react'
import './productDesignHomepage.css'

const ASSETS = {
  toolbarPointer: '/assets/move4.png',
  toolbarFrame: '/assets/move3.png',
  toolbarLine: '/assets/move2.png',
  toolbarPen: '/assets/move1.png',
  toolbarComment: '/assets/move.png',
  toolbarChevron: '/assets/group5.png',
  toolbarText: '/assets/frame1.png',
  toolbarSearch: '/assets/frame.png',
  navFigmaIcon: '/assets/group1.png',
} as const

function ToolbarToolWithMenu({ iconSrc }: { iconSrc: string }) {
  return (
    <div className="pd-toolbar__tool">
      <div className="pd-toolbar__icon-wrap">
        <img src={iconSrc} alt="" className="pd-toolbar__icon" />
      </div>
      <div className="pd-toolbar__chevron-wrap">
        <img src={ASSETS.toolbarChevron} alt="" className="pd-toolbar__chevron" />
      </div>
    </div>
  )
}

function ToolbarIconOnly({ iconSrc, label }: { iconSrc: string; label: string }) {
  return (
    <div className="pd-toolbar__tool pd-toolbar__tool--solo">
      <div className="pd-toolbar__icon-wrap pd-toolbar__icon-wrap--solo">
        <img src={iconSrc} alt={label} className="pd-toolbar__icon" />
      </div>
    </div>
  )
}

function FigmaToolbar() {
  return (
    <div className="pd-toolbar" role="toolbar" aria-label="Figma-style tools (decorative)">
      <ToolbarToolWithMenu iconSrc={ASSETS.toolbarPointer} />
      <ToolbarToolWithMenu iconSrc={ASSETS.toolbarFrame} />
      <ToolbarToolWithMenu iconSrc={ASSETS.toolbarLine} />
      <ToolbarToolWithMenu iconSrc={ASSETS.toolbarPen} />
      <ToolbarToolWithMenu iconSrc={ASSETS.toolbarComment} />
      <ToolbarIconOnly iconSrc={ASSETS.toolbarText} label="Text" />
      <ToolbarIconOnly iconSrc={ASSETS.toolbarSearch} label="Search" />
    </div>
  )
}

type NavItem = {
  id: string
  label: string
  active?: boolean
}

const NAV_ITEMS: NavItem[] = [
  { id: 'pd', label: 'Product Design', active: true },
  { id: 'c1', label: 'Community Projects' },
  { id: 'c2', label: 'Community Projects' },
  { id: 'c3', label: 'Community Projects' },
]

function NavTab({ item }: { item: NavItem }) {
  return (
    <button
      type="button"
      aria-current={item.active ? 'page' : undefined}
      className={
        item.active ? 'pd-nav-item pd-nav-item--active' : 'pd-nav-item pd-nav-item--inactive'
      }
    >
      <span className="pd-nav-item__icon-box">
        <img src={ASSETS.navFigmaIcon} alt="" className="pd-nav-item__icon" />
      </span>
      <span className={item.active ? 'pd-nav-item__label pd-nav-item__label--active' : 'pd-nav-item__label'}>
        {item.label}
      </span>
    </button>
  )
}

function ProjectCard({
  hover,
  onEnter,
  onLeave,
}: {
  hover?: boolean
  onEnter?: () => void
  onLeave?: () => void
}) {
  return (
    <article
      className={`pd-card${hover ? ' pd-card--hover' : ''}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <p className="pd-card__eyebrow">Case Competition - 1</p>
      <div className="pd-card__media">
        <h2 className="pd-card__title">Healthcare Finance for a Fintech Startup</h2>
      </div>
    </article>
  )
}

export default function ProductDesignHomepage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className="pd-page" data-name="Product Design Homepage">
      <div className="pd-shell">
        <aside className="pd-sidebar" aria-label="Introduction">
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

        <div className="pd-main">
          <div className="pd-main__inner">
            <div className="pd-grid">
              {[0, 1, 2, 3].map((i) => (
                <ProjectCard
                  key={i}
                  hover={hoveredIndex === i}
                  onEnter={() => setHoveredIndex(i)}
                  onLeave={() => setHoveredIndex(null)}
                />
              ))}
            </div>
          </div>
          <FigmaToolbar />
        </div>
      </div>
    </div>
  )
}
