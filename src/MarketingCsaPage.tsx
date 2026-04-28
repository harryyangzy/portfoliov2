import { Link } from 'react-router-dom'
import PortfolioShell from './PortfolioShell'
import backArrowDefault from './assets/marketing/Property 1=Default.png'
import backArrowHover from './assets/marketing/Property 1=hover.png'
import westernVoiceInner from './assets/marketing/csa/001/westernvoice 2inner.png'
import westernVoiceContestant from './assets/marketing/csa/001/wv contestant1.png'
import post1 from './assets/marketing/csa/002/POST1.png'
import dodgeball from './assets/marketing/csa/002/dodgeball.png'
import execapp from './assets/marketing/csa/002/execapp.jpg'
import barnightlast from './assets/marketing/csa/002/barnightlast.jpg'
import holidare from './assets/marketing/csa/002/holidare.jpg'
import './marketingStushPage.css'

export default function MarketingCsaPage() {
  return (
    <PortfolioShell pageName="Campaigns / Chinese Students’ Association at Western" shellVariant="case-study">
      <div className="mstush">
        <div className="mstush__panel">
          <header className="mstush__header">
            <Link to="/marketing" className="mstush__back" aria-label="Back to campaigns">
              <img src={backArrowDefault} alt="" className="mstush__back-icon mstush__back-icon--default" />
              <img src={backArrowHover} alt="" className="mstush__back-icon mstush__back-icon--hover" />
            </Link>
            <div className="mstush__title-wrap">
              <h1 className="mstush__title">Chinese Students&apos; Association at Western</h1>
              <div className="mstush__meta-row">
                <p className="mstush__size">(2.1 GB)</p>
                <div className="mstush__role">
                  <p className="mstush__role-title">Graphics Executive</p>
                  <p className="mstush__role-date">September 2024 - April 2025</p>
                  <p className="mstush__role-title">Graphics Director</p>
                  <p className="mstush__role-date">April 2025 - April 2026</p>
                  <p className="mstush__role-title">Vice-President of Graphics</p>
                  <p className="mstush__role-date">Present!</p>
                </div>
              </div>
            </div>
          </header>

          <section className="mstush-section">
            <div className="mstush-section__copy">
              <p className="mstush-section__idx">[001]</p>
              <p className="mstush-section__text">
                <strong>western voice</strong> - working with the team to create graphics for our biggest
                event.
              </p>
              <p className="mstush-section__text">&nbsp;</p>
              <p className="mstush-section__text">&nbsp;</p>
            </div>
            <div className="mstush-carousel" aria-label="Western voice campaign designs">
              <img src={westernVoiceInner} alt="Western Voice campaign layout" />
              <img src={westernVoiceContestant} alt="Western Voice contestant design" />
            </div>
          </section>

          <section className="mstush-section">
            <div className="mstush-section__copy">
              <p className="mstush-section__idx">[002]</p>
              <p className="mstush-section__text">
                <strong>misc. designs</strong> - supporting the team in between events and creating reusable
                components for team members.
              </p>
              <p className="mstush-section__text">&nbsp;</p>
              <p className="mstush-section__text">&nbsp;</p>
            </div>
            <div className="mstush-carousel" aria-label="CSA miscellaneous campaign assets">
              <img src={post1} alt="CSA social post design" />
              <img src={dodgeball} alt="CSA dodgeball event visual" />
              <img src={execapp} alt="CSA executive application campaign visual" />
              <img src={barnightlast} alt="CSA bar night poster" />
              <img src={holidare} alt="CSA holiday campaign poster" />
            </div>
          </section>
        </div>
      </div>
    </PortfolioShell>
  )
}
