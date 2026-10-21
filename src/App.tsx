import { useState, type ChangeEvent, type FormEvent } from 'react'
import './App.css'

type Player = {
  name: string
  position: string
  number: number
  image: string
}

type NewsItem = {
  title: string
  category: string
  date: string
  image: string
  excerpt: string
}

type Fixture = {
  venue: string
  date: string
  time: string
  opponent: string
  home: boolean
  status: 'Upcoming' | 'Live' | 'Completed'
  score?: string
}

type TableRow = {
  club: string
  played: number
  wins: number
  draws: number
  losses: number
  points: number
}

type FormState = {
  name: string
  email: string
  message: string
}

type FormErrors = Partial<Record<keyof FormState, string>>

const fixtures: Fixture[] = [
  {
    venue: 'Home',
    date: 'Sat 12 Oct',
    time: '18:30',
    opponent: 'Riverside FC',
    home: true,
    status: 'Upcoming',
  },
  {
    venue: 'Away',
    date: 'Tue 15 Oct',
    time: '19:45',
    opponent: 'Northbridge Athletic',
    home: false,
    status: 'Live',
  },
  {
    venue: 'Home',
    date: 'Sat 19 Oct',
    time: '15:00',
    opponent: 'Harbour City',
    home: true,
    status: 'Completed',
    score: '2 - 1',
  },
]

const newsItems: NewsItem[] = [
  {
    title: 'Training camp notes: intensity rises ahead of the weekend clash',
    category: 'Training',
    date: '08 Oct 2026',
    image:
      'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=900&q=80',
    excerpt:
      'The squad focused on tempo, pressing triggers, and set-piece patterns in a sharp midweek session.',
  },
  {
    title: 'Supporter open day returns with player Q&A and behind-the-scenes access',
    category: 'Community',
    date: '05 Oct 2026',
    image:
      'https://images.unsplash.com/photo-1547347298-4074fc3086f0?auto=format&fit=crop&w=900&q=80',
    excerpt:
      'Fans can meet staff, visit the academy zone, and hear from the first team before kickoff.',
  },
  {
    title: 'BHFC youth pathway expands as new signing groups settle into the system',
    category: 'Academy',
    date: '02 Oct 2026',
    image:
      'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=900&q=80',
    excerpt:
      'A new intake of prospects is building confidence under the senior coaching group.',
  },
]

const players: Player[] = [
  {
    name: 'Ethan Ford',
    position: 'Goalkeeper',
    number: 1,
    image:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Lucas Reid',
    position: 'Centre Back',
    number: 4,
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Milo Hart',
    position: 'Defensive Midfielder',
    number: 8,
    image:
      'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Nico Price',
    position: 'Winger',
    number: 11,
    image:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Daniel Moss',
    position: 'Striker',
    number: 9,
    image:
      'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Aiden Cross',
    position: 'Attacking Midfielder',
    number: 10,
    image:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=900&q=80',
  },
]

const values = [
  {
    title: 'Player development',
    text: 'Dedicated coaching and hard work help every young player reach their highest level in football.',
  },
  {
    title: 'Character',
    text: 'Reliability, responsibility, respect, and self-discipline matter as much as performance.',
  },
  {
    title: 'Community',
    text: 'We want our players to be trusted men who show up for their teammates and contribute to their communities.',
  },
]

const standings: TableRow[] = [
  { club: 'BHFC', played: 8, wins: 6, draws: 1, losses: 1, points: 19 },
  { club: 'Riverside FC', played: 8, wins: 5, draws: 2, losses: 1, points: 17 },
  { club: 'Northbridge Athletic', played: 8, wins: 5, draws: 1, losses: 2, points: 16 },
  { club: 'Harbour City', played: 8, wins: 4, draws: 2, losses: 2, points: 14 },
  { club: 'Vale United', played: 8, wins: 3, draws: 3, losses: 2, points: 12 },
]

const gallery = [
  'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1556056504-5c7696c4c28d?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1543351611-58f69d7c1781?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=900&q=80',
]

const partners = ['Apex Sports', 'Northline Media', 'Vantage Energy', 'Meridian Travel']

