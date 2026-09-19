import ButtonLink from "./components/ui/ButtonLink";
import Container from "./components/ui/Container";
import { siteConfig } from "../lib/site-config";

export default function NotFound() {
  return (
    <main id="main-content" className="not-found-page">
      <Container variant="standard">
        <div className="not-found-page__surface">
          <p>404</p>
          <h1>{"This page isn't here."}</h1>
          <p>The link may be outdated, or the page may have moved.</p>
          <div className="not-found-page__actions">
            <ButtonLink href={siteConfig.routes.home}>Back to home</ButtonLink>
            <ButtonLink href={siteConfig.routes.services} variant="ghost">View services</ButtonLink>
          </div>
        </div>
      </Container>
    </main>
  );
}
