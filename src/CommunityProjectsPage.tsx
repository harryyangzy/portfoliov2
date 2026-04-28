import { useMemo, useState } from 'react'
import PortfolioShell from './PortfolioShell'
import { communityProjectAssets as a } from './assets/community-projects/assets'
import './communityProjectsPage.css'

function Attachment({ name, date }: { name: string; date: string }) {
  return (
    <button type="button" className="cp-attachment" aria-label={`Attachment: ${name}`}>
      <span className="cp-attachment__doc" aria-hidden="true">
        <span className="cp-attachment__doc-a" />
        <span className="cp-attachment__doc-b" />
      </span>
      <span className="cp-attachment__text">
        <span className="cp-attachment__name">{name}</span>
        <span className="cp-attachment__date">{date}</span>
      </span>
    </button>
  )
}

type EmailId = 'wfn' | 'w5'

type Email = {
  id: EmailId
  subject: string
  sender: string
  snippet: string
  title: string
  date: string
  to: string
  attachments: Array<{ name: string; date: string }>
}

const EMAILS: Email[] = [
  {
    id: 'wfn',
    subject: 'Design Sprint Attracts 250+',
    sender: 'Western Founder’s Network',
    snippet: 'See this event that I planned for many ...',
    title: 'Canada’s Biggest Product Design Competition at a School Without a Design Program',
    date: 'March 21 2026',
    to: 'wfn@westernu.ca',
    attachments: [
      { name: 'PDS by the numbers.png', date: '20/04/2026' },
      { name: 'Sponsorship Package', date: '20/04/2026' },
    ],
  },
  {
    id: 'w5',
    subject: '4 Events in 4 Months for 400+',
    sender: 'W5 Entrepreneurship Association',
    snippet: 'See this event that I planned for many ...',
    title: 'Leading a Case Competition, Career Panel, Firms Trip and Design Competition',
    date: 'January 12 2026',
    to: 'w5@westernu.ca',
    attachments: [{ name: 'Sponsorship Package.pdf', date: '20/04/2026' }],
  },
]

const W5_SUMMIT_IMAGE = 'https://www.figma.com/api/mcp/asset/14690e48-6ebe-4973-b354-e218227975ff'
const W5_DCA_IMAGE = 'https://www.figma.com/api/mcp/asset/22642931-7f3a-47de-b6dd-a7f198093892'
const W5_TEAM_IMAGE = 'https://www.figma.com/api/mcp/asset/f1b419f2-5394-4572-9c33-d409f3fe2169'

