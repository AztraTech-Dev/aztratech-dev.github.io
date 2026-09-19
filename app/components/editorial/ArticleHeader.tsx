import Container from "../ui/Container";

type ArticleHeaderProps = {
  category: string;
  title: string;
  lead: string;
};

export default function ArticleHeader({ category, title, lead }: ArticleHeaderProps) {
  return (
    <header className="article-header">
      <Container variant="editorial">
        <p className="article-header__category">{category}</p>
        <h1>{title}</h1>
        <p className="article-header__lead">{lead}</p>
        <div className="article-header__author">
          <span>Vladislav Usichenko</span>
          <span>Founder, AztraTech</span>
        </div>
      </Container>
    </header>
  );
}
