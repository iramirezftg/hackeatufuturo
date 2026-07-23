import React, { useState } from 'react';
import { X, Sparkles, Lock, Mail, User, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function RegisterModal({ isOpen, mode = 'register', onClose }) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState(mode);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-md bg-[#080d1a] border border-slate-800 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 relative">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-400 p-[1px] mx-auto mb-3 flex items-center justify-center shadow-lg">
            <div className="w-full h-full bg-[#080d1a] rounded-[15px] flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-cyan-400" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white">
            {activeTab === 'register' ? 'Crea tu cuenta gratis' : 'Bienvenido de nuevo'}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {activeTab === 'register'
              ? 'Accede al AI Coach y a la plataforma de Hackea tu Futuro'
              : 'Ingresa tus credenciales para acceder a tus mentorías'}
          </p>
        </div>

        {/* Toggle tabs */}
        <div className="flex bg-slate-900 rounded-xl p-1 mb-6 border border-slate-800">
          <button
            onClick={() => { setActiveTab('register'); setSubmitted(false); }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${
              activeTab === 'register' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Registrarse
          </button>
          <button
            onClick={() => { setActiveTab('login'); setSubmitted(false); }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${
              activeTab === 'login' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Iniciar Sesión
          </button>
        </div>

        {submitted ? (
          <div className="text-center py-6 space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white">
              {activeTab === 'register' ? '¡Registro completado!' : '¡Sesión iniciada!'}
            </h4>
            <p className="text-xs text-slate-400">
              Redirigiendo a tu dashboard de alumno...
            </p>
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-slate-800 text-white font-semibold text-xs hover:bg-slate-700"
            >
              Cerrar ventana
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {activeTab === 'register' && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Nombre Completo
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    placeholder="Tu nombre"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Correo Electrónico
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  placeholder="tu@correo.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 mt-2"
            >
              <span>{activeTab === 'register' ? 'Crear Cuenta Gratis' : 'Iniciar Sesión'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
