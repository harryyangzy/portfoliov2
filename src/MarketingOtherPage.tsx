import { Link } from 'react-router-dom'
import PortfolioShell from './PortfolioShell'
import backArrowDefault from './assets/marketing/Property 1=Default.png'
import backArrowHover from './assets/marketing/Property 1=hover.png'
import trailblazeLogo from './assets/marketing/other/001/trailblaze logo.png'
import trailblazePost from './assets/marketing/other/001/post.jpg'
import trailblazeHeroA from './assets/marketing/other/001/274fee59-b49e-4a5f-bda1-10071c558973_rw_3840.png'
import trailblazeHeroB from './assets/marketing/other/001/9ac84abd-9c91-4001-a32f-3cfa37fcfd03_rw_3840.png'
import demoDay from './assets/marketing/other/002/demoday.png'
import elevate from './assets/marketing/other/002/elevate.png'
import firmstrip from './assets/marketing/other/002/firmstrip.png'
import merchDesign from './assets/marketing/other/002/merch design.png'
import pdsPortfolio from './assets/marketing/other/002/pds-portfolio.png'
import summerDinner from './assets/marketing/other/002/summmerdinner.png'
import createMarkham1 from './assets/marketing/other/003/screenshot-1.png'
import createMarkham2 from './assets/marketing/other/003/screenshot-2.png'
import createMarkham3 from './assets/marketing/other/003/screenshot-3.png'
import createMarkham4 from './assets/marketing/other/003/screenshot-4.png'
import './marketingStushPage.css'

export default function MarketingOtherPage() {
  return (
    <PortfolioShell pageName="Campaigns / For the Love of Designing" shellVariant="case-study">
      <div className="mstush">
        <div className="mstush__panel">
          <header className="mstush__header">
            <Link to="/marketing" className="mstush__back" aria-label="Back to campaigns">
              <img src={backArrowDefault} alt="" className="mstush__back-icon mstush__back-icon--default" />
              <img src={backArrowHover} alt="" className="mstush__back-icon mstush__back-icon--hover" />
            </Link>
            <div className="mstush__title-wrap">
              <h1 className="mstush__title">For the Love of Designing</h1>
              <div className="mstush__meta-row">
                <p className="mstush__size">(&infin; GB)</p>
              </div>
            </div>
          </header>

          <section className="mstush-section">
            <div className="mstush-section__copy">
              <p className="mstush-section__idx">[001]</p>
              <p className="mstush-section__text">
                <strong>trudeau athletics</strong> - creating an identity for sports at my high school.
              </p>
              <p className="mstush-section__text">&nbsp;</p>
              <p className="mstush-section__text">&nbsp;</p>
            </div>
            <div className="mstush-carousel" aria-label="Trudeau athletics identity designs">
              <img src={trailblazeLogo} alt="Trudeau athletics logo design" />
              <img src={trailblazePost} alt="Trudeau athletics post design" />
              <img src={trailblazeHeroA} alt="Trudeau athletics campaign visual" />
              <img src={trailblazeHeroB} alt="Trudeau athletics campaign visual alternative" />
            </div>
          </section>

          <section className="mstush-section">
            <div className="mstush-section__copy">
              <p className="mstush-section__idx">[002]</p>
              <p className="mstush-section__text">
                <strong>western founder&apos;s network</strong> - leading a team of designers for 16+ events.
              </p>
              <p className="mstush-section__text">&nbsp;</p>
              <p className="mstush-section__text">&nbsp;</p>
            </div>
            <div className="mstush-carousel" aria-label="Western Founder's Network design assets">
              <img src={demoDay} alt="Demo day campaign design" />
              <img src={elevate} alt="Elevate event visual" />
              <img src={firmstrip} alt="Firmstrip social design" />
              <img src={merchDesign} alt="Merch design visual" />
              <img src={pdsPortfolio} alt="PDS portfolio campaign visual" />
              <img src={summerDinner} alt="Summer dinner event campaign visual" />
            </div>
          </section>

          <section className="mstush-section">
            <div className="mstush-section__copy">
              <p className="mstush-section__idx">[003]</p>
              <p className="mstush-section__text">
                <strong>create markham</strong> - putting human stories first for the biggest youth led
                conference in the world.
              </p>
              <p className="mstush-section__text">&nbsp;</p>
              <p className="mstush-section__text">&nbsp;</p>
            </div>
            <div className="mstush-carousel" aria-label="Create Markham design assets">
              <img src={createMarkham1} alt="Create Markham campaign screenshot 1" />
              <img src={createMarkham2} alt="Create Markham campaign screenshot 2" />
              <img src={createMarkham3} alt="Create Markham campaign screenshot 3" />
              <img src={createMarkham4} alt="Create Markham campaign screenshot 4" />
            </div>
          </section>
        </div>
      </div>
    </PortfolioShell>
  )
}
