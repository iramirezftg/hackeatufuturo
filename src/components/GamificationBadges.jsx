import React, { useState } from 'react';
import { 
  Flame, Award, Trophy, Zap, Star, ShieldCheck, CheckCircle2, 
  Lock, Sparkles, Target, BookOpen, Users, Code2, ArrowUpRight
} from 'lucide-react';

export default function GamificationBadges() {
  const [streakDays, setStreakDays] = useState(14);
  const [xpPoints, setXpPoints] = useState(450);
  const [userLevel, setUserLevel] = useState(4);
  const xpForNextLevel = 600;

  const badges = [
    {
      id: 'streak_7',
      title: 'Racha Imparable 🔥',
      description: 'Mantén una racha de aprendizaje de 7 días consecutivos.',
      icon: Flame,
      category: 'CONSTANCIA',
      unlocked: true,
      progress: '7/7 días',
      color: 'from-amber-500/20 to-orange-500/20 border-amber-500/40 text-amber-400'
    },
    {
      id: 'cv_master',
      title: 'CV Optimizado ATS 📄',
      description: 'Obtén un puntaje de CV superior a 85 en el escáner de IA.',
      icon: CheckCircle2,
      category: 'PERFIL',
      unlocked: true,
      progress: '88/100 ATS',
      color: 'from-cyan-500/20 to-blue-500/20 border-cyan-500/40 text-cyan-400'
    },
    {
      id: 'first_interview',
      title: 'Debút en Entrevistas 🎙️',
      description: 'Completa tu primer simulacro de entrevista de HR.',
      icon: Trophy,
      category: 'PRÁCTICA',
      unlocked: true,
      progress: 'Completado',
      color: 'from-purple-500/20 to-indigo-500/20 border-purple-500/40 text-purple-400'
    },
    {
      id: 'psychometric_genie',
      title: 'Genio Psicométrico 🧠',
      description: 'Supera el test psicométrico con calificación sobresaliente.',
      icon: Zap,
      category: 'APTITUD',
      unlocked: true,
      progress: '94/100',
      color: 'from-pink-500/20 to-rose-500/20 border-pink-500/40 text-pink-400'
    },
    {
      id: 'referral_champion',
      title: 'Embajador Tech 🎁',
      description: 'Invita a tu primer amigo a unirse a Hackea Tu Futuro.',
      icon: Users,
      category: 'COMUNIDAD',
      unlocked: true,
      progress: '2 Referidos',
      color: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/40 text-emerald-400'
    },
    {
      id: 'tech_lead_ninja',
      title: 'Tech Lead Ninja 👑',
      description: 'Completa 5 simulacros de entrevista técnica avanzada.',
      icon: CrownIcon,
      category: 'MASTER',
      unlocked: false,
      progress: '2/5 completadas',
      color: 'from-slate-800 to-slate-900 border-slate-700 text-slate-500'
    }
  ];

  function CrownIcon(props) {
    return <Star {...props} />;
  }

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Duolingo-style Streak & Level Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-950/70 via-slate-900 to-purple-950/70 border border-amber-500/30 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          
          {/* Flame Counter */}
          <div className="flex items-center gap-4 bg-slate-950/80 p-5 rounded-2xl border border-amber-500/30">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/30 animate-pulse shrink-0">
              <Flame className="w-8 h-8 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-extrabold text-white">{streakDays} Días</span>
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold">🔥 EN FUEGO</span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">¡Protector de racha activo hoy!</p>
            </div>
          </div>

          {/* XP Level Bar */}
          <div className="md:col-span-2 space-y-3 bg-slate-950/80 p-5 rounded-2xl border border-purple-500/30">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-purple-400 font-bold uppercase tracking-wider">Nivel de Desarrollador</span>
                <h4 className="text-base font-extrabold text-white">Nivel {userLevel}: Promesa Tech ✨</h4>
              </div>
              <div className="text-right">
                <span className="text-sm font-extrabold text-cyan-400">{xpPoints} / {xpForNextLevel} XP</span>
                <span className="text-[10px] text-slate-400 block">Siguiente: Nivel 5</span>
              </div>
            </div>

            <div className="w-full bg-slate-900 h-3.5 rounded-full overflow-hidden border border-slate-800 p-0.5">
              <div 
                className="bg-gradient-to-r from-purple-500 via-cyan-400 to-emerald-400 h-full rounded-full transition-all duration-1000 shadow-md"
                style={{ width: `${(xpPoints / xpForNextLevel) * 100}%` }}
              />
            </div>
          </div>

        </div>
      </div>

      {/* Badges Collection Grid */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Trophy className="w-6 h-6 text-amber-400" />
              Colección de Logros e Insignias
            </h3>
            <p className="text-xs text-slate-400">Completa desafíos de carrera para desbloquear medallas e incrementar tu multiplicador de XP.</p>
          </div>

          <div className="px-3.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold self-start sm:self-auto">
            🏆 5 de 6 Insignias Desbloqueadas
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {badges.map((b) => {
            const Icon = b.icon;
            return (
              <div 
                key={b.id}
                className={`p-6 rounded-3xl border transition-all relative overflow-hidden flex flex-col justify-between space-y-4 ${
                  b.unlocked 
                    ? `bg-gradient-to-br ${b.color} shadow-lg hover:scale-[1.02]`
                    : 'bg-slate-950/60 border-slate-800 text-slate-500 opacity-70'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-md ${
                    b.unlocked ? 'bg-slate-900/90' : 'bg-slate-900/50 text-slate-600'
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider ${
                    b.unlocked ? 'bg-slate-900/90 text-amber-300 border border-amber-500/30' : 'bg-slate-900 text-slate-600'
                  }`}>
                    {b.unlocked ? '✓ Desbloqueado' : '🔒 Bloqueado'}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{b.category}</span>
                  <h4 className="text-base font-bold text-white mt-0.5">{b.title}</h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">{b.description}</p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-slate-400">
                  <span>Progreso</span>
                  <span className={b.unlocked ? 'text-amber-400 font-bold' : 'text-slate-500'}>{b.progress}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
