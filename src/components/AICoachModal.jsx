import React, { useState } from 'react';
import { X, Bot, Send, Sparkles, User, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function AICoachModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: '¡Hola! Soy tu AI Coach de Hackea tu Futuro. 🚀 ¿Quieres simular una pregunta de entrevista técnica o necesitas retroalimentación para tu CV?',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const samplePrompts = [
    '¿Cómo negocio un salario un 20% más alto?',
    'Simula una pregunta de JavaScript para un puesto Junior',
    '¿Cómo explico que no tengo experiencia laboral previa en mi CV?',
    'Dame 3 tips para responder "¿Cuál es tu mayor debilidad?"',
  ];

  const handleSend = (userText) => {
    const textToSend = userText || input;
    if (!textToSend.trim()) return;

    const newMsgs = [...messages, { sender: 'user', text: textToSend }];
    setMessages(newMsgs);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = '¡Excelente pregunta! ';
      const lower = textToSend.toLowerCase();

      if (lower.includes('salario') || lower.includes('20%') || lower.includes('negocio')) {
        reply += 'Para negociar un salario 20% más alto: 1) Investiga el mercado en Glassdoor/Levels.fyi, 2) Demuestra tus logros con métricas cuantitativas, 3) Ofrece un rango donde tu mínimo sea tu meta ideal, 4) Negocia también beneficios adicionales (remoto, bonos, capacitaciones).';
      } else if (lower.includes('javascript') || lower.includes('pregunta')) {
        reply += 'Aquí va una clásica de entrevista: "¿Qué es el Event Loop en JavaScript y cómo maneja las tareas asíncronas entre la Call Stack y la Microtask Queue?" Intenta explicarlo con tus palabras.';
      } else if (lower.includes('cv') || lower.includes('experiencia')) {
        reply += 'En tu CV no pongas "Sin experiencia". En su lugar, crea la sección "Proyectos Destacados", documenta la tecnología usada, el problema que resolviste y pon el enlace en vivo y de GitHub.';
      } else {
        reply += 'Para destacar en la entrevista, siempre utiliza la metodología STAR (Situación, Tarea, Acción, Resultado). Muestra cómo pensaste bajo presión.';
      }

      setMessages([...newMsgs, { sender: 'bot', text: reply }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-2xl bg-[#080d1a] border border-cyan-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-6 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">
              <Bot className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-base">AI Coach Demo</h3>
                <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-semibold">24/7 ACTIVO</span>
              </div>
              <p className="text-xs text-slate-400">Entrenado con entrevistas reales de la industria tech</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'bot' && (
                <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 text-cyan-400" />
                </div>
              )}

              <div
                className={`max-w-[80%] rounded-2xl p-4 text-sm leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-none'
                    : 'bg-slate-800/80 text-slate-200 border border-slate-700 rounded-tl-none'
                }`}
              >
                {m.text}
              </div>

              {m.sender === 'user' && (
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0 text-white font-bold text-xs">
                  Tú
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 justify-start items-center text-xs text-slate-400 italic">
              <Bot className="w-4 h-4 text-cyan-400 animate-spin" />
              <span>AI Coach está escribiendo una respuesta...</span>
            </div>
          )}
        </div>

        {/* Quick Sample Prompts */}
        <div className="px-4 py-2 bg-slate-900/60 border-t border-slate-800/60 flex flex-wrap gap-2">
          {samplePrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(p)}
              className="text-xs bg-slate-800 hover:bg-slate-700 text-cyan-300 px-3 py-1.5 rounded-lg border border-slate-700 transition-colors text-left truncate max-w-xs"
            >
              ⚡ {p}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
          <input
            type="text"
            placeholder="Escribe tu duda o solicita un simulacro..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500"
          />
          <button
            onClick={() => handleSend()}
            className="px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-all flex items-center justify-center shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
