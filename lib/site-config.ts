export const siteConfig = {
  name: "AztraTech",
  siteUrl: "https://aztra.tech",
  calendlyUrl: "https://calendly.com/vladislav-usichenko/30min",
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
      href: "/services/stablecoin-payment-rails",
    },
    {
      label: "RWA Tokenization",
      navLabel: "RWA Tokenization",
      description:
        "Infrastructure for tokenized assets, ownership, transfer controls and the asset lifecycle.",
      href: "/services/rwa-tokenization",
    },
    {
      label: "Web3 Security Engineering",
      navLabel: "Security",
      description:
        "Security-by-design, threat modeling, remediation and technical readiness.",
      href: "/services/security-engineering",
    },
  ],
} as const;
