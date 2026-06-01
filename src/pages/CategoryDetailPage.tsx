import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Layout from '../layouts/Layout';
import ArticleCard from '../components/ArticleCard';
import LoadingState from '../components/LoadingState';
import EmptyState from '../components/EmptyState';
import { api, getStrapiImageUrl } from '../lib/strapi-api';
import { FALLBACK_CATEGORIES, FALLBACK_ARTICLES } from '../lib/fallback';
import { Category, Article } from '../types';

const CATEGORY_IMAGES: Record<string, string> = {
  'temples-shrines': 'https://images.pexels.com/photos/2187605/pexels-photo-2187605.jpeg?auto=compress&cs=tinysrgb&w=1920',
  'gastronomy': 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=1920',
  'gardens-nature': 'https://images.pexels.com/photos/3490363/pexels-photo-3490363.jpeg?auto=compress&cs=tinysrgb&w=1920',
  'arts-crafts': 'https://images.pexels.com/photos/5060281/pexels-photo-5060281.jpeg?auto=compress&cs=tinysrgb&w=1920',
  'neighborhoods': 'https://images.pexels.com/photos/402028/pexels-photo-402028.jpeg?auto=compress&cs=tinysrgb&w=1920',
  'seasons-festivals': 'https://images.pexels.com/photos/1829980/pexels-photo-1829980.jpeg?auto=compress&cs=tinysrgb&w=1920',
};

export default function CategoryDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    api.getCategoryBySlug(slug)
      .then(r => {
        const cat = Array.isArray(r.data) ? r.data[0] : r.data;
        if (cat) {
          setCategory(cat);
          setArticles((cat.articles as Article[]) || []);
        } else {
          // Fallback
          const fallbackCat = FALLBACK_CATEGORIES.find(c => c.slug === slug) || FALLBACK_CATEGORIES[0];
          setCategory(fallbackCat);
          setArticles(FALLBACK_ARTICLES.filter(a => a.category?.slug === slug));
        }
      })
      .catch(() => {
        const fallbackCat = FALLBACK_CATEGORIES.find(c => c.slug === slug) || FALLBACK_CATEGORIES[0];
        setCategory(fallbackCat);
        setArticles(FALLBACK_ARTICLES.filter(a => a.category?.slug === slug));
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <Layout><LoadingState message="Loading category..." /></Layout>;
  if (!category) return <Layout><EmptyState message="Category not found." /></Layout>;

  const heroImg = getStrapiImageUrl(category.cover) || CATEGORY_IMAGES[slug || ''] || CATEGORY_IMAGES['temples-shrines'];

  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-32 md:py-48 overflow-hidden">
        <img src={heroImg} alt={category.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-black/80" />
        <div className="relative z-10 container-max">
          <Link to="/categories" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm font-body mb-8 transition-colors">
            <ArrowLeft size={14} /> All Categories
          </Link>
          <p className="font-accent italic text-amber-400 text-xl mb-3">Category</p>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-5 leading-tight">
            {category.title}
          </h1>
          {category.description && (
            <p className="font-body text-white/70 text-lg max-w-2xl leading-relaxed">
              {category.description}
            </p>
          )}
        </div>
      </section>

      {/* Articles */}
      <section className="py-20 bg-white dark:bg-stone-950">
        <div className="container-max">
          <p className="font-accent italic text-amber-700 dark:text-amber-500 text-lg mb-2">
            {articles.length} {articles.length === 1 ? 'article' : 'articles'}
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-stone-900 dark:text-stone-50 mb-12">
            Stories in this category
          </h2>
          {articles.length === 0 ? (
            <EmptyState message="No articles in this category yet." />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map(article => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
