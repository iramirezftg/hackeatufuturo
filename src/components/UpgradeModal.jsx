import React from 'react';
import { Sparkles, Check, X, ShieldCheck, Zap, Crown, Lock } from 'lucide-react';

export default function UpgradeModal({ isOpen, onClose, featureName }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-xl bg-[#080d1a] border border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden relative">
        
        {/* Glow backdrop */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-amber-950/60 via-slate-900 to-purple-950/60 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Crown className="w-6 h-6 animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-white text-lg">Función Exclusiva Premium 🎉</h3>
              </div>
              <p className="text-xs text-amber-300">Desbloquea el potencial completo de tu carrera tech</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {featureName && (
            <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-center">
              <p className="text-xs text-amber-300 font-semibold uppercase tracking-wider">Acceso Restringido en Plan Gratuito</p>
              <h4 className="text-base font-bold text-white mt-1">"{featureName}" requiere Plan Premium</h4>
            </div>
          )}

          {/* Plan Comparison List */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Lo que obtienes al actualizar a Premium:</h5>
            <div className="space-y-2 text-xs sm:text-sm text-slate-200">
              <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 flex items-center justify-between">
                <span className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-amber-400" /> Chat Coach IA 24/7 sin límites de mensajes</span>
                <Check className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 flex items-center justify-between">
                <span className="flex items-center gap-2"><Zap className="w-4 h-4 text-purple-400" /> Entrevistas Psicométricas & Técnicas de Coding</span>
                <Check className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 flex items-center justify-between">
                <span className="flex items-center gap-2"><Crown className="w-4 h-4 text-cyan-400" /> Analytics de Carrera & Gráficos comparativos de mercado</span>
                <Check className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 flex items-center justify-between">
                <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-emerald-400" /> Recomendaciones Personalizadas de Empleos & Cursos</span>
                <Check className="w-4 h-4 text-emerald-400" />
              </div>
            </div>
          </div>

          {/* Pricing Highlight */}
          <div className="p-5 bg-gradient-to-r from-amber-500/20 via-purple-500/20 to-slate-900 rounded-2xl border border-amber-500/30 text-center space-y-1">
            <span className="text-xs text-amber-300 font-bold uppercase">Oferta Especial por Lanzamiento</span>
            <div className="text-3xl font-extrabold text-white">
              $19 <span className="text-sm font-normal text-slate-400">USD / mes</span>
            </div>
            <p className="text-[11px] text-slate-400">Cancela en cualquier momento sin penalizaciones.</p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => {
                alert('¡Felicidades! Tu cuenta se ha actualizado a Plan PREMIUM 🎉.');
                onClose();
              }}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-extrabold text-sm shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2"
            >
              <Crown className="w-4 h-4 fill-current" />
              <span>Actualizar a Premium Ahora</span>
            </button>
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-sm border border-slate-700"
            >
              Seguir en Plan Gratis
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
