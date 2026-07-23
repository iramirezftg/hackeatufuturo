import React from 'react';
import { Sparkles, Linkedin, Youtube, Instagram, Star, Heart } from 'lucide-react';

export default function Footer({ onOpenAuth }) {
  return (
    <footer id="contacto" className="bg-[#04060d] border-t border-slate-800/80 pt-16 pb-12 text-slate-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800/60">
          
          {/* Column 1: Brand */}
          <div className="md:col-span-5 space-y-4 text-left">
            <a href="#" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 p-[1px] flex items-center justify-center">
                <div className="w-full h-full bg-[#04060d] rounded-[11px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                Hackea tu <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Futuro</span>
              </span>
            </a>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Transformando desarrolladores juniors en candidatos altamente cotizados mediante mentoría 1 a 1, preparación de entrevistas y herramientas con Inteligencia Artificial.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-cyan-400 flex items-center justify-center transition-colors border border-slate-800"
              >
                <Star className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-cyan-400 flex items-center justify-center transition-colors border border-slate-800"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-rose-400 flex items-center justify-center transition-colors border border-slate-800"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-pink-400 flex items-center justify-center transition-colors border border-slate-800"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="md:col-span-3 space-y-3 text-left">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Navegación</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#programa-premium" className="hover:text-cyan-400 transition-colors">Programa Premium</a></li>
              <li><a href="#pago-diferido" className="hover:text-cyan-400 transition-colors">Pago Diferido</a></li>
              <li><a href="#quien-soy" className="hover:text-cyan-400 transition-colors">Quién Soy (@isra_developer)</a></li>
              <li><a href="#universidades" className="hover:text-cyan-400 transition-colors">Para Universidades</a></li>
              <li><a href="#empresas" className="hover:text-cyan-400 transition-colors">Para Empresas</a></li>
              <li><a href="#faq" className="hover:text-cyan-400 transition-colors">Preguntas Frecuentes</a></li>
            </ul>
          </div>

          {/* Column 3: Legal & Account */}
          <div className="md:col-span-4 space-y-3 text-left">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Cuenta y Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => onOpenAuth('login')} className="hover:text-white transition-colors text-left">
                  Iniciar Sesión de Alumno
                </button>
              </li>
              <li>
                <button onClick={() => onOpenAuth('register')} className="hover:text-white transition-colors text-left">
                  Registrarse Gratis
                </button>
              </li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Términos y Condiciones</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Política de Privacidad</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Garantía por Contrato</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© 2026 Hackea tu Futuro por @isra_developer. Todos los derechos reservados.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Hecho con</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>para la comunidad dev de LATAM</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
