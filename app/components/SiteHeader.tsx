'use client'

import { useState } from 'react'

export default function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header>
      <div className="container">
        <div className="header-inner">

          <a href="#" className="logo">
            <img src="/brand/logo-horizontal.svg" alt="AztraTech" />
          </a>

          <nav>
            <a href="#services">Services</a>
            <a href="#how-we-work">How We Work</a>
            <a href="#team">Team</a>
            <a href="#contact">Contact</a>
            <a
              href="https://calendly.com/vladislav-usichenko/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary nav-cta"
            >
              Book a Call
            </a>
          </nav>

          <button
            className="hamburger"
            aria-label="Open navigation"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <rect y="4"  width="22" height="1.8" rx="1" fill="currentColor" />
              <rect y="10" width="22" height="1.8" rx="1" fill="currentColor" />
              <rect y="16" width="22" height="1.8" rx="1" fill="currentColor" />
            </svg>
          </button>

        </div>
      </div>

      <div className={`mobile-nav${open ? ' open' : ''}`}>
        <a href="#services"    onClick={() => setOpen(false)}>Services</a>
        <a href="#how-we-work" onClick={() => setOpen(false)}>How We Work</a>
        <a href="#team"        onClick={() => setOpen(false)}>Team</a>
        <a href="#contact"     onClick={() => setOpen(false)}>Contact</a>
        <a
          href="https://calendly.com/vladislav-usichenko/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
        >
          Book a Call
        </a>
      </div>
    </header>
  )
}
