import { useEffect, useMemo, useState } from 'react'
import PortfolioShell from './PortfolioShell'
import { communityProjectAssets as a } from './assets/community-projects/assets'
import w5SummitImage from './assets/community-projects/w5/summit-2.webp'
import w5DcaImage from './assets/community-projects/w5/14690e48-6ebe-4973-b354-e218227975ff.png'
import w5TeamImage from './assets/community-projects/w5/team picture.webp'
import './communityProjectsPage.css'

function Attachment({
  name,
  date,
  href,
}: {
  name: string
  date: string
  href?: string
}) {
  if (href) {
    return (
      <button
        type="button"
        className="cp-attachment"
        aria-label={`Attachment: ${name}`}
        onClick={() => window.open(href, '_blank', 'noopener,noreferrer')}
      >
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

type EmailId = 'wfn' | 'w5' | 'usc'

type Email = {
  id: EmailId
  subject: string
  sender: string
  snippet: string
  title: string
  date: string
  to: string
  preview: string
  attachments: Array<{ name: string; date: string; href?: string }>
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
    preview: 'Over 1,300 pieces of merch and 20+ mentors ...',
    attachments: [
      { name: 'PDS by the numbers.png', date: '20/04/2026', href: a.pdsRecap },
      {
        name: 'Sponsorship Package',
        date: '20/04/2026',
        href: 'https://drive.google.com/file/d/1_4kyTly5yhWizMXk18Mye9Td5sPWLMc6/view?usp=sharing',
      },
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
    preview: '4 events in 4 months with over 400 attendees ...',
    attachments: [
      {
        name: 'Sponsorship Package.pdf',
        date: '20/04/2026',
        href: 'https://drive.google.com/file/d/1AoKQYBZkBAD-e9Rr6QDpo_mAvkT5e5zC/view?usp=sharing',
      },
    ],
  },
  {
    id: 'usc',
    subject: 'Managing a $38M Budget at 17',
    sender: 'Western University Students’ Council',
    snippet: 'Over 6 hours a week spent in meetings ...',
    title:
      'Overseeing a 2 Restaurants, a Newspaper, Elections and Health Insurance for 30,000 Students',
    date: 'January 12 2025',
    to: 'harryyang@westernusc.ca',
    preview: 'Managing a $38M Budget at 17',
    attachments: [],
  },
]

const W5_SUMMIT_IMAGE = w5SummitImage
const W5_DCA_IMAGE = w5DcaImage
const W5_TEAM_IMAGE = w5TeamImage
const WFN_IMAGE_GROUP = a.imageGroup
const WFN_IMAGE_52 = a.image52
const WFN_IMAGE_53 = a.image53

const READER_LAYER_MQ = '(min-width: 1001px)'

export default function CommunityProjectsPage() {
  const [search, setSearch] = useState('')
  const [activeEmailId, setActiveEmailId] = useState<EmailId | null>('usc')
  const [visitedEmailIds, setVisitedEmailIds] = useState<Set<EmailId>>(new Set(['usc']))
  const [isWideLayout, setIsWideLayout] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(READER_LAYER_MQ).matches,
  )
  /** Figma 2651:4340 — mobile: inbox first; reader opens as a layer after selecting an email */
  const [readerLayerOpen, setReaderLayerOpen] = useState(false)
  const hasSearchQuery = search.trim().length > 0

  useEffect(() => {
    const mq = window.matchMedia(READER_LAYER_MQ)
    const onChange = () => setIsWideLayout(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (isWideLayout) setReaderLayerOpen(false)
  }, [isWideLayout])

  useEffect(() => {
    if (!isWideLayout && readerLayerOpen) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = prev
      }
    }
    return undefined
  }, [isWideLayout, readerLayerOpen])

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
    const showActive = isWideLayout || readerLayerOpen
    if (emailId === activeEmailId && showActive) return 'active'
    if (visitedEmailIds.has(emailId)) return 'read'
    return 'unread'
  }

  const openEmail = (emailId: EmailId) => {
    setActiveEmailId(emailId)
    setVisitedEmailIds((prev) => new Set(prev).add(emailId))
    if (!isWideLayout) setReaderLayerOpen(true)
  }

  const closeReaderLayer = () => setReaderLayerOpen(false)
  const goBackFromReader = () => {
    if (!isWideLayout) {
      closeReaderLayer()
      return
    }
    setActiveEmailId(null)
  }

  const getThumbByEmailId = (emailId: EmailId) => {
    if (emailId === 'wfn') return a.pdsLogoPfp
    if (emailId === 'w5') return a.pdsLogoPfp2
    return a.pdsLogoPfp3
  }

  return (
    <PortfolioShell pageName="Community Projects — post office" shellVariant="community">
      <div
        className={`cp${!isWideLayout && readerLayerOpen ? ' cp--reader-layer' : ''}`}
      >
        <header className="cp__top">
          <div className="cp__brand">
            <div>
              <h1 className="cp__brand-title">post office</h1>
              <p className="cp__brand-tag">you’ve got mail!</p>
            </div>
          </div>
          <div className="cp__search-strip">
            <div className={`cp-search-wrap${hasSearchQuery ? ' cp-search-wrap--open' : ''}`}>
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
              {hasSearchQuery ? (
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
          </div>
          <div className="cp__avatar">
            <img src={a.userPfp} alt="" width={50} height={50} />
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
                          <img src={getThumbByEmailId(email.id)} alt="" width={40} height={40} />
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

          <main
            className="cp__reader"
            aria-label="Message"
            inert={!isWideLayout && !readerLayerOpen ? true : undefined}
          >
            <div className="cp-reader__topbar">
              <button type="button" className="cp__reader-back" onClick={goBackFromReader}>
                <span className="cp__reader-back-chevron" aria-hidden="true">
                  &#8249;
                </span>
                back
              </button>
              <div className="cp-reader__top-avatar">
                <img src={a.userPfp} alt="" width={30} height={30} />
              </div>
            </div>
            {activeEmail ? (
              <div className="cp-reader__card">
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
                        href={attachment.href}
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
                      </div>

                      <div className="cp-wfn-row cp-wfn-row--pair">
                        <div className="cp-prose cp-wfn-row__text">
                          <p className="cp-wfn-cottage-copy">
                            Through the Summer, we roadmapped through a somewhat productive cottage trip. As
                            the school year came through, we built our team from 0-100, teaching them Figma
                            and having dinners, desserts and sleepovers building an unmatched team culture.
                          </p>
                        </div>
                        <div className="cp-wfn-overlap">
                          <figure className="cp-wfn-media cp-wfn-media--group cp-wfn-media--plain">
                            <img src={WFN_IMAGE_GROUP} alt="PDS team culture moments collage" />
                          </figure>
                        </div>
                      </div>

                      <div className="cp-wfn-row">
                        <figure className="cp-wfn-media cp-wfn-media--52">
                          <img src={WFN_IMAGE_52} alt="PDS organizing team portrait" />
                        </figure>
                        <div className="cp-prose cp-wfn-row__text">
                          <p>
                            Building that team culture is what allowed me to push them further than ever. I had
                            a vision for a new magnitude of PDS a vision with more competitors, more mentorship
                            and a true in-person competitor experiences with merch, food and workshops.
                          </p>
                          <p>
                            Every week, we met in-person and had dinner together. I learned how to motivate, and
                            lead the team. We constantly set goals, for the team and for each member. Together,
                            we sent over 1,917 emails, and pitched our event to 19 brands. The fact that we were
                            so close kept everyone accountable to the team. It worked.
                          </p>
                        </div>
                      </div>

                      <div className="cp-wfn-row">
                        <div className="cp-prose cp-wfn-row__text">
                          <p>
                            We had over 1,300 pieces of merch given away, 20+ mentors and judges. Each team was
                            given the opportunity to learn about product design, build a project, get feedback
                            and leave with a free meal and t-shirt.
                          </p>
                        </div>
                        <figure className="cp-wfn-media cp-wfn-media--53">
                          <img src={WFN_IMAGE_53} alt="PDS participants workshop moment" />
                        </figure>
                      </div>

                      <div className="cp-prose">
                        <p>
                          Who knew? Understanding what people want, and creating a unique experience that provides
                          value made PDS26 the biggest one yet.
                        </p>
                        <p>
                          I&apos;ll be returning to the team as a Senior Advisor next year, let us know if you&apos;d
                          like to be involved!
                        </p>
                        <p>Regards,</p>
                        <p>Harry</p>
                      </div>
                    </>
                  ) : activeEmail.id === 'w5' ? (
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
                  ) : (
                    <>
                      <div className="cp-prose">
                        <p>
                          The board is where I&apos;ve felt most out of place, under qualified and overwhelmed by
                          the amount of information presented to us.
                        </p>
                        <p>&nbsp;</p>
                        <p>
                          The University Students&apos; Council is a non-profit and think of the board as just
                          that, the board of a corporation. This means we meet in committees and oversee
                          strategic planing, investments and all the other arms of the non-profit.
                        </p>
                        <p>&nbsp;</p>
                        <p>
                          How hard could overseeing a student council even be... With a budget of over $38M and
                          over 30 full time staff the board is a quiet force that does it&apos;s job well when you
                          never hear about us.
                        </p>
                        <p>&nbsp;</p>
                        <p>
                          Some weeks, there are over 6 hours worth of meetings, asking questions to senior
                          staff, lawyers and our portfolio managers to ensure the Is are dotted and the Ts are
                          crossed, literally, reading through policy amendments to spot typos and inconsistencies.
                        </p>
                        <p>&nbsp;</p>
                        <p>
                          This year the board had major wins, separating our cash into investment tranches for
                          short to long term uses and creating an elections governance board removing the burden
                          of certifying elections from a single student. Elements that ensure the long-term
                          success of the organization.
                        </p>
                        <p>&nbsp;</p>
                        <p>
                          Now imagine this, you&apos;re a first year student being presented with these votes,
                          decisions and information. I was overwhelmed to say the least. But, I&apos;ve grown so
                          much in this position, understanding the true role of the board, the functions of the
                          USC and how to manage a $38M budget at 17 years old.
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
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
