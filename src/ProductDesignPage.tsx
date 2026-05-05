import { Link } from 'react-router-dom'
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
    title: 'Capturing Moments in Life',
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

function ProjectItem({ card }: { card: CardConfig }) {
  const inner = <GalleryCardInner card={card} />

  if (card.variant === 'stush') {
    return (
      <Link
        to="/work/stush"
        className={projectItemClass('stush')}
        data-variant="stush"
        style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
        aria-label="STUSH Foods — case study"
      >
        {inner}
      </Link>
    )
  }

  if (card.variant === 'qux') {
    return (
      <Link
        to="/work/coeur"
        className={projectItemClass('qux')}
        data-variant="qux"
        style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
        aria-label="Coeur (QUX Designathon) — case study"
      >
        {inner}
      </Link>
    )
  }

  return (
    <article className={projectItemClass('stumbl')} data-variant="stumbl">
      {inner}
    </article>
  )
}

export default function ProductDesignPage() {
  return (
    <PortfolioShell pageName="Product Design Homepage">
      <div className="pd-grid pd-grid--product">
        {PRODUCT_DESIGN_CARDS.map((card) => (
          <ProjectItem key={card.id} card={card} />
        ))}
      </div>
    </PortfolioShell>
  )
}
