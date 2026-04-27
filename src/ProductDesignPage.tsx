import { Link } from 'react-router-dom'
import PortfolioShell from './PortfolioShell'

type CardConfig =
  | {
      id: string
      variant: 'stush'
      eyebrow: string
      title: string
      imageSrc: string
      imageAlt: string
    }
  | {
      id: string
      variant: 'qux'
      eyebrow: string
      title: string
      imageSrc: string
      imageAlt: string
    }
  | {
      id: string
      variant: 'placeholder'
      eyebrow: string
      title: string
    }

const PRODUCT_DESIGN_CARDS: CardConfig[] = [
  {
    id: 'stush',
    variant: 'stush',
    eyebrow: 'STUSH Foods',
    title: 'Bringing vibes and a friendly experience to online shopping',
    imageSrc: '/assets/stush-banner.png',
    imageAlt: 'STUSH Foods product mockups',
  },
  {
    id: 'qux',
    variant: 'qux',
    eyebrow: 'QUX Designathon',
    title: 'Reshaping how we capture moments in life',
    imageSrc: '/assets/qux-banner.png',
    imageAlt: 'QUX Designathon scene',
  },
  {
    id: 'cc-a',
    variant: 'placeholder',
    eyebrow: 'work in progress one',
    title: 'Spending less time waiting for the buss - coming soon!',
  },
  {
    id: 'cc-b',
    variant: 'placeholder',
    eyebrow: 'case competition one',
    title: 'Healthcare Finance for a Fintech Startup - coming soon!',
  },
]

const projectItemClass = (variant: CardConfig['variant']) =>
  `pd-project-item pd-card pd-card--${variant}`

function ProjectItem({ card }: { card: CardConfig }) {
  const common = (
    <>
      <p className="pd-card__eyebrow">{card.eyebrow}</p>

      {card.variant === 'stush' && (
        <div className="pd-card__media pd-card__media--stush">
          <img
            className="pd-card__cover"
            src={card.imageSrc}
            alt={card.imageAlt}
            loading="lazy"
            decoding="async"
          />
          <h2 className="pd-card__title pd-card__title--on-photo">{card.title}</h2>
        </div>
      )}

      {card.variant === 'qux' && (
        <div className="pd-card__media pd-card__media--qux">
          <div className="pd-card__media-fill" aria-hidden />
          <img
            className="pd-card__cover pd-card__cover--qux"
            src={card.imageSrc}
            alt={card.imageAlt}
            loading="lazy"
            decoding="async"
          />
          <h2 className="pd-card__title pd-card__title--qux">{card.title}</h2>
        </div>
      )}

      {card.variant === 'placeholder' && (
        <div className="pd-card__media pd-card__media--placeholder">
          <h2 className="pd-card__title pd-card__title--placeholder">{card.title}</h2>
        </div>
      )}
    </>
  )

  if (card.variant === 'stush') {
    return (
      <Link
        to="/work/stush"
        className={projectItemClass('stush')}
        data-variant="stush"
        style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
        aria-label="STUSH Foods — case study"
      >
        {common}
      </Link>
    )
  }

  return (
    <article className={projectItemClass(card.variant)} data-variant={card.variant}>
      {common}
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
