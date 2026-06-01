import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CalendarDays, User, Tag, ArrowLeft } from 'lucide-react';
import Layout from '../layouts/Layout';
import ArticleCard from '../components/ArticleCard';
import ImageGallery from '../components/ImageGallery';
import LoadingState from '../components/LoadingState';
import EmptyState from '../components/EmptyState';
import { api, getStrapiImageUrl } from '../lib/strapi-api';
import { FALLBACK_ARTICLES } from '../lib/fallback';
import { Article } from '../types';

const ARTICLE_IMAGES: Record<string, string> = {
  'kinkakuji-golden-temple': 'https://images.pexels.com/photos/3408354/pexels-photo-3408354.jpeg?auto=compress&cs=tinysrgb&w=1920',
  'kaiseki-ryori-living-art': 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1920',
  'ryoanji-garden-of-silence': 'https://images.pexels.com/photos/1823680/pexels-photo-1823680.jpeg?auto=compress&cs=tinysrgb&w=1920',
  'nishijin-textile-weaving': 'https://images.pexels.com/photos/1532771/pexels-photo-1532771.jpeg?auto=compress&cs=tinysrgb&w=1920',
  'gion-higashiyama-at-dusk': 'https://images.pexels.com/photos/402028/pexels-photo-402028.jpeg?auto=compress&cs=tinysrgb&w=1920',
  'gion-matsuri-festival': 'https://images.pexels.com/photos/1829980/pexels-photo-1829980.jpeg?auto=compress&cs=tinysrgb&w=1920',
};

const FALLBACK_IMG = 'https://images.pexels.com/photos/2187605/pexels-photo-2187605.jpeg?auto=compress&cs=tinysrgb&w=1920';

