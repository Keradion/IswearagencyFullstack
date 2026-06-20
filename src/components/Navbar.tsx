import { useState } from 'react';
import type { Language } from '../utils/translations';
import { languageNames } from '../utils/translations';
import { Globe, Menu, X, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const { isAdmin } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav className="bg-white sticky top-0 z-50 px-4 md:px-8 py-4 border-b border-gray-100 shadow-sm transition-all duration-300">
      <div className="max-w-[1920px] mx-auto flex justify-between items-center">
        {/* Logo Area */}
        <a href="#" className="flex items-center gap-3 relative z-50">
          <img 
            src="/logo.jpg" 
            alt="I Swear Foreign Employment Agency" 
            className="w-12 h-12 object-contain"
          />
          <div className="flex flex-col">
            <span className="font-serif text-2xl leading-none text-brand-primary tracking-wide font-bold">
              I Swear
            </span>
            <span className="text-[9px] text-brand-slate/60 uppercase tracking-[0.15em] font-medium mt-1">
              Employment Agency
            </span>
          </div>
        </a>

        {/* Desktop Links Area */}
        <div className="hidden lg:flex items-center gap-8 text-[12px] uppercase tracking-wider font-semibold text-brand-gray">
          <a href="#" className="hover:text-brand-secondary transition-colors">{t.navHome}</a>
          <a href="#about" className="hover:text-brand-secondary transition-colors">{t.navAbout}</a>
          <a href="#services" className="hover:text-brand-secondary transition-colors">{t.navServices}</a>
          <a href="#gallery" className="hover:text-brand-secondary transition-colors">{t.navGallery}</a>
          <a href="#videos" className="hover:text-brand-secondary transition-colors">{t.navVideos}</a>
          <a href="#blog" className="hover:text-brand-secondary transition-colors">{t.navBlog}</a>
          <a href="#contact" className="hover:text-brand-secondary transition-colors">{t.navContact}</a>
          {isAdmin && (
            <a href="/admin" className="inline-flex items-center gap-1.5 text-brand-primary hover:text-brand-secondary transition-colors">
              <ShieldCheck size={14} /> Admin
            </a>
          )}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4 lg:gap-6 relative z-50">
          {/* Language Selector */}
          <div className="relative group flex items-center gap-1.5 cursor-pointer text-brand-gray hover:text-brand-secondary transition-colors">
            <Globe size={16} />
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="bg-transparent text-[12px] uppercase tracking-wider font-semibold outline-none cursor-pointer appearance-none pr-2"
            >
              {(Object.keys(languageNames) as Language[]).map((key) => (
                <option key={key} value={key} className="text-black uppercase">
                  {languageNames[key]}
                </option>
              ))}
            </select>
          </div>

          <a href="#contact" className="bg-brand-primary hover:bg-brand-secondary text-white hover:text-brand-primary text-[12px] uppercase tracking-wider font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-md hidden sm:block">
            {t.navContact}
          </a>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={toggleMobileMenu}
            className="lg:hidden text-brand-primary hover:text-brand-secondary transition-colors p-2"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Backdrop */}
      <div 
        className={`fixed inset-0 bg-brand-slate/40 backdrop-blur-sm z-40 transition-all duration-300 lg:hidden ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={toggleMobileMenu}
      />

      {/* Mobile Menu Drawer (Left Slider) */}
      <div 
        className={`fixed top-0 left-0 h-full w-[85vw] max-w-sm bg-white z-50 shadow-2xl transition-transform duration-300 ease-in-out lg:hidden flex flex-col pt-28 px-8 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col items-start gap-8 text-lg uppercase tracking-widest font-bold text-brand-primary">
          <a href="#" onClick={toggleMobileMenu} className="hover:text-brand-secondary transition-colors">{t.navHome}</a>
          <a href="#about" onClick={toggleMobileMenu} className="hover:text-brand-secondary transition-colors">{t.navAbout}</a>
          <a href="#services" onClick={toggleMobileMenu} className="hover:text-brand-secondary transition-colors">{t.navServices}</a>
          <a href="#gallery" onClick={toggleMobileMenu} className="hover:text-brand-secondary transition-colors">{t.navGallery}</a>
          <a href="#videos" onClick={toggleMobileMenu} className="hover:text-brand-secondary transition-colors">{t.navVideos}</a>
          <a href="#blog" onClick={toggleMobileMenu} className="hover:text-brand-secondary transition-colors">{t.navBlog}</a>
          <a href="#contact" onClick={toggleMobileMenu} className="hover:text-brand-secondary transition-colors">{t.navContact}</a>
          {isAdmin && (
            <a href="/admin" onClick={toggleMobileMenu} className="inline-flex items-center gap-2 text-brand-secondary hover:text-brand-primary transition-colors">
              <ShieldCheck size={18} /> Admin Panel
            </a>
          )}
          
          <a href="#contact" onClick={toggleMobileMenu} className="mt-8 w-full text-center bg-brand-primary text-white text-sm uppercase tracking-wider font-bold py-4 px-8 rounded-full shadow-lg">
            {t.navContact}
          </a>
        </div>
      </div>
    </nav>
  );
}
