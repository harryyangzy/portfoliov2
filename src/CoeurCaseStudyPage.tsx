import { useState } from 'react'
import { Link } from 'react-router-dom'
import PortfolioShell from './PortfolioShell'
import { isSafari } from './browser'
import { coeurMedia } from './assets/design-engineering/coeur/media'
import './stushCaseStudy.css'
import './coeurCaseStudy.css'

export default function CoeurCaseStudyPage() {
  const [useHeroFallback, setUseHeroFallback] = useState(false)

  return (
    <PortfolioShell pageName="Coeur — case study" shellVariant="case-study">
      <div className="stush coeur">
        <div className="stush__panel">
          <Link className="stush__back" to="/design-engineering">
            ← Back
          </Link>

          <header className="stush-hero">
            <div className="stush-hero__band">
              <div className="stush-hero__copy">
                <div className="coeur-hero__text">
                  <h1 className="stush-hero__title">Capturing Moments While Living in Them</h1>
                  <p className="stush-hero__meta-top">Winter 2026</p>
                </div>
                <div className="stush-hero__meta-row">
                  <div className="stush-hero__meta-col">
                    <p className="stush-hero__meta-label">Team</p>
                    <div>
                      <p className="stush-hero__meta-val">Designer</p>
                      <p className="stush-hero__meta-sub">Designer (3)</p>
                    </div>
                  </div>
                  <div className="stush-hero__meta-col">
                    <p className="stush-hero__meta-label">Status</p>
                    <div>
                      <p className="stush-hero__meta-val">First Place</p>
                      <p className="stush-hero__meta-sub">Demoed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="stush-hero__media-shell">
              <div className="stush-hero__img-wrap">
                {useHeroFallback ? (
                  <img
                    src={coeurMedia.hero}
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
                    poster={coeurMedia.poster}
                    onError={() => setUseHeroFallback(true)}
                  >
                    {isSafari ? (
                      <source src={coeurMedia.heroVideoHevc} type={'video/mp4; codecs="hvc1"'} />
                    ) : (
                      <source src={coeurMedia.heroVideo} type="video/webm" />
                    )}
                  </video>
                )}
              </div>
            </div>
          </header>

          <div className="stush-skills" aria-label="Project skills">
            <span className="stush-skill">
              <span aria-hidden>📋</span> User Research
            </span>
            <span className="stush-skill">
              <span aria-hidden>📱</span> Prototyping
            </span>
          </div>

          <div className="stush-stack">
            <div className="stush-band">
              <div className="coeur-ps">
                <div className="coeur-ps__card coeur-ps__card--problem">
                  <p className="stush-kicker">Problem</p>
                  <div>
                    <h2 className="stush-h2 coeur-card-title">Capturing and living the moment are a paradox.</h2>
                    <div className="stush-prose">
                      <p>
                        Why do we really capture memories, is it for ourselves or others who perceive
                        us. How would we help people be intentional in what they capture?
                      </p>
                    </div>
                  </div>
                </div>
                <div className="coeur-ps__card coeur-ps__card--solution">
                  <p className="stush-kicker">Solution</p>
                  <div>
                    <h2 className="stush-h2 coeur-card-title">A way to intentionally cherish memories for yourself.</h2>
                    <div className="stush-prose">
                      <p className="stush-subh">A core beyond photos</p>
                      <p>
                        Memories are captured into a cute orb or a detailed recollection with photos,
                        scents, journal entries and sounds.
                      </p>
                      <p className="stush-subh">A nudge to remember</p>
                      <p>
                        The primary pain point was remembering to capture moments. Through synced
                        calendars and customized reminders, users remember to capture without
                        taking away from the moment.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="stush-band">
              <div className="stush-split coeur-user-research">
                <div className="stush-split__media">
                  <img
                    className="stush-img-rounded stush-img-rounded--h418"
                    src={coeurMedia.userResearch}
                    alt=""
                  />
                </div>
                <div className="stush-card stush-split__text stush-card--top-bottom stush-card--pad-sm">
                  <p className="stush-kicker">User research</p>
                  <div className="stush-card__bottom">
                    <h2 className="stush-h2 coeur-card-title">Here’s what we learned after 13 one-on-one interviews</h2>
                    <div className="stush-prose">
                      <p className="stush-subh">Moments Are Big and Small</p>
                      <p>
                        4 users described moments as life milestones, 3 as memories made with
                        friends and 6 saying both
                      </p>
                      <p className="stush-subh">It’s Hard to be Consistent</p>
                      <p>
                        9 users mentioned they tried to start vlogging or journaling but all said
                        they failed to be consistent
                      </p>
                      <p className="stush-subh">Common Theme: Regret</p>
                      <p>
                        Every user wished they had captured a moment in the past so that they could
                        look back at it
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="stush-band">
              <div className="stush-card coeur-ask" style={{ width: '100%', boxSizing: 'border-box' }}>
                <p className="stush-kicker">So we asked ourselves</p>
                <h2 className="stush-h2 coeur-card-title" style={{ margin: 0 }}>
                  How may we enhance how we relive moments while minimizing the distraction of the
                  recording process?
                </h2>
              </div>
            </div>

            <div className="stush-band">
              <div className="stush-split coeur-competitive-split">
                <div className="stush-card stush-split__text stush-card--competitive stush-card--pad-sm stush-card--top-bottom">
                  <p className="stush-kicker">Competitive analysis</p>
                  <div className="stush-card__bottom">
                    <h2 className="stush-h2 coeur-card-title">There’s a clear gap.</h2>
                    <div className="stush-prose">
                      <p className="stush-subh">Intention</p>
                      <p>
                        Memories are meaningful when we put effort into remembering them rather
                        through journaling or physical media through digicams and film.
                      </p>
                      <p className="stush-subh">Gratification</p>
                      <p>
                        We should feel something after capturing a moment. However, the focus should
                        be on the joy of remembering rather than social validation.
                      </p>
                      <p className="stush-subh">Somewhere in between</p>
                      <p>
                        We need to make capturing memories easier and intuitive but still keep the
                        intention and meaning of physical media.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="stush-split__media coeur-competitive__media">
                  <img
                    className="stush-img-rounded stush-img-rounded--h418"
                    src={coeurMedia.competitive}
                    alt=""
                  />
                </div>
              </div>
            </div>

            <div className="stush-band">
              <div className="coeur-insp">
                <div className="coeur-insp__mosaic">
                  <div className="coeur-insp__frame">
                    <img
                      className="coeur-insp__grid-img"
                      src={coeurMedia.inspirationGrid}
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
                <div className="stush-card stush-split__text coeur-insp__copy">
                  <div className="coeur-insp__header">
                    <p className="stush-kicker">Inspiration</p>
                    <h2 className="stush-h2 coeur-card-title">How do we remember?</h2>
                  </div>
                  <div className="stush-prose">
                    <p className="stush-subh">Nostalgia as Orbs</p>
                    <p>
                      Inspired by Inside Out, memories in orbs creates a nostalgic image of memory.
                    </p>
                    <p className="stush-subh">Physical Media</p>
                    <p>
                      We tend to cherish physical tokens where we can relive the action of the
                      moment.
                    </p>
                    <p className="stush-subh">Chronologically</p>
                    <p>
                      No matter the size of the moment, time forces us to organize chronologically.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="stush-band">
              <div className="coeur-ds-flow">
                <div className="coeur-ds-flow__frame">
                  <img
                    className="coeur-ds-flow__media"
                    src={coeurMedia.designSystemWide}
                    alt=""
                  />
                </div>
                <div className="coeur-ds-flow__body">
                  <h2 className="stush-h2 coeur-card-title">Designing what remembering looks like</h2>
                  <p className="stush-prose" style={{ margin: 0 }}>
                    Through vivid colours and nostalgic gradients, our design system embodies a
                    creative and consistent design language.
                  </p>
                </div>
              </div>
            </div>

            <div className="stush-band">
              <div className="coeur-ds-flow">
                <div className="coeur-ds-flow__frame coeur-ds-flow__frame--journey">
                  <img
                    className="coeur-ds-flow__media"
                    src={coeurMedia.flowGraphic}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="coeur-ds-flow__body">
                  <h2 className="stush-h2 coeur-card-title">A simple way to capture, edit and relive.</h2>
                  <p className="stush-prose" style={{ margin: 0 }}>
                    Simple user flows make it easy for users to capture memories without feeling
                    cognitive overload bringing them out of the moment. Multiple ways to set
                    reminders keeps users as accountable as they want to be.
                  </p>
                </div>
              </div>
            </div>

            <div className="stush-band">
              <div className="coeur-feature-pair">
                <div className="coeur-feature">
                  <div className="coeur-feature__crop">
                    <img
                      className="coeur-feature__media"
                      src={coeurMedia.featureReminders}
                      alt=""
                    />
                  </div>
                  <div className="coeur-feature__body">
                    <h2 className="stush-h2 coeur-card-title">A nudge to remember to remember</h2>
                    <p className="stush-prose" style={{ margin: 0 }}>
                      By connecting calendars and setting a custom notification delay users are
                      nudged to capture while still in the moment.{' '}
                    </p>
                  </div>
                </div>
                <div className="coeur-feature">
                  <div className="coeur-feature__crop coeur-feature__crop--capture">
                    <video
                      className="coeur-feature__media"
                      muted
                      loop
                      autoPlay
                      playsInline
                      preload="metadata"
                      aria-label="Capture flow on device"
                    >
                      <source src={coeurMedia.captureFlowMp4} type="video/mp4" />
                      <source src={coeurMedia.captureFlowWebm} type="video/webm" />
                    </video>
                  </div>
                  <div className="coeur-feature__body">
                    <h2 className="stush-h2 coeur-card-title">
                      Capture moments into cœurs without leaving the moment
                    </h2>
                    <p className="stush-prose" style={{ margin: 0 }}>
                      Through a simple interface users can take a second to record a moment, log any
                      notes they have and keep them to be relived in the future.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="stush-band">
              <div className="coeur-outro">
                <div className="coeur-outro__stack">
                  <div className="coeur-outro__card">
                    <p className="stush-kicker">Next steps</p>
                    <div>
                      <h2 className="stush-h2 coeur-card-title">There’s still a way to go</h2>
                      <div className="stush-prose">
                        <p className="stush-subh">A new feature to share moments</p>
                        <p>
                          Memories are inherently shareable. A feature for sharing cœures could allow
                          moments to travel beyond the app, helping Coeur grow through authentic,
                          personal stories rather than feeds.{' '}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="coeur-outro__card">
                    <p className="stush-kicker">What I learned</p>
                    <div>
                      <h2 className="stush-h2 coeur-card-title">We as humans are lazy</h2>
                      <div className="stush-prose">
                        <p className="stush-subh">Products need to be made for real human behaviour</p>
                        <p>
                          Features that genuinely solve a problem will be ignored if they require
                          too much effort. Good design isn’t about adding solutions, it’s about
                          removing the friction required to use them.{' '}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="coeur-outro__crop">
                  <video
                    className="coeur-outro__visual"
                    src={coeurMedia.outroSharingVideo}
                    muted
                    loop
                    autoPlay
                    playsInline
                    preload="auto"
                    aria-label="Sharing concept preview"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PortfolioShell>
  )
}
