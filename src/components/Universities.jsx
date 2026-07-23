import React, { useState } from 'react';
import { GraduationCap, CheckCircle2, Send, Sparkles, School, Users, Calendar } from 'lucide-react';

export default function Universities() {
  const topics = [
    'Tu Primera Chamba Tech',
    'CV y LinkedIn que Venden',
    'Entrevistas Técnicas sin Miedo',
    'De Junior a Senior en 2 Años',
    'Soft Skills para Devs',
    'Networking Efectivo',
  ];

  const [selectedTopics, setSelectedTopics] = useState(['Tu Primera Chamba Tech']);
  const [formData, setFormData] = useState({
    institution: '',
    name: '',
    email: '',
    phone: '',
    studentsCount: '100-300',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const toggleTopic = (topic) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter((t) => t !== topic));
    } else {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="universidades" className="py-24 relative bg-gradient-to-b from-[#060913] via-[#091024] to-[#060913] border-t border-slate-800/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-4">
            <GraduationCap className="w-4 h-4" />
            <span>Para Universidades & Instituciones</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Conferencias y Talleres que Inspiran
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Conectamos la educación académica con las habilidades exactas que exige la industria tecnológica actual.
          </p>
        </div>

        {/* Content & Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Offer Details & Topics Selector */}
          <div className="lg:col-span-6 space-y-8 text-left">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Lleva la voz de la industria a tus aulas
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Charlas dinámicas, motivacionales y 100% enfocadas en la empleabilidad real. Ayudamos a tus estudiantes a entender el mercado laboral, destacar en postulaciones y perder el miedo a las entrevistas.
              </p>
            </div>

            {/* Topics Pill Picker */}
            <div>
              <h4 className="text-sm font-bold uppercase text-slate-400 tracking-wider mb-3">
                Temas más solicitados (Haz clic para seleccionar):
              </h4>
              <div className="flex flex-wrap gap-2.5">
                {topics.map((topic) => {
                  const isSelected = selectedTopics.includes(topic);
                  return (
                    <button
                      key={topic}
                      type="button"
                      onClick={() => toggleTopic(topic)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
                        isSelected
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 border border-blue-400'
                          : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 border border-slate-700'
                      }`}
                    >
                      <CheckCircle2 className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-slate-500'}`} />
                      <span>{topic}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* University Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800">
              <div className="glass-card rounded-2xl p-4 text-center">
                <School className="w-5 h-5 text-blue-400 mx-auto mb-1" />
                <span className="text-xl font-bold text-white">25+</span>
                <p className="text-[11px] text-slate-400">Universidades</p>
              </div>
              <div className="glass-card rounded-2xl p-4 text-center">
                <Users className="w-5 h-5 text-indigo-400 mx-auto mb-1" />
                <span className="text-xl font-bold text-white">10K+</span>
                <p className="text-[11px] text-slate-400">Alumnos impactados</p>
              </div>
              <div className="glass-card rounded-2xl p-4 text-center">
                <Calendar className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
                <span className="text-xl font-bold text-white">4.9/5</span>
                <p className="text-[11px] text-slate-400">Satisfacción</p>
              </div>
            </div>

          </div>

          {/* Right Column: Request Form */}
          <div className="lg:col-span-6 glass-card rounded-3xl p-8 border-slate-800 bg-slate-900/60 shadow-2xl">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-bold text-white">¡Solicitud Enviada!</h4>
                <p className="text-slate-300 text-sm max-w-md mx-auto">
                  Gracias por tu interés. Israel o nuestro equipo académico se pondrá en contacto contigo en menos de 24 horas para coordinar la fecha y agenda de la conferencia.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-slate-800 text-slate-200 hover:bg-slate-700 text-sm font-semibold"
                >
                  Enviar otra solicitud
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-xl font-bold text-white mb-2">Solicitar Conferencia o Taller</h3>
                
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Institución Educativa / Universidad *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. UNAM, IPN, Tec de Monterrey..."
                    value={formData.institution}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                      Nombre del Contacto *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Tu nombre completo"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                      Correo Institucional *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="contacto@universidad.edu"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                      Teléfono / WhatsApp
                    </label>
                    <input
                      type="tel"
                      placeholder="+52 55 1234 5678"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                      Estimado de Asistentes
                    </label>
                    <select
                      value={formData.studentsCount}
                      onChange={(e) => setFormData({ ...formData, studentsCount: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                    >
                      <option value="50-100">50 - 100 alumnos</option>
                      <option value="100-300">100 - 300 alumnos</option>
                      <option value="300-500">300 - 500 alumnos</option>
                      <option value="500+">+500 alumnos (Auditorio)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Temas Seleccionados:
                  </label>
                  <div className="p-3 bg-slate-800/40 rounded-xl border border-slate-700/60 text-xs text-blue-300 font-medium flex flex-wrap gap-1.5">
                    {selectedTopics.map((t) => (
                      <span key={t} className="bg-blue-500/20 px-2 py-0.5 rounded border border-blue-500/30">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Solicitar Conferencia</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
