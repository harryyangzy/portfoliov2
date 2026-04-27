import { Link } from 'react-router-dom'
import PortfolioShell from './PortfolioShell'
import csaCard from './assets/marketing/csa-blue.png'
import csaCardHover from './assets/marketing/csa.png'
import otherCard from './assets/marketing/other-blue.png'
import otherCardHover from './assets/marketing/other.png'
import profilePicture from './assets/marketing/profile picture.png'
import stushCard from './assets/marketing/stush-blue.png'
import stushCardHover from './assets/marketing/stush.png'
import tsacCard from './assets/marketing/tsac-blue.png'
import tsacCardHover from './assets/marketing/tsac.png'
import yeeHongCard from './assets/marketing/yee-hong-blue.png'
import yeeHongCardHover from './assets/marketing/yee-hong.png'
import './marketingCommunicationsPage.css'

export default function MarketingCommunicationsPage() {
  const cards = [
    { id: 'stush', title: 'STUSH Foods', defaultImage: stushCard, hoverImage: stushCardHover },
    {
      id: 'yeehong',
      title: 'Yee Hong',
      defaultImage: yeeHongCard,
      hoverImage: yeeHongCardHover,
    },
    { id: 'csa', title: 'CSA', defaultImage: csaCard, hoverImage: csaCardHover },
    { id: 'tsac', title: 'TSAC', defaultImage: tsacCard, hoverImage: tsacCardHover },
    { id: 'other', title: 'Other', defaultImage: otherCard, hoverImage: otherCardHover },
  ] as const

  return (
    <PortfolioShell pageName="Campaigns" shellVariant="community">
      <div className="mc">
        <section className="mc__hero">
          <div className="mc-profile">
            <div className="mc-profile__avatar-wrap" aria-hidden>
              <img src={profilePicture} alt="" className="mc-profile__avatar" />
            </div>
            <div className="mc-profile__body">
              <div className="mc-profile__intro">
                <div className="mc-profile__name-row">
                  <h1 className="mc-profile__name">harryyang</h1>
                  <span className="mc-profile__menu" aria-hidden>
                    ⋯
                  </span>
                </div>
                <p className="mc-profile__role">Previous Marketing Intern (x2)</p>
              </div>
              <div className="mc-profile__stats">
                <span className="mc-profile__stat-item">
                  <strong>5</strong> Brands
                </span>
                <span className="mc-profile__stat-item">
                  <strong>23.2K</strong> Followers
                </span>
              </div>
              <div className="mc-profile__about">
                <p className="mc-profile__tagline">Telling stories beautifully through marketing</p>
                <p className="mc-profile__school">🐎&nbsp; Business and CS @ Western</p>
              </div>
              <p className="mc-profile__link">🔗 harryyang.ca/marketing</p>
            </div>
          </div>

          <div className="mc__actions">
            <button type="button" className="mc-btn mc-btn--primary">
              Follow
            </button>
            <button type="button" className="mc-btn mc-btn--primary">
              Message
            </button>
          </div>
        </section>

        <section className="mc-grid" aria-label="Campaign gallery">
          <div className="mc-grid__bar" aria-hidden>
            <button type="button" className="mc-bar-btn mc-bar-btn--active" tabIndex={-1}>
              <span className="mc-bar-btn__grid" />
            </button>
            <button type="button" className="mc-bar-btn" tabIndex={-1}>
              ▶
            </button>
            <button type="button" className="mc-bar-btn" tabIndex={-1}>
              ↻
            </button>
            <button type="button" className="mc-bar-btn" tabIndex={-1}>
              ⌂
            </button>
          </div>
          {cards.map((card) =>
            card.id === 'stush' ? (
              <Link
                key={card.id}
                to="/marketing/stush"
                className="mc-card"
                aria-label="Open STUSH campaign details"
              >
                <img
                  src={card.defaultImage}
                  alt={card.title}
                  className="mc-card__img mc-card__img--default"
                  loading="lazy"
                />
                <img
                  src={card.hoverImage}
                  alt={card.title}
                  className="mc-card__img mc-card__img--hover"
                  loading="lazy"
                />
                <span className="mc-card__arrow" aria-hidden>
                  ↗
                </span>
              </Link>
            ) : (
              <article key={card.id} className="mc-card">
                <img
                  src={card.defaultImage}
                  alt={card.title}
                  className="mc-card__img mc-card__img--default"
                  loading="lazy"
                />
                <img
                  src={card.hoverImage}
                  alt={card.title}
                  className="mc-card__img mc-card__img--hover"
                  loading="lazy"
                />
                <span className="mc-card__arrow" aria-hidden>
                  ↗
                </span>
              </article>
            ),
          )}
        </section>
      </div>
    </PortfolioShell>
  )
}
