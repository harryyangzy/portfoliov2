import { useState } from 'react'
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
    eyebrow: 'Case Competition - 1',
    title: 'Healthcare Finance for a Fintech Startup',
  },
  {
    id: 'cc-b',
    variant: 'placeholder',
    eyebrow: 'Case Competition - 1',
    title: 'Healthcare Finance for a Fintech Startup',
  },
]

function ProductDesignCard({
  card,
  hovered,
  onEnter,
  onLeave,
}: {
  card: CardConfig
  hovered: boolean
  onEnter: () => void
  onLeave: () => void
}) {
  const isPlaceholder = card.variant === 'placeholder'
  const rootClass = [
    'pd-card',
    `pd-card--${card.variant}`,
    hovered && isPlaceholder ? 'pd-card--hover' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <article
      className={rootClass}
      data-variant={card.variant}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
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
    </article>
  )
}

export default function ProductDesignPage() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <PortfolioShell pageName="Product Design Homepage">
      <div className="pd-grid pd-grid--product">
        {PRODUCT_DESIGN_CARDS.map((card) => (
          <ProductDesignCard
            key={card.id}
            card={card}
            hovered={hoveredId === card.id}
            onEnter={() => setHoveredId(card.id)}
            onLeave={() => setHoveredId(null)}
          />
        ))}
      </div>
    </PortfolioShell>
  )
}
