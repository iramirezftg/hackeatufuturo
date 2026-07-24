import React, { useState } from 'react';
import { 
  Briefcase, Plus, ChevronRight, ChevronLeft, Trash2, Mail, ExternalLink, 
  DollarSign, MapPin, Calendar, CheckCircle2, Clock, X, Sparkles, Building, Filter, Copy, Check
} from 'lucide-react';

export default function JobTrackerKanban() {
  const [newJobModalOpen, setNewJobModalOpen] = useState(false);
  const [followupModalOpen, setFollowupModalOpen] = useState(false);
  const [selectedJobForFollowup, setSelectedJobForFollowup] = useState(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // 5 Kanban Stages
  const columns = [
    { id: 'saved', label: '📌 Guardadas', color: 'border-slate-700 bg-slate-900/60 text-slate-300' },
    { id: 'applied', label: '✉️ Postulado', color: 'border-blue-500/40 bg-blue-950/20 text-blue-300' },
    { id: 'interview', label: '🎙️ Entrevista', color: 'border-purple-500/40 bg-purple-950/20 text-purple-300' },
    { id: 'offer', label: '🎯 Oferta Recibida', color: 'border-emerald-500/40 bg-emerald-950/20 text-emerald-300' },
    { id: 'archived', label: '❌ Archivado', color: 'border-slate-800 bg-slate-950/40 text-slate-500' }
  ];

  // Initial Sample Applications Data
  const [jobs, setJobs] = useState([
    {
      id: 'job_1',
      company: 'Google',
      role: 'Software Engineer (Frontend)',
      stage: 'interview',
      location: 'Remoto (LATAM)',
      salary: '$2,500 USD / mes',
      appliedDate: '18 Jul 2026',
      notes: 'Entrevista técnica de React & System Design agendada.',
      url: 'https://careers.google.com/jobs/results'
    },
    {
      id: 'job_2',
      company: 'Mercado Libre',
      role: 'Fullstack React & Node Engineer',
      stage: 'offer',
      location: 'Híbrido (Ciudad de México)',
      salary: '$2,800 USD / mes',
      appliedDate: '10 Jul 2026',
      notes: 'Oferta recibida por correo. Revisión de beneficios de gastos médicos.',
      url: 'https://jobs.mercadolibre.com'
    },
    {
      id: 'job_3',
      company: 'Globant',
      role: 'Frontend Developer',
      stage: 'applied',
      location: 'Remoto',
      salary: '$2,000 USD / mes',
      appliedDate: '21 Jul 2026',
      notes: 'CV enviado a través del portal de reclutamiento.',
      url: 'https://www.globant.com/careers'
    },
    {
      id: 'job_4',
      company: 'Stripe',
      role: 'Frontend Infrastructure Engineer',
      stage: 'saved',
      location: 'Remoto (US Company)',
      salary: '$3,200 USD / mes',
      appliedDate: 'Sin postular aún',
      notes: 'Vacante guardada. Falta adaptar CV para filtro ATS en inglés.',
      url: 'https://stripe.com/jobs'
    },
    {
      id: 'job_5',
      company: 'Rappi',
      role: 'Junior Frontend Engineer',
      stage: 'interview',
      location: 'Remoto',
      salary: '$1,800 USD / mes',
      appliedDate: '15 Jul 2026',
      notes: 'Primera llamada completada con HR. En espera de prueba técnica.',
      url: 'https://rappi.com/careers'
    }
  ]);

  // New Job Form State
  const [newJobForm, setNewJobForm] = useState({
    company: '',
    role: '',
    stage: 'applied',
    location: 'Remoto (LATAM)',
    salary: '',
    notes: '',
    url: ''
  });

  // Move Card to Next or Previous Stage
  const moveJobStage = (jobId, direction) => {
    const stageOrder = ['saved', 'applied', 'interview', 'offer', 'archived'];
    setJobs(jobs.map(j => {
      if (j.id === jobId) {
        const currentIdx = stageOrder.indexOf(j.stage);
        const newIdx = direction === 'next' ? Math.min(currentIdx + 1, stageOrder.length - 1) : Math.max(currentIdx - 1, 0);
        return { ...j, stage: stageOrder[newIdx] };
      }
      return j;
    }));
  };

  const handleDeleteJob = (jobId) => {
    setJobs(jobs.filter(j => j.id !== jobId));
  };

  const handleCreateJob = (e) => {
    e.preventDefault();
    if (!newJobForm.company || !newJobForm.role) return;

    const newJob = {
      id: `job_${Date.now()}`,
      company: newJobForm.company,
      role: newJobForm.role,
      stage: newJobForm.stage,
      location: newJobForm.location || 'Remoto',
      salary: newJobForm.salary || 'A convenir',
      appliedDate: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }),
      notes: newJobForm.notes || 'Postulación registrada en el CRM.',
      url: newJobForm.url || '#'
    };

    setJobs([newJob, ...jobs]);
    setNewJobModalOpen(false);
    setNewJobForm({
      company: '',
      role: '',
      stage: 'applied',
      location: 'Remoto (LATAM)',
      salary: '',
      notes: '',
      url: ''
    });
  };

  const openFollowupForJob = (job) => {
    setSelectedJobForFollowup(job);
    setFollowupModalOpen(true);
  };

  // Stats Counters
  const totalCount = jobs.length;
  const inInterviewCount = jobs.filter(j => j.stage === 'interview').length;
  const offersCount = jobs.filter(j => j.stage === 'offer').length;

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-900/70 via-indigo-900/50 to-slate-900 border border-blue-500/30 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-bold shadow-lg">
              <Briefcase className="w-4 h-4 text-cyan-400" />
              <span>CRM de Empleo & Postulaciones 💼</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Kanban Tracker de Empleos
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Administra el ciclo de vida de tus postulaciones laborales, mueve tus vacantes entre etapas y genera correos de seguimiento automático con la IA.
            </p>
          </div>

          <button
            onClick={() => setNewJobModalOpen(true)}
            className="px-6 py-3.5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-sm shadow-lg shadow-cyan-500/30 flex items-center gap-2 shrink-0 transition-all"
          >
            <Plus className="w-5 h-5" />
            <span>Agregar Nueva Postulación</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 bg-slate-900/90 border border-slate-800 rounded-2xl text-center">
          <span className="text-xs text-slate-400 font-medium">Postulaciones Registradas</span>
          <div className="text-2xl font-extrabold text-white mt-1">{totalCount} Vacantes</div>
        </div>

        <div className="p-5 bg-slate-900/90 border border-purple-500/30 rounded-2xl text-center">
          <span className="text-xs text-purple-400 font-bold uppercase">En Proceso de Entrevista</span>
          <div className="text-2xl font-extrabold text-purple-300 mt-1">{inInterviewCount} Entrevistas</div>
        </div>

        <div className="p-5 bg-slate-900/90 border border-emerald-500/30 rounded-2xl text-center">
          <span className="text-xs text-emerald-400 font-bold uppercase">Ofertas Recibidas</span>
          <div className="text-2xl font-extrabold text-emerald-300 mt-1">{offersCount} Ofertas 🎯</div>
        </div>
      </div>

      {/* Kanban Board 5 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto no-scrollbar pb-4">
        {columns.map(col => {
          const colJobs = jobs.filter(j => j.stage === col.id);
          return (
            <div key={col.id} className="bg-slate-950 border border-slate-800/80 rounded-3xl p-4 space-y-4 min-w-[260px] flex flex-col justify-between">
              
              {/* Column Header */}
              <div className={`p-3 rounded-2xl border ${col.color} flex items-center justify-between font-bold text-xs`}>
                <span>{col.label}</span>
                <span className="w-5 h-5 rounded-full bg-slate-900/90 text-white flex items-center justify-center text-[11px]">
                  {colJobs.length}
                </span>
              </div>

              {/* Cards in Column */}
              <div className="space-y-3 flex-1 overflow-y-auto max-h-[600px] pr-1">
                {colJobs.length === 0 ? (
                  <div className="p-6 text-center text-xs text-slate-600 border border-dashed border-slate-800/80 rounded-2xl">
                    Sin postulaciones
                  </div>
                ) : (
                  colJobs.map(job => (
                    <div
                      key={job.id}
                      className="bg-slate-900 border border-slate-800 hover:border-cyan-500/40 rounded-2xl p-4 space-y-3 shadow-lg transition-all relative group"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-extrabold text-cyan-400 uppercase tracking-wider flex items-center gap-1">
                            <Building className="w-3 h-3" /> {job.company}
                          </span>
                          <h4 className="text-xs sm:text-sm font-bold text-white leading-snug mt-0.5">{job.role}</h4>
                        </div>
                        
                        <button
                          onClick={() => handleDeleteJob(job.id)}
                          className="text-slate-600 hover:text-rose-400 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          title="Eliminar postulación"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="space-y-1 text-[11px] text-slate-400">
                        <div className="flex items-center gap-1.5"><MapPin className="w-3 h-3 text-slate-500" /><span>{job.location}</span></div>
                        <div className="flex items-center gap-1.5 text-emerald-400 font-medium"><DollarSign className="w-3 h-3 text-emerald-500" /><span>{job.salary}</span></div>
                      </div>

                      <p className="text-[11px] text-slate-300 bg-slate-950 p-2.5 rounded-xl border border-slate-800/60 leading-relaxed">
                        {job.notes}
                      </p>

                      {/* Card Footer Actions */}
                      <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-1">
                        {/* Followup Email Trigger */}
                        <button
                          onClick={() => openFollowupForJob(job)}
                          className="text-[10px] px-2 py-1 rounded-lg bg-purple-600/20 text-purple-300 border border-purple-500/30 hover:bg-purple-600/30 font-bold flex items-center gap-1"
                          title="Generar correo post-entrevista"
                        >
                          <Mail className="w-3 h-3" />
                          <span>Seguimiento</span>
                        </button>

                        {/* Stage Nav Buttons */}
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => moveJobStage(job.id, 'prev')}
                            disabled={col.id === 'saved'}
                            className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white disabled:opacity-30"
                            title="Mover a etapa anterior"
                          >
                            <ChevronLeft className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => moveJobStage(job.id, 'next')}
                            disabled={col.id === 'archived'}
                            className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white disabled:opacity-30"
                            title="Avanzar etapa"
                          >
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

            </div>
          );
        })}
      </div>

      {/* New Job Modal */}
      {newJobModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-xl bg-[#080d1a] border border-cyan-500/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-cyan-400" />
                <h3 className="text-lg font-bold text-white">Registrar Nueva Postulación</h3>
              </div>
              <button onClick={() => setNewJobModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateJob} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Empresa *</label>
                  <input
                    type="text"
                    required
                    value={newJobForm.company}
                    onChange={(e) => setNewJobForm({ ...newJobForm, company: e.target.value })}
                    placeholder="Ej: Mercado Libre"
                    className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Puesto *</label>
                  <input
                    type="text"
                    required
                    value={newJobForm.role}
                    onChange={(e) => setNewJobForm({ ...newJobForm, role: e.target.value })}
                    placeholder="Ej: Fullstack React Engineer"
                    className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Etapa Inicial</label>
                  <select
                    value={newJobForm.stage}
                    onChange={(e) => setNewJobForm({ ...newJobForm, stage: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="saved">📌 Guardada</option>
                    <option value="applied">✉️ Postulado</option>
                    <option value="interview">🎙️ Entrevista</option>
                    <option value="offer">🎯 Oferta Recibida</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Modalidad / Ubicación</label>
                  <input
                    type="text"
                    value={newJobForm.location}
                    onChange={(e) => setNewJobForm({ ...newJobForm, location: e.target.value })}
                    placeholder="Ej: Remoto LATAM"
                    className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Rango Salarial (opcional)</label>
                  <input
                    type="text"
                    value={newJobForm.salary}
                    onChange={(e) => setNewJobForm({ ...newJobForm, salary: e.target.value })}
                    placeholder="Ej: $2,500 USD / mes"
                    className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Enlace a Vacante (opcional)</label>
                  <input
                    type="url"
                    value={newJobForm.url}
                    onChange={(e) => setNewJobForm({ ...newJobForm, url: e.target.value })}
                    placeholder="https://empresa.com/jobs/123"
                    className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300">Notas / Seguimiento</label>
                <textarea
                  rows={3}
                  value={newJobForm.notes}
                  onChange={(e) => setNewJobForm({ ...newJobForm, notes: e.target.value })}
                  placeholder="Detalles sobre los requisitos, fecha de la entrevista o tecnología clave solicitada..."
                  className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setNewJobModalOpen(false)}
                  className="px-5 py-3 rounded-xl bg-slate-800 text-slate-300 font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold shadow-lg"
                >
                  Guardar Postulación
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* Followup Generator Integration Modal */}
      {followupModalOpen && selectedJobForFollowup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-xl bg-[#080d1a] border border-purple-500/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-purple-400" />
                <h3 className="text-lg font-bold text-white">Correo Post-Entrevista para {selectedJobForFollowup.company}</h3>
              </div>
              <button onClick={() => setFollowupModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-purple-400 uppercase">Borrador Generado con IA</span>
              <pre className="p-4 bg-slate-900 rounded-xl text-slate-200 text-xs font-sans whitespace-pre-wrap leading-relaxed border border-slate-800">
{`Asunto: Agradecimiento por la entrevista para el puesto de ${selectedJobForFollowup.role} en ${selectedJobForFollowup.company}

Estimado Equipo de Selección de ${selectedJobForFollowup.company},

Quería agradecerles sinceramente por el tiempo dedicado durante la entrevista para el puesto de ${selectedJobForFollowup.role}.

Disfruté mucho aprender más sobre los proyectos del equipo y la cultura de la empresa. Quedo a su entera disposición si requieren referencias adicionales o muestras de mi trabajo.

Saludos cordiales,
[Tu Nombre]`}
              </pre>
            </div>

            <div className="flex justify-between items-center">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`Asunto: Agradecimiento por la entrevista en ${selectedJobForFollowup.company}...`);
                  setCopiedEmail(true);
                  setTimeout(() => setCopiedEmail(false), 3000);
                }}
                className="px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg flex items-center gap-2"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedEmail ? '¡Copiado!' : 'Copiar Texto al Portapapeles'}</span>
              </button>

              <button
                onClick={() => setFollowupModalOpen(false)}
                className="px-5 py-3 rounded-xl bg-slate-800 text-slate-300 font-semibold text-xs"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
