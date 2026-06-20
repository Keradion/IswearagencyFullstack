import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Clock, Loader2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { fetchPost } from '../api/blog';
import type { BlogPostResponse } from '../api/types';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadPost() {
      if (!slug) return;
      try {
        setIsLoading(true);
        const data = await fetchPost(slug);
        setPost(data);
        // Scroll to top when page loads
        window.scrollTo(0, 0);
      } catch (err) {
        setError('Blog post not found or an error occurred.');
      } finally {
        setIsLoading(false);
      }
    }
    loadPost();
  }, [slug]);

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });

  // Calculate estimated read time (rough estimate: 200 words per minute)
  const getReadTime = (content: string) => {
    const words = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min read`;
  };

  const coverImage = post?.post.coverImage || '/gallery/media__1780938361623.jpg';

  if (isLoading) {
    return (
      <div className="min-h-screen bg-brand-sand flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="flex flex-col items-center gap-4 text-brand-primary">
            <Loader2 size={40} className="animate-spin" />
            <p className="font-medium text-lg text-brand-slate">Loading post...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-brand-sand flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-4xl font-serif font-bold text-brand-primary mb-4">Oops!</h1>
            <p className="text-lg text-brand-gray mb-8">{error}</p>
            <Link
              to="/#blog"
              className="inline-flex items-center gap-2 bg-brand-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-brand-primary-dark transition-colors"
            >
              <ArrowLeft size={18} /> Back to Home
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const { title, content, author, tags, publishedAt, createdAt } = post.post;

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-24 md:pt-32 pb-24">
        <article className="max-w-[800px] mx-auto px-4 md:px-8">
          
          {/* Back button */}
          <Link
            to="/#blog"
            className="inline-flex items-center gap-2 text-brand-gray hover:text-brand-primary transition-colors font-medium mb-8"
          >
            <ArrowLeft size={16} /> Back to all posts
          </Link>

          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-brand-secondary/10 text-brand-secondary text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-brand-primary leading-tight mb-8">
            {title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-brand-gray mb-12 border-b border-gray-100 pb-8">
            <div className="flex items-center gap-2">
              <User size={18} className="text-brand-primary" />
              <span className="font-medium text-brand-slate">{author || 'I Swear Agency'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-brand-primary" />
              <span>{formatDate(publishedAt || createdAt)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={18} className="text-brand-primary" />
              <span>{getReadTime(content)}</span>
            </div>
          </div>

          {/* Cover Image */}
          <div className="rounded-3xl overflow-hidden mb-12 shadow-lg">
            <img
              src={coverImage}
              alt={title}
              className="w-full h-auto max-h-[500px] object-cover"
            />
          </div>

          {/* Post Content */}
          <div className="prose prose-lg prose-slate max-w-none">
            {/* Split content by line breaks to render paragraphs properly */}
            {content.split('\n').map((paragraph, idx) => {
              if (!paragraph.trim()) return <br key={idx} />;
              return (
                <p key={idx} className="text-brand-slate leading-relaxed mb-6">
                  {paragraph}
                </p>
              );
            })}
          </div>

        </article>
      </main>

      <Footer />
    </div>
  );
}
