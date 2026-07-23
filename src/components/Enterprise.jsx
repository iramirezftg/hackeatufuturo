import React from 'react';
import { Building2, CheckCircle2, Users, ShieldCheck, ArrowRight, Zap, Briefcase } from 'lucide-react';

export default function Enterprise({ onContactEnterprise }) {
  const points = [
    'Candidatos evaluados en código en vivo y proyectos reales en GitHub',
    'Capacitados en metodologías ágiles y comunicación efectiva',
    'Acompañamiento post-contratación durante los primeros 90 días',
    'Ahorra hasta un 70% del tiempo de filtrado de reclutadores tradicional',
  ];

  const metrics = [
    { label: 'Desarrolladores listos para contratar', val: '50+' },
    { label: 'Empresas aliadas', val: '20+' },
    { label: 'Retención laboral a 12 meses', val: '95%' },
    { label: 'Tiempo promedio de Match', val: '72h' },
  ];

  return (
    <section id="empresas" className="py-24 relative bg-[#060913]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="glass-card rounded-3xl p-8 sm:p-12 border-slate-800 bg-gradient-to-r from-slate-900/80 via-slate-900/40 to-slate-900/80 relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <Building2 className="w-4 h-4" />
                <span>Para Empresas • Hack Talent</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Contrata talento junior que <span className="text-emerald-400">sí genera impacto</span> desde el día 1
              </h2>

              <p className="text-slate-300 text-base leading-relaxed">
                Olvídate de revisar cientos de CVs sin experiencia relevante. En **Hackea tu Futuro** filtramos, pre-evaluamos y mentoreamos a desarrolladores para integrarse de inmediato a tu equipo de tecnología.
              </p>

              <div className="space-y-3 pt-2">
                {points.map((pt, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm text-slate-200">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <span>{pt}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <button
                  onClick={onContactEnterprise}
                  className="px-8 py-4 rounded-xl font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 shadow-lg shadow-emerald-400/20 transition-all flex items-center gap-2 group"
                >
                  <Briefcase className="w-5 h-5" />
                  <span>Contactar Reclutamiento</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Right Metrics Grid */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              {metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="glass-card rounded-2xl p-6 border-slate-800 text-center bg-slate-950/60 hover:border-emerald-500/40 transition-all"
                >
                  <div className="text-3xl font-black text-emerald-400 mb-1">{m.val}</div>
                  <div className="text-xs text-slate-400 font-medium">{m.label}</div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
