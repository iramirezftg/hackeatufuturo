import React from 'react';
import { Star, Quote, ArrowRight, CheckCircle, Sparkles, Building2 } from 'lucide-react';

export default function Testimonials() {
  const reviews = [
    {
      name: 'Mateo Rodríguez',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80',
      before: '6 meses enviando CVs sin respuesta',
      after: 'Frontend Dev en Fintech ($35,000 MXN)',
      quote: 'Pasé 6 meses enviando más de 200 CVs sin recibir llamadas. Con la mentoría 1 a 1 de Israel y la optimización de mi LinkedIn, me contactaron 3 reclutadores en la primera semana.',
      stars: 5,
    },
    {
      name: 'Sofía Mendoza',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      before: 'Nervios extremos en pruebas de código',
      after: 'Fullstack Dev Internacional ($42,000 MXN)',
      quote: 'Los simulacros de entrevista técnica me quitaron los nervios por completo. Sufría mucho en las live coding sessions y con su método logré pasar el filtro directo.',
      stars: 5,
    },
    {
      name: 'David Kassem',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      before: 'Autodidacta rechazado por no tener título',
      after: 'Backend Dev Node.js ($38,000 MXN)',
      quote: 'Creía que la falta de título universitario me iba a cerrar las puertas. Israel me enseñó a destacar mis proyectos reales en GitHub y me dio la confianza que necesitaba.',
      stars: 5,
    },
  ];

  return (
    <section className="py-24 relative bg-[#060913]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Casos de Éxito</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            De junior confundido a candidato contratado
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            Conoce las historias reales de alumnos que hackearon su proceso de contratación tech.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((item, idx) => (
            <div
              key={idx}
              className="glass-card glass-card-hover rounded-3xl p-8 border-slate-800 flex flex-col justify-between relative"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-slate-800 pointer-events-none" />

              <div>
                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(item.stars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>

                <p className="text-slate-300 text-sm leading-relaxed mb-6 italic">
                  "{item.quote}"
                </p>

                {/* Before / After Comparison Tag */}
                <div className="space-y-2 mb-6 bg-slate-900/60 rounded-xl p-3 border border-slate-800/80">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold uppercase text-[10px]">Antes</span>
                    <span className="text-slate-400 truncate">{item.before}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold uppercase text-[10px]">Ahora</span>
                    <span className="text-emerald-400 font-semibold truncate">{item.after}</span>
                  </div>
                </div>
              </div>

              {/* User Profile */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-11 h-11 rounded-full object-cover border border-slate-700"
                />
                <div>
                  <h4 className="text-white font-bold text-sm">{item.name}</h4>
                  <p className="text-xs text-slate-400">Graduado del Programa</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
