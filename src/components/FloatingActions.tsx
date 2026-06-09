import { Phone } from 'lucide-react';

export default function FloatingActions() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
      {/* Call Button */}
      <a 
        href="tel:0962535353" 
        className="flex items-center justify-center w-14 h-14 bg-brand-primary hover:bg-brand-primary-light text-brand-secondary rounded-full shadow-lg shadow-brand-primary/40 transition-transform hover:-translate-y-1"
        aria-label="Call Us"
      >
        <Phone size={24} />
      </a>
      
      {/* WhatsApp Button */}
      <div className="relative">
        <div className="absolute inset-0 bg-[#25D366] rounded-full animate-pulse-ring"></div>
        <a 
          href="https://wa.me/251927212320" 
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full shadow-lg shadow-[#25D366]/40 transition-transform hover:-translate-y-1 z-10"
          aria-label="Chat on WhatsApp"
        >
          <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
          </svg>
        </a>
      </div>
    </div>
  );
}
