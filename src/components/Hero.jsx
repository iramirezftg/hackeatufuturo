import React from 'react';
import { Sparkles, ArrowRight, Zap, CheckCircle2, TrendingUp, Users, Award, Play } from 'lucide-react';

export default function Hero({ onOpenAICoach, onSelectPremium }) {
  const pills = [
    { icon: TrendingUp, label: 'Mentoría 1 a 1' },
    { icon: Zap, label: 'AI Coach' },
    { icon: CheckCircle2, label: 'Cursos grabados' },
    { icon: Sparkles, label: 'Plan 90 días' },
  ];

  const stats = [
    { value: '50+', label: 'Juniors colocados', gradient: 'from-cyan-400 to-emerald-400' },
    { value: '95%', label: 'Tasa de éxito', gradient: 'from-blue-400 to-indigo-400' },
    { value: '200K+', label: 'TikTok', gradient: 'from-rose-400 to-amber-400' },
  ];

  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden bg-grid-pattern bg-radial-gradient">
      {/* Background Glowing Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[300px] bg-purple-600/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[300px] bg-cyan-500/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-slate-700/60 mb-8 animate-fade-in shadow-inner">
          <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
          <span className="text-sm font-semibold text-slate-200">
            Por <span className="text-cyan-400 font-bold">@isra_developer</span> • +50 juniors 🚀
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.1] mb-6">
          Consigue tu primer{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-[0_10px_20px_rgba(59,130,246,0.3)]">
            trabajo tech
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed mb-10">
          Mentoría personalizada, AI Coach, cursos grabados y un plan probado para transformarte de junior confundido a developer contratado.
        </p>

        {/* Feature Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 max-w-3xl mx-auto mb-12">
          {pills.map((pill, idx) => {
            const Icon = pill.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm text-sm font-medium text-slate-200 hover:bg-slate-800/70 transition-all cursor-default"
              >
                <Icon className="w-4 h-4 text-cyan-400" />
                <span>{pill.label}</span>
              </div>
            );
          })}
        </div>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-20">
          <a
            href="#programa-premium"
            onClick={onSelectPremium}
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 hover:from-amber-300 hover:to-orange-400 shadow-lg shadow-orange-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 group"
          >
            <Sparkles className="w-5 h-5 fill-slate-950" />
            <span>Programa Premium</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>

          <button
            onClick={onOpenAICoach}
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-white bg-slate-800/60 border border-slate-700 hover:bg-slate-800 hover:border-slate-600 transition-all flex items-center justify-center gap-2 backdrop-blur-md"
          >
            <span>Prueba AI Coach gratis</span>
          </button>
        </div>

        {/* Hero Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="glass-card rounded-2xl p-6 sm:p-8 text-center border-slate-800/80 hover:border-slate-700 transition-all"
            >
              <div
                className={`text-4xl sm:text-5xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2 tracking-tight`}
              >
                {stat.value}
              </div>
              <div className="text-sm font-medium text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
