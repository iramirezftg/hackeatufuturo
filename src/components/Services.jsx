import React from 'react';
import { UserCheck, Video, Linkedin, FileCode2, Target, ArrowRight, Sparkles } from 'lucide-react';

export default function Services({ onSelectService }) {
  const services = [
    {
      id: 'asesoria',
      icon: UserCheck,
      title: 'Asesorías 1 a 1',
      desc: 'Sesiones personalizadas directamente con Israel para resolver dudas puntuales, revisar tu estrategia de búsqueda y darte retroalimentación honesta.',
      badge: 'Personalizado',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'mock-interviews',
      icon: Video,
      title: 'Mock Interviews',
      desc: 'Simulacros de entrevista en vivo (técnicas, algoritmo, frontend/backend y de comportamiento) simulando empresas internacionales.',
      badge: 'En Vivo',
      color: 'from-purple-500 to-indigo-500',
    },
    {
      id: 'linkedin',
      icon: Linkedin,
      title: 'LinkedIn Optimizado',
      desc: 'Reescribimos tu perfil con las palabras clave exactas que buscan los tech recruiters para que las ofertas lleguen directamente a tu Inbox.',
      badge: 'Inbound Leads',
      color: 'from-cyan-500 to-teal-500',
    },
    {
      id: 'cv-portafolio',
      icon: FileCode2,
      title: 'CV & Portafolio',
      desc: 'Formato ATS comprobado + auditoría de tus proyectos de GitHub para destacar como candidato senior desde tu resumen.',
      badge: 'ATS Proof',
      color: 'from-amber-500 to-orange-500',
    },
    {
      id: 'plan-carrera',
      icon: Target,
      title: 'Plan de Carrera 90 Días',
      desc: 'Roadmap paso a paso con metas semanales claras, tecnologías de alta demanda y seguimiento constante hasta conseguir tu oferta laboral.',
      badge: 'Estrategia',
      color: 'from-rose-500 to-pink-500',
    },
  ];

  return (
    <section id="servicios" className="py-24 relative bg-[#060913]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Nuestros Servicios</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Todo lo que necesitas para hackear tu futuro
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            Herramientas y servicios diseñados minuciosamente para acelerar tu entrada a la industria tech.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="glass-card glass-card-hover rounded-3xl p-8 border-slate-800 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${service.color} p-[1px] shadow-lg`}>
                      <div className="w-full h-full bg-[#0b1021] rounded-[15px] flex items-center justify-center">
                        <Icon className="w-7 h-7 text-white group-hover:scale-110 transition-transform" />
                      </div>
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {service.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    {service.desc}
                  </p>
                </div>

                <button
                  onClick={() => onSelectService(service)}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300 pt-4 border-t border-slate-800/80 transition-colors"
                >
                  <span>Saber más sobre {service.title}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            );
          })}

          {/* CTA Box in Grid */}
          <div className="glass-card rounded-3xl p-8 border-cyan-500/30 bg-gradient-to-br from-cyan-950/30 via-slate-900 to-indigo-950/30 flex flex-col justify-between text-center items-center">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center mb-6 mx-auto">
                <Sparkles className="w-7 h-7 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">¿Buscas el paquete completo?</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Todos estos servicios vienen integrados dentro de nuestro **Programa Premium** con acompañamiento continuo.
              </p>
            </div>
            <a
              href="#programa-premium"
              className="w-full py-3.5 rounded-xl font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 shadow-lg shadow-cyan-400/20 transition-all flex items-center justify-center gap-2"
            >
              <span>Ver Programa Premium</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