function formatDate(dateStr: string) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function RichContent({ html }: { html: string }) {
  return (
    <div
      className="
        prose prose-stone dark:prose-invert max-w-none
        prose-headings:font-display prose-headings:font-bold
        prose-p:font-body prose-p:text-stone-700 dark:prose-p:text-stone-300 prose-p:leading-relaxed
        prose-a:text-amber-700 dark:prose-a:text-amber-500 prose-a:no-underline hover:prose-a:underline
        prose-strong:text-stone-900 dark:prose-strong:text-stone-100
        prose-em:font-accent prose-em:text-lg
        prose-blockquote:border-amber-700 dark:prose-blockquote:border-amber-500
        prose-blockquote:font-accent prose-blockquote:italic prose-blockquote:text-xl
      "
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

// ── Layout: Editorial ─────────────────────────────────────────────────────────
function EditorialLayout({ article, imgUrl }: { article: Article; imgUrl: string }) {
  return (
    <>
      <section className="relative h-[70vh] min-h-[500px] flex items-end overflow-hidden">
        <img src={imgUrl} alt={article.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        <div className="relative z-10 container-max pb-12 md:pb-16">
          {article.category && (
            <Link to={`/categories/${article.category.slug}`} className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-body font-medium tracking-widest uppercase mb-4 hover:text-amber-300 transition-colors">
              <Tag size={12} /> {article.category.title}
            </Link>
          )}
          <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-3xl mb-5">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center gap-5 text-white/60 text-sm font-body">
            <span className="flex items-center gap-1.5"><User size={13} /> {article.author}</span>
            <span className="flex items-center gap-1.5"><CalendarDays size={13} /> {formatDate(article.publishedAt)}</span>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-stone-950">
        <div className="container-max max-w-3xl">
          <p className="font-accent italic text-xl md:text-2xl text-stone-600 dark:text-stone-400 leading-relaxed mb-10 border-l-4 border-amber-700 pl-6">
            {article.excerpt}
          </p>
          <RichContent html={article.content} />
        </div>
      </section>
    </>
  );
}

// ── Layout: Split ─────────────────────────────────────────────────────────────
function SplitLayout({ article, imgUrl }: { article: Article; imgUrl: string }) {
  return (
    <>
      <section className="py-20 bg-stone-50 dark:bg-stone-900">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div className="order-2 lg:order-1">
              {article.category && (
                <Link to={`/categories/${article.category.slug}`} className="inline-flex items-center gap-1.5 text-amber-700 dark:text-amber-500 text-xs font-body font-medium tracking-widest uppercase mb-5 hover:underline">
                  <Tag size={12} /> {article.category.title}
                </Link>
              )}
              <h1 className="font-display text-3xl md:text-5xl font-bold text-stone-900 dark:text-stone-50 leading-tight mb-6">
                {article.title}
              </h1>
              <div className="flex flex-wrap gap-5 text-stone-500 dark:text-stone-400 text-sm font-body mb-8">
                <span className="flex items-center gap-1.5"><User size={13} /> {article.author}</span>
                <span className="flex items-center gap-1.5"><CalendarDays size={13} /> {formatDate(article.publishedAt)}</span>
              </div>
              <p className="font-accent italic text-lg md:text-xl text-stone-600 dark:text-stone-400 leading-relaxed mb-8">
                {article.excerpt}
              </p>
              <RichContent html={article.content} />
            </div>
            <div className="order-1 lg:order-2 lg:sticky lg:top-24">
              <img src={imgUrl} alt={article.title} className="w-full aspect-[3/4] object-cover" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// ── Layout: Gallery ───────────────────────────────────────────────────────────
function GalleryLayout({ article, imgUrl }: { article: Article; imgUrl: string }) {
  return (
    <>
      <section className="py-16 bg-white dark:bg-stone-950">
        <div className="container-max max-w-4xl">
          {article.category && (
            <Link to={`/categories/${article.category.slug}`} className="inline-flex items-center gap-1.5 text-amber-700 dark:text-amber-500 text-xs font-body font-medium tracking-widest uppercase mb-5 hover:underline">
              <Tag size={12} /> {article.category.title}
            </Link>
          )}
          <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-stone-900 dark:text-stone-50 leading-tight mb-5">
            {article.title}
          </h1>
          <div className="flex flex-wrap gap-5 text-stone-500 text-sm font-body mb-8">
            <span className="flex items-center gap-1.5"><User size={13} /> {article.author}</span>
            <span className="flex items-center gap-1.5"><CalendarDays size={13} /> {formatDate(article.publishedAt)}</span>
          </div>
        </div>
      </section>

      <section className="bg-stone-100 dark:bg-stone-900 py-4">
        <div className="container-max">
          <ImageGallery images={article.gallery} coverUrl={imgUrl} />
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-stone-950">
        <div className="container-max max-w-3xl">
          <p className="font-accent italic text-xl text-stone-600 dark:text-stone-400 leading-relaxed mb-10 border-l-4 border-amber-700 pl-6">
            {article.excerpt}
          </p>
          <RichContent html={article.content} />
        </div>
      </section>
    </>
  );
}

// ── Layout: Feature ───────────────────────────────────────────────────────────
function FeatureLayout({ article, imgUrl }: { article: Article; imgUrl: string }) {
  return (
    <>
      <section className="bg-stone-900 dark:bg-stone-950 py-20 md:py-32">
        <div className="container-max max-w-5xl text-center">
          {article.category && (
            <Link to={`/categories/${article.category.slug}`} className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-body font-medium tracking-widest uppercase mb-6 hover:text-amber-300 transition-colors">
              <Tag size={12} /> {article.category.title}
            </Link>
          )}
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            {article.title}
          </h1>
          <p className="font-accent italic text-white/60 text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed mb-8">
            {article.excerpt}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-5 text-white/50 text-sm font-body">
            <span className="flex items-center gap-1.5"><User size={13} /> {article.author}</span>
            <span className="flex items-center gap-1.5"><CalendarDays size={13} /> {formatDate(article.publishedAt)}</span>
          </div>
        </div>
      </section>

      <div className="h-2 bg-amber-700" />

      <section className="relative h-80 md:h-[500px] overflow-hidden">
        <img src={imgUrl} alt={article.title} className="w-full h-full object-cover" />
      </section>

      <section className="py-16 bg-white dark:bg-stone-950">
        <div className="container-max max-w-3xl">
          <RichContent html={article.content} />
        </div>
      </section>
    </>
  );
}

// ── Main Article Page ─────────────────────────────────────────────────────────
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
            const rel = await api.getRelatedArticles(art.category.id, slug).catch(() => ({ data: [] }));
            setRelated(rel.data || []);
          }
        } else {
          const fallback = FALLBACK_ARTICLES.find(a => a.slug === slug) || FALLBACK_ARTICLES[0];
          setArticle(fallback);
          setRelated(FALLBACK_ARTICLES.filter(a => a.slug !== slug && a.category?.slug === fallback.category?.slug).slice(0, 3));
        }
      })
      .catch(() => {
        const fallback = FALLBACK_ARTICLES.find(a => a.slug === slug) || FALLBACK_ARTICLES[0];
        setArticle(fallback);
        setRelated(FALLBACK_ARTICLES.filter(a => a.slug !== slug && a.category?.slug === fallback.category?.slug).slice(0, 3));
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <Layout><LoadingState message="Loading article..." /></Layout>;
  if (!article) return <Layout><EmptyState message="Article not found." /></Layout>;

  const imgUrl = getStrapiImageUrl(article.cover) || ARTICLE_IMAGES[article.slug] || FALLBACK_IMG;
  const layout = article.layoutVariant || 'editorial';

  return (
    <Layout>
      <div className="container-max pt-8">
        <Link to="/categories" className="inline-flex items-center gap-2 text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white text-sm font-body transition-colors">
          <ArrowLeft size={14} /> Back
        </Link>
      </div>

      {layout === 'editorial' && <EditorialLayout article={article} imgUrl={imgUrl} />}
      {layout === 'split' && <SplitLayout article={article} imgUrl={imgUrl} />}
      {layout === 'gallery' && <GalleryLayout article={article} imgUrl={imgUrl} />}
      {layout === 'feature' && <FeatureLayout article={article} imgUrl={imgUrl} />}

      {/* Related Articles */}
      {related.length > 0 && (
        <section className="py-20 bg-stone-50 dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800">
          <div className="container-max">
            <p className="font-accent italic text-amber-700 dark:text-amber-500 text-lg mb-2">Continue Reading</p>
            <h2 className="font-display text-3xl font-bold text-stone-900 dark:text-stone-50 mb-10">
              Related Articles
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
