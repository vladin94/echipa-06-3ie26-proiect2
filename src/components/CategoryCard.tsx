import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Category } from '../types';
import { getStrapiImageUrl } from '../lib/strapi-api';

const CATEGORY_IMAGES: Record<string, string> = {
  'temples-shrines': 'https://images.pexels.com/photos/2187605/pexels-photo-2187605.jpeg?auto=compress&cs=tinysrgb&w=800',
  'gastronomy': 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=800',
  'gardens-nature': 'https://images.pexels.com/photos/3490363/pexels-photo-3490363.jpeg?auto=compress&cs=tinysrgb&w=800',
  'arts-crafts': 'https://images.pexels.com/photos/5060281/pexels-photo-5060281.jpeg?auto=compress&cs=tinysrgb&w=800',
  'neighborhoods': 'https://images.pexels.com/photos/402028/pexels-photo-402028.jpeg?auto=compress&cs=tinysrgb&w=800',
  'seasons-festivals': 'https://images.pexels.com/photos/1829980/pexels-photo-1829980.jpeg?auto=compress&cs=tinysrgb&w=800',
};

const FALLBACK_IMG = 'https://images.pexels.com/photos/1440476/pexels-photo-1440476.jpeg?auto=compress&cs=tinysrgb&w=800';

interface CategoryCardProps {
  category: Category;
  size?: 'sm' | 'md' | 'lg';
}

export default function CategoryCard({ category, size = 'md' }: CategoryCardProps) {
  const imgUrl = getStrapiImageUrl(category.cover) || CATEGORY_IMAGES[category.slug] || FALLBACK_IMG;
  const aspectClass = size === 'lg' ? 'aspect-[3/4]' : size === 'sm' ? 'aspect-[4/3]' : 'aspect-[4/3]';

  return (
    <Link
      to={`/categories/${category.slug}`}
      className="group block overflow-hidden relative"
    >
      <div className={`${aspectClass} overflow-hidden`}>
        <img
          src={imgUrl}
          alt={category.cover?.alternativeText || category.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
        <p className="font-accent italic text-white/70 text-sm mb-1">Category</p>
        <h3 className="font-display text-xl md:text-2xl font-bold text-white leading-tight mb-2">
          {category.title}
        </h3>
        {size !== 'sm' && category.description && (
          <p className="text-white/70 text-sm font-body line-clamp-2 mb-3 leading-relaxed">
            {category.description}
          </p>
        )}
        <span className="inline-flex items-center gap-1.5 text-amber-400 text-sm font-body font-medium group-hover:gap-3 transition-all duration-300">
          Explore <ArrowRight size={14} />
        </span>
      </div>
    </Link>
  );
}
