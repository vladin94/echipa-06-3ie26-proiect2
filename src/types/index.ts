export interface StrapiImageFormat {
  url: string;
  width: number;
  height: number;
  name: string;
  size: number;
}

export interface StrapiImage {
  id: number;
  documentId?: string;
  name: string;
  alternativeText?: string;
  caption?: string;
  width: number;
  height: number;
  formats?: {
    large?: StrapiImageFormat;
    medium?: StrapiImageFormat;
    small?: StrapiImageFormat;
    thumbnail?: StrapiImageFormat;
  };
  url: string;
  mime: string;
  size: number;
  provider: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  description: string;
  cover?: StrapiImage;
  articles?: Article[];
  createdAt: string;
  updatedAt: string;
}

export type ArticleLayout = 'editorial' | 'split' | 'gallery' | 'feature';

export interface Article {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover?: StrapiImage;
  gallery?: StrapiImage[];
  category?: Category;
  author: string;
  layoutVariant?: ArticleLayout;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface TeamMember {
  id?: number;
  name: string;
  role: string;
  bio: string;
  image?: StrapiImage;
}

export interface About {
  id: number;
  documentId: string;
  title: string;
  intro: string;
  teamMembers?: TeamMember[];
  images?: StrapiImage[];
  createdAt: string;
  updatedAt: string;
}

export interface ContactDetails {
  email?: string;
  phone?: string;
  address?: string;
}

export interface Page {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  heroText?: string;
  content?: string;
  cover?: StrapiImage;
  contactDetails?: ContactDetails;
  createdAt: string;
  updatedAt: string;
}

export interface StrapiListResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiSingleResponse<T> {
  data: T;
  meta: Record<string, unknown>;
}
