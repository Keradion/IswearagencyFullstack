import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Thumbs, FreeMode, EffectFade } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/effect-fade';

export default function GallerySection() {
  const { t } = useLanguage();
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  const images = [
    '/gallery/media__1780938361623.jpg',
    '/gallery/media__1780938363928.jpg',
    '/gallery/media__1780938366520.jpg',
    '/gallery/media__1780938368768.jpg',
    '/gallery/media__1780938370864.jpg'
  ];

  return (
    <section id="gallery" className="py-24 bg-brand-sand min-h-screen flex flex-col justify-center">
      <div className="w-full max-w-[1920px] mx-auto px-4 md:px-8 xl:px-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-brand-primary font-bold text-[12px] uppercase tracking-widest mb-4">
            <span className="w-8 h-[2px] bg-brand-secondary"></span>
            <span>{t.navGallery}</span>
            <span className="w-8 h-[2px] bg-brand-secondary"></span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-slate mb-6">
            {t.galleryTitle}
          </h2>
          <p className="text-lg text-brand-gray max-w-3xl mx-auto font-light leading-relaxed">
            {t.gallerySubtitle}
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Main Slider */}
          <Swiper
            style={{
              '--swiper-navigation-color': '#fff',
              '--swiper-pagination-color': '#fff',
            } as any}
            loop={true}
            spaceBetween={10}
            navigation={true}
            effect={'fade'}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
            modules={[FreeMode, Navigation, Thumbs, Autoplay, EffectFade]}
            className="w-full h-[400px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl mb-4 group"
          >
            {images.map((img, index) => (
              <SwiperSlide key={index}>
                <div className="relative w-full h-full">
                  <img 
                    src={img} 
                    alt={`Placement ${index + 1}`} 
                    className="block w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-primary-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-8 left-8 right-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="bg-brand-secondary text-brand-primary px-4 py-2 rounded-full w-max text-xs uppercase tracking-widest font-bold mb-3">
                      {t.deployedStaff}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Thumbnail Slider */}
          <Swiper
            onSwiper={setThumbsSwiper}
            loop={true}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="w-full h-24 md:h-32 gallery-thumbs"
          >
            {images.map((img, index) => (
              <SwiperSlide key={index} className="rounded-xl overflow-hidden cursor-pointer opacity-50 transition-opacity hover:opacity-100">
                <img 
                  src={img} 
                  alt={`Thumbnail ${index + 1}`} 
                  className="block w-full h-full object-cover object-center"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <style>{`
        .gallery-thumbs .swiper-slide-thumb-active {
          opacity: 1;
          border: 3px solid var(--color-brand-secondary);
        }
        .swiper-button-next, .swiper-button-prev {
          background: rgba(0, 77, 64, 0.5);
          width: 50px !important;
          height: 50px !important;
          border-radius: 50%;
          backdrop-filter: blur(4px);
        }
        .swiper-button-next:hover, .swiper-button-prev:hover {
          background: var(--color-brand-secondary);
          color: var(--color-brand-primary) !important;
        }
        .swiper-button-next::after, .swiper-button-prev::after {
          font-size: 20px !important;
        }
      `}</style>
    </section>
  );
}
