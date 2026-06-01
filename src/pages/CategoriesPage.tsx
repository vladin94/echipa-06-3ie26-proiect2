import { useEffect, useState } from 'react';
import Layout from '../layouts/Layout';
import SectionHeading from '../components/SectionHeading';
import CategoryCard from '../components/CategoryCard';
import LoadingState from '../components/LoadingState';
import EmptyState from '../components/EmptyState';
import { api } from '../lib/strapi-api';
import { FALLBACK_CATEGORIES } from '../lib/fallback';
import type { Category } from '../types';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getCategories()
      .then(r => setCategories(r.data?.length ? r.data : FALLBACK_CATEGORIES))
      .catch(() => setCategories(FALLBACK_CATEGORIES))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-28 md:py-40 overflow-hidden" style={{ backgroundColor: '#1a0d11' }}>
        <img
          src="https://images.pexels.com/photos/1440476/pexels-photo-1440476.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Kyoto"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="relative z-10 container-max text-center">
          <p className="font-accent italic text-xl mb-3" style={{ color: '#fdacc4' }}>Descoperă</p>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-4">Toate Categoriile</h1>
          <p className="font-body text-white/60 text-lg max-w-xl mx-auto">
            Șase lentile tematice prin care să explorezi peisajul cultural multifațetat al Kyoto-ului.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-20" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="container-max">
          {loading ? (
            <LoadingState message="Se încarcă categoriile..." />
          ) : categories.length === 0 ? (
            <EmptyState message="Nu au fost găsite categorii." />
          ) : (
            <>
              <SectionHeading
                label="Navighează după temă"
                title="Explorează Kyoto"
                subtitle="Fiecare categorie este o colecție curată de articole editoriale despre un aspect distinct al patrimoniului viu al Kyoto-ului."
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map(cat => (
                  <CategoryCard key={cat.id} category={cat} size="lg" />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </Layout>
  );
}
