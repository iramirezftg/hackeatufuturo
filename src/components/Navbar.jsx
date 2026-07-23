import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, UserCheck, ChevronRight } from 'lucide-react';

export default function Navbar({ onOpenAuth, onOpenAICoach }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Programa Premium', href: '#programa-premium' },
    { name: 'Pago Diferido', href: '#pago-diferido' },
    { name: 'Quién Soy', href: '#quien-soy' },
    { name: 'Universidades', href: '#universidades' },
    { name: 'Para Empresas', href: '#empresas' },
    { name: 'Preguntas', href: '#faq' },
    { name: 'Contacto', href: '#contacto' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#080d1a]/90 backdrop-blur-md border-b border-slate-800/60 py-3 shadow-xl shadow-black/40'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 p-[1.5px] flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#080d1a] rounded-[10.5px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight text-white leading-none">
                Hackea tu <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Futuro</span>
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/40 rounded-lg transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* CTA & Auth Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => onOpenAuth('login')}
              className="px-4 py-2 text-sm font-semibold text-slate-300 hover:text-white transition-colors"
            >
              Iniciar Sesión
            </button>
            <button
              onClick={() => onOpenAuth('register')}
              className="px-4 py-2 text-sm font-semibold text-slate-900 bg-white hover:bg-slate-100 rounded-lg shadow-md hover:shadow-cyan-500/10 transition-all transform active:scale-95"
            >
              Registrarse Gratis
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white rounded-lg focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#080d1a]/95 backdrop-blur-xl border-b border-slate-800 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 text-base font-medium text-slate-200 hover:bg-slate-800/60 rounded-lg transition-colors flex items-center justify-between"
              >
                {link.name}
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </a>
            ))}
          </nav>
          <div className="pt-4 border-t border-slate-800/80 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuth('login');
              }}
              className="w-full py-2.5 text-center text-sm font-semibold text-slate-300 border border-slate-700/80 rounded-lg hover:bg-slate-800 transition-colors"
            >
              Iniciar Sesión
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuth('register');
              }}
              className="w-full py-2.5 text-center text-sm font-semibold text-slate-900 bg-white hover:bg-slate-100 rounded-lg shadow transition-colors"
            >
              Registrarse Gratis
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
