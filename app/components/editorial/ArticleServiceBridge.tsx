import ButtonLink from "../ui/ButtonLink";

type ArticleServiceBridgeProps = {
  eyebrow: string;
  title: string;
  body: string;
  serviceHref: string;
  serviceLabel: string;
  callHref: string;
};

export default function ArticleServiceBridge({
  eyebrow,
  title,
  body,
  serviceHref,
  serviceLabel,
  callHref,
}: ArticleServiceBridgeProps) {
  return (
    <aside className="article-service-bridge">
      <p className="article-service-bridge__eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p>{body}</p>
      <div className="article-service-bridge__actions">
        <ButtonLink href={serviceHref} variant="ghost">
          {serviceLabel}
        </ButtonLink>
        <ButtonLink href={callHref}>Book a 30-minute discovery call</ButtonLink>
      </div>
    </aside>
  );
}
