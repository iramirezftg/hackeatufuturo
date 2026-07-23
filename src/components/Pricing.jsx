import React from 'react';
import { Check, X, Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export default function Pricing({ onSelectPlan }) {
  const freeFeatures = [
    { text: 'Acceso a AI Coach (Límite básico diario)', included: true },
    { text: 'Guías de preparación inicial de CV', included: true },
    { text: 'Comunidad abierta de Discord & Telegram', included: true },
    { text: 'Recursos y plantillas públicas', included: true },
    { text: 'Mentoría 1 a 1 personalizada', included: false },
    { text: 'Optimización profesional de LinkedIn', included: false },
    { text: 'Mock interviews técnicas ilimitadas', included: false },
    { text: 'Garantía de contratación & Pago Diferido', included: false },
  ];

  const premiumFeatures = [
    { text: 'Mentoría 1 a 1 directa con @isra_developer', highlight: true },
    { text: 'Acceso ILIMITADO 24/7 a AI Coach Avanzado', highlight: false },
    { text: 'Revisión y optimización profesional de CV', highlight: false },
    { text: 'Perfil de LinkedIn optimizado para reclutadores', highlight: false },
    { text: 'Simulacros de Entrevistas Técnicas & Behavioral', highlight: false },
    { text: 'Plan de acción personalizado de 90 días', highlight: false },
    { text: 'Referencia directa a vacantes y empresas aliadas', highlight: true },
    { text: 'Opción de Pago Diferido (0% riesgo)', highlight: true },
  ];

  return (
    <section id="programa-premium" className="py-24 relative bg-[#060913] border-t border-slate-800/60">
      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Dos Formas de Crecer</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Elige el plan que impulsará tu carrera
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            Desde herramientas impulsadas por Inteligencia Artificial hasta una mentoría intensiva 1 a 1 para asegurar tu contratación.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
          
          {/* Free Card */}
          <div className="glass-card rounded-3xl p-8 sm:p-10 flex flex-col justify-between border-slate-800 hover:border-slate-700 transition-all">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xl font-bold text-white">Plan Gratuito</span>
                <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-medium">Explorador</span>
              </div>
              <p className="text-slate-400 text-sm mb-6">
                Perfecto para dar tus primeros pasos y preparar tu ruta inicial por tu cuenta.
              </p>
              
              <div className="mb-8">
                <span className="text-4xl font-extrabold text-white">$0</span>
                <span className="text-slate-400 text-sm ml-2">MXN / siempre</span>
              </div>

              <div className="space-y-4 mb-8">
                {freeFeatures.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm">
                    {item.included ? (
                      <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center shrink-0">
                        <X className="w-3.5 h-3.5 text-slate-600" />
                      </div>
                    )}
                    <span className={item.included ? 'text-slate-300' : 'text-slate-500 line-through'}>
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => onSelectPlan('free')}
              className="w-full py-3.5 rounded-xl font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all"
            >
              Crear cuenta gratis
            </button>
          </div>

          {/* Premium Card */}
          <div className="relative glass-card rounded-3xl p-8 sm:p-10 flex flex-col justify-between border-purple-500/40 bg-gradient-to-b from-purple-950/20 via-[#0d1326] to-[#080d1a] shadow-2xl shadow-purple-950/50 hover:border-purple-500/70 transition-all">
            {/* Popular Badge */}
            <div className="absolute -top-4 right-8 bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 fill-white" />
              <span>MÁS POPULAR</span>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xl font-bold text-white">Programa Premium</span>
                <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-medium border border-purple-500/30">Aceleración</span>
              </div>
              <p className="text-slate-300 text-sm mb-6">
                Mentoría integral 1 a 1, preparación para entrevistas y acompañamiento continuo hasta firmar tu oferta.
              </p>
              
              <div className="mb-8">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-black text-white">$2,999</span>
                  <span className="text-slate-400 text-sm">MXN / mes</span>
                </div>
                <div className="text-xs text-purple-400 font-semibold mt-1 flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5" />
                  <span>Disponible opción de Pago Diferido (0% riesgo)</span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {premiumFeatures.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm">
                    <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-purple-400" />
                    </div>
                    <span className={item.highlight ? 'text-white font-semibold' : 'text-slate-200'}>
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => onSelectPlan('premium')}
              className="w-full py-4 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 hover:from-amber-300 hover:to-orange-400 shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-2 group"
            >
              <span>Unirme al Programa Premium</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>

        {/* Commitment Guarantee Notice */}
        <div className="mt-12 max-w-3xl mx-auto glass-card rounded-2xl p-6 border-slate-800 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <h4 className="text-white font-bold text-base">Garantía de Compromiso</h4>
            <p className="text-slate-400 text-sm">
              Si en los primeros 14 días sientes que el Programa Premium no es para ti, te devolvemos el 100% de tu dinero sin preguntas molestadotas.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
