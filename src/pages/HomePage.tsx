import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import Layout from '../layouts/Layout';
import SectionHeading from '../components/SectionHeading';
import CategoryCard from '../components/CategoryCard';
import ArticleCard from '../components/ArticleCard';
import LoadingState from '../components/LoadingState';
import { api } from '../lib/strapi-api';
import { FALLBACK_CATEGORIES, FALLBACK_ARTICLES } from '../lib/fallback';
import { Category, Article } from '../types';

export default function HomePage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [catLoading, setCatLoading] = useState(true);
  const [artLoading, setArtLoading] = useState(true);

  useEffect(() => {
    api.getCategories()
      .then(r => setCategories(r.data?.length ? r.data : FALLBACK_CATEGORIES))
      .catch(() => setCategories(FALLBACK_CATEGORIES))
      .finally(() => setCatLoading(false));

    api.getFeaturedArticles(6)
      .then(r => setArticles(r.data?.length ? r.data : FALLBACK_ARTICLES))
      .catch(() => setArticles(FALLBACK_ARTICLES))
      .finally(() => setArtLoading(false));
  }, []);

  const featuredArticle = articles[0];
  const gridArticles = articles.slice(1, 4);
  const listArticles = articles.slice(4);

  return (
    <Layout>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <img
          src="https://images.pexels.com/photos/2187605/pexels-photo-2187605.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Kyoto temple at dusk"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto slide-up">
          <p className="font-accent italic text-amber-400 text-xl md:text-2xl mb-4">
            Discover Japan's Ancient Capital
          </p>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-6">
            The Soul of<br />
            <em className="font-display italic">Kyoto</em>
          </h1>
          <p className="font-body text-white/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
            A journey through temples, gardens, gastronomy, and living traditions — the eternal city where every stone holds a story.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/categories" className="btn-primary">
              Explore Categories <ArrowRight size={16} />
            </Link>
            <Link to="/articles/kinkakuji-golden-temple" className="btn-ghost">
              Read Our Stories
            </Link>
          </div>
        </div>

        <a href="#content" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-white animate-bounce transition-colors" aria-label="Scroll down">
          <ChevronDown size={28} />
        </a>
      </section>

      {/* ── Intro strip ──────────────────────────────────────── */}
      <section className="bg-stone-900 dark:bg-stone-950 py-12">
        <div className="container-max">
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-stone-700">
            {[
              { number: '1,200+', label: 'Years of History' },
              { number: '1,800', label: 'Temples & Shrines' },
              { number: '17', label: 'UNESCO Sites' },
            ].map(item => (
              <div key={item.label} className="text-center py-6 sm:py-0 sm:px-8">
                <p className="font-display text-4xl font-bold text-amber-500 mb-1">{item.number}</p>
                <p className="font-accent italic text-stone-400 text-base">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Article ─────────────────────────────────── */}
      <section id="content" className="py-20 bg-white dark:bg-stone-950">
        <div className="container-max">
          <div className="flex items-end justify-between mb-10">
            <SectionHeading label="Editor's Pick" title="Featured Story" align="left" />
          </div>
          {artLoading ? <LoadingState /> : featuredArticle ? (
            <ArticleCard article={featuredArticle} variant="featured" />
          ) : null}
        </div>
      </section>

      {/* ── Categories Grid ───────────────────────────────────── */}
      <section className="py-20 bg-stone-50 dark:bg-stone-900">
        <div className="container-max">
          <SectionHeading
            label="Explore by Theme"
            title="Our Categories"
            subtitle="From sacred architecture to seasonal festivals — each section offers a distinct lens on Kyoto's living culture."
          />
          {catLoading ? <LoadingState /> : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {categories.slice(0, 6).map(cat => (
                  <CategoryCard key={cat.id} category={cat} />
                ))}
              </div>
              <div className="mt-10 text-center">
                <Link to="/categories" className="btn-outline">
                  All Categories <ArrowRight size={14} />
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* ── Article Grid ─────────────────────────────────────── */}
      <section className="py-20 bg-white dark:bg-stone-950">
        <div className="container-max">
          <div className="flex items-end justify-between mb-12">
            <SectionHeading label="Latest Writing" title="Recent Articles" align="left" />
            <Link to="/categories" className="hidden md:flex items-center gap-2 text-sm font-body text-amber-700 dark:text-amber-500 hover:underline shrink-0">
              All articles <ArrowRight size={14} />
            </Link>
          </div>
          {artLoading ? <LoadingState /> : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {gridArticles.map(article => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Atmospheric quote ────────────────────────────────── */}
      <section className="relative py-32 overflow-hidden">
        <img
          src="https://images.pexels.com/photos/3490363/pexels-photo-3490363.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Kyoto garden"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative z-10 container-max text-center">
          <p className="font-accent italic text-amber-400 text-2xl mb-6">古都の美</p>
          <blockquote className="font-display italic text-3xl md:text-5xl text-white leading-tight max-w-3xl mx-auto mb-6">
            "In Kyoto, even the shadows have memories."
          </blockquote>
          <p className="font-body text-white/60 text-sm tracking-widest uppercase">— Japanese Proverb</p>
        </div>
      </section>

      {/* ── More Articles horizontal list ────────────────────── */}
      {listArticles.length > 0 && (
        <section className="py-20 bg-stone-50 dark:bg-stone-900">
          <div className="container-max">
            <SectionHeading label="Continue Reading" title="More Stories" align="left" />
            <div className="space-y-8 max-w-2xl">
              {listArticles.map(article => (
                <ArticleCard key={article.id} article={article} variant="horizontal" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Newsletter CTA ───────────────────────────────────── */}
      <section className="bg-amber-700 dark:bg-amber-800 py-16">
        <div className="container-max text-center">
          <p className="font-accent italic text-amber-200 text-lg mb-2">Stay Connected</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            Stories from Kyoto, monthly
          </h2>
          <p className="font-body text-amber-100/80 mb-8 max-w-md mx-auto">
            Curated editorial pieces delivered to your inbox. No noise — only carefully selected cultural stories.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input type="email" placeholder="your@email.com" className="input-field flex-1" />
            <button className="btn-ghost whitespace-nowrap">Subscribe</button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
