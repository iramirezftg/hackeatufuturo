import React from 'react';
import { ShieldCheck, CheckCircle2, DollarSign, Clock, Award, ArrowRight, HeartHandshake } from 'lucide-react';

export default function DeferredPayment({ onApplyDeferred }) {
  const benefits = [
    {
      title: '0% Riesgo Financiero',
      desc: 'No necesitas desembolsar grandes sumas de dinero para empezar a recibir mentoría personalizada.',
      icon: ShieldCheck,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20',
    },
    {
      title: 'Garantía por Contrato',
      desc: 'Firmamos un acuerdo transparente donde estipulamos las condiciones claras sin letras chiquitas.',
      icon: HeartHandshake,
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10 border-cyan-500/20',
    },
    {
      title: 'Flexibilidad de Pagos',
      desc: 'Cuando consigas empleo, pagas en 1 o 3 mensualidades sin intereses adicionales.',
      icon: Clock,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10 border-purple-500/20',
    },
    {
      title: 'Solo pagas si trabajas',
      desc: 'Si sigues el plan al 100% y no consigues empleo tech, no nos debes absolutamente nada.',
      icon: DollarSign,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/20',
    },
  ];

  return (
    <section id="pago-diferido" className="py-24 relative bg-gradient-to-b from-[#060913] via-[#0b1021] to-[#060913] border-t border-slate-800/60 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-4">
            <DollarSign className="w-4 h-4" />
            <span>Modalidad Pago Diferido</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Acceso Ahora, <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Paga Después</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Eliminamos el riesgo financiero para ti. Te preparamos, te mentoreamos y solo cuando firmes tu oferta tech pagas el resto del programa.
          </p>
        </div>

        {/* Features & Card Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          
          {/* Left Benefits List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {benefits.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="glass-card rounded-2xl p-6 border-slate-800/80 hover:border-slate-700 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className={`w-12 h-12 rounded-xl border ${item.bg} flex items-center justify-center mb-4`}>
                      <Icon className={`w-6 h-6 ${item.color}`} />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Hero Feature Box */}
          <div className="glass-card rounded-3xl p-8 sm:p-10 border-indigo-500/30 bg-gradient-to-br from-slate-900/90 via-indigo-950/30 to-slate-900/90 shadow-2xl relative">
            <div className="absolute top-4 right-4 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold px-3 py-1 rounded-full">
              Cupos Limitados por Mes
            </div>

            <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center mb-6">
              <Award className="w-8 h-8 text-indigo-400" />
            </div>

            <h3 className="text-2xl font-bold text-white mb-4">¿Cómo funciona el Pago Diferido?</h3>
            
            <ol className="space-y-4 mb-8">
              <li className="flex gap-3 text-sm text-slate-300">
                <span className="w-6 h-6 rounded-full bg-indigo-500/30 border border-indigo-500/50 text-indigo-300 font-bold flex items-center justify-center shrink-0 text-xs">1</span>
                <span><strong>Postulas y te evaluamos:</strong> Revisamos tu perfil en una llamada breve para asegurar que podemos darte resultados.</span>
              </li>
              <li className="flex gap-3 text-sm text-slate-300">
                <span className="w-6 h-6 rounded-full bg-indigo-500/30 border border-indigo-500/50 text-indigo-300 font-bold flex items-center justify-center shrink-0 text-xs">2</span>
                <span><strong>Inicio inmediato:</strong> Accedes a mentoría 1 a 1, plan de 90 días y AI Coach pagando únicamente la inscripción base.</span>
              </li>
              <li className="flex gap-3 text-sm text-slate-300">
                <span className="w-6 h-6 rounded-full bg-indigo-500/30 border border-indigo-500/50 text-indigo-300 font-bold flex items-center justify-center shrink-0 text-xs">3</span>
                <span><strong>Contratación y Pago:</strong> Al firmar tu primer trabajo tech, cubres la diferencia convenida en mensualidades.</span>
              </li>
            </ol>

            <button
              onClick={onApplyDeferred}
              className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 group"
            >
              <span>Aplicar al Pago Diferido</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto glass-card rounded-2xl p-6 border-slate-800">
          <div className="text-center border-b sm:border-b-0 sm:border-r border-slate-800 pb-4 sm:pb-0">
            <span className="text-3xl font-extrabold text-white">95%</span>
            <p className="text-slate-400 text-xs font-medium uppercase mt-1">Colocados en menos de 90 días</p>
          </div>
          <div className="text-center border-b sm:border-b-0 sm:border-r border-slate-800 py-4 sm:py-0">
            <span className="text-3xl font-extrabold text-cyan-400">$25k - $50k MXN</span>
            <p className="text-slate-400 text-xs font-medium uppercase mt-1">Salario promedio de graduados</p>
          </div>
          <div className="text-center pt-4 sm:pt-0">
            <span className="text-3xl font-extrabold text-emerald-400">100%</span>
            <p className="text-slate-400 text-xs font-medium uppercase mt-1">Garantía por contrato escrito</p>
          </div>
        </div>

      </div>
    </section>
  );
}