export default function CommunityProjectsPage() {
  const [search, setSearch] = useState('')
  const [activeEmailId, setActiveEmailId] = useState<EmailId | null>(null)
  const [visitedEmailIds, setVisitedEmailIds] = useState<Set<EmailId>>(new Set())

  const filteredEmails = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return EMAILS
    return EMAILS.filter((email) =>
      [email.subject, email.sender, email.snippet, email.title].some((field) =>
        field.toLowerCase().includes(query),
      ),
    )
  }, [search])

  const activeEmail = activeEmailId ? EMAILS.find((email) => email.id === activeEmailId) ?? null : null

  const getEmailVariant = (emailId: EmailId) => {
    if (emailId === activeEmailId) return 'active'
    if (visitedEmailIds.has(emailId)) return 'read'
    return 'unread'
  }

  const openEmail = (emailId: EmailId) => {
    setActiveEmailId(emailId)
    setVisitedEmailIds((prev) => new Set(prev).add(emailId))
  }

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
            <div className="cp-search-wrap">
              <label className="cp__search">
                <span className="visually-hidden">Search mail</span>
                <input
                  type="search"
                  className="cp__search-input"
                  placeholder="Search"
                  autoComplete="off"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </label>
              {search.trim() ? (
                <div className="cp-search-hint">
                  {filteredEmails.length > 0 ? (
                    filteredEmails.map((email) => (
                      <button
                        key={`hint-${email.id}`}
                        type="button"
                        className="cp-search-hint__row"
                        onClick={() => openEmail(email.id)}
                      >
                        <span className="cp-search-hint__title">{email.subject}</span>
                        <span className="cp-search-hint__date">{email.date}</span>
                      </button>
                    ))
                  ) : (
                    <div className="cp-search-hint__empty">No matching emails</div>
                  )}
                </div>
              ) : null}
            </div>
            <div className="cp__avatar">
              <img src={a.userPfp} alt="" width={50} height={50} />
            </div>
          </div>
        </header>

        <div className="cp__split">
          <aside className="cp__inbox" aria-label="Inbox">
            <div className="cp__inbox-scroll">
              {filteredEmails.map((email, index) => {
                const variant = getEmailVariant(email.id)
                return (
                  <div key={email.id}>
                    <button
                      type="button"
                      className={`cp-mail cp-mail--${variant}`}
                      onClick={() => openEmail(email.id)}
                      aria-current={variant === 'active' ? 'page' : undefined}
                    >
                      <div className="cp-mail__row">
                        <div className="cp-mail__thumb">
                          <img src={a.pdsLogoPfp} alt="" width={40} height={40} />
                        </div>
                        <div className="cp-mail__body">
                          <div>
                            <p className="cp-mail__title">{email.subject}</p>
                            <p className="cp-mail__sub">{email.sender}</p>
                          </div>
                          <p className="cp-mail__snippet">{email.snippet}</p>
                        </div>
                      </div>
                    </button>
                    {index < filteredEmails.length - 1 ? <hr className="cp__divider" /> : null}
                  </div>
                )
              })}
            </div>
          </aside>

          <main className="cp__reader" aria-label="Message">
            {activeEmail ? (
              <>
                <h2 className="cp-reader__subject">{activeEmail.title}</h2>
                <div className="cp-reader__inner">
                  <div className="cp-meta">
                    <div className="cp-meta__left">
                      <div className="cp-meta__face">
                        <img src={a.harryPfp} alt="" width={60} height={60} />
                      </div>
                      <div className="cp-meta__who">
                        <p className="cp-meta__name">Harry Yang</p>
                        <p className="cp-meta__to">To: {activeEmail.to}</p>
                      </div>
                    </div>
                    <p className="cp-meta__date">{activeEmail.date}</p>
                  </div>

                  <div className="cp-attachments">
                    {activeEmail.attachments.map((attachment) => (
                      <Attachment
                        key={`${activeEmail.id}-${attachment.name}`}
                        name={attachment.name}
                        date={attachment.date}
                      />
                    ))}
                  </div>

                  {activeEmail.id === 'wfn' ? (
                    <>
                      <div className="cp-prose">
                        <p>Hey, it&apos;s Harry :)</p>
                        <p>&nbsp;</p>
                        <p>
                          During my entirety of my second year, I spent endless days and nights planning Product
                          Design Sprint. It was an incredible event, with 8 sponsors, and over 250 competitors,
                          we inspired a new generation of designers.
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
                          Every week, we met in-person and had dinner together. I learned how to motivate, and
                          lead the team. We constantly set goals, for the team and for each member. Together, we
                          sent over 1,917 emails, and pitched our event to 19 brands. The fact that we were so
                          close kept everyone accountable to the team. It worked.
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
                          We had over 1,300 pieces of merch given away, 20+ mentors and judges. Each team was
                          given the opportunity to learn about product design, build a project, get feedback and
                          leave with a free meal and t-shirt.
                        </p>
                        <p>&nbsp;</p>
                        <p>
                          Who knew? Understanding what people want, and creating a unique experience that provides
                          value made PDS26 the biggest one yet.
                        </p>
                        <p>&nbsp;</p>
                        <p>
                          I&apos;ll be returning to the team as a Senior Advisor next year, let us know if you&apos;d
                          like to be involved!
                        </p>
                        <p>&nbsp;</p>
                        <p>Regards,</p>
                        <p>Harry</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="cp-prose">
                        <p>
                          I remember skipping all my classes during the first week of school, instead being at
                          club recruitment events, meeting prospective first years, fighting over other clubs on
                          who to hire.
                        </p>
                      </div>

                      <div className="cp-w5-row cp-w5-row--summit">
                        <div className="cp-prose cp-w5-row__text">
                          <p>
                            Our first event was 4 weeks into the year, the Summit Case Competition is the first
                            and most anticipated case competition. Planning began 3 months earlier in July, when I
                            would take sponsor calls from my hotel room in Cancun. With the perfect weekend
                            secured, we learned that there were 2 huge midterms on the same day.
                          </p>
                          <p>
                            We pivoted, brought the event to a hybrid format and moved everything 12 hours
                            earlier, thinking outside the box while pushing harder than ever. Turnout was even
                            bigger than last year with over 30 teams.
                          </p>
                        </div>
                        <figure className="cp-w5-media cp-w5-media--summit">
                          <img src={W5_SUMMIT_IMAGE} alt="Summit case competition event moment" />
                        </figure>
                      </div>

                      <div className="cp-w5-row cp-w5-row--dca">
                        <figure className="cp-w5-media cp-w5-media--dca">
                          <img src={W5_DCA_IMAGE} alt="Career panel and recruiting moment" />
                        </figure>
                        <div className="cp-prose cp-w5-row__text">
                          <p>
                            We hosted the entrepreneurship portion of the Career Panel, bringing in 4
                            entrepreneurs to share their expertise. Over 180 registrations later, the lecture
                            hall was full barely even standing room at the back.
                          </p>
                          <p>
                            On top of that we hosted a firms trip to the Deloitte and National Bank offices.
                            Little did we know, WFN, yes another club I&apos;m a part of was planning a firms trip
                            the same day. Our sub-teams met to outline a unique value proposition and by emailing
                            every single finance and accounting professor to share the opportunity, we filled both
                            busses to capacity.
                          </p>
                        </div>
                      </div>

                      <div className="cp-prose">
                        <p>
                          Last, but not least, I brought my experience hosting Product Design Sprint, to host a
                          start-up focused Design weekend. Giving our team one last push bringing together over a
                          group of over 80% first time designers to the event.
                        </p>
                      </div>

                      <div className="cp-w5-row cp-w5-row--team">
                        <div className="cp-prose cp-w5-row__text">
                          <p>
                            As a part of W5 I learned two things, any individual is only as good as their team
                            and any great product doesn&apos;t exist without an audience.
                          </p>
                          <p>
                            My co-lead Clara was incredible, when she was more organized, I&apos;d be more hands on
                            with a vision and vice-versa, on top of that the Development team was so, incredibly
                            capable.
                          </p>
                        </div>
                        <figure className="cp-w5-media cp-w5-media--team">
                          <img src={W5_TEAM_IMAGE} alt="W5 team group photo" />
                        </figure>
                      </div>

                      <div className="cp-prose">
                        <p>
                          I&apos;ve always believed the more you put into something the more you&apos;ll get out of it.
                        </p>
                        <p>Hopefully that&apos;s true...</p>
                        <p>Talk later,</p>
                        <p>Harry</p>
                      </div>
                    </>
                  )}
                </div>
              </>
            ) : (
              <div className="cp-reader__empty">
                <p className="cp-reader__empty-title">Select an email to read</p>
                <p className="cp-reader__empty-body">
                  All emails start unread after reload. Click one to mark it active.
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </PortfolioShell>
  )
}
