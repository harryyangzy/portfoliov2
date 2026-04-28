import { Link } from 'react-router-dom'
import PortfolioShell from './PortfolioShell'
import backArrowDefault from './assets/marketing/Property 1=Default.png'
import backArrowHover from './assets/marketing/Property 1=hover.png'
import lvwkOverview from './assets/marketing/tsac/001/lvwk overview-01.png'
import photosLvwk from './assets/marketing/tsac/001/photos lvwk-04.png'
import eventPhoto from './assets/marketing/tsac/001/e0467688-9c78-4fd8-9add-11b18f4d1956.jpg'
import tsacExample from './assets/marketing/tsac/002/example.png'
import tsacBlazers from './assets/marketing/tsac/002/blazers-03.webp'
import tsacBotsAlt from './assets/marketing/tsac/002/bots-v3-alt.webp'
import './marketingStushPage.css'

export default function MarketingTsacPage() {
  return (
    <PortfolioShell pageName="Campaigns / Trudeau Student Activities Council" shellVariant="case-study">
      <div className="mstush">
        <div className="mstush__panel">
          <header className="mstush__header">
            <Link to="/marketing" className="mstush__back" aria-label="Back to campaigns">
              <img src={backArrowDefault} alt="" className="mstush__back-icon mstush__back-icon--default" />
              <img src={backArrowHover} alt="" className="mstush__back-icon mstush__back-icon--hover" />
            </Link>
            <div className="mstush__title-wrap">
              <h1 className="mstush__title">Trudeau Student Activities Council</h1>
            </div>
          </header>

          <section className="mstush-section">
            <div className="mstush-section__copy">
              <p className="mstush-section__idx">[001]</p>
              <p className="mstush-section__text">
                <strong>love week</strong> - social media and merch for a week of activities and
                celebration of inclusivity and acceptance.
              </p>
              <p className="mstush-section__text">&nbsp;</p>
              <p className="mstush-section__text">&nbsp;</p>
            </div>
            <div className="mstush-carousel" aria-label="TSAC love week campaign assets">
              <img src={lvwkOverview} alt="Love week campaign overview layout" />
              <img src={tsacBotsAlt} alt="Love week campaign social design" />
              <img src={photosLvwk} alt="Love week photo collage design" />
            </div>
          </section>

          <section className="mstush-section">
            <div className="mstush-section__copy">
              <p className="mstush-section__idx">[002]</p>
              <p className="mstush-section__text">
                <strong>misc events</strong> - supporting the team in between events and creating
                reusable components for team members.
              </p>
              <p className="mstush-section__text">&nbsp;</p>
              <p className="mstush-section__text">&nbsp;</p>
            </div>
            <div className="mstush-carousel" aria-label="TSAC misc event design assets">
              <img src={eventPhoto} alt="TSAC event photo" />
              <img src={tsacExample} alt="TSAC campaign example graphic" />
              <img src={tsacBlazers} alt="TSAC blazers campaign visual" />
              <img src={tsacBotsAlt} alt="TSAC social event visual" />
            </div>
          </section>
        </div>
      </div>
    </PortfolioShell>
  )
}
