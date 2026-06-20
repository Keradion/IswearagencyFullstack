import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PenSquare,
  Trash2,
  Plus,
  LogOut,
  Eye,
  EyeOff,
  Search,
  Calendar,
  Tag,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  FileText,
} from 'lucide-react';
import {
  fetchAllPosts,
  createPost,
  updatePost,
  deletePost,
  togglePublish,
  fetchPostById,
} from '../api/blog';
import type { BlogPost, BlogPostPayload, BlogPostSummary } from '../api/types';
import { useAuth } from '../context/AuthContext';
import PostEditor from '../components/admin/PostEditor';

type ToastType = 'success' | 'error';

interface Toast {
  id: number;
  type: ToastType;
  message: string;
}

export default function AdminDashboard() {
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();

  const [posts, setPosts] = useState<BlogPostSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft'>('all');

  // Editor state
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Delete confirmation state
  const [deleteTarget, setDeleteTarget] = useState<BlogPostSummary | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Toast notifications
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((type: ToastType, message: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  // ── Load posts ─────────────────────────────────────────────────────────────
  const loadPosts = useCallback(async () => {
    if (!token) return;
    setIsLoading(true);
    try {
      const res = await fetchAllPosts(token);
      setPosts(res.posts);
    } catch (err) {
      showToast('error', err instanceof Error ? err.message : 'Failed to load posts');
    } finally {
      setIsLoading(false);
    }
  }, [token, showToast]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleCreateNew = () => {
    setEditingPost(null);
    setEditorOpen(true);
  };

  const handleEdit = async (post: BlogPostSummary) => {
    if (!token) return;
    try {
      const res = await fetchPostById(post._id, token);
      setEditingPost(res.post);
      setEditorOpen(true);
    } catch (err) {
      showToast('error', err instanceof Error ? err.message : 'Failed to load post');
    }
  };

  const handleSave = async (data: BlogPostPayload) => {
    if (!token) return;
    setIsSaving(true);
    try {
      if (editingPost) {
        await updatePost(editingPost._id, data, token);
        showToast('success', 'Post updated successfully!');
      } else {
        await createPost(data, token);
        showToast('success', 'Post created successfully!');
      }
      setEditorOpen(false);
      setEditingPost(null);
      await loadPosts();
    } finally {
      setIsSaving(false);
    }
  };

  const handleTogglePublish = async (post: BlogPostSummary) => {
    if (!token) return;
    try {
      await togglePublish(post._id, !post.published, token);
      showToast('success', `Post ${!post.published ? 'published' : 'unpublished'}!`);
      await loadPosts();
    } catch (err) {
      showToast('error', err instanceof Error ? err.message : 'Failed to update');
    }
  };

  const handleDelete = async () => {
    if (!token || !deleteTarget) return;
    setIsDeleting(true);
    try {
      await deletePost(deleteTarget._id, token);
      showToast('success', 'Post deleted successfully!');
      setDeleteTarget(null);
      await loadPosts();
    } catch (err) {
      showToast('error', err instanceof Error ? err.message : 'Failed to delete');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login', { replace: true });
  };

  // ── Filtered posts ─────────────────────────────────────────────────────────
  const filteredPosts = posts.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterStatus === 'all' ||
      (filterStatus === 'published' && p.published) ||
      (filterStatus === 'draft' && !p.published);
    return matchesSearch && matchesFilter;
  });

  const publishedCount = posts.filter((p) => p.published).length;
  const draftCount = posts.filter((p) => !p.published).length;

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Toasts ── */}
      <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg text-sm font-medium animate-fade-in-up ${
              toast.type === 'success'
                ? 'bg-green-600 text-white'
                : 'bg-red-600 text-white'
            }`}
          >
            {toast.type === 'success' ? (
              <CheckCircle size={16} />
            ) : (
              <AlertTriangle size={16} />
            )}
            {toast.message}
          </div>
        ))}
      </div>

      {/* ── Top Navbar ── */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/" className="flex items-center gap-2">
              <img src="/logo.jpg" alt="Logo" className="w-8 h-8 object-contain rounded" />
            </a>
            <div className="h-5 w-px bg-gray-200" />
            <div>
              <h1 className="text-sm font-bold text-brand-slate">Blog Admin</h1>
              <p className="text-xs text-brand-gray">I Swear Agency</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-brand-gray hidden sm:block">
              Welcome, <span className="font-semibold text-brand-slate">{user?.name}</span>
            </span>
            <button
              id="admin-logout-btn"
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-brand-gray hover:text-brand-primary hover:bg-red-50 rounded-xl transition-all"
            >
              <LogOut size={15} /> Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* ── Stats cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: 'Total Posts', value: posts.length, icon: FileText, color: 'text-brand-primary bg-brand-primary/10' },
            { label: 'Published', value: publishedCount, icon: Eye, color: 'text-green-600 bg-green-50' },
            { label: 'Drafts', value: draftCount, icon: EyeOff, color: 'text-yellow-600 bg-yellow-50' },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${color}`}>
                <Icon size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold text-brand-slate">{value}</p>
                <p className="text-xs text-brand-gray font-medium">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Toolbar ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="flex items-center gap-3 flex-1 w-full sm:w-auto">
            {/* Search */}
            <div className="relative flex-1 max-w-sm">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-gray" />
              <input
                id="admin-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search posts…"
                className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm text-brand-slate placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary transition-all"
              />
            </div>

            {/* Filter */}
            <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
              {(['all', 'published', 'draft'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilterStatus(f)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all capitalize ${
                    filterStatus === f
                      ? 'bg-white text-brand-primary shadow-sm'
                      : 'text-brand-gray hover:text-brand-slate'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadPosts}
              className="p-2.5 border border-gray-200 rounded-xl text-brand-gray hover:text-brand-primary hover:border-brand-primary transition-all"
              title="Refresh"
            >
              <RefreshCw size={15} />
            </button>
            <button
              id="create-post-btn"
              onClick={handleCreateNew}
              className="flex items-center gap-2 px-5 py-2.5 bg-brand-primary hover:bg-brand-primary-dark text-white rounded-xl text-sm font-bold transition-all shadow-md shadow-brand-primary/30"
            >
              <Plus size={16} /> New Post
            </button>
          </div>
        </div>

        {/* ── Posts table ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <div className="w-10 h-10 border-4 border-brand-primary/20 border-t-brand-primary rounded-full animate-spin" />
              <p className="text-brand-gray text-sm">Loading posts…</p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
              <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center">
                <FileText size={28} className="text-gray-400" />
              </div>
              <div>
                <p className="text-brand-slate font-semibold">
                  {searchQuery ? 'No posts match your search' : 'No posts yet'}
                </p>
                <p className="text-brand-gray text-sm mt-1">
                  {searchQuery
                    ? 'Try a different search term'
                    : 'Click "New Post" to create your first blog post'}
                </p>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {/* Table header */}
              <div className="hidden md:grid grid-cols-[1fr_200px_120px_80px_100px] gap-4 px-6 py-3 bg-gray-50">
                {['Post', 'Tags', 'Date', 'Status', 'Actions'].map((h) => (
                  <span key={h} className="text-xs font-bold text-brand-gray uppercase tracking-wider">
                    {h}
                  </span>
                ))}
              </div>

              {filteredPosts.map((post) => (
                <div
                  key={post._id}
                  className="grid grid-cols-1 md:grid-cols-[1fr_200px_120px_80px_100px] gap-4 px-6 py-4 items-center hover:bg-gray-50 transition-colors group"
                >
                  {/* Post info */}
                  <div className="flex items-start gap-3">
                    {post.coverImage ? (
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-14 h-10 rounded-lg object-cover shrink-0 border border-gray-100"
                      />
                    ) : (
                      <div className="w-14 h-10 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                        <FileText size={16} className="text-gray-400" />
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="font-semibold text-brand-slate text-sm truncate">{post.title}</p>
                      <p className="text-xs text-brand-gray line-clamp-1 mt-0.5">{post.excerpt}</p>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 bg-brand-primary/10 text-brand-primary text-[10px] font-semibold px-2 py-0.5 rounded-full"
                      >
                        <Tag size={9} />
                        {tag}
                      </span>
                    ))}
                    {post.tags.length > 3 && (
                      <span className="text-[10px] text-brand-gray">+{post.tags.length - 3}</span>
                    )}
                  </div>

                  {/* Date */}
                  <div className="flex items-center gap-1.5 text-xs text-brand-gray">
                    <Calendar size={12} />
                    {formatDate(post.createdAt)}
                  </div>

                  {/* Status toggle */}
                  <div>
                    <button
                      onClick={() => handleTogglePublish(post)}
                      title={post.published ? 'Click to unpublish' : 'Click to publish'}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold transition-all ${
                        post.published
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                      }`}
                    >
                      {post.published ? (
                        <><Eye size={10} /> Live</>
                      ) : (
                        <><EyeOff size={10} /> Draft</>
                      )}
                    </button>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleEdit(post)}
                      title="Edit post"
                      className="p-2 rounded-lg text-brand-gray hover:text-brand-primary hover:bg-brand-primary/10 transition-all"
                    >
                      <PenSquare size={15} />
                    </button>
                    <button
                      onClick={() => setDeleteTarget(post)}
                      title="Delete post"
                      className="p-2 rounded-lg text-brand-gray hover:text-red-600 hover:bg-red-50 transition-all"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* ── Post Editor Slide-over ── */}
      {editorOpen && (
        <PostEditor
          post={editingPost}
          onSave={handleSave}
          onClose={() => { setEditorOpen(false); setEditingPost(null); }}
          isSaving={isSaving}
        />
      )}

      {/* ── Delete Confirmation Modal ── */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setDeleteTarget(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full">
            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-red-100 mx-auto mb-4">
              <Trash2 size={22} className="text-red-600" />
            </div>
            <h3 className="text-lg font-bold text-brand-slate text-center">Delete Post?</h3>
            <p className="text-brand-gray text-sm text-center mt-2">
              Are you sure you want to delete{' '}
              <span className="font-semibold text-brand-slate">"{deleteTarget.title}"</span>?
              This action cannot be undone.
            </p>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 py-2.5 border border-gray-200 rounded-xl text-brand-gray hover:text-brand-slate font-semibold text-sm transition-all"
              >
                Cancel
              </button>
              <button
                id="confirm-delete-btn"
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-sm transition-all disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {isDeleting ? (
                  <div className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin" />
                ) : (
                  'Delete'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
