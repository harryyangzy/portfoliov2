import { Link } from 'react-router-dom'
import PortfolioShell from './PortfolioShell'
import backArrowDefault from './assets/marketing/Property 1=Default.png'
import backArrowHover from './assets/marketing/Property 1=hover.png'
import holidayCard from './assets/marketing/yee hong/001/Holiday Card Draft 2-04.webp'
import garageSale from './assets/marketing/yee hong/001/garage sale.webp'
import gradientBkg from './assets/marketing/yee hong/001/gradient bkg-05.png'
import poster from './assets/marketing/yee hong/001/poster PNG.webp'
import ticketDesign from './assets/marketing/yee hong/001/ticket design v1 (front).png'
import golf2024Draft from './assets/marketing/yee hong/002/Golf 2024 Draft-03.png'
import coverV4 from './assets/marketing/yee hong/002/coverv4.webp'
import golf2023Sponsors from './assets/marketing/yee hong/002/golf-2023-sponsors.png'
import moreInfo from './assets/marketing/yee hong/002/moreinfo-1-03.png'
import postV3 from './assets/marketing/yee hong/002/post v3-01.png'
import annualReport01 from './assets/marketing/yee hong/003/annual-report_preview-01.png'
import annualReport06 from './assets/marketing/yee hong/003/annual-report_preview-06.png'
import annualReport18 from './assets/marketing/yee hong/003/annual-report_preview-18.png'
import annualReport19 from './assets/marketing/yee hong/003/annual-report_preview-19.png'
import annualReport26 from './assets/marketing/yee hong/003/annual-report_preview-26.png'
import popup from './assets/marketing/yee hong/004/popup.png'
import draft1 from './assets/marketing/yee hong/004/draft1.png'
import thankYouCertificate from './assets/marketing/yee hong/004/Thank-You Certificate - Draft 2.png'
import './marketingStushPage.css'

export default function MarketingYeeHongPage() {
  return (
    <PortfolioShell pageName="Campaigns / Yee Hong Foundation" shellVariant="case-study">
      <div className="mstush">
        <div className="mstush__panel">
          <header className="mstush__header">
            <Link to="/marketing" className="mstush__back" aria-label="Back to campaigns">
              <img src={backArrowDefault} alt="" className="mstush__back-icon mstush__back-icon--default" />
              <img src={backArrowHover} alt="" className="mstush__back-icon mstush__back-icon--hover" />
            </Link>
            <div className="mstush__title-wrap">
              <h1 className="mstush__title">Yee Hong Foundation</h1>
              <div className="mstush__meta-row">
                <p className="mstush__size">(14.8 GB)</p>
                <div className="mstush__role">
                  <div className="mstush__role-group">
                    <p className="mstush__role-title">Intern</p>
                    <p className="mstush__role-date">June 2022 - August 2022</p>
                  </div>
                  <div className="mstush__role-group">
                    <p className="mstush__role-title">Communications Assistant</p>
                    <p className="mstush__role-date">August 2022 - August 2024</p>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <section className="mstush-section">
            <div className="mstush-section__copy">
              <p className="mstush-section__idx">[001]</p>
              <p className="mstush-section__text">
                <strong>misc. designs</strong> - supporting fundraising through unique designs from
                micro-campaigns like holiday donations and community garage sale fundraisers to supporting
                our flagship Dragon Ball gala.
              </p>
              <p className="mstush-section__text">&nbsp;</p>
              <p className="mstush-section__text">&nbsp;</p>
            </div>

            <div className="mstush-carousel" aria-label="Miscellaneous campaign design assets">
              <img src={holidayCard} alt="Holiday card campaign design" />
              <img src={garageSale} alt="Garage sale campaign poster design" />
              <img src={gradientBkg} alt="Dragon Ball gala gradient background design" />
              <img src={poster} alt="Dragon Ball gala poster design" />
              <img src={ticketDesign} alt="Dragon Ball gala ticket design" />
            </div>
          </section>

          <section className="mstush-section">
            <div className="mstush-section__copy">
              <p className="mstush-section__idx">[002]</p>
              <p className="mstush-section__text">
                <strong>annual golf tournament</strong> - repositioning the golf tournament as one of the
                city&apos;s most prestigious competitions.
              </p>
              <p className="mstush-section__text">
                the tournament has been a long-standing tradition. on its 20th anniversary i worked with
                the senior communications team to rebrand the event.
              </p>
              <p className="mstush-section__text">&nbsp;</p>
            </div>

            <div className="mstush-carousel" aria-label="Annual golf tournament campaign design assets">
              <img src={golf2024Draft} alt="Golf tournament 2024 draft creative" />
              <img src={coverV4} alt="Golf tournament campaign cover concept" />
              <img src={golf2023Sponsors} alt="Golf 2023 sponsors campaign creative" />
              <img src={moreInfo} alt="Golf tournament more info campaign visual" />
              <img src={postV3} alt="Golf tournament social post creative" />
            </div>
          </section>

          <section className="mstush-section">
            <div className="mstush-section__copy">
              <p className="mstush-section__idx">[003]</p>
              <p className="mstush-section__text">
                <strong>corporate communications</strong> - yee hong receives over $100M in funding
                annually. through a clear and transparent annual report, our impact was shared to
                stakeholders from a variety of backgrounds.
              </p>
              <p className="mstush-section__text">
                the biggest challenge was designing bilingually, blending messages minimizing repetition and
                reinforcing a natural flow to minimize cognitive load. all while organizing a year&apos;s
                worth of facts, figures and data.
              </p>
              <p className="mstush-section__text">&nbsp;</p>
            </div>

            <div className="mstush-carousel" aria-label="Corporate communications annual report pages">
              <img src={annualReport01} alt="Annual report preview page 1" />
              <img src={annualReport06} alt="Annual report preview page 6" />
              <img src={annualReport18} alt="Annual report preview page 18" />
              <img src={annualReport19} alt="Annual report preview page 19" />
              <img src={annualReport26} alt="Annual report preview page 26" />
            </div>
          </section>

          <section className="mstush-section">
            <div className="mstush-section__copy">
              <p className="mstush-section__idx">[004]</p>
              <p className="mstush-section__text">
                <strong>pop-up for love gives</strong> - as one of my last projects, i worked closely with
                the senior management team to create the brand for a new flagship fundraiser.
              </p>
              <p className="mstush-section__text">
                positioned towards inspiring a new generation of community members, i created a reusable
                branding package for a group of grassroots community events.
              </p>
              <p className="mstush-section__text">
                our first pop-up was a walkathon to toronto zoo, bringing hundreds of families together
                raising over $400,000 in one weekend.
              </p>
            </div>

            <div className="mstush-carousel" aria-label="Pop-up for Love Gives campaign design assets">
              <img src={popup} alt="Pop-up campaign poster" />
              <img src={draft1} alt="Pop-up campaign draft layout" />
              <img src={thankYouCertificate} alt="Pop-up campaign thank-you certificate design" />
            </div>
          </section>
        </div>
      </div>
    </PortfolioShell>
  )
}
