import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: '¿Para quién está diseñado este programa?',
      a: 'Está dirigido a estudiantes de sistemas/informática, recién egresados de universidad, graduados de bootcamps o desarrolladores autodidactas que llevan semanas o meses intentando conseguir su primer trabajo tech sin éxito.',
    },
    {
      q: '¿Cómo funciona la modalidad de Pago Diferido?',
      a: 'Firmamos un convenio donde pagas una inscripción simbólica para cubrir recursos y herramientas iniciales. El grueso del valor del programa solo lo pagas una vez que firmes tu oferta de trabajo tech, en mensualidades accesibles sin intereses.',
    },
    {
      q: '¿Necesito tener un título universitario para conseguir trabajo tech?',
      a: 'No. El mercado tecnológico actual valora tus proyectos demostrables, tu capacidad de resolver problemas, tu perfil en GitHub/LinkedIn y tu desenvolvimiento en la entrevista técnica por encima de un título académico.',
    },
    {
      q: '¿Cuánto tiempo toma habitualmente conseguir trabajo con el programa?',
      a: 'El plan estructurado está diseñado para completarse en 90 días. El 95% de los alumnos que siguen activamente las recomendaciones y completan los entregables consiguen oferta entre el segundo y tercer mes.',
    },
    {
      q: '¿Qué nivel técnico necesito para aprovechar la mentoría?',
      a: 'Debes conocer las bases de programación en al menos un lenguaje (JavaScript, Python, Java, C#, PHP, HTML/CSS). Nosotros te enseñamos a estructurar tu portafolio, optimizar tus algoritmos, pasar pruebas técnicas y vender tu perfil.',
    },
    {
      q: '¿Qué es y cómo funciona el AI Coach?',
      a: 'Es nuestro asistente virtual inteligente entrenado específicamente con las preguntas reales de entrevista de más de 50 empresas tech. Te permite practicar mock interviews 24/7, recibir retroalimentación instantánea de tu código y pulir tus respuestas.',
    },
    {
      q: '¿Qué pasa si no consigo empleo al terminar el plan de 90 días?',
      a: 'Si aplicaste el método y seguiste todos los pasos semanalmente pero no consigues empleo en el periodo estipulado, la garantía por contrato entra en vigor: continuaremos dándote mentoría sin costo adicional o quedas exento de cubrir la cuota diferida.',
    },
  ];

  return (
    <section id="faq" className="py-24 relative bg-gradient-to-b from-[#060913] via-[#091024] to-[#060913] border-t border-slate-800/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-wider mb-4">
            <HelpCircle className="w-4 h-4" />
            <span>Resolvemos tus Dudas</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Preguntas Frecuentes
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            Todo lo que necesitas saber antes de dar el siguiente paso en tu carrera profesional.
          </p>
        </div>

        {/* Accordions List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="glass-card rounded-2xl border-slate-800 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-white hover:text-cyan-400 transition-colors focus:outline-none"
                >
                  <span className="text-base sm:text-lg">{faq.q}</span>
                  <div className={`w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-cyan-500/20 text-cyan-400' : 'text-slate-400'}`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-0 text-slate-300 text-sm leading-relaxed border-t border-slate-800/40 animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
