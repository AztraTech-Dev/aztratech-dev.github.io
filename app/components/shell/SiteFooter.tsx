import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "../../../lib/site-config";
import Container from "../ui/Container";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <Container variant="wide">
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <Link href={siteConfig.routes.home} className="site-footer__logo">
              <Image
                src="/brand/logo-horizontal.svg"
                alt="AztraTech"
                width={2037}
                height={659}
              />
            </Link>
            <p>
              Web3 and fintech engineering for stablecoin payments, tokenized
              assets and security-sensitive systems.
            </p>
          </div>

          <div className="site-footer__column">
            <h2>Services</h2>
            {siteConfig.services.map((service) => (
              <Link key={service.href} href={service.href}>
                {service.label}
              </Link>
            ))}
          </div>

          <div className="site-footer__column">
            <h2>Company</h2>
            <Link href={siteConfig.routes.howWeWork}>How We Work</Link>
            <Link href={siteConfig.routes.about}>About</Link>
            <Link href={siteConfig.routes.insights}>Insights</Link>
            <Link href={siteConfig.routes.contact}>Contact</Link>
          </div>

          <div className="site-footer__column">
            <h2>Connect</h2>
            <a href={`mailto:${siteConfig.contact.email}`}>Email</a>
            <a
              href={siteConfig.contact.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a
              href={siteConfig.contact.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
        </div>

        <div className="site-footer__bottom">
          <span>© 2026 AztraTech. All rights reserved.</span>
          <Link href={siteConfig.routes.privacy}>Privacy</Link>
        </div>
      </Container>
    </footer>
  );
}
