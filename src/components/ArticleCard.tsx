import { Link } from 'react-router-dom';
import { CalendarDays, User, ArrowRight } from 'lucide-react';
import { Article } from '../types';
import { getStrapiImageUrl } from '../lib/strapi-api';

const ARTICLE_IMAGES: Record<string, string> = {
  'kinkakuji-golden-temple': 'https://images.pexels.com/photos/3408354/pexels-photo-3408354.jpeg?auto=compress&cs=tinysrgb&w=800',
  'kaiseki-ryori-living-art': 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800',
  'ryoanji-garden-of-silence': 'https://images.pexels.com/photos/1823680/pexels-photo-1823680.jpeg?auto=compress&cs=tinysrgb&w=800',
  'nishijin-textile-weaving': 'https://images.pexels.com/photos/1532771/pexels-photo-1532771.jpeg?auto=compress&cs=tinysrgb&w=800',
  'gion-higashiyama-at-dusk': 'https://images.pexels.com/photos/402028/pexels-photo-402028.jpeg?auto=compress&cs=tinysrgb&w=800',
  'gion-matsuri-festival': 'https://images.pexels.com/photos/1440476/pexels-photo-1440476.jpeg?auto=compress&cs=tinysrgb&w=800',
};
const FALLBACK_IMG = 'https://images.pexels.com/photos/2187605/pexels-photo-2187605.jpeg?auto=compress&cs=tinysrgb&w=800';

function formatDate(dateStr: string) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

interface ArticleCardProps {
  article: Article;
  variant?: 'default' | 'horizontal' | 'featured';
}

export default function ArticleCard({ article, variant = 'default' }: ArticleCardProps) {
  const imgUrl = getStrapiImageUrl(article.cover) || ARTICLE_IMAGES[article.slug] || FALLBACK_IMG;

  if (variant === 'horizontal') {
    return (
      <Link to={`/articles/${article.slug}`} className="group flex gap-5 items-start">
        <div className="w-28 h-20 shrink-0 overflow-hidden">
          <img src={imgUrl} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
        <div className="flex-1 min-w-0">
          {article.category && (
            <span className="text-xs font-body font-medium tracking-widest uppercase text-amber-700 dark:text-amber-500">
              {article.category.title}
            </span>
          )}
          <h4 className="font-display text-base font-bold text-stone-900 dark:text-stone-100 mt-0.5 line-clamp-2 leading-snug group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">
            {article.title}
          </h4>
          <p className="text-xs text-stone-500 dark:text-stone-400 font-body mt-1">{formatDate(article.publishedAt)}</p>
        </div>
      </Link>
    );
  }

  if (variant === 'featured') {
    return (
      <Link to={`/articles/${article.slug}`} className="group block relative overflow-hidden">
        <div className="aspect-[3/2] overflow-hidden">
          <img src={imgUrl} alt={article.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          {article.category && (
            <span className="inline-block font-body text-xs font-medium tracking-widest uppercase text-amber-400 mb-2">
              {article.category.title}
            </span>
          )}
          <h3 className="font-display text-2xl md:text-3xl font-bold text-white leading-tight mb-3">
            {article.title}
          </h3>
          <p className="text-white/70 text-sm font-body line-clamp-2 leading-relaxed mb-4">{article.excerpt}</p>
          <div className="flex items-center gap-4 text-white/60 text-xs font-body">
            <span className="flex items-center gap-1.5"><User size={12} /> {article.author}</span>
            <span className="flex items-center gap-1.5"><CalendarDays size={12} /> {formatDate(article.publishedAt)}</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/articles/${article.slug}`} className="group block">
      <div className="aspect-[4/3] overflow-hidden mb-4">
        <img src={imgUrl} alt={article.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
      </div>
      {article.category && (
        <span className="text-xs font-body font-medium tracking-widest uppercase text-amber-700 dark:text-amber-500">
          {article.category.title}
        </span>
      )}
      <h3 className="font-display text-xl font-bold text-stone-900 dark:text-stone-100 mt-1.5 mb-2 leading-snug group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors line-clamp-2">
        {article.title}
      </h3>
      <p className="text-stone-600 dark:text-stone-400 text-sm font-body line-clamp-3 leading-relaxed mb-3">
        {article.excerpt}
      </p>
      <div className="flex items-center gap-4 text-stone-400 dark:text-stone-500 text-xs font-body">
        <span className="flex items-center gap-1.5"><User size={12} /> {article.author}</span>
        <span className="flex items-center gap-1.5"><CalendarDays size={12} /> {formatDate(article.publishedAt)}</span>
      </div>
      <span className="inline-flex items-center gap-1.5 text-amber-700 dark:text-amber-500 text-sm font-body font-medium mt-4 group-hover:gap-3 transition-all duration-300">
        Read article <ArrowRight size={14} />
      </span>
    </Link>
  );
}
