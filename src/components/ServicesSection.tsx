import { PlaneTakeoff, FileText, UserCheck, Briefcase } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function ServicesSection() {
  const { t } = useLanguage();

  return (
    <section id="services" className="py-24 bg-brand-sand relative">
      <div className="max-w-[1920px] mx-auto px-4 md:px-8 xl:px-16">
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 text-brand-primary font-bold text-[12px] uppercase tracking-widest mb-4">
            <span className="w-8 h-[2px] bg-brand-secondary"></span>
            <span>{t.navServices}</span>
            <span className="w-8 h-[2px] bg-brand-secondary"></span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-primary">
            {t.servicesTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* For Workers Column */}
          <div className="flex flex-col gap-6">
            <h3 className="text-2xl font-serif font-bold text-brand-slate mb-2 pb-4 border-b-2 border-brand-primary inline-block w-max">
              {t.forWorkers}
            </h3>
            
            <div className="bg-white rounded-xl p-8 flex gap-6 hover:shadow-lg transition-shadow duration-300 relative overflow-hidden group">
              <div className="absolute left-0 top-0 bottom-0 w-2 bg-brand-primary transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
              <div className="w-14 h-14 rounded-full bg-brand-sand flex items-center justify-center shrink-0">
                <PlaneTakeoff className="text-brand-secondary" size={28} />
              </div>
              <div>
                <h4 className="text-xl font-bold text-brand-primary mb-2">{t.serv1Title}</h4>
                <p className="text-brand-gray">{t.serv1Desc}</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 flex gap-6 hover:shadow-lg transition-shadow duration-300 relative overflow-hidden group">
              <div className="absolute left-0 top-0 bottom-0 w-2 bg-brand-primary transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
              <div className="w-14 h-14 rounded-full bg-brand-sand flex items-center justify-center shrink-0">
                <FileText className="text-brand-secondary" size={28} />
              </div>
              <div>
                <h4 className="text-xl font-bold text-brand-primary mb-2">{t.serv2Title}</h4>
                <p className="text-brand-gray">{t.serv2Desc}</p>
              </div>
            </div>
          </div>

          {/* For Employers Column */}
          <div className="flex flex-col gap-6">
            <h3 className="text-2xl font-serif font-bold text-brand-slate mb-2 pb-4 border-b-2 border-brand-secondary inline-block w-max">
              {t.forEmployers}
            </h3>
            
            <div className="bg-white rounded-xl p-8 flex gap-6 hover:shadow-lg transition-shadow duration-300 relative overflow-hidden group">
              <div className="absolute left-0 top-0 bottom-0 w-2 bg-brand-secondary transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
              <div className="w-14 h-14 rounded-full bg-brand-sand flex items-center justify-center shrink-0">
                <UserCheck className="text-brand-primary" size={28} />
              </div>
              <div>
                <h4 className="text-xl font-bold text-brand-primary mb-2">{t.serv3Title}</h4>
                <p className="text-brand-gray">{t.serv3Desc}</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 flex gap-6 hover:shadow-lg transition-shadow duration-300 relative overflow-hidden group">
              <div className="absolute left-0 top-0 bottom-0 w-2 bg-brand-secondary transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
              <div className="w-14 h-14 rounded-full bg-brand-sand flex items-center justify-center shrink-0">
                <Briefcase className="text-brand-primary" size={28} />
              </div>
              <div>
                <h4 className="text-xl font-bold text-brand-primary mb-2">{t.serv4Title}</h4>
                <p className="text-brand-gray">{t.serv4Desc}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
