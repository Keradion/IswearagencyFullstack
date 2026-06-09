import { useLanguage } from '../context/LanguageContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Star, Quote } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/pagination';

export default function TestimonialsSection() {
  const { t } = useLanguage();

  const testimonials = [
    {
      name: t.testi1Name,
      role: t.testi1Role,
      text: t.testi1Text,
      image: '/gallery/media__1780938363928.jpg'
    },
    {
      name: t.testi2Name,
      role: t.testi2Role,
      text: t.testi2Text,
      image: '/gallery/media__1780938368768.jpg'
    },
    {
      name: t.testi3Name,
      role: t.testi3Role,
      text: t.testi3Text,
      image: '/gallery/media__1780938370864.jpg'
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Light Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/gallery/light-bg.png" 
          alt="Modern Light Background" 
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-white/30"></div>
      </div>

      <div className="max-w-[1920px] mx-auto px-4 md:px-8 xl:px-16 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl xl:text-7xl font-serif font-bold text-brand-primary mb-6">
            {t.testiTitle}
          </h2>
          <div className="w-24 h-1 bg-brand-secondary mx-auto"></div>
        </div>

        <div className="max-w-6xl mx-auto pb-12">
          <Swiper
            style={{
              '--swiper-pagination-color': '#D97706',
              '--swiper-pagination-bullet-inactive-color': '#CBD5E1',
              '--swiper-pagination-bullet-inactive-opacity': '1',
            } as any}
            slidesPerView={1}
            spaceBetween={40}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            loop={true}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            pagination={{ clickable: true, dynamicBullets: true }}
            modules={[Autoplay, Pagination]}
            className="w-full !pb-20"
          >
            {testimonials.map((testi, index) => (
              <SwiperSlide key={index} className="h-auto">
                <div className="bg-white/80 backdrop-blur-md border border-white rounded-3xl p-10 h-full flex flex-col relative mt-10 shadow-xl hover:-translate-y-2 transition-transform duration-500">
                  {/* Floating Avatar */}
                  <div className="absolute -top-10 left-10 w-20 h-20 rounded-full border-4 border-white overflow-hidden shadow-xl">
                    <img src={testi.image} alt={testi.name} className="w-full h-full object-cover" />
                  </div>
                  
                  <Quote className="text-brand-secondary/20 absolute top-8 right-8" size={48} />
                  
                  <div className="flex gap-1 mb-6 mt-8">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} className="fill-brand-secondary text-brand-secondary" />
                    ))}
                  </div>
                  
                  <p className="text-brand-slate text-lg italic flex-grow mb-8 leading-relaxed font-medium">
                    "{testi.text}"
                  </p>
                  
                  <div>
                    <h4 className="font-bold font-serif text-brand-primary text-xl mb-1">{testi.name}</h4>
                    <p className="text-brand-gray text-sm font-semibold uppercase tracking-wider">{testi.role}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
