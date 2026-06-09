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
      name: 'Amina',
      role: 'Domestic Worker, Kuwait',
      text: 'I Swear Agency changed my life. They handled all my paperwork and found me a great family to work for in Kuwait.',
      image: '/gallery/media__1780938363928.jpg'
    },
    {
      name: 'Mohammed',
      role: 'Employer, Saudi Arabia',
      text: 'The staff provided by this agency are highly trained and professional. The whole process was smooth and transparent.',
      image: '/gallery/media__1780938368768.jpg'
    },
    {
      name: 'Sara',
      role: 'Nanny, Saudi Arabia',
      text: 'I felt supported every step of the way, from training in Ethiopia to my arrival in Saudi Arabia. Highly recommended.',
      image: '/gallery/media__1780938370864.jpg'
    },
    {
      name: 'Fatima',
      role: 'Domestic Worker, Kuwait',
      text: 'Excellent service and genuine care for the workers. I am very happy with my placement.',
      image: '/gallery/media__1780938366520.jpg'
    }
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-[1920px] mx-auto px-4 md:px-8 xl:px-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-primary mb-4">
            {t.testiTitle}
          </h2>
          <div className="w-24 h-1 bg-brand-secondary mx-auto"></div>
        </div>

        <div className="max-w-6xl mx-auto pb-12">
          <Swiper
            style={{
              '--swiper-pagination-color': '#F59E0B',
              '--swiper-pagination-bullet-inactive-color': '#CBD5E1',
              '--swiper-pagination-bullet-inactive-opacity': '1',
            } as any}
            slidesPerView={1}
            spaceBetween={30}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            loop={true}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true, dynamicBullets: true }}
            modules={[Autoplay, Pagination]}
            className="w-full !pb-16"
          >
            {testimonials.map((testi, index) => (
              <SwiperSlide key={index} className="h-auto">
                <div className="bg-brand-sand rounded-2xl p-8 h-full flex flex-col relative mt-8">
                  {/* Floating Avatar */}
                  <div className="absolute -top-8 left-8 w-16 h-16 rounded-full border-4 border-white overflow-hidden shadow-lg">
                    <img src={testi.image} alt={testi.name} className="w-full h-full object-cover" />
                  </div>
                  
                  <Quote className="text-brand-secondary/30 absolute top-6 right-6" size={40} />
                  
                  <div className="flex gap-1 mb-4 mt-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="fill-brand-secondary text-brand-secondary" />
                    ))}
                  </div>
                  
                  <p className="text-brand-gray italic flex-grow mb-6 leading-relaxed">
                    "{testi.text}"
                  </p>
                  
                  <div>
                    <h4 className="font-bold text-brand-primary text-lg">{testi.name}</h4>
                    <p className="text-brand-secondary text-sm font-medium">{testi.role}</p>
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
