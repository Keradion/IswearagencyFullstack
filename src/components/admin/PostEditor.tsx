import { useState, useEffect, type FormEvent } from 'react';
import { X, Save, Eye, EyeOff, Tag, Image as ImageIcon, User, FileText, AlignLeft } from 'lucide-react';
import type { BlogPost, BlogPostPayload } from '../../api/types';

interface PostEditorProps {
  post?: BlogPost | null;          // null/undefined = create mode
  onSave: (data: BlogPostPayload) => Promise<void>;
  onClose: () => void;
  isSaving: boolean;
}

const EMPTY_FORM: BlogPostPayload = {
  title: '',
  excerpt: '',
  content: '',
  coverImage: '',
  author: 'I Swear Agency',
  tags: [],
  published: false,
};

export default function PostEditor({ post, onSave, onClose, isSaving }: PostEditorProps) {
  const isEdit = Boolean(post);
  const [form, setForm] = useState<BlogPostPayload>(EMPTY_FORM);
  const [tagInput, setTagInput] = useState('');
  const [error, setError] = useState('');
  const [previewImage, setPreviewImage] = useState(false);

  // Populate form when editing
  useEffect(() => {
    if (post) {
      setForm({
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        coverImage: post.coverImage || '',
        author: post.author,
        tags: post.tags || [],
        published: post.published,
      });
    } else {
      setForm(EMPTY_FORM);
    }
    setError('');
  }, [post]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox'
        ? (e.target as HTMLInputElement).checked
        : value,
    }));
  };

  const addTag = () => {
    const tag = tagInput.trim().toLowerCase();
    if (tag && !form.tags?.includes(tag)) {
      setForm((prev) => ({ ...prev, tags: [...(prev.tags || []), tag] }));
    }
    setTagInput('');
  };

  const removeTag = (tag: string) => {
    setForm((prev) => ({ ...prev, tags: prev.tags?.filter((t) => t !== tag) }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!form.title.trim()) return setError('Title is required');
    if (!form.excerpt.trim()) return setError('Excerpt is required');
    if (!form.content.trim()) return setError('Content is required');

    try {
      await onSave(form);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save post');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Slide-over panel */}
      <div className="relative z-10 w-full max-w-2xl h-full bg-white shadow-2xl flex flex-col overflow-hidden animate-slide-in">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-brand-primary to-brand-primary-light">
          <div>
            <h2 className="text-lg font-bold text-white">
              {isEdit ? 'Edit Post' : 'Create New Post'}
            </h2>
            <p className="text-white/70 text-xs mt-0.5">
              {isEdit ? `Editing: ${post?.title}` : 'Fill in the details below'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/20 transition-all"
            aria-label="Close editor"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable form body */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto px-6 py-6 space-y-5"
        >
          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
              {error}
            </div>
          )}

          {/* Title */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-2 text-sm font-semibold text-brand-slate">
              <FileText size={14} /> Title <span className="text-red-500">*</span>
            </label>
            <input
              id="post-title"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter post title…"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-brand-slate placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary transition-all text-sm"
            />
          </div>

          {/* Excerpt */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-2 text-sm font-semibold text-brand-slate">
              <AlignLeft size={14} /> Excerpt <span className="text-red-500">*</span>
            </label>
            <textarea
              id="post-excerpt"
              name="excerpt"
              value={form.excerpt}
              onChange={handleChange}
              rows={3}
              placeholder="Short summary shown in the blog listing…"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-brand-slate placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary transition-all text-sm resize-none"
            />
            <p className="text-xs text-brand-gray">{form.excerpt.length}/500 characters</p>
          </div>

          {/* Content */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-2 text-sm font-semibold text-brand-slate">
              <FileText size={14} /> Content <span className="text-red-500">*</span>
            </label>
            <textarea
              id="post-content"
              name="content"
              value={form.content}
              onChange={handleChange}
              rows={12}
              placeholder="Write the full blog post content here…"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-brand-slate placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary transition-all text-sm resize-y font-mono text-xs leading-relaxed"
            />
          </div>

          {/* Cover Image URL */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-2 text-sm font-semibold text-brand-slate">
              <ImageIcon size={14} /> Cover Image URL
            </label>
            <div className="flex gap-2">
              <input
                id="post-cover-image"
                name="coverImage"
                value={form.coverImage}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-brand-slate placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary transition-all text-sm"
              />
              {form.coverImage && (
                <button
                  type="button"
                  onClick={() => setPreviewImage(!previewImage)}
                  className="px-3 py-2 border border-gray-200 rounded-xl text-brand-gray hover:text-brand-primary hover:border-brand-primary transition-all"
                  title="Preview image"
                >
                  {previewImage ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              )}
            </div>
            {previewImage && form.coverImage && (
              <img
                src={form.coverImage}
                alt="Cover preview"
                className="w-full h-40 object-cover rounded-xl border border-gray-200 mt-2"
                onError={() => setPreviewImage(false)}
              />
            )}
          </div>

          {/* Author */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-2 text-sm font-semibold text-brand-slate">
              <User size={14} /> Author
            </label>
            <input
              id="post-author"
              name="author"
              value={form.author}
              onChange={handleChange}
              placeholder="I Swear Agency"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-brand-slate placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary transition-all text-sm"
            />
          </div>

          {/* Tags */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-2 text-sm font-semibold text-brand-slate">
              <Tag size={14} /> Tags
            </label>
            <div className="flex gap-2">
              <input
                id="post-tag-input"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') { e.preventDefault(); addTag(); }
                }}
                placeholder="Add a tag and press Enter…"
                className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-brand-slate placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary transition-all text-sm"
              />
              <button
                type="button"
                onClick={addTag}
                className="px-4 py-3 bg-gray-100 hover:bg-brand-primary hover:text-white text-brand-slate rounded-xl transition-all text-sm font-medium"
              >
                Add
              </button>
            </div>
            {(form.tags?.length ?? 0) > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {form.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 bg-brand-primary/10 text-brand-primary text-xs font-semibold px-3 py-1.5 rounded-full"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="hover:text-red-500 transition-colors"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Publish toggle */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
            <div>
              <p className="text-sm font-semibold text-brand-slate">
                {form.published ? '🟢 Published' : '🟡 Draft'}
              </p>
              <p className="text-xs text-brand-gray mt-0.5">
                {form.published
                  ? 'This post is visible to the public'
                  : 'This post is saved as a draft'}
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="published"
                checked={form.published}
                onChange={handleChange}
                className="sr-only peer"
                id="post-published"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:ring-2 peer-focus:ring-brand-primary/30 rounded-full peer peer-checked:bg-brand-primary transition-all after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5" />
            </label>
          </div>
        </form>

        {/* Footer actions */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-3 bg-gray-50">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 border border-gray-200 rounded-xl text-brand-gray hover:text-brand-slate hover:border-gray-300 transition-all text-sm font-semibold"
          >
            Cancel
          </button>
          <button
            id="post-save-btn"
            type="submit"
            form=""
            onClick={handleSubmit as unknown as React.MouseEventHandler}
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-2.5 bg-brand-primary hover:bg-brand-primary-dark text-white rounded-xl transition-all text-sm font-bold disabled:opacity-60 disabled:cursor-not-allowed shadow-md shadow-brand-primary/30"
          >
            {isSaving ? (
              <>
                <div className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin" />
                Saving…
              </>
            ) : (
              <>
                <Save size={16} />
                {isEdit ? 'Update Post' : 'Create Post'}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
