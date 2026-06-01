import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { CalendarDays, User } from 'lucide-react';
import { Article } from '../types';
import { getStrapiImageUrl } from '../lib/strapi-api';
import { getCategoryName } from '../types';

const ARTICLE_IMAGES: Record<string, string> = {
  'kinkakuji-golden-temple': 'https://images.pexels.com/photos/3408354/pexels-photo-3408354.jpeg?auto=compress&cs=tinysrgb&w=800',
  'kaiseki-ryori-living-art': 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800',
  'ryoanji-garden-of-silence': 'https://images.pexels.com/photos/1823680/pexels-photo-1823680.jpeg?auto=compress&cs=tinysrgb&w=800',
  'nishijin-textile-weaving': 'https://images.pexels.com/photos/1532771/pexels-photo-1532771.jpeg?auto=compress&cs=tinysrgb&w=800',
  'gion-higashiyama-at-dusk': 'https://images.pexels.com/photos/402028/pexels-photo-402028.jpeg?auto=compress&cs=tinysrgb&w=800',
  'gion-matsuri-festival': 'https://images.pexels.com/photos/1440476/pexels-photo-1440476.jpeg?auto=compress&cs=tinysrgb&w=800',
};
const FALLBACK_IMG = 'https://images.pexels.com/photos/2187605/pexels-photo-2187605.jpeg?auto=compress&cs=tinysrgb&w=800';

function formatDate(d: string) {
  if (!d) return '';
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

interface Props {
  article: Article;
  variant?: 'default' | 'horizontal' | 'featured';
}

export default function ArticleCard({ article, variant = 'default' }: Props) {
  const imgUrl = getStrapiImageUrl(article.cover) || ARTICLE_IMAGES[article.slug] || FALLBACK_IMG;
  const catName = article.category ? getCategoryName(article.category) : '';

  if (variant === 'horizontal') {
    return (
      <Link to={`/articles/${article.slug}`} className="group flex gap-5 items-start">
        <div className="w-28 h-20 shrink-0 overflow-hidden">
          <img src={imgUrl} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
        <div className="flex-1 min-w-0">
          {catName && (
            <span className="text-xs font-body font-medium tracking-widest uppercase" style={{ color: 'var(--color-primary)' }}>
              {catName}
            </span>
          )}
          <h4 className="font-display text-base font-bold mt-0.5 line-clamp-2 leading-snug transition-colors" style={{ color: 'var(--color-text)' }}>
            {article.title}
          </h4>
          <p className="text-xs font-body mt-1" style={{ color: 'var(--color-muted)' }}>{formatDate(article.publishedAt)}</p>
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
          {catName && (
            <span className="inline-block font-body text-xs font-medium tracking-widest uppercase mb-2" style={{ color: '#fdacc4' }}>
              {catName}
            </span>
          )}
          <h3 className="font-display text-2xl md:text-3xl font-bold text-white leading-tight mb-3">
            {article.title}
          </h3>
          {article.excerpt && (
            <p className="text-white/70 text-sm font-body line-clamp-2 leading-relaxed mb-4">{article.excerpt}</p>
          )}
          <div className="flex items-center gap-4 text-white/60 text-xs font-body">
            {article.author && <span className="flex items-center gap-1.5"><User size={12} /> {article.author}</span>}
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
      {catName && (
        <span className="text-xs font-body font-medium tracking-widest uppercase" style={{ color: 'var(--color-primary)' }}>
          {catName}
        </span>
      )}
      <h3 className="font-display text-xl font-bold mt-1.5 mb-2 leading-snug line-clamp-2 transition-colors" style={{ color: 'var(--color-text)' }}>
        {article.title}
      </h3>
      {article.excerpt && (
        <p className="text-sm font-body line-clamp-3 leading-relaxed mb-3" style={{ color: 'var(--color-muted)' }}>
          {article.excerpt}
        </p>
      )}
      <div className="flex items-center gap-4 text-xs font-body" style={{ color: 'var(--color-muted)' }}>
        {article.author && <span className="flex items-center gap-1.5"><User size={12} /> {article.author}</span>}
        <span className="flex items-center gap-1.5"><CalendarDays size={12} /> {formatDate(article.publishedAt)}</span>
      </div>
      <span className="inline-flex items-center gap-1.5 text-sm font-body font-medium mt-4 group-hover:gap-3 transition-all duration-300" style={{ color: 'var(--color-primary)' }}>
        Read article <ArrowRight size={14} />
      </span>
    </Link>
  );
}
