import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "../../../lib/site-config";
import ButtonLink from "../ui/ButtonLink";
import Container from "../ui/Container";
import MobileNav from "./MobileNav";
import ServicesDropdown from "./ServicesDropdown";

export default function SiteHeader() {
  return (
    <header className="site-header">
      <Container variant="wide">
        <div className="site-header__inner">
          <Link href={siteConfig.routes.home} className="site-header__logo">
            <Image
              src="/brand/logo-horizontal.svg"
              alt="AztraTech"
              width={2037}
              height={659}
              priority
            />
          </Link>

          <nav className="desktop-navigation" aria-label="Primary navigation">
            <ServicesDropdown />
            <Link href={siteConfig.routes.howWeWork}>How We Work</Link>
            <Link href={siteConfig.routes.about}>About</Link>
            <Link href={siteConfig.routes.insights}>Insights</Link>
            <ButtonLink
              href={siteConfig.calendlyUrl}
              className="desktop-navigation__cta"
            >
              Book a Call
            </ButtonLink>
          </nav>

          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
