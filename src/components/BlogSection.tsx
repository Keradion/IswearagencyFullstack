import { ArrowRight, Calendar } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function BlogSection() {
  const { t } = useLanguage();

  const posts = [
    {
      title: 'Preparing for Work in the Gulf: A Complete Guide',
      date: 'Oct 15, 2023',
      image: '/gallery/media__1780938361623.jpg',
      excerpt: 'Everything you need to know about documentation, training, and what to expect when moving to Saudi Arabia or Kuwait.'
    },
    {
      title: 'Rights and Responsibilities of Domestic Workers',
      date: 'Nov 02, 2023',
      image: '/gallery/media__1780938370864.jpg',
      excerpt: 'Understanding your legal rights, contracts, and how our agency supports you throughout your entire employment period.'
    },
    {
      title: 'Cultural Adaptation Tips for the Middle East',
      date: 'Dec 10, 2023',
      image: '/gallery/media__1780938366520.jpg',
      excerpt: 'Learn about local customs, language basics, and how to build a positive relationship with your new employer.'
    }
  ];

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, idx) => (
            <div key={idx} className="group cursor-pointer">
              <div className="overflow-hidden rounded-2xl mb-6 relative">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2">
                  <Calendar size={14} className="text-brand-primary" />
                  <span className="text-xs font-bold text-brand-slate">{post.date}</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-brand-slate mb-3 group-hover:text-brand-primary transition-colors">
                {post.title}
              </h3>
              <p className="text-brand-gray mb-4 line-clamp-2">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-2 text-brand-secondary font-bold text-sm uppercase tracking-wider group-hover:gap-4 transition-all">
                {t.readMore} <ArrowRight size={16} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
