import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Loader2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { fetchPublishedPosts } from '../api/blog';
import type { BlogPostSummary } from '../api/types';

export default function BlogSection() {
  const { t } = useLanguage();
  const [posts, setPosts] = useState<BlogPostSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const res = await fetchPublishedPosts(1, 3);
        setPosts(res.posts);
      } catch {
        setError('Unable to load blog posts at this time.');
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

  // Fallback image if no cover image is set
  const getImage = (post: BlogPostSummary, idx: number) => {
    if (post.coverImage) return post.coverImage;
    const fallbacks = [
      '/gallery/media__1780938361623.jpg',
      '/gallery/media__1780938370864.jpg',
      '/gallery/media__1780938366520.jpg',
    ];
    return fallbacks[idx % fallbacks.length];
  };

  return (
    <section id="blog" className="py-24 bg-white">
      <div className="max-w-[1920px] mx-auto px-4 md:px-8 xl:px-16">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-brand-primary font-bold text-[12px] uppercase tracking-widest mb-4">
              <span className="w-8 h-[2px] bg-brand-secondary"></span>
              <span>{t.navBlog}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-primary">
              {t.blogTitle}
            </h2>
          </div>
          <p className="text-brand-gray text-lg pb-2">
            {t.blogSubtitle}
          </p>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="flex items-center justify-center py-20 gap-3 text-brand-gray">
            <Loader2 size={20} className="animate-spin" />
            <span className="text-sm font-medium">Loading posts…</span>
          </div>
        )}

        {/* Error state */}
        {!isLoading && error && (
          <div className="text-center py-12 text-brand-gray">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !error && posts.length === 0 && (
          <div className="text-center py-16 text-brand-gray">
            <p className="text-lg font-medium">No blog posts published yet.</p>
            <p className="text-sm mt-2">Check back soon for updates!</p>
          </div>
        )}

        {/* Posts grid */}
        {!isLoading && posts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map((post, idx) => (
              <Link key={post._id} to={`/blog/${post.slug}`} className="group cursor-pointer block">
                <div className="overflow-hidden rounded-2xl mb-6 relative">
                  <img
                    src={getImage(post, idx)}
                    alt={post.title}
                    className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2">
                    <Calendar size={14} className="text-brand-primary" />
                    <span className="text-xs font-bold text-brand-slate">
                      {formatDate(post.publishedAt || post.createdAt)}
                    </span>
                  </div>
                  {/* Tags */}
                  {post.tags.length > 0 && (
                    <div className="absolute bottom-4 left-4 flex gap-1">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="bg-brand-primary/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-bold text-brand-slate mb-3 group-hover:text-brand-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-brand-gray mb-4 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center gap-2 text-brand-secondary font-bold text-sm uppercase tracking-wider group-hover:gap-4 transition-all">
                  {t.readMore} <ArrowRight size={16} />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
