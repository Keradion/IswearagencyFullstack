// ── Blog Post ────────────────────────────────────────────────────────────────
export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  tags: string[];
  published: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

// For list views (content excluded)
export type BlogPostSummary = Omit<BlogPost, 'content'>;

// ── Create / Update payloads ─────────────────────────────────────────────────
export interface BlogPostPayload {
  title: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  author?: string;
  tags?: string[];
  published?: boolean;
}

// ── Pagination ────────────────────────────────────────────────────────────────
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

// ── API responses ─────────────────────────────────────────────────────────────
export interface BlogListResponse {
  posts: BlogPostSummary[];
  pagination: PaginationMeta;
}

export interface BlogPostResponse {
  post: BlogPost;
}

export interface AdminBlogListResponse {
  posts: BlogPostSummary[];
}

// ── Auth ──────────────────────────────────────────────────────────────────────
export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'editor';
}

export interface LoginResponse {
  message: string;
  token: string;
  user: AdminUser;
}
