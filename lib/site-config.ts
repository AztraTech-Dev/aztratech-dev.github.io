export const siteConfig = {
  name: "AztraTech",
  siteUrl: "https://aztra.tech",
  calendlyUrl: "https://calendly.com/vladislav-usichenko/30min",
  // Public backend endpoint for the project-context lead form. Not a secret:
  // this is a public POST target on a static-export site, and the value is
  // stable enough that git history should show it explicitly rather than
  // route it through env plumbing that this site otherwise has none of.
  leadEndpoint: "https://aztratech-lead-intake.aztratech.workers.dev/lead",
  contact: {
    email: "vladyslav.usichenko@aztra.tech",
    linkedIn: "https://www.linkedin.com/company/aztratech-company/",
    telegram: "https://t.me/aztratech",
    github: "https://github.com/AztraTech-Dev",
  },
  routes: {
    home: "/",
    services: "/services",
    stablecoin: "/services/stablecoin-payment-rails",
    rwa: "/services/rwa-tokenization",
    security: "/services/security-engineering",
    howWeWork: "/how-we-work",
    about: "/about",
    insights: "/insights",
    contact: "/contact",
    privacy: "/privacy",
  },
  services: [
    {
      label: "Stablecoin Payment Rails",
      navLabel: "Stablecoin Payment Rails",
      description:
        "Payment architecture, provider integrations, reconciliation and treasury workflows.",
      menuDescription: "Payments, settlement and reconciliation.",
      href: "/services/stablecoin-payment-rails",
    },
    {
      label: "RWA Tokenization",
      navLabel: "RWA Tokenization",
      description:
        "Infrastructure for tokenized assets, ownership, transfer controls and the asset lifecycle.",
      menuDescription: "Asset lifecycle and controlled token states.",
      href: "/services/rwa-tokenization",
    },
    {
      label: "Web3 Security Engineering",
      navLabel: "Security",
      description:
        "Security-by-design, threat modeling, remediation and technical readiness.",
      menuDescription: "Threat models, controls and secure delivery.",
      href: "/services/security-engineering",
    },
  ],
} as const;
