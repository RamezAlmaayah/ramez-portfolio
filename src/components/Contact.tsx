import { ArrowUpRight, Mail, Phone } from 'lucide-react'
import { portfolio } from '../data/portfolio'
import { Magnetic } from './Button'
import { ResumeAction } from './ResumeAction'
import { Reveal } from './Section'
import { TechnologyLogo } from './TechnologyLogo'

export function Contact() {
  return (
    <section id="contact" tabIndex={-1} className="contact-section">
      <div className="container">
        <Reveal className="contact-grid">
          <div>
            <p className="eyebrow">
              <span>06 /</span>THE NEXT CONVERSATION
            </p>
            <h2>
              Have an Idea
              <br />
              Worth Building<span>?</span>
            </h2>
            <p className="contact-copy">{portfolio.contactDescription}</p>
            <div className="contact-actions">
              <Magnetic>
                <a className="button button-white" href={`mailto:${portfolio.email}`}>
                  Send an Email
                  <ArrowUpRight size={21} />
                </a>
              </Magnetic>
              <ResumeAction />
            </div>
          </div>
          <div className="contact-details">
            <a className="contact-row" href={`mailto:${portfolio.email}`}>
              <Mail size={24} />
              <span>
                <small>EMAIL</small>
                {portfolio.email}
              </span>
              <ArrowUpRight size={23} />
            </a>
            <a
              className="contact-row"
              href={portfolio.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="linkedin-mark" aria-hidden="true">
                in
              </span>
              <span>
                <small>LINKEDIN</small>Connect on LinkedIn
              </span>
              <ArrowUpRight size={23} />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <a className="contact-row" href={portfolio.social.github} target="_blank" rel="noopener noreferrer">
              <TechnologyLogo name="GitHub" />
              <span><small>GITHUB</small>View GitHub Profile</span>
              <ArrowUpRight size={23} />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <a className="contact-row" href={portfolio.phoneHref}>
              <Phone size={24} />
              <span>
                <small>PHONE</small>
                {portfolio.phone}
              </span>
              <ArrowUpRight size={23} />
            </a>
            {!portfolio.cv ? (
              <p className="resume-asset-note">
                Resume unavailable. Required file:
                <br />
                <code>{portfolio.cvAsset}</code>
              </p>
            ) : null}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
