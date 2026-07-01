import { Link, useLocation } from 'react-router-dom'
import { trackClick } from './analytics'
import PortfolioShell from './PortfolioShell'
import stushCardImg from './assets/design-engineering/STUSHbanner.png'
import quxCardImg from './assets/design-engineering/QUXbanner.png'
import stumblCardImg from './assets/design-engineering/stumblbanner.png'

type CardVariant = 'stush' | 'qux' | 'stumbl'

type CardConfig = {
  id: string
  variant: CardVariant
  eyebrow: string
  title: string
  imageSrc: string
  imageAlt: string
}

const PRODUCT_DESIGN_CARDS: CardConfig[] = [
  {
    id: 'stush',
    variant: 'stush',
    eyebrow: 'Case Competition - 1',
    title: 'GETTING PATTIES MADE BETTER',
    imageSrc: stushCardImg,
    imageAlt: 'STUSH Foods storefront and product UI',
  },
  {
    id: 'qux',
    variant: 'qux',
    eyebrow: "Queen's UX Designathon: First Place -2",
    title: 'capturing moments in life',
    imageSrc: quxCardImg,
    imageAlt: 'Coeur / QUX hero motion still',
  },
  {
    id: 'stumbl',
    variant: 'stumbl',
    eyebrow: 'Stumbl - 3',
    title: 'Less Waiting for the Bus',
    imageSrc: stumblCardImg,
    imageAlt: 'Stumbl transit app preview',
  },
]

const projectItemClass = (variant: CardVariant) =>
  `pd-project-item pd-card pd-card--gallery pd-card--${variant}`

function GalleryCardMedia({ card }: { card: CardConfig }) {
  return (
    <div className={`pd-card__media pd-card__media--gallery pd-card__media--${card.variant}`}>
      <img
        className="pd-card__cover pd-card__cover--gallery"
        src={card.imageSrc}
        alt={card.imageAlt}
        loading="lazy"
        decoding="async"
      />
    </div>
  )
}

function GalleryCardInner({ card }: { card: CardConfig }) {
  return (
    <>
      <p className="pd-card__eyebrow">{card.eyebrow}</p>
      <div className="pd-card__stack">
        <GalleryCardMedia card={card} />
        <div className="pd-card__title-strip">
          <h2 className={`pd-card__title pd-card__title--strip pd-card__title--strip-${card.variant}`}>
            {card.title}
          </h2>
        </div>
      </div>
    </>
  )
}

const PROJECT_PATHS: Record<CardVariant, string> = {
  stush: '/work/stush',
  qux: '/work/coeur',
  stumbl: '/work/stumbl',
}

function ProjectItem({ card }: { card: CardConfig }) {
  const { pathname } = useLocation()
  const inner = <GalleryCardInner card={card} />
  const to = PROJECT_PATHS[card.variant]

  const handleClick = () => {
    trackClick('project_click', pathname, {
      project_name: card.title,
      link_url: to,
    })
  }

  return (
    <Link
      to={to}
      className={projectItemClass(card.variant)}
      data-variant={card.variant}
      style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
      aria-label={`${card.title} — case study`}
      onClick={handleClick}
    >
      {inner}
    </Link>
  )
}

export default function ProductDesignPage() {
  return (
    <PortfolioShell pageName="Design Engineering">
      <div className="pd-grid pd-grid--product">
        {PRODUCT_DESIGN_CARDS.map((card) => (
          <ProjectItem key={card.id} card={card} />
        ))}
      </div>
    </PortfolioShell>
  )
}
