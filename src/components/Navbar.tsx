import type { Language } from '../utils/translations';
import { languageNames } from '../utils/translations';
import { Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <nav className="bg-white sticky top-0 z-50 px-4 md:px-8 py-4 border-b border-gray-100 shadow-sm transition-all duration-300">
      <div className="max-w-[1920px] mx-auto flex justify-between items-center">
        {/* Logo Area */}
        <a href="#" className="flex items-center gap-3">
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

        {/* Links Area */}
        <div className="hidden lg:flex items-center gap-8 text-[12px] uppercase tracking-wider font-semibold text-brand-gray">
          <a href="#" className="hover:text-brand-secondary transition-colors">{t.navHome}</a>
          <a href="#about" className="hover:text-brand-secondary transition-colors">{t.navAbout}</a>
          <a href="#services" className="hover:text-brand-secondary transition-colors">{t.navServices}</a>
          <a href="#gallery" className="hover:text-brand-secondary transition-colors">{t.navGallery}</a>
          <a href="#blog" className="hover:text-brand-secondary transition-colors">{t.navBlog}</a>
          <a href="#contact" className="hover:text-brand-secondary transition-colors">{t.navContact}</a>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-6">
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
        </div>
      </div>
    </nav>
  );
}
