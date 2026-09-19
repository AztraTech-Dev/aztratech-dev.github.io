type Source = {
  label: string;
  publisher: string;
  href: string;
};

type ArticleSourcesProps = {
  sources: readonly Source[];
};

export default function ArticleSources({ sources }: ArticleSourcesProps) {
  return (
    <section className="article-sources" aria-labelledby="article-sources-heading">
      <h2 id="article-sources-heading">Sources & references</h2>
      <ul>
        {sources.map((source) => (
          <li key={source.href}>
            <a href={source.href} target="_blank" rel="noopener noreferrer">
              {source.label}
            </a>
            <span>{source.publisher}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
