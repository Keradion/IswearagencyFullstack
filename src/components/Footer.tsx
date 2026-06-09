import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-brand-primary-dark text-brand-sand py-12 border-t border-white/10">
      <div className="max-w-[1920px] mx-auto px-4 md:px-8 xl:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Info */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <img 
                src="/logo.jpg" 
                alt="I Swear Foreign Employment Agency" 
                className="w-16 h-16 object-contain bg-white p-1 rounded-xl"
              />
              <div className="flex flex-col">
                <span className="font-serif text-2xl leading-none text-white tracking-wide font-bold">
                  I Swear
                </span>
                <span className="text-[10px] text-brand-secondary uppercase tracking-[0.2em] font-medium mt-1">
                  Employment Agency
                </span>
              </div>
            </div>
            <p className="text-sm text-brand-sand/70 leading-relaxed max-w-sm">
              {t.heroDescription}
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm uppercase tracking-[0.2em] font-bold text-brand-secondary mb-2">{t.quickLinks}</h3>
            <div className="grid grid-cols-2 gap-2">
              <a href="#" className="text-brand-sand/70 hover:text-brand-secondary transition-colors text-sm w-fit">{t.navHome}</a>
              <a href="#about" className="text-brand-sand/70 hover:text-brand-secondary transition-colors text-sm w-fit">{t.navAbout}</a>
              <a href="#services" className="text-brand-sand/70 hover:text-brand-secondary transition-colors text-sm w-fit">{t.navServices}</a>
              <a href="#gallery" className="text-brand-sand/70 hover:text-brand-secondary transition-colors text-sm w-fit">{t.navGallery}</a>
              <a href="#blog" className="text-brand-sand/70 hover:text-brand-secondary transition-colors text-sm w-fit">{t.navBlog}</a>
              <a href="#contact" className="text-brand-sand/70 hover:text-brand-secondary transition-colors text-sm w-fit">{t.navContact}</a>
            </div>
          </div>

          {/* Connect */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm uppercase tracking-[0.2em] font-bold text-brand-secondary mb-2">{t.connect}</h3>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-brand-secondary hover:text-brand-primary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-brand-secondary hover:text-brand-primary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-brand-sand/50">
          <p>&copy; {new Date().getFullYear()} I Swear Foreign Employment Agency. {t.rights}</p>
        </div>
      </div>
    </footer>
  );
}
