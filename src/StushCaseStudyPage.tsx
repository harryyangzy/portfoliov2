import { type ReactNode, useState } from 'react'
import { Link } from 'react-router-dom'
import PortfolioShell from './PortfolioShell'
import { isSafari } from './browser'
import { stushMedia } from './assets/design-engineering/stush/media'
import './stushCaseStudy.css'

function classNames(...tokens: Array<string | undefined>) {
  return tokens.filter(Boolean).join(' ')
}

function StushHero() {
  const [useFallback, setUseFallback] = useState(false)

  return (
    <header className="stush-hero">
      <div className="stush-hero__band">
        <div className="stush-hero__band-inner">
          <div className="stush-hero__copy">
            <div className="stush-hero__lede">
              <h1 className="stush-hero__title">Creating a Renewed Brand Experience</h1>
              <p className="stush-hero__meta-top">Summer 2025</p>
            </div>
            <div className="stush-hero__meta-row">
              <div className="stush-hero__meta-col">
                <p className="stush-hero__meta-label">Team</p>
                <div>
                  <p className="stush-hero__meta-val">Designer</p>
                  <p className="stush-hero__meta-sub">Founder</p>
                </div>
              </div>
              <div className="stush-hero__meta-col">
                <p className="stush-hero__meta-label">Status</p>
                <div>
                  <p className="stush-hero__meta-val">Shipped</p>
                  <p className="stush-hero__meta-sub">Built</p>
                  <p className="stush-hero__meta-sub">Scoped</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="stush-hero__media-shell">
        <div className="stush-hero__img-wrap">
          {useFallback ? (
            <img
              src={stushMedia.heroVideoPreview}
              className="stush-hero__img"
              alt=""
              loading="eager"
              decoding="async"
            />
          ) : (
            <video
              className="stush-hero__img"
              muted
              loop
              autoPlay
              playsInline
              preload="metadata"
              poster={stushMedia.heroVideoPreview}
              onError={() => setUseFallback(true)}
            >
              {isSafari ? (
                <source src={stushMedia.heroVideoHevc} type={'video/mp4; codecs="hvc1"'} />
              ) : (
                <source src={stushMedia.heroVideo} type="video/webm" />
              )}
            </video>
          )}
        </div>
      </div>
    </header>
  )
}

function StushSkills() {
  return (
    <div className="stush-skills" aria-label="Skills">
      <span className="stush-skill">
        <span aria-hidden>💻</span> Front-End Engineering
      </span>
      <span className="stush-skill">
        <span aria-hidden>📁</span> Product Strategy
      </span>
      <span className="stush-skill">
        <span aria-hidden>🖼️</span> Product Design
      </span>
    </div>
  )
}

function StushSplitTextCard({
  kicker,
  title,
  className,
  children,
}: {
  kicker: string
  title: string
  className?: string
  children: ReactNode
}) {
  return (
    <div className={classNames('stush-card stush-split__text stush-card--top-bottom', className)}>
      <p className="stush-kicker">{kicker}</p>
      <div className="stush-card__bottom">
        <h2 className="stush-h2">{title}</h2>
        <div className="stush-prose">{children}</div>
      </div>
    </div>
  )
}