const initialForm: FormState = {
  name: '',
  email: '',
  message: '',
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [formData, setFormData] = useState<FormState>(initialForm)
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    const fieldName = name as keyof FormState

    setFormData((current) => ({
      ...current,
      [fieldName]: value,
    }))

    setErrors((current) => {
      const nextErrors = { ...current }
      delete nextErrors[fieldName]
      return nextErrors
    })

    if (submitted) {
      setSubmitted(false)
    }
  }

  const validateForm = () => {
    const nextErrors: FormErrors = {}

    if (!formData.name.trim()) {
      nextErrors.name = 'Please add your name.'
    }

    if (!formData.email.trim()) {
      nextErrors.email = 'Please add your email.'
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      nextErrors.email = 'Please enter a valid email address.'
    }

    if (!formData.message.trim()) {
      nextErrors.message = 'Please add your message.'
    } else if (formData.message.trim().length < 20) {
      nextErrors.message = 'Please share at least 20 characters.'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!validateForm()) {
      return
    }

    setSubmitted(true)
    setFormData(initialForm)
  }

  return (
    <div className="page-shell">
      <header className="topbar">
        <a className="brand" href="#home" aria-label="BHFC home">
          <span className="brand-mark">BH</span>
          <span>BHFC</span>
        </a>

        <button
          type="button"
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          onClick={() => setMenuOpen((current) => !current)}
        >
          Menu
        </button>

        <nav id="main-navigation" className={menuOpen ? 'main-nav is-open' : 'main-nav'}>
          <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#news" onClick={() => setMenuOpen(false)}>News</a>
          <a href="#team" onClick={() => setMenuOpen(false)}>Squad</a>
          <a href="#fixtures" onClick={() => setMenuOpen(false)}>Fixtures</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>
      </header>

      <main className="page-content">
        <section className="hero-section" id="home">
          <div className="hero-copy">
            <p className="eyebrow">Our purpose</p>
            <h1>Rise with BHFC.</h1>
            <p className="lead">
              We help young players reach their highest level in football and, more importantly, grow into reliable, responsible men who make a difference in their communities.
            </p>
            <div className="cta-row">
              <a className="primary-button" href="#fixtures">Upcoming fixtures</a>
              <a className="secondary-button" href="#team">Meet the squad</a>
            </div>
            <ul className="hero-stats" aria-label="Club stats overview">
              <li>
                <span>2026</span>
                <small>Season</small>
              </li>
              <li>
                <span>1st</span>
                <small>League position</small>
              </li>
              <li>
                <span>18:30</span>
                <small>Next kickoff</small>
              </li>
            </ul>
          </div>

          <div className="hero-visual" role="img" aria-label="Football players preparing for a match at a modern stadium">
            <div className="match-card">
              <p className="card-label">Next fixture</p>
              <div className="teams">
                <span>BHFC</span>
                <span className="versus">vs</span>
                <span>Riverside</span>
              </div>
              <p className="match-meta">Saturday • 18:30 • North End Stadium</p>
              <button type="button">Book tickets</button>
            </div>
          </div>
        </section>

        <section className="feature-bar" aria-label="Club highlights">
          <div>
            <span className="label">On the pitch</span>
            <strong>Player development</strong>
          </div>
          <div>
            <span className="label">Beyond football</span>
            <strong>Character first</strong>
          </div>
          <div>
            <span className="label">In our communities</span>
            <strong>Dependable leaders</strong>
          </div>
        </section>

        <section className="content-section" id="news">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Latest updates</p>
              <h2>Club news & announcements</h2>
            </div>
            <a href="#contact">Get in touch</a>
          </div>

          <div className="news-grid">
            {newsItems.map((item) => (
              <article className="news-card" key={item.title}>
                <div className="news-image" style={{ backgroundImage: `url(${item.image})` }} aria-label={item.title} />
                <div className="news-body">
                  <div className="meta-row">
                    <span>{item.category}</span>
                    <time>{item.date}</time>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section" id="team">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Sample squad</p>
              <h2>First-team highlights</h2>
            </div>
            <span className="demo-tag">Demo data</span>
          </div>

          <div className="player-grid">
            {players.map((player) => (
              <article className="player-card" key={player.name}>
                <div className="player-image" style={{ backgroundImage: `url(${player.image})` }} aria-label={`${player.name} portrait`} />
                <div className="player-meta">
                  <span className="shirt-number">#{player.number}</span>
                  <h3>{player.name}</h3>
                  <p>{player.position}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section about-layout" id="about">
          <div className="about-copy">
            <p className="eyebrow">Our identity</p>
            <h2>Developing outstanding players and better men.</h2>
            <p>
              At BHFC, youth development is about more than football. We help young players pursue excellence on the pitch and grow into dependable, responsible men who contribute with pride to their communities.
            </p>
            <p>
              Through discipline, teamwork, and personal accountability, we prepare each player to earn trust, take responsibility, and make a positive difference wherever life takes him.
            </p>
          </div>

          <div className="value-grid">
            {values.map((value) => (
              <article className="value-card" key={value.title}>
                <span className="value-mark">0{values.indexOf(value) + 1}</span>
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section" id="fixtures">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Match centre</p>
              <h2>Fixtures & results</h2>
            </div>
            <span className="demo-tag">Sample schedule</span>
          </div>

          <div className="fixtures-grid">
            {fixtures.map((fixture) => (
              <article className="fixture-card" key={`${fixture.date}-${fixture.opponent}`}>
                <div className="fixture-header">
                  <span>{fixture.venue}</span>
                  <span className={`status ${fixture.status.toLowerCase()}`}>{fixture.status}</span>
                </div>
                <div className="fixture-match">
                  <strong>{fixture.home ? 'BHFC' : fixture.opponent}</strong>
                  <span>vs</span>
                  <strong>{fixture.home ? fixture.opponent : 'BHFC'}</strong>
                </div>
                <p>{fixture.date}</p>
                <p>{fixture.time}</p>
                {fixture.score ? <p className="score">Final score: {fixture.score}</p> : null}
              </article>
            ))}
          </div>

          <div className="standings-wrap">
            <div className="standings-header">
              <h3>League table</h3>
              <span>Sample data</span>
            </div>
            <table className="standings-table">
              <thead>
                <tr>
                  <th>Club</th>
                  <th>P</th>
                  <th>W</th>
                  <th>D</th>
                  <th>L</th>
                  <th>Pts</th>
                </tr>
              </thead>
              <tbody>
                {standings.map((row) => (
                  <tr key={row.club} className={row.club === 'BHFC' ? 'highlight-row' : ''}>
                    <td>{row.club}</td>
                    <td>{row.played}</td>
                    <td>{row.wins}</td>
                    <td>{row.draws}</td>
                    <td>{row.losses}</td>
                    <td>{row.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="content-section gallery-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Moments</p>
              <h2>Inside the club</h2>
            </div>
          </div>
          <div className="gallery-grid">
            {gallery.map((image, index) => (
              <div key={image + index} className="gallery-item" style={{ backgroundImage: `url(${image})` }} aria-label={`BHFC gallery photo ${index + 1}`} />
            ))}
          </div>
        </section>

        <section className="content-section sponsor-section" id="partners">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Supporters</p>
              <h2>Partners & sponsors</h2>
            </div>
            <span className="demo-tag">Placeholder brands</span>
          </div>
          <div className="partner-grid">
            {partners.map((partner) => (
              <div className="partner-badge" key={partner}>{partner}</div>
            ))}
          </div>
        </section>

        <section className="content-section contact-section" id="contact">
          <div className="contact-copy">
            <p className="eyebrow">Community</p>
            <h2>Talk to the club.</h2>
            <p>
              This contact form is included as a demonstration only. It validates input locally and does not submit live data until a real backend is connected.
            </p>
            <ul className="contact-details">
              <li>Email: hello@bhfc-demo.example</li>
              <li>Phone: <a href="tel:+27653384439">+27 65 338 4439</a></li>
              <li>Address: North End Stadium, London</li>
            </ul>
          </div>

          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <label>
              Full name
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                aria-invalid={Boolean(errors.name)}
                className={errors.name ? 'input-error' : ''}
                placeholder="Your name"
              />
              {errors.name ? <small className="field-error">{errors.name}</small> : null}
            </label>

            <label>
              Email address
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                aria-invalid={Boolean(errors.email)}
                className={errors.email ? 'input-error' : ''}
                placeholder="you@example.com"
              />
              {errors.email ? <small className="field-error">{errors.email}</small> : null}
            </label>

            <label>
              Message
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                aria-invalid={Boolean(errors.message)}
                className={errors.message ? 'input-error' : ''}
                placeholder="Tell us how we can help..."
                rows={5}
              />
              {errors.message ? <small className="field-error">{errors.message}</small> : null}
            </label>

            <button type="submit" className="primary-button">Send enquiry</button>
            {submitted ? <p className="success-message">Thanks. This demo form validated successfully.</p> : null}
          </form>
        </section>
      </main>

      <footer className="site-footer">
        <div>
          <a href="#home" className="brand footer-brand">
            <span className="brand-mark">BH</span>
            <span>BHFC</span>
          </a>
        </div>

        <div className="footer-links">
          <a href="#news">News</a>
          <a href="#team">Squad</a>
          <a href="#fixtures">Fixtures</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="footer-meta">
          <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://x.com" target="_blank" rel="noreferrer">X</a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer">YouTube</a>
        </div>
      </footer>
    </div>
  )
}

export default App
