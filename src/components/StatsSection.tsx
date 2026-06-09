import { Users, Globe2, Award, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function StatsSection() {
  const { t } = useLanguage();

  const stats = [
    { icon: Users, num: t.stat1Number, label: t.stat1Label },
    { icon: Globe2, num: t.stat2Number, label: t.stat2Label },
    { icon: Award, num: t.stat3Number, label: t.stat3Label },
    { icon: ShieldCheck, num: t.stat4Number, label: t.stat4Label }
  ];

  return (
    <section className="py-20 bg-brand-sand relative z-10">
      <div className="max-w-[1920px] mx-auto px-4 md:px-8 xl:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={index} 
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center group border border-gray-100"
              >
                <div className="w-16 h-16 rounded-full bg-brand-secondary/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-brand-secondary/20 transition-all duration-300">
                  <Icon className="text-brand-secondary" size={32} />
                </div>
                <h3 className="text-4xl font-serif font-bold text-brand-primary mb-2">
                  {stat.num}
                </h3>
                <p className="text-brand-gray font-medium uppercase tracking-wider text-sm">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
