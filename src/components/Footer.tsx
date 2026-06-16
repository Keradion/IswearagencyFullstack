import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-brand-primary-dark text-brand-sand py-16 border-t border-white/10">
      <div className="max-w-[1920px] mx-auto px-4 md:px-8 xl:px-16 flex flex-col items-center text-center">
        
        {/* Brand Info */}
        <div className="flex flex-col items-center gap-6 mb-12">
          <div className="flex items-center gap-4">
            <img 
              src="/logo.jpg" 
              alt="I Swear Foreign Employment Agency" 
              className="w-16 h-16 object-contain bg-white p-1 rounded-xl"
            />
            <div className="flex flex-col text-left">
              <span className="font-serif text-2xl leading-none text-white tracking-wide font-bold">
                I Swear
              </span>
              <span className="text-[10px] text-brand-secondary uppercase tracking-[0.2em] font-medium mt-1">
                Employment Agency
              </span>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 mt-4 text-brand-sand/70 text-sm font-light">
            <span>{t.addressText}</span>
            <span className="hidden md:block w-1 h-1 bg-brand-secondary rounded-full"></span>
            <a href="tel:0112755458" className="hover:text-brand-secondary transition-colors">0112755458</a>
            <span className="hidden md:inline px-2">|</span>
            <a href="tel:0962535353" className="hover:text-brand-secondary transition-colors">0962535353</a>
            <span className="hidden md:block w-1 h-1 bg-brand-secondary rounded-full"></span>
            <a href="mailto:support@iswearagency.com" className="hover:text-brand-secondary transition-colors">support@iswearagency.com</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
