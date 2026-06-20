import type {
  BlogListResponse,
  BlogPostResponse,
  AdminBlogListResponse,
  BlogPostPayload,
  LoginResponse,
} from './types';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

// ── Helper ────────────────────────────────────────────────────────────────────
async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const fetchOptions: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers || {}),
    },
  };

  const res = await fetch(`${API_BASE}${endpoint}`, fetchOptions);

  let data: any = null;
  const contentType = res.headers.get('content-type');
  
  if (contentType && contentType.includes('application/json')) {
    try {
      data = await res.json();
    } catch (e) {
      data = null;
    }
  }

  if (!res.ok) {
    throw new Error(data?.error || `Request failed: Backend server might be down (Status ${res.status})`);
  }

  return data as T;
}

function authHeaders(token: string): HeadersInit {
  return { Authorization: `Bearer ${token}` };
}

// ── AUTH ──────────────────────────────────────────────────────────────────────
export async function adminLogin(
  email: string,
  password: string
): Promise<LoginResponse> {
  return apiFetch<LoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

// ── PUBLIC ────────────────────────────────────────────────────────────────────
export async function fetchPublishedPosts(
  page = 1,
  limit = 9
): Promise<BlogListResponse> {
  return apiFetch<BlogListResponse>(`/blog?page=${page}&limit=${limit}`);
}

export async function fetchPost(slug: string): Promise<BlogPostResponse> {
  return apiFetch<BlogPostResponse>(`/blog/${slug}`);
}

// ── ADMIN ─────────────────────────────────────────────────────────────────────
export async function fetchAllPosts(
  token: string
): Promise<AdminBlogListResponse> {
  return apiFetch<AdminBlogListResponse>('/blog/admin/all', {
    headers: authHeaders(token),
  });
}

export async function fetchPostById(
  id: string,
  token: string
): Promise<BlogPostResponse> {
  return apiFetch<BlogPostResponse>(`/blog/admin/id/${id}`, {
    headers: authHeaders(token),
  });
}

export async function createPost(
  data: BlogPostPayload,
  token: string
): Promise<BlogPostResponse> {
  return apiFetch<BlogPostResponse>('/blog', {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify(data),
  });
}

export async function updatePost(
  id: string,
  data: Partial<BlogPostPayload>,
  token: string
): Promise<BlogPostResponse> {
  return apiFetch<BlogPostResponse>(`/blog/${id}`, {
    method: 'PUT',
    headers: authHeaders(token),
    body: JSON.stringify(data),
  });
}

export async function deletePost(
  id: string,
  token: string
): Promise<{ message: string }> {
  return apiFetch<{ message: string }>(`/blog/${id}`, {
    method: 'DELETE',
    headers: authHeaders(token),
  });
}

export async function togglePublish(
  id: string,
  published: boolean,
  token: string
): Promise<BlogPostResponse> {
  return apiFetch<BlogPostResponse>(`/blog/${id}/publish`, {
    method: 'PATCH',
    headers: authHeaders(token),
    body: JSON.stringify({ published }),
  });
}
