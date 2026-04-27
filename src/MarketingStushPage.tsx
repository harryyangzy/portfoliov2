import { Link } from 'react-router-dom'
import PortfolioShell from './PortfolioShell'
import backArrowDefault from './assets/marketing/Property 1=Default.png'
import backArrowHover from './assets/marketing/Property 1=hover.png'
import btsGiveaway from './assets/marketing/stush/bts_giveaway.png'
import img3764 from './assets/marketing/stush/IMG_3764-2.jpg'
import nowAvailable from './assets/marketing/stush/now avialable wfm bc v2.png'
import samplingStory from './assets/marketing/stush/sampling story JUNE 26.png'
import sellSheet from './assets/marketing/stush/sell_sheet_aug21.png'
import slide1 from './assets/marketing/stush/stush_pitch/Slide1.png'
import slide2 from './assets/marketing/stush/stush_pitch/Slide2.png'
import slide3 from './assets/marketing/stush/stush_pitch/Slide3.png'
import slide4 from './assets/marketing/stush/stush_pitch/Slide4.png'
import './marketingStushPage.css'

export default function MarketingStushPage() {
  return (
    <PortfolioShell pageName="Campaigns / STUSH" shellVariant="case-study">
      <div className="mstush">
        <div className="mstush__panel">
          <header className="mstush__header">
            <Link to="/marketing" className="mstush__back" aria-label="Back to campaigns">
              <img src={backArrowDefault} alt="" className="mstush__back-icon mstush__back-icon--default" />
              <img src={backArrowHover} alt="" className="mstush__back-icon mstush__back-icon--hover" />
            </Link>
            <div className="mstush__title-wrap">
              <h1 className="mstush__title">STUSH Foods</h1>
              <div className="mstush__meta-row">
                <p className="mstush__size">(3.4GB)</p>
                <div className="mstush__role">
                  <p className="mstush__role-title">Intern</p>
                  <p className="mstush__role-date">May 2025 - August 2025</p>
                </div>
              </div>
            </div>
          </header>

          <section className="mstush-section">
            <div className="mstush-section__copy">
              <p className="mstush-section__idx">[001]</p>
              <p className="mstush-section__text">
                <strong>pitch decks</strong> - great design creates legitimacy and trust. during this
                internship i revamped our retailed pitch deck and sell sheet, the first point of contact
                retailers had with our brand.
              </p>
              <p className="mstush-section__text">
                through our revised deck, we landed one of our biggest accounts, a national retailer
                with over 35 locations.
              </p>
              <p className="mstush-section__text">&nbsp;</p>
            </div>

            <div className="mstush-carousel" aria-label="Pitch deck and sell sheet">
              <img src={sellSheet} alt="STUSH sell sheet" />
              <img src={slide1} alt="STUSH pitch deck slide 1" />
              <img src={slide2} alt="STUSH pitch deck slide 2" />
              <img src={slide3} alt="STUSH pitch deck slide 3" />
              <img src={slide4} alt="STUSH pitch deck slide 4" />
            </div>
          </section>

          <section className="mstush-section">
            <div className="mstush-section__copy">
              <p className="mstush-section__idx">[002]</p>
              <p className="mstush-section__text">
                <strong>social media</strong> - between coding and sales pitches, i made instagram
                posts, a lot of them!
              </p>
              <p className="mstush-section__text">
                throughout the summer i learned to lean in to the brand vibe creating comfortably,
                naturally and consistently.
              </p>
              <p className="mstush-section__text">
                i led a few campaigns, including back-to-school meta ads, a summer giveaway series and
                managed 10 influencers who shared their love for patties.
              </p>
            </div>

            <div className="mstush-carousel" aria-label="Social campaign creative">
              <img src={btsGiveaway} alt="Back to school giveaway creative" />
              <img src={img3764} alt="Lifestyle campaign photo" />
              <img src={samplingStory} alt="Sampling story campaign creative" />
              <img src={nowAvailable} alt="Retail availability campaign creative" />
            </div>
          </section>
        </div>
      </div>
    </PortfolioShell>
  )
}
