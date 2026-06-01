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
  ? rawUrl.replace(/\/admin\/?$/, '').replace(/\/api\/?$/, '') + '/api'
  : 'http://localhost:1337/api';

const TOKEN = import.meta.env.VITE_STRAPI_TOKEN as string | undefined;

async function get<T>(path: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(`${API_BASE}${path}`);
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  }
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (TOKEN) headers['Authorization'] = `Bearer ${TOKEN}`;

  const res = await fetch(url.toString(), { headers });
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
      'filters[$or][0][name][$containsi]': query,
      'filters[$or][1][title][$containsi]': query,
      'populate[cover]': '*',
      'pagination[pageSize]': '5',
    });
  },
};

export function getStrapiImageUrl(img?: { url?: string } | null): string {
  if (!img?.url) return '';
  if (img.url.startsWith('http')) return img.url;
  const base = rawUrl
    ? rawUrl.replace(/\/admin\/?$/, '').replace(/\/api\/?$/, '')
    : 'http://localhost:1337';
  return `${base}${img.url}`;
}