export default function StushCaseStudyPage() {
  return (
    <PortfolioShell pageName="STUSH Foods — case study" shellVariant="case-study">
      <div className="stush">
        <div className="stush__panel">
          <Link className="stush__back" to="/design-engineering">
            ← Back
          </Link>

          <StushHero />
          <StushSkills />

          <div className="stush-stack">
            <div className="stush-band stush-band--tight">
              <div className="stush-split">
                <StushSplitTextCard
                  kicker="Problem"
                  title="Stush’s site felt generic, confusing and unappetizing"
                >
                  <p>
                    STUSH’s brand was built on the fundamentals of wholesome, cultural and vibrant
                    flavours.
                  </p>
                  <p>
                    Built on an e-commerce Shopify template, the digital experience failed to bring the
                    same energy and had a complicated, overwhelming checkout flow.
                  </p>
                </StushSplitTextCard>
                <div className="stush-split__media stush-split__media--problem">
                  <img
                    className="stush-img-rounded stush-img-rounded--h312"
                    src={stushMedia.problemSite}
                    alt=""
                  />
                </div>
              </div>
            </div>

            <div className="stush-band">
              <div className="stush-split stush-split--solution">
                <div className="stush-split__media">
                  <img
                    className="stush-img-rounded stush-img-rounded--h418"
                    src={stushMedia.solutionFood}
                    alt=""
                  />
                </div>
                <StushSplitTextCard kicker="Solution" title="So I rebuilt it." className="stush-card--pad-sm">
                  <span className="stush-subh">Vibes First</span>
                  <p>
                    Playful colors, vibrant flavours and stunning product photos defined the brand.
                    Through contrast and hierarchy, users were able to experience the energy of the brand
                    firsthand.
                  </p>
                  <span className="stush-subh">Shopping Experience</span>
                  <p>
                    I used design to reorganize SKUs, separating them by flavour then quantity at
                    checkout, instead of 18 overwhelming SKUs.
                  </p>
                  <span className="stush-subh">21st Century Design</span>
                  <p>
                    I worked with the founder to create a design system that felt true to the brand while
                    making the site consistent and easy to navigate.
                  </p>
                </StushSplitTextCard>
              </div>
            </div>

            <div className="stush-band stush-band--tight">
              <div className="stush-split">
                <div className="stush-card stush-audit-wrap">
                  <img
                    className="stush-audit-bento"
                    src={stushMedia.auditBento}
                    alt=""
                    loading="lazy"
                  />
                </div>
                <StushSplitTextCard
                  kicker="Initial observation"
                  title="The site’s pretty bad."
                  className="stush-initial-observation__text"
                >
                  <span className="stush-subh">Organization and Hierarchy</span>
                  <p>Everything looked the same, walls of text that overwhelmed you when you try to look at it.</p>
                  <span className="stush-subh">Branding and Aesthetics</span>
                  <p>Fonts and colours were all over the place—inconsistent and misused.</p>
                  <span className="stush-subh">Clarity and Action</span>
                  <p>
                    Screens were left with no clear call to action and next step, leaving users
                    disengaged.
                  </p>
                </StushSplitTextCard>
              </div>
            </div>

            <div className="stush-band">
              <div className="stush-pain-grid">
                <div className="stush-pain-card stush-pain-card--left">
                  <div className="stush-pain-cap">
                    <img src={stushMedia.painUi1} alt="" />
                  </div>
                  <div className="stush-pain__body stush-pain__body--fill">
                    <div className="stush-pain__head">
                      <p className="stush-kicker">Pain point</p>
                      <h2 className="stush-h2 stush-pain__title">I can’t see squat</h2>
                    </div>
                    <div className="stush-prose stush-pain__prose">
                      <span className="stush-subh">Colours and Contrast</span>
                      <p>
                        Low-contrast type and busy backgrounds made key information hard to parse at a
                        glance.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="stush-pain-card stush-pain-card--right">
                  <div className="stush-pain-cap">
                    <img src={stushMedia.painUi2} alt="" />
                  </div>
                  <div className="stush-pain__body stush-pain__body--whatnow">
                    <div className="stush-pain__head">
                      <p className="stush-kicker">Pain point</p>
                      <h2 className="stush-h2 stush-pain__title">What do I do now?</h2>
                    </div>
                    <div className="stush-prose stush-pain__prose">
                      <span className="stush-subh">Call to Action</span>
                      <p>
                        Key screens like the homepage are left without a clear next step for users to
                        continue their journey.
                      </p>
                      <span className="stush-subh">UI Consistency</span>
                      <p>
                        Elements are placed without priority, users are left having to put effort into
                        navigating further into the site.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="stush-band">
              <div className="stush-card" style={{ padding: 10 }}>
                <div className="stush-wire-grid">
                  <img src={stushMedia.wireLofi3} alt="" className="stush-wire-grid__l" />
                  <img src={stushMedia.wireLofi2} alt="" className="stush-wire-grid__r" />
                </div>
              </div>
              <div className="stush-card" style={{ marginTop: 10 }}>
                <h2 className="stush-h2">Iterating with wireframes</h2>
                <p className="stush-prose" style={{ color: '#3e3e3e' }}>
                  After identifying issues, I built wireframes based on existing proven interfaces.
                  Through weekly scrums, I worked with the founder to narrow down key features and get
                  feedback.
                </p>
              </div>
            </div>

            <div className="stush-band">
              <img
                className="stush-ds-banner"
                src={stushMedia.designSystemWide}
                alt=""
              />
              <div className="stush-card" style={{ marginTop: 10 }}>
                <h2 className="stush-h2">A timeless design system</h2>
                <p className="stush-prose" style={{ color: '#3e3e3e' }}>
                  The goals of the design system were to create consistency and clarity: the right
                  typefaces from heading to body and use of accent colours over neutral backgrounds—
                  making the site more intuitive and creating hierarchy to guide users.
                </p>
              </div>
            </div>

            <div className="stush-band stush-band--outcome-first">
              <div className="stush-split">
                <StushSplitTextCard kicker="Outcomes" title="Getting patties made easier">
                  <span className="stush-subh">No More Paragraphs</span>
                  <p>
                    Essays of information overload were broken down into interfaces with icons and titles.
                    Through vibrant symbolism and imagery we were able to tell our story without
                    paragraphs.
                  </p>
                  <span className="stush-subh">Simplified Shopping Flow</span>
                  <p>
                    Instead of hunting for the shopping page and choosing between 18 SKUs, product sizes
                    were segmented and the interface guided users toward a purchase.
                  </p>
                  <span className="stush-subh">A Bunch of New Features</span>
                  <p>
                    The site is a first touchpoint for shoppers and retail buyers as STUSH enters new
                    stores. We included testimonials, a way to suggest stores, and a live scrolling banner
                    so the brand feels like a conversation.
                  </p>
                </StushSplitTextCard>
                <div className="stush-split__media stush-split__media--outcome-r">
                  <img
                    className="stush-img-rounded stush-img-rounded--outcome"
                    src={stushMedia.outcomeTallRight}
                    alt=""
                  />
                </div>
              </div>
            </div>

            <div className="stush-band stush-band--outcome-second">
              <div className="stush-split stush-split--outcome-learned">
                <div className="stush-split__media stush-split__media--outcome-l">
                  <img
                    className="stush-img-rounded stush-img-rounded--outcome"
                    src={stushMedia.outcomeTallLeft}
                    alt=""
                  />
                </div>
                <div className="stush-split__stack stush-outcome-learned__stack">
                  <div className="stush-card stush-card--top-bottom stush-outcome-learned__card">
                    <p className="stush-kicker">Outcomes</p>
                    <div className="stush-card__bottom">
                      <h2 className="stush-h2">I learned a lot, the numbers don’t lie</h2>
                      <div className="stush-prose">
                        <span className="stush-subh">UI Guides Behaviour</span>
                        <p>
                          A good designer can influence a user’s behaviour using calls to action and clear
                          visual hierarchy.
                        </p>
                        <span className="stush-subh">Less is More</span>
                        <p>
                          People don’t read—they glance. On mobile, everything needs to be digestible and
                          glanceable.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="stush-metrics-row stush-outcome-learned__metrics">
                    <div className="stush-metric">
                      <p className="stush-metric__val">+85%</p>
                      <p className="stush-metric__note">
                        Add to Cart Increase
                        <br />
                        05/2025 vs. 09/2025
                      </p>
                    </div>
                    <div className="stush-metric">
                      <p className="stush-metric__val">+31%</p>
                      <p className="stush-metric__note">
                        Average Session Time
                        <br />
                        05/2025 vs. 09/2025
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PortfolioShell>
  )
}
