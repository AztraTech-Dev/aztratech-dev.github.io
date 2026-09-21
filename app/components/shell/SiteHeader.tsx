import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "../../../lib/site-config";
import ButtonLink from "../ui/ButtonLink";
import Container from "../ui/Container";
import MobileNav from "./MobileNav";
import NavLink from "./NavLink";
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
            <NavLink href={siteConfig.routes.howWeWork}>How We Work</NavLink>
            <NavLink href={siteConfig.routes.about}>About</NavLink>
            <NavLink href={siteConfig.routes.insights}>Insights</NavLink>
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
