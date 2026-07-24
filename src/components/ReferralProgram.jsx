import React, { useState } from 'react';
import { 
  Gift, Users, Copy, Check, Share2, Sparkles, Trophy, 
  ArrowRight, Award, MessageCircle, Linkedin, Twitter, Mail
} from 'lucide-react';

export default function ReferralProgram({ user }) {
  const [copied, setCopied] = useState(false);

  const userName = user?.name ? user.name.toLowerCase().replace(/\s+/g, '-') : 'carlos-mendoza';
  const referralLink = `https://hackeatufuturo.com/ref/${userName}`;

  const rewards = [
    {
      invitedCount: 1,
      title: '1 Mes de AI Coach Premium Gratis 🎁',
      description: 'Acceso completo e ilimitado al Chat IA, análisis de CV y simuladores de entrevista.',
      achieved: true
    },
    {
      invitedCount: 3,
      title: '$50 USD de Descuento en Bootcamps 💰',
      description: 'Cupón directo aplicable a cualquiera de nuestros bootcamps con mentoría personalizada.',
      achieved: false
    },
    {
      invitedCount: 5,
      title: 'Pase VIP de por vida 👑',
      description: 'Prioridad máxima en agendamiento con mentores Staff Engineers y revisión de portafolio.',
      achieved: false
    }
  ];

  const invitedFriends = [
    { name: 'María Fernanda Ruiz', date: 'Hace 2 días', status: 'Registrado (Plan PRO)', rewarded: true },
    { name: 'Gabriel Torres', date: 'Hace 5 días', status: 'Registrado (Plan Gratis)', rewarded: true },
    { name: 'Sofía Castro', date: 'Pendiente', status: 'Invitación enviada', rewarded: false },
  ];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Banner Program Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-900/70 via-indigo-900/50 to-slate-900 border border-purple-500/30 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold shadow-lg">
            <Gift className="w-4 h-4 text-amber-400" />
            <span>Programa de Invita y Gana 🎁</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Invita a tus amigos a Hackea Tu Futuro y gana meses de Premium GRATIS
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Comparte tu enlace único con compañeros de universidad o colegas. Cuando tus amigos se registren, ambos obtendrán recompensas exclusivas.
          </p>

          {/* Share Box */}
          <div className="pt-4 space-y-3">
            <label className="text-xs font-bold text-slate-300">Tu Enlace Personal de Referido:</label>
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <input
                type="text"
                readOnly
                value={referralLink}
                className="w-full px-4 py-3.5 rounded-2xl bg-slate-950/80 border border-slate-700 text-cyan-300 font-mono text-xs sm:text-sm focus:outline-none"
              />
              <button
                onClick={handleCopyLink}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm shadow-lg flex items-center justify-center gap-2 shrink-0 transition-all"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? '¡Enlace Copiado!' : 'Copiar Enlace'}</span>
              </button>
            </div>

            {/* Social Share Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <span className="text-xs text-slate-400 font-medium">Compartir directo en:</span>
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`¡Únete a Hackea Tu Futuro y acelera tu carrera tech! Usa mi enlace personal: ${referralLink}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-600/30 transition-colors"
                title="Compartir en WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(referralLink)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-blue-600/20 text-blue-300 border border-blue-500/30 hover:bg-blue-600/30 transition-colors"
                title="Compartir en LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`¡Aprende programación y prepárate para entrevistas con AI Coach en Hackea Tu Futuro! ${referralLink}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-cyan-600/20 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-600/30 transition-colors"
                title="Compartir en Twitter/X"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Rewards Ladder */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-400" />
              Escalafón de Recompensas
            </h3>
            <p className="text-xs text-slate-400">Desbloquea premios acumulables por cada nivel de amigos invitados.</p>
          </div>
          <span className="text-xs text-purple-400 font-bold bg-purple-500/10 px-3 py-1 rounded-xl border border-purple-500/30">
            2 Amigos Registrados
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {rewards.map((r, idx) => (
            <div 
              key={idx}
              className={`p-6 rounded-3xl border space-y-4 relative flex flex-col justify-between ${
                r.achieved
                  ? 'bg-gradient-to-br from-amber-500/10 via-slate-950 to-slate-900 border-amber-500/40'
                  : 'bg-slate-950/70 border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 font-bold text-xs flex items-center justify-center">
                  {r.invitedCount}
                </span>
                <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${
                  r.achieved ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-slate-800 text-slate-500'
                }`}>
                  {r.achieved ? '✓ Recompensado' : 'Pendiente'}
                </span>
              </div>

              <div>
                <h4 className="text-base font-bold text-white">{r.title}</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">{r.description}</p>
              </div>

              <div className="pt-2 text-xs font-semibold text-slate-500">
                {r.invitedCount === 1 ? '1 Amigo requerido' : `${r.invitedCount} Amigos requeridos`}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Invited Friends List */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Users className="w-5 h-5 text-cyan-400" />
          Tus Amigos Invitados ({invitedFriends.length})
        </h3>

        <div className="space-y-3">
          {invitedFriends.map((friend, idx) => (
            <div key={idx} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white">{friend.name}</h4>
                <p className="text-xs text-slate-400">{friend.date} • {friend.status}</p>
              </div>

              <span className={`px-3 py-1 rounded-xl text-xs font-semibold ${
                friend.rewarded ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30' : 'bg-slate-800 text-slate-400'
              }`}>
                {friend.rewarded ? '🎁 Premio Otorgado' : '⏳ Pendiente'}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
