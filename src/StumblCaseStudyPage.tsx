import { Link } from 'react-router-dom'
import PortfolioShell from './PortfolioShell'
import './stushCaseStudy.css'
import './coeurCaseStudy.css'
import './stumblCaseStudy.css'

const STUMBL_EMBEDS = [
  {
    kicker: 'Brainstorming and sketches',
    src: 'https://embed.figma.com/design/qLDtpmZtH3Dx4pOz4CUqwA/stumbl?node-id=0-1&embed-host=share',
    title: 'Stumbl brainstorming and sketches',
  },
  {
    kicker: 'Mid-fi prototypes',
    src: 'https://embed.figma.com/design/qLDtpmZtH3Dx4pOz4CUqwA/stumbl?node-id=257-28&embed-host=share',
    title: 'Stumbl mid-fi prototypes',
  },
  {
    kicker: 'Final design',
    src: 'https://embed.figma.com/design/qLDtpmZtH3Dx4pOz4CUqwA/stumbl?node-id=257-27&embed-host=share',
    title: 'Stumbl final design',
  },
] as const

export default function StumblCaseStudyPage() {
  return (
    <PortfolioShell pageName="Stumbl — case study" shellVariant="case-study">
      <div className="stush stumbl">
        <div className="stush__panel">
          <Link className="stush__back" to="/design-engineering">
            ← Back
          </Link>

          <header className="stush-hero">
            <div className="stush-hero__band">
              <div className="stush-hero__copy">
                <div className="stush-hero__lede">
                  <h1 className="stush-hero__title">Solving the Unpredictability of Bus Commutes</h1>
                  <p className="stush-hero__meta-top">Sprint 2026</p>
                </div>
                <div className="stush-hero__meta-row">
                  <div className="stush-hero__meta-col">
                    <p className="stush-hero__meta-label">Team</p>
                    <div>
                      <p className="stush-hero__meta-val">Solo</p>
                    </div>
                  </div>
                  <div className="stush-hero__meta-col">
                    <p className="stush-hero__meta-label">Status</p>
                    <div>
                      <p className="stush-hero__meta-val">In Progress</p>
                      <p className="stush-hero__meta-sub">Prototyped</p>
                      <p className="stush-hero__meta-sub">Designed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <div className="stush-skills" aria-label="Project skills">
            <span className="stush-skill">
              <span aria-hidden>📁</span> Product Strategy
            </span>
            <span className="stush-skill">
              <span aria-hidden>📱</span> Prototyping
            </span>
            <span className="stush-skill">
              <span aria-hidden>💻</span> Design Engineering
            </span>
          </div>

          <div className="stush-stack">
            <div className="stush-band">
              <div className="coeur-ps">
                <div className="coeur-ps__card coeur-ps__card--problem">
                  <p className="stush-kicker">Problem</p>
                  <div>
                    <h2 className="stush-h2 coeur-card-title">
                      Why do I spend so long waiting for the bus?
                    </h2>
                    <div className="stush-prose">
                      <p className="stush-subh">Early or delayed</p>
                      <p>
                        When my bus is early I miss it; when it&apos;s delayed I&apos;m stuck guessing
                        whether to keep waiting or find another way.
                      </p>
                      <p className="stush-subh">Morning Rush</p>
                      <p>
                        During peak hours, crowds and bunching make arrival times feel random — I leave
                        home not knowing if I&apos;m early or already late.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="coeur-ps__card coeur-ps__card--solution">
                  <p className="stush-kicker">Solution</p>
                  <div>
                    <h2 className="stush-h2 coeur-card-title">
                      Making arrival times easily glanceable
                    </h2>
                    <div className="stush-prose">
                      <p className="stush-subh">Saved route</p>
                      <p>
                        Your usual commute is saved front and center, so the next bus you care about is
                        always one tap away.
                      </p>
                      <p className="stush-subh">Home screen widget</p>
                      <p>
                        A home screen widget surfaces live arrival times without opening the app, so you
                        can decide when to head to the stop.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="stush-band stumbl-embeds">
              {STUMBL_EMBEDS.map((embed) => (
                <div key={embed.kicker} className="stush-card stumbl-prototype">
                  <p className="stush-kicker">{embed.kicker}</p>
                  <iframe
                    className="stumbl-prototype__embed"
                    src={embed.src}
                    width={800}
                    height={450}
                    allowFullScreen
                    title={embed.title}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PortfolioShell>
  )
}
