import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CalendarDays, User, Tag, ArrowLeft } from 'lucide-react';
import Layout from '../layouts/Layout';
import ArticleCard from '../components/ArticleCard';
import LoadingState from '../components/LoadingState';
import EmptyState from '../components/EmptyState';
import { api, getStrapiImageUrl } from '../lib/strapi-api';
import { FALLBACK_ARTICLES } from '../lib/fallback';
import { getCategoryName } from '../types';
import type { Article } from '../types';

const ARTICLE_IMAGES: Record<string, string> = {
  'kinkakuji-golden-temple': 'https://images.pexels.com/photos/3408354/pexels-photo-3408354.jpeg?auto=compress&cs=tinysrgb&w=1920',
  'kaiseki-ryori-living-art': 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1920',
  'ryoanji-garden-of-silence': 'https://images.pexels.com/photos/1823680/pexels-photo-1823680.jpeg?auto=compress&cs=tinysrgb&w=1920',
  'nishijin-textile-weaving': 'https://images.pexels.com/photos/1532771/pexels-photo-1532771.jpeg?auto=compress&cs=tinysrgb&w=1920',
  'gion-higashiyama-at-dusk': 'https://images.pexels.com/photos/402028/pexels-photo-402028.jpeg?auto=compress&cs=tinysrgb&w=1920',
  'gion-matsuri-festival': 'https://images.pexels.com/photos/1829980/pexels-photo-1829980.jpeg?auto=compress&cs=tinysrgb&w=1920',
};
const FALLBACK_IMG = 'https://images.pexels.com/photos/2187605/pexels-photo-2187605.jpeg?auto=compress&cs=tinysrgb&w=1920';

function fmt(d: string) {
  if (!d) return '';
  return new Date(d).toLocaleDateString('ro-RO', { year: 'numeric', month: 'long', day: 'numeric' });
}

function RichContent({ html }: { html: string }) {
  return (
    <div
      className="prose prose-stone dark:prose-invert max-w-none prose-headings:font-display prose-headings:font-bold prose-p:font-body prose-p:leading-relaxed prose-a:no-underline hover:prose-a:underline prose-strong:font-bold prose-em:font-accent prose-em:text-lg prose-blockquote:font-accent prose-blockquote:italic prose-blockquote:text-xl"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export default function ArticleDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [related, setRelated] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    api.getArticleBySlug(slug)
      .then(async r => {
        const art = Array.isArray(r.data) ? r.data[0] : r.data;
        if (art) {
          setArticle(art);
          if (art.category?.id) {
            const rel = await api.getRelatedArticles(art.category.id, slug).catch(() => ({ data: [] as Article[] }));
            setRelated(rel.data || []);
          }
        } else {
          const fb = FALLBACK_ARTICLES.find(a => a.slug === slug) || FALLBACK_ARTICLES[0];
          setArticle(fb);
          setRelated(FALLBACK_ARTICLES.filter(a => a.slug !== slug && a.category?.slug === fb.category?.slug).slice(0, 3));
        }
      })
      .catch(() => {
        const fb = FALLBACK_ARTICLES.find(a => a.slug === slug) || FALLBACK_ARTICLES[0];
        setArticle(fb);
        setRelated(FALLBACK_ARTICLES.filter(a => a.slug !== slug && a.category?.slug === fb.category?.slug).slice(0, 3));
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <Layout><LoadingState message="Se încarcă articolul..." /></Layout>;
  if (!article) return <Layout><EmptyState message="Articolul nu a fost găsit." /></Layout>;

  const imgUrl = getStrapiImageUrl(article.cover) || ARTICLE_IMAGES[article.slug] || FALLBACK_IMG;
  const catName = article.category ? getCategoryName(article.category) : '';

  return (
    <Layout>
      {/* Back link */}
      <div className="container-max pt-8 pb-2">
        <Link
          to="/categories"
          className="inline-flex items-center gap-2 text-sm font-body transition-colors"
          style={{ color: 'var(--color-muted)' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-text)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-muted)')}
        >
          <ArrowLeft size={14} /> Înapoi la categorii
        </Link>
      </div>

      {/* Hero image */}
      <section className="relative h-[65vh] min-h-[450px] flex items-end overflow-hidden">
        <img src={imgUrl} alt={article.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        <div className="relative z-10 container-max pb-12 md:pb-16">
          {catName && (
            <Link
              to={`/categories/${article.category?.slug}`}
              className="inline-flex items-center gap-1.5 text-xs font-body font-medium tracking-widest uppercase mb-4 transition-colors"
              style={{ color: '#fdacc4' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#ffc7d9')}
              onMouseLeave={e => (e.currentTarget.style.color = '#fdacc4')}
            >
              <Tag size={12} /> {catName}
            </Link>
          )}
          <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-3xl mb-5">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center gap-5 text-white/60 text-sm font-body">
            {article.author && <span className="flex items-center gap-1.5"><User size={13} /> {article.author}</span>}
            <span className="flex items-center gap-1.5"><CalendarDays size={13} /> {fmt(article.publishedAt)}</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="container-max max-w-3xl">
          {article.excerpt && (
            <p className="font-accent italic text-xl md:text-2xl leading-relaxed mb-10 border-l-4 pl-6" style={{ color: 'var(--color-muted)', borderColor: 'var(--color-primary)' }}>
              {article.excerpt}
            </p>
          )}
          {article.content ? (
            <RichContent html={article.content} />
          ) : (
            <p className="font-body text-lg leading-relaxed" style={{ color: 'var(--color-muted)' }}>
              Conținutul acestui articol nu este disponibil momentan.
            </p>
          )}
        </div>
      </section>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="py-20 border-t" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
          <div className="container-max">
            <p className="font-accent italic text-lg mb-2" style={{ color: 'var(--color-primary)' }}>Continuă lectura</p>
            <h2 className="font-display text-3xl font-bold mb-10" style={{ color: 'var(--color-text)' }}>
              Articole înrudite
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {related.map(a => <ArticleCard key={a.id} article={a} />)}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}
