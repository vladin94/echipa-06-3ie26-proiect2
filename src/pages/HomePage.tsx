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
import type { Category, Article } from '../types';

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

  const featured = articles[0];
  const grid = articles.slice(1, 4);
  const list = articles.slice(4);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <img
          src="https://images.pexels.com/photos/2187605/pexels-photo-2187605.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Kyoto"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto slide-up">
          <p className="font-accent italic text-xl md:text-2xl mb-4" style={{ color: '#fdacc4' }}>
            Descoperă Capitala Antică a Japoniei
          </p>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-6">
            Sufletul din<br /><em>Kyoto</em>
          </h1>
          <p className="font-body text-white/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
            O călătorie prin temple, grădini, gastronomie și tradiții vii — orașul etern unde fiecare piatră poartă o poveste.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/categories" className="btn-primary">
              Explorează categoriile <ArrowRight size={16} />
            </Link>
            <Link to="/about" className="btn-ghost">Despre proiect</Link>
          </div>
        </div>
        <a href="#content" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-white animate-bounce transition-colors" aria-label="Scroll down">
          <ChevronDown size={28} />
        </a>
      </section>

      {/* Stats strip */}
      <section className="py-12" style={{ backgroundColor: '#1a0d11' }}>
        <div className="container-max">
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x" style={{ borderColor: '#4e2535' }}>
            {[
              { number: '1.200+', label: 'Ani de Istorie' },
              { number: '1.800', label: 'Temple și Sanctuare' },
              { number: '17', label: 'Situri UNESCO' },
            ].map(item => (
              <div key={item.label} className="text-center py-6 sm:py-0 sm:px-8">
                <p className="font-display text-4xl font-bold mb-1" style={{ color: 'var(--color-primary-dk)' }}>{item.number}</p>
                <p className="font-accent italic text-base" style={{ color: '#c49aab' }}>{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured article */}
      <section id="content" className="py-20" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="container-max">
          <SectionHeading label="Selecția editorului" title="Articol Principal" align="left" />
          {artLoading ? <LoadingState /> : featured ? <ArticleCard article={featured} variant="featured" /> : null}
        </div>
      </section>

      {/* Categories */}
      <section className="py-20" style={{ backgroundColor: 'var(--color-surface)' }}>
        <div className="container-max">
          <SectionHeading
            label="Explorează după temă"
            title="Categoriile Noastre"
            subtitle="De la arhitectura sacră la festivaluri sezoniere — fiecare secțiune oferă o perspectivă distinctă asupra culturii Kyoto."
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
                  Toate categoriile <ArrowRight size={14} />
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Article grid */}
      <section className="py-20" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="container-max">
          <div className="flex items-end justify-between mb-12">
            <SectionHeading label="Ultimele articole" title="Articole Recente" align="left" />
            <Link to="/categories" className="hidden md:flex items-center gap-2 text-sm font-body font-medium hover:underline shrink-0" style={{ color: 'var(--color-primary)' }}>
              Toate articolele <ArrowRight size={14} />
            </Link>
          </div>
          {artLoading ? <LoadingState /> : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {grid.map(a => <ArticleCard key={a.id} article={a} />)}
            </div>
          )}
        </div>
      </section>

      {/* Quote section */}
      <section className="relative py-32 overflow-hidden">
        <img
          src="https://images.pexels.com/photos/27109409/pexels-photo-27109409.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Kyoto garden"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative z-10 container-max text-center">
          <p className="font-accent italic text-2xl mb-6" style={{ color: '#fdacc4' }}>古都の美</p>
          <blockquote className="font-display italic text-3xl md:text-5xl text-white leading-tight max-w-3xl mx-auto mb-6">
            "În Kyoto, chiar și umbrele au amintiri."
          </blockquote>
          <p className="font-body text-white/60 text-sm tracking-widest uppercase">— Proverb Japonez</p>
        </div>
      </section>

      {/* List articles */}
      {list.length > 0 && (
        <section className="py-20" style={{ backgroundColor: 'var(--color-surface)' }}>
          <div className="container-max">
            <SectionHeading label="Continuă lectura" title="Mai Multe Povești" align="left" />
            <div className="space-y-8 max-w-2xl">
              {list.map(a => <ArticleCard key={a.id} article={a} variant="horizontal" />)}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section className="py-16" style={{ backgroundColor: 'var(--color-primary)' }}>
        <div className="container-max text-center">
          <p className="font-accent italic text-lg mb-2" style={{ color: 'rgba(253,172,196,0.9)' }}>Rămâi conectat</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">Povești din Kyoto, lunar</h2>
          <p className="font-body mb-8 max-w-md mx-auto" style={{ color: 'rgba(255,255,255,0.8)' }}>
            Articole editoriale curate livrate în inbox-ul tău. Fără zgomot — doar povești culturale atent selecționate.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input type="email" placeholder="email@exemplu.com" className="input-field flex-1" />
            <button className="btn-ghost whitespace-nowrap">Abonează-te</button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
