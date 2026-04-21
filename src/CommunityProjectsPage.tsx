import PortfolioShell from './PortfolioShell'
import { communityProjectAssets as a } from './assets/community-projects/assets'
import './communityProjectsPage.css'

function Attachment({ name, date }: { name: string; date: string }) {
  return (
    <div className="cp-attachment">
      <img src={a.docIcon} alt="" className="cp-attachment__icon" width={28} height={28} />
      <div className="cp-attachment__text">
        <p className="cp-attachment__name">{name}</p>
        <p className="cp-attachment__date">{date}</p>
      </div>
    </div>
  )
}

export default function CommunityProjectsPage() {
  return (
    <PortfolioShell pageName="Community Projects — post office" shellVariant="community">
      <div className="cp">
        <header className="cp__top">
          <div className="cp__brand">
            <div>
              <h1 className="cp__brand-title">post office</h1>
              <p className="cp__brand-tag">you’ve got mail!</p>
            </div>
          </div>
          <div className="cp__toolbar">
            <label className="cp__search">
              <span className="visually-hidden">Search mail</span>
              <input
                type="search"
                className="cp__search-input"
                placeholder="Search"
                autoComplete="off"
              />
            </label>
            <div className="cp__avatar">
              <img src={a.userPfp} alt="" width={50} height={50} />
            </div>
          </div>
        </header>

        <div className="cp__split">
          <aside className="cp__inbox" aria-label="Inbox">
            <div className="cp__inbox-scroll">
              <div className="cp-mail cp-mail--active">
                <div className="cp-mail__row">
                  <div className="cp-mail__thumb">
                    <img src={a.pdsLogoPfp} alt="" width={40} height={40} />
                  </div>
                  <div className="cp-mail__body">
                    <div>
                      <p className="cp-mail__title">Design Sprint Attracts 250+</p>
                      <p className="cp-mail__sub">Western Founder’s Network</p>
                    </div>
                    <p className="cp-mail__snippet">
                      See this even that I planned for many ...
                    </p>
                  </div>
                </div>
              </div>

              <div className="cp-mail cp-mail--unread">
                <div className="cp-mail__row">
                  <div className="cp-mail__thumb" style={{ background: '#fff' }} />
                  <div className="cp-mail__body">
                    <div>
                      <p className="cp-mail__title">Design Sprint Attracts 250+</p>
                      <p className="cp-mail__sub">Western Founder’s Network</p>
                    </div>
                    <p className="cp-mail__snippet">
                      See this even that I planned for many ...
                    </p>
                  </div>
                </div>
              </div>

              <hr className="cp__divider" />

              <div className="cp-mail cp-mail--read">
                <div className="cp-mail__row">
                  <div className="cp-mail__thumb" style={{ background: '#fff' }} />
                  <div className="cp-mail__body">
                    <div>
                      <p className="cp-mail__title">Design Sprint Attracts 250+</p>
                      <p className="cp-mail__sub">Western Founder’s Network</p>
                    </div>
                    <p className="cp-mail__snippet">
                      See this even that I planned for many ...
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <main className="cp__reader" aria-label="Message">
            <h2 className="cp-reader__subject">
              Product Design Sprint 2026 Attracts 256 from 15 Schools
            </h2>
            <div className="cp-reader__inner">
              <div className="cp-meta">
                <div className="cp-meta__left">
                  <div className="cp-meta__face">
                    <img src={a.harryPfp} alt="" width={60} height={60} />
                  </div>
                  <div className="cp-meta__who">
                    <p className="cp-meta__name">Harry Yang</p>
                    <p className="cp-meta__to">To: wfn@westernu.ca</p>
                  </div>
                </div>
                <p className="cp-meta__date">March 21 2026</p>
              </div>

              <div className="cp-attachments">
                <Attachment name="PDS by the numbers.png" date="20/04/2026" />
                <Attachment name="Sponsorship Package" date="20/04/2026" />
              </div>

              <div className="cp-prose">
                <p>Hey, it’s Harry :)</p>
                <p>&nbsp;</p>
                <p>
                  During my entirety of my second year, I spent endless days and nights planning
                  Product Design Sprint. It was an incredible event, with 8 sponsors, and over 250
                  competitors, we inspired a new generation of designers.
                </p>
                <p>
                  Back to PDS25, our budget was cut, workshops were forgotten and team moral seemed to
                  dissipate. But, I had a plan and in May of 2025, I was trusted to run my own Design
                  team creating designs for 16 events over 5 portfolios.
                </p>
                <p>&nbsp;</p>
                <p>
                  Through the Summer, we roadmapped through a somewhat productive cottage trip. As the
                  school year came through, we built our team from 0-100, teaching them Figma and having
                  dinners, desserts and sleepovers building an unmatched team culture.
                </p>
              </div>

              <div className="cp-polaroids" aria-hidden="true">
                <div className="cp-polaroid cp-polaroid--1">
                  <img src={a.polaroid1} alt="" />
                </div>
                <div className="cp-polaroid cp-polaroid--2">
                  <img src={a.polaroid2} alt="" />
                </div>
                <div className="cp-polaroid cp-polaroid--3">
                  <img src={a.polaroid3} alt="" />
                </div>
              </div>

              <div className="cp-prose">
                <p>
                  Building that team culture is what allowed me to push them further than ever. I had a
                  vision for a new magnitude of PDS a vision with more competitors, more mentorship and
                  a true in-person competitor experiences with merch, food and workshops.
                </p>
                <p>&nbsp;</p>
                <p>
                  Every week, we met in-person and had dinner together. I learned how to motivate, and lead
                  the team. We constantly set goals, for the team and for each member. Together, we sent
                  over 1,917 emails, and pitched our event to 19 brands. The fact that we were so close
                  kept everyone accountable to the team. It worked.
                </p>
              </div>

              <div className="cp-gallery">
                <div className="cp-gallery__img cp-gallery__img--a">
                  <img src={a.image51} alt="" />
                </div>
                <div className="cp-gallery__img cp-gallery__img--b">
                  <img src={a.image52} alt="" />
                </div>
                <div className="cp-gallery__img cp-gallery__img--c">
                  <img src={a.image53} alt="" />
                </div>
              </div>

              <div className="cp-prose">
                <p>
                  We had over 1,300 pieces of merch given away, 20+ mentors and judges. Each team was given
                  the opportunity to learn about product design, build a project, get feedback and leave
                  with a free meal and t-shirt.
                </p>
                <p>&nbsp;</p>
                <p>
                  Who knew? Understanding what people want, and creating a unique experience that provides
                  value made PDS26 the biggest one yet.
                </p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </PortfolioShell>
  )
}
