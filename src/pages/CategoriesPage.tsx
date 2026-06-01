import { useEffect, useState } from 'react';
import Layout from '../layouts/Layout';
import SectionHeading from '../components/SectionHeading';
import CategoryCard from '../components/CategoryCard';
import LoadingState from '../components/LoadingState';
import EmptyState from '../components/EmptyState';
import { api } from '../lib/strapi-api';
import { FALLBACK_CATEGORIES } from '../lib/fallback';
import { Category } from '../types';

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
      <section className="relative py-28 md:py-40 bg-stone-900 overflow-hidden">
        <img
          src="https://images.pexels.com/photos/1440476/pexels-photo-1440476.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Kyoto"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="relative z-10 container-max text-center">
          <p className="section-label text-amber-400 mb-2">Discover</p>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-4">All Categories</h1>
          <p className="font-body text-white/60 text-lg max-w-xl mx-auto">
            Six thematic lenses through which to explore Kyoto's multifaceted cultural landscape.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-20 bg-white dark:bg-stone-950">
        <div className="container-max">
          {loading ? <LoadingState message="Loading categories..." /> : categories.length === 0 ? (
            <EmptyState message="No categories found." />
          ) : (
            <>
              <SectionHeading
                label="Browse by Theme"
                title="Explore Kyoto"
                subtitle="Each category is a curated collection of editorial pieces on a distinct aspect of Kyoto's living heritage."
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
