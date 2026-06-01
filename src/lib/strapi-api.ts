import {
  Category,
  Article,
  About,
  Page,
  StrapiListResponse,
  StrapiSingleResponse,
} from '../types';

const rawUrl = import.meta.env.VITE_STRAPI_URL as string | undefined;
const API_BASE = rawUrl
  ? rawUrl.replace(/\/admin\/?$/, '/api')
  : 'http://localhost:1337/api';

async function get<T>(path: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(`${API_BASE}${path}`);
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  }
  const res = await fetch(url.toString());
  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText);
    throw new Error(`Strapi ${res.status}: ${text}`);
  }
  return res.json();
}

export const api = {
  getCategories() {
    return get<StrapiListResponse<Category>>('/categories', {
      'populate[cover]': '*',
      'sort': 'createdAt:asc',
    });
  },

  getCategoryBySlug(slug: string) {
    return get<StrapiListResponse<Category>>('/categories', {
      'filters[slug][$eq]': slug,
      'populate[cover]': '*',
      'populate[articles][populate][cover]': '*',
      'populate[articles][populate][category]': '*',
    });
  },

  getArticles(page = 1, pageSize = 12) {
    return get<StrapiListResponse<Article>>('/articles', {
      'populate[cover]': '*',
      'populate[category]': '*',
      'sort': 'publishedAt:desc',
      'pagination[page]': String(page),
      'pagination[pageSize]': String(pageSize),
    });
  },

  getFeaturedArticles(limit = 6) {
    return get<StrapiListResponse<Article>>('/articles', {
      'populate[cover]': '*',
      'populate[category]': '*',
      'sort': 'publishedAt:desc',
      'pagination[pageSize]': String(limit),
    });
  },

  getArticleBySlug(slug: string) {
    return get<StrapiListResponse<Article>>('/articles', {
      'filters[slug][$eq]': slug,
      'populate[cover]': '*',
      'populate[gallery]': '*',
      'populate[category][populate][cover]': '*',
    });
  },

  getRelatedArticles(categoryId: number, excludeSlug: string, limit = 3) {
    return get<StrapiListResponse<Article>>('/articles', {
      'filters[category][id][$eq]': String(categoryId),
      'filters[slug][$ne]': excludeSlug,
      'populate[cover]': '*',
      'populate[category]': '*',
      'sort': 'publishedAt:desc',
      'pagination[pageSize]': String(limit),
    });
  },

  getAbout() {
    return get<StrapiSingleResponse<About>>('/about', {
      'populate[teamMembers][populate][image]': '*',
      'populate[images]': '*',
    });
  },

  getContactPage() {
    return get<StrapiListResponse<Page>>('/pages', {
      'filters[slug][$eq]': 'contact',
      'populate[cover]': '*',
    });
  },

  searchArticles(query: string) {
    return get<StrapiListResponse<Article>>('/articles', {
      'filters[$or][0][title][$containsi]': query,
      'filters[$or][1][excerpt][$containsi]': query,
      'populate[cover]': '*',
      'populate[category]': '*',
      'pagination[pageSize]': '8',
    });
  },

  searchCategories(query: string) {
    return get<StrapiListResponse<Category>>('/categories', {
      'filters[title][$containsi]': query,
      'populate[cover]': '*',
      'pagination[pageSize]': '5',
    });
  },
};

export function getStrapiImageUrl(img?: { url?: string } | null, format?: 'thumbnail' | 'small' | 'medium' | 'large'): string {
  if (!img?.url) return '';
  const raw = rawUrl ? rawUrl.replace(/\/admin\/?$/, '') : 'http://localhost:1337';
  const base = raw.replace(/\/api\/?$/, '');
  if (format && (img as { formats?: Record<string, { url: string }> }).formats?.[format]?.url) {
    const f = (img as { formats?: Record<string, { url: string }> }).formats![format]!;
    return f.url.startsWith('http') ? f.url : `${base}${f.url}`;
  }
  return img.url.startsWith('http') ? img.url : `${base}${img.url}`;
}
