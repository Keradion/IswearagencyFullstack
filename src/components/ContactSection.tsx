import { MapPin, Phone, Mail, Clock, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function ContactSection() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-24 bg-white relative">
      <div className="max-w-[1920px] mx-auto px-4 md:px-8 xl:px-16">
        {/* Minimalist Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-brand-primary font-bold text-[12px] uppercase tracking-widest mb-4">
            <span className="w-8 h-[2px] bg-brand-secondary"></span>
            <span>{t.navContact}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-slate mb-6">
            Let's start a conversation.
          </h2>
          <p className="text-brand-gray text-lg">
            Whether you have a question or need assistance with your next step, our team is ready to help you navigate the process.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* Clean Contact Info List */}
          <div className="lg:col-span-5 flex flex-col gap-10">
            <div className="flex items-start gap-6 group">
              <div className="w-12 h-12 rounded-full bg-brand-sand flex items-center justify-center shrink-0 group-hover:bg-brand-primary group-hover:text-white transition-colors duration-300">
                <MapPin className="text-brand-primary group-hover:text-white transition-colors" size={24} />
              </div>
              <div>
                <h3 className="text-sm uppercase tracking-widest font-bold text-brand-gray mb-2">{t.visitOffice}</h3>
                <p className="text-brand-slate text-lg font-medium leading-relaxed max-w-xs">{t.addressText}</p>
              </div>
            </div>

            <div className="flex items-start gap-6 group">
              <div className="w-12 h-12 rounded-full bg-brand-sand flex items-center justify-center shrink-0 group-hover:bg-brand-primary group-hover:text-white transition-colors duration-300">
                <Phone className="text-brand-primary group-hover:text-white transition-colors" size={24} />
              </div>
              <div>
                <h3 className="text-sm uppercase tracking-widest font-bold text-brand-gray mb-2">{t.callUs}</h3>
                <p className="text-brand-slate text-lg font-medium">0112755458</p>
                <p className="text-brand-slate text-lg font-medium">0962535353</p>
              </div>
            </div>

            <div className="flex items-start gap-6 group">
              <div className="w-12 h-12 rounded-full bg-brand-sand flex items-center justify-center shrink-0 group-hover:bg-brand-primary group-hover:text-white transition-colors duration-300">
                <Mail className="text-brand-primary group-hover:text-white transition-colors" size={24} />
              </div>
              <div>
                <h3 className="text-sm uppercase tracking-widest font-bold text-brand-gray mb-2">{t.emailUs}</h3>
                <p className="text-brand-slate text-lg font-medium break-all">support@iswearagency.com</p>
                <p className="text-brand-slate text-lg font-medium break-all">{t.managerText} mesfin@iswearagency.com</p>
              </div>
            </div>

            <div className="flex items-start gap-6 group">
              <div className="w-12 h-12 rounded-full bg-brand-sand flex items-center justify-center shrink-0 group-hover:bg-brand-primary group-hover:text-white transition-colors duration-300">
                <Clock className="text-brand-primary group-hover:text-white transition-colors" size={24} />
              </div>
              <div>
                <h3 className="text-sm uppercase tracking-widest font-bold text-brand-gray mb-2">Office Hours</h3>
                <p className="text-brand-slate text-lg font-medium">Mon - Sat: 8:00 AM - 6:00 PM</p>
                <p className="text-brand-gray">Sunday: Closed</p>
              </div>
            </div>
          </div>

          {/* Minimalist Map / Location Card */}
          <div className="lg:col-span-7 w-full h-[500px] bg-brand-sand rounded-3xl p-8 md:p-12 flex items-center justify-center relative overflow-hidden group">
            {/* Very light, abstract map-like pattern background (using pure CSS for minimalism) */}
            <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
            
            <div className="relative z-10 bg-white p-8 md:p-10 rounded-2xl shadow-xl max-w-md w-full text-center hover:-translate-y-2 transition-transform duration-500">
              <div className="w-20 h-20 rounded-full bg-brand-primary/10 mx-auto flex items-center justify-center mb-6">
                <MapPin size={32} className="text-brand-primary" />
              </div>
              <h4 className="text-2xl font-serif font-bold text-brand-slate mb-4">Visit Our Office</h4>
              <p className="text-brand-gray mb-8">{t.addressText}</p>
              
              <a 
                href="https://goo.gl/maps/placeholder" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full bg-brand-slate hover:bg-brand-primary text-white text-sm uppercase tracking-wider font-bold py-4 px-8 rounded-full transition-colors duration-300"
              >
                {t.openMaps} <ArrowRight size={18} />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
