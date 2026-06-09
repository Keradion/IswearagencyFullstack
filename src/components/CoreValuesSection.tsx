import { Eye, HeartHandshake, TrendingUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function CoreValuesSection() {
  const { t } = useLanguage();

  const values = [
    { icon: Eye, title: t.val1Title, desc: t.val1Desc },
    { icon: HeartHandshake, title: t.val2Title, desc: t.val2Desc },
    { icon: TrendingUp, title: t.val3Title, desc: t.val3Desc }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1920px] mx-auto px-4 md:px-8 xl:px-16">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-primary mb-6">
            {t.valuesTitle}
          </h2>
          <p className="text-lg text-brand-gray font-light">
            {t.valuesSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {values.map((val, index) => {
            const Icon = val.icon;
            return (
              <div 
                key={index}
                className="group bg-brand-sand rounded-2xl p-10 hover:-translate-y-2 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center mb-6 shadow-sm group-hover:shadow-md transition-all">
                  <Icon className="text-brand-secondary" size={28} />
                </div>
                <h3 className="text-2xl font-serif font-bold text-brand-primary mb-4">
                  {val.title}
                </h3>
                <p className="text-brand-gray leading-relaxed">
                  {val.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
