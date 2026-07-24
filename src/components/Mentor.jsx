import React from 'react';
import { Award, CheckCircle2, Linkedin, Youtube, Instagram, ExternalLink, Sparkles, Code2, Users, Star } from 'lucide-react';

export default function Mentor() {
  const stats = [
    { label: 'Años de Experiencia Tech', val: '8+' },
    { label: 'Comunidad en TikTok', val: '200K+' },
    { label: 'Juniors Colocados', val: '50+' },
    { label: 'Tasa de Éxito', val: '95%' },
  ];

  return (
    <section id="quien-soy" className="py-24 relative bg-gradient-to-b from-[#060913] via-[#0a0f24] to-[#060913] border-t border-slate-800/60 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="glass-card rounded-3xl p-8 sm:p-12 border-slate-800 bg-slate-900/50 relative overflow-hidden">
          {/* Subtle Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Image / Visual Card */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-sm aspect-[4/5] rounded-2xl overflow-hidden border-2 border-slate-700/60 shadow-2xl bg-slate-800 group">
                <img
                  src="/founder.jpg"
                  alt="Israel @isra_developer"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060913] via-transparent to-transparent" />
                
                {/* Floating Badges */}
                <div className="absolute top-4 left-4 bg-[#080d1a]/80 backdrop-blur-md border border-slate-700 rounded-full px-3 py-1 text-xs font-semibold text-cyan-400 flex items-center gap-1.5 shadow-lg">
                  <Award className="w-3.5 h-3.5" />
                  <span>Top Tech Mentor</span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 bg-[#080d1a]/90 backdrop-blur-md border border-slate-700/80 rounded-xl p-3 text-left">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-white text-base">Israel</span>
                    <span className="text-xs text-cyan-400 font-medium">@isra_developer</span>
                  </div>
                  <p className="text-xs text-slate-300">Software Engineer & Tech Career Coach</p>
                </div>
              </div>
            </div>

            {/* Right Bio & Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Quién Soy</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Hola, soy Israel <span className="text-cyan-400">(@isra_developer)</span>
              </h2>

              <p className="text-slate-300 text-base leading-relaxed">
                Durante mis más de 8 años en la industria del software he visto a cientos de desarrolladores talentosos quedarse atascados por no saber vender su experiencia, tener un CV descartado por algoritmos ATS o congelarse en entrevistas técnicas.
              </p>

              <p className="text-slate-300 text-base leading-relaxed">
                Creé <strong>Hackea tu Futuro</strong> para ofrecer el acompañamiento real, transparente y directo que a mí me hubiera gustado tener cuando inicié en el mundo tech.
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4">
                {stats.map((s, idx) => (
                  <div key={idx} className="bg-slate-800/40 rounded-xl p-3 border border-slate-700/50 text-center">
                    <div className="text-2xl font-black text-white">{s.val}</div>
                    <div className="text-[11px] font-medium text-slate-400 mt-1">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Social Media links */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <span className="text-sm font-semibold text-slate-400">Sígueme en redes:</span>
                <div className="flex items-center gap-3">
                  <a
                    href="https://tiktok.com"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-cyan-400 transition-colors border border-slate-700"
                    title="TikTok"
                  >
                    <Star className="w-4 h-4" />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-cyan-400 transition-colors border border-slate-700"
                    title="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-rose-400 transition-colors border border-slate-700"
                    title="YouTube"
                  >
                    <Youtube className="w-4 h-4" />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-pink-400 transition-colors border border-slate-700"
                    title="Instagram"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
