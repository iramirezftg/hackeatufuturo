import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Video, Calendar, CreditCard, Sparkles, Award, PlayCircle, 
  CheckCircle2, Clock, User, LogOut, ArrowLeft, ExternalLink, ChevronRight, 
  ShieldCheck, FileText, Send, Flame, Target, Code2, Rocket, Plus, Check, X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AICareerCoachSuite from './AICareerCoachSuite';
import GamificationBadges from './GamificationBadges';
import ReferralProgram from './ReferralProgram';
import CodeEditorSandbox from './CodeEditorSandbox';
import DigitalCertificates from './DigitalCertificates';
import NotificationCenter from './NotificationCenter';
import CommunityForum from './CommunityForum';
import JobTrackerKanban from './JobTrackerKanban';

export default function StudentDashboard({ onGoHome, onOpenAICoach }) {
  const { user, token, logout } = useAuth();
  
  const [activeTab, setActiveTab] = useState('courses'); // 'courses', 'mentors', 'billing', 'profile'
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const getTodayString = () => new Date().toISOString().split('T')[0];
  const getTomorrowString = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  };

  const [selectedVideo, setSelectedVideo] = useState(null); // { lesson, courseTitle }
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [bookingDate, setBookingDate] = useState(getTomorrowString());
  const [bookingTime, setBookingTime] = useState('16:00');
  const [bookingTopic, setBookingTopic] = useState('');
  const [actionSuccess, setActionSuccess] = useState('');

  // Fetch Dashboard Data
  const fetchDashboard = async () => {
    if (!token) return;
    try {
      const res = await fetch('/api/student/dashboard', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const text = await res.text();
        try {
          const data = JSON.parse(text);
          setDashboardData(data);
        } catch (jsonErr) {
          console.warn('Dashboard response was not JSON:', jsonErr);
        }
      }
    } catch (err) {
      console.error('Error loading student dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, [token]);

  const handleToggleLesson = async (lessonId) => {
    try {
      const res = await fetch('/api/student/toggle-lesson', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ lessonId })
      });
      if (res.ok) {
        fetchDashboard();
      }
    } catch (err) {
      console.error('Error toggling lesson:', err);
    }
  };

  const handleScheduleMentor = async (e) => {
    e.preventDefault();
    if (!selectedMentor) return;

    try {
      const res = await fetch('/api/student/schedule-mentor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          mentorId: selectedMentor.id,
          mentorName: selectedMentor.name,
          dateTime: `${bookingDate} a las ${bookingTime} hrs`,
          topic: bookingTopic || 'Revisión de Carrera y Código'
        })
      });

      if (res.ok) {
        setActionSuccess('¡Mentoría agendada con éxito!');
        setTimeout(() => setActionSuccess(''), 4000);
        setBookingModalOpen(false);
        setBookingTopic('');
        fetchDashboard();
      }
    } catch (err) {
      console.error('Error scheduling mentor:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#060913] flex items-center justify-center text-slate-400">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm">Cargando tu Dashboard de Estudiante...</p>
        </div>
      </div>
    );
  }

  const currentUser = dashboardData?.user || user;
  const courses = dashboardData?.courses || [];
  const mentors = dashboardData?.mentors || [];
  const bookings = dashboardData?.bookings || [];
  const transactions = dashboardData?.transactions || [];

  return (
    <div className="min-h-screen bg-[#060913] text-slate-100 font-sans pb-16">
      
      {/* Top Header Navigation */}
      <header className="border-b border-slate-800 bg-[#080d1a]/80 backdrop-blur-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onGoHome}
              className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver a la Inicio</span>
            </button>
            <div className="h-4 w-[1px] bg-slate-800"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-[1px]">
                <div className="w-full h-full bg-[#080d1a] rounded-[11px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <span className="font-bold text-white tracking-wide text-sm hidden sm:inline">Hackea tu Futuro Portal</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <NotificationCenter />

            <button
              onClick={onOpenAICoach}
              className="hidden md:flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              <span>AI Coach 24/7</span>
            </button>

            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl">
              <img
                src={currentUser?.avatarUrl || '/founder.jpg'}
                alt={currentUser?.name}
                className="w-6 h-6 rounded-full object-cover border border-cyan-400"
              />
              <span className="text-xs font-semibold text-white">{currentUser?.name}</span>
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-blue-600/30 text-cyan-300 border border-cyan-500/30">
                {currentUser?.plan?.toUpperCase() || 'ESTUDIANTE'}
              </span>
            </div>

            <button
              onClick={logout}
              title="Cerrar Sesión"
              className="p-2 text-slate-400 hover:text-rose-400 rounded-xl hover:bg-slate-900 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {actionSuccess && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm flex items-center justify-between animate-fade-in">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5" />
              <span>{actionSuccess}</span>
            </div>
            <button onClick={() => setActionSuccess('')} className="text-emerald-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Welcome Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-950 via-slate-900 to-[#080d1a] border border-slate-800 p-6 sm:p-8 mb-8 shadow-2xl">
          <div className="absolute right-0 top-0 w-96 h-96 bg-cyan-500/10 blur-3xl rounded-full pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2">
                <Flame className="w-4 h-4 text-amber-400" />
                <span>Racha de Aprendizaje: {currentUser?.streakDays || 14} días seguidos</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                ¡Bienvenido de vuelta, {currentUser?.name?.split(' ')[0]}! 👋
              </h1>
              <p className="text-sm text-slate-400 mt-1 max-w-2xl">
                Continúa con tus módulos de programación, agenda tus mentorías 1 a 1 y consulta la asistencia del AI Coach en tiempo real.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 text-center min-w-[110px]">
                <div className="text-2xl font-bold text-white">{currentUser?.totalHours || 42}h</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Horas de Estudio</div>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 text-center min-w-[110px]">
                <div className="text-2xl font-bold text-cyan-400">{courses.length}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Cursos Activos</div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-800 mb-8 overflow-x-auto no-scrollbar">
          {[
            { id: 'courses', label: 'Mis Cursos & Lecciones', icon: BookOpen },
            { id: 'ai-coach', label: 'AI Career Coach 🎉', icon: Sparkles },
            { id: 'tracker', label: 'Tracker de Empleos 💼', icon: Code2 },
            { id: 'sandbox', label: 'IDE Sandbox 💻', icon: Code2 },
            { id: 'certificates', label: 'Certificados 🎓', icon: Award },
            { id: 'community', label: 'Comunidad & Peer Review 👥', icon: ExternalLink },
            { id: 'badges', label: 'Logros & Badges 🏆', icon: ShieldCheck },
            { id: 'referrals', label: 'Invita & Gana 🎁', icon: Rocket },
            { id: 'mentors', label: 'Mentorías 1 a 1', icon: Calendar },
            { id: 'billing', label: 'Pagos & Suscripción', icon: CreditCard },
            { id: 'profile', label: 'Mi Perfil', icon: User },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-3 px-5 border-b-2 font-semibold text-sm whitespace-nowrap transition-colors ${
                  isActive
                    ? 'border-cyan-400 text-cyan-400 bg-cyan-500/5'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB: AI CAREER COACH SUITE */}
        {activeTab === 'ai-coach' && (
          <AICareerCoachSuite onOpenGlobalCoach={onOpenAICoach} />
        )}

        {/* TAB: JOB TRACKER KANBAN */}
        {activeTab === 'tracker' && (
          <JobTrackerKanban />
        )}

        {/* TAB: CODE EDITOR SANDBOX */}
        {activeTab === 'sandbox' && (
          <CodeEditorSandbox />
        )}

        {/* TAB: DIGITAL CERTIFICATES */}
        {activeTab === 'certificates' && (
          <DigitalCertificates user={currentUser} />
        )}

        {/* TAB: COMMUNITY FORUM & PEER REVIEW */}
        {activeTab === 'community' && (
          <CommunityForum user={currentUser} />
        )}

        {/* TAB: GAMIFICATION BADGES */}
        {activeTab === 'badges' && (
          <GamificationBadges />
        )}

        {/* TAB: REFERRAL PROGRAM */}
        {activeTab === 'referrals' && (
          <ReferralProgram user={currentUser} />
        )}

        {/* TAB 1: COURSES & LESSONS */}
        {activeTab === 'courses' && (
          <div className="space-y-8 animate-fade-in">
            {courses.map((course) => (
              <div key={course.id} className="bg-[#080d1a] border border-slate-800 rounded-3xl overflow-hidden shadow-xl p-6 sm:p-8">
                
                {/* Course Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-1">
                      <Code2 className="w-4 h-4" />
                      <span>{course.category} • Instructor: {course.instructor}</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white">{course.title}</h2>
                    <p className="text-sm text-slate-400 mt-1 max-w-3xl">{course.description}</p>
                  </div>

                  <div className="flex flex-col items-start md:items-end min-w-[200px]">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-300 mb-1">
                      <span>Progreso del Curso:</span>
                      <span className="text-cyan-400">{course.progressPercentage}%</span>
                    </div>
                    <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-800">
                      <div
                        className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${course.progressPercentage}%` }}
                      ></div>
                    </div>
                    <span className="text-[11px] text-slate-500 mt-1">
                      {course.completedLessons} de {course.totalLessons} lecciones completadas
                    </span>
                  </div>
                </div>

                {/* Modules List */}
                <div className="space-y-6">
                  {course.modules.map((module) => (
                    <div key={module.id} className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-base font-bold text-white flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                          <span>{module.title}</span>
                        </h3>
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{module.duration}</span>
                        </span>
                      </div>

                      <div className="space-y-2">
                        {module.lessons.map((lesson) => (
                          <div
                            key={lesson.id}
                            className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800/50 hover:border-slate-700 transition-all group"
                          >
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => handleToggleLesson(lesson.id)}
                                title={lesson.completed ? 'Marcar como pendiente' : 'Marcar como completada'}
                                className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-colors ${
                                  lesson.completed
                                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                                    : 'bg-slate-800 border-slate-700 text-transparent hover:border-cyan-500'
                                }`}
                              >
                                <Check className="w-3.5 h-3.5" />
                              </button>

                              <span className={`text-xs sm:text-sm font-medium ${lesson.completed ? 'text-slate-400 line-through' : 'text-slate-200'}`}>
                                {lesson.title}
                              </span>
                            </div>

                            <div className="flex items-center gap-3">
                              <span className="text-xs text-slate-500 hidden sm:inline">{lesson.duration}</span>
                              <button
                                onClick={() => setSelectedVideo({ lesson, courseTitle: course.title })}
                                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/20 transition-colors"
                              >
                                <PlayCircle className="w-3.5 h-3.5" />
                                <span>Ver Lección</span>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            ))}
          </div>
        )}

        {/* TAB 2: MENTORSHIPS */}
        {activeTab === 'mentors' && (
          <div className="space-y-8 animate-fade-in">
            
            {/* Upcoming Confirmed Bookings */}
            <div className="bg-[#080d1a] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Video className="w-5 h-5 text-cyan-400" />
                <span>Próximas Mentorías Programadas</span>
              </h2>

              {bookings.length === 0 ? (
                <div className="text-center py-8 border border-dashed border-slate-800 rounded-2xl text-slate-400 text-sm">
                  No tienes mentorías agendadas actualmente. Elige a continuación un mentor para agendar.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="p-5 rounded-2xl bg-gradient-to-tr from-slate-900 to-slate-800/80 border border-slate-700 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-extrabold uppercase px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          Confirmada
                        </span>
                        <span className="text-xs text-cyan-400 font-semibold">{booking.dateTime}</span>
                      </div>
                      <h4 className="text-base font-bold text-white">{booking.topic}</h4>
                      <p className="text-xs text-slate-400">Mentor: <strong className="text-slate-200">{booking.mentorName}</strong></p>
                      
                      <a
                        href={booking.meetUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors"
                      >
                        <Video className="w-4 h-4" />
                        <span>Entrar a la Videollamada (Google Meet)</span>
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Available Tech Mentors */}
            <div className="bg-[#080d1a] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
              <h2 className="text-xl font-bold text-white mb-6">Mentores Disponibles para Ti</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mentors.map((mentor) => (
                  <div key={mentor.id} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-4">
                    <div className="flex items-start gap-4">
                      <img
                        src={mentor.avatar}
                        alt={mentor.name}
                        className="w-14 h-14 rounded-2xl object-cover border border-cyan-400/50"
                      />
                      <div>
                        <h3 className="text-lg font-bold text-white">{mentor.name}</h3>
                        <p className="text-xs text-cyan-400 font-medium">{mentor.role}</p>
                        
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {mentor.expertise.map((exp, i) => (
                            <span key={i} className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md border border-slate-700">
                              {exp}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-800 space-y-3">
                      <div>
                        <span className="block text-xs font-semibold text-slate-400 mb-1.5 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Horarios disponibles esta semana:</span>
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {mentor.availableTimes?.map((slot, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => {
                                setSelectedMentor(mentor);
                                if (slot.includes(':')) {
                                  const parts = slot.split(' ');
                                  if (parts.length > 1) setBookingTime(parts[1]);
                                }
                                setBookingModalOpen(true);
                              }}
                              className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-cyan-500/20 text-cyan-300 border border-slate-700 hover:border-cyan-500/50 transition-colors flex items-center gap-1"
                            >
                              <Sparkles className="w-3 h-3 text-cyan-400" />
                              <span>{slot}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setSelectedMentor(mentor);
                          setBookingModalOpen(true);
                        }}
                        className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-bold text-xs hover:opacity-90 transition-opacity shadow-md shadow-cyan-500/10"
                      >
                        <Calendar className="w-4 h-4" />
                        <span>Agendar 1 a 1 con {mentor.name.split(' ')[0]}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: BILLING & SUBSCRIPTION */}
        {activeTab === 'billing' && (
          <div className="space-y-8 animate-fade-in">
            
            {/* Current Plan Overview */}
            <div className="bg-[#080d1a] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">Tu Suscripción Actual</span>
                  <h2 className="text-2xl font-extrabold text-white mt-1">
                    Plan {currentUser?.plan?.toUpperCase() || 'PRO'} HACKEAR EL FUTURO
                  </h2>
                  <p className="text-sm text-slate-400 mt-1">
                    Acceso activo e ilimitado a todos los módulos de código, mentorías personalizadas y revisión de proyectos.
                  </p>
                </div>

                <div className="bg-slate-900 border border-slate-700 px-5 py-3 rounded-2xl flex items-center gap-3">
                  <ShieldCheck className="w-8 h-8 text-emerald-400" />
                  <div>
                    <div className="text-xs font-bold text-white">Estado: Activo</div>
                    <div className="text-[11px] text-slate-400">Renovación automática</div>
                  </div>
                </div>
              </div>

              {/* Transaction History */}
              <h3 className="text-base font-bold text-white mb-4">Historial de Transacciones & Recibos</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="py-3 px-4">ID Transacción</th>
                      <th className="py-3 px-4">Detalle / Plan</th>
                      <th className="py-3 px-4">Fecha</th>
                      <th className="py-3 px-4">Monto</th>
                      <th className="py-3 px-4">Método</th>
                      <th className="py-3 px-4">Recibo</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {transactions.map((tx) => (
                      <tr key={tx.id} className="hover:bg-slate-900/50">
                        <td className="py-3 px-4 font-mono text-cyan-400">{tx.id}</td>
                        <td className="py-3 px-4 font-medium text-white">{tx.planName}</td>
                        <td className="py-3 px-4 text-slate-400">{new Date(tx.createdAt).toLocaleDateString()}</td>
                        <td className="py-3 px-4 font-bold text-white">${tx.amount} MXN</td>
                        <td className="py-3 px-4 text-slate-400">{tx.paymentMethod}</td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => alert(`Descargando comprobante oficial para ${tx.id}...`)}
                            className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-semibold"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span>Descargar</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 4: USER PROFILE */}
        {activeTab === 'profile' && (
          <div className="bg-[#080d1a] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl max-w-3xl mx-auto space-y-6 animate-fade-in">
            <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-4">Tu Perfil de Alumno</h2>

            <div className="flex items-center gap-4">
              <img
                src={currentUser?.avatarUrl}
                alt={currentUser?.name}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-cyan-400"
              />
              <div>
                <h3 className="text-lg font-bold text-white">{currentUser?.name}</h3>
                <p className="text-xs text-slate-400">{currentUser?.email}</p>
                <span className="inline-block mt-2 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md bg-blue-600/30 text-cyan-300 border border-cyan-500/30">
                  Estudiante Activo
                </span>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-800">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Nombre Completo</label>
                <input
                  type="text"
                  readOnly
                  value={currentUser?.name || ''}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Correo Electrónico</label>
                <input
                  type="email"
                  readOnly
                  value={currentUser?.email || ''}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Meta Profesional</label>
                <input
                  type="text"
                  defaultValue="Conseguir puesto como Senior Full-Stack / AI Engineer en 6 meses"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Lesson Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-4xl bg-[#080d1a] border border-slate-800 rounded-3xl shadow-2xl overflow-hidden p-6 relative">
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4">
              <span className="text-xs font-bold text-cyan-400 uppercase">{selectedVideo.courseTitle}</span>
              <h3 className="text-xl font-bold text-white">{selectedVideo.lesson.title}</h3>
            </div>

            <div className="relative pt-[56.25%] rounded-2xl overflow-hidden bg-black border border-slate-800">
              <iframe
                className="absolute inset-0 w-full h-full"
                src={selectedVideo.lesson.videoUrl}
                title={selectedVideo.lesson.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <button
                onClick={() => {
                  handleToggleLesson(selectedVideo.lesson.id);
                  setSelectedVideo(null);
                }}
                className="px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold hover:bg-emerald-500/30 transition-colors flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Marcar Lección como Completada</span>
              </button>

              <button
                onClick={() => setSelectedVideo(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-white text-xs font-semibold hover:bg-slate-700"
              >
                Cerrar Reproductor
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Booking Mentor Modal */}
      {bookingModalOpen && selectedMentor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-md bg-[#080d1a] border border-slate-800 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 relative">
            <button
              onClick={() => setBookingModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-white mb-1">Agendar Mentoría 1 a 1</h3>
            <p className="text-xs text-slate-400 mb-4">Con {selectedMentor.name} ({selectedMentor.role})</p>

            {/* Mentor Available Slots Banner */}
            <div className="mb-4 p-3 rounded-2xl bg-slate-900 border border-slate-800 space-y-1.5">
              <span className="text-[11px] font-semibold text-cyan-400 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span>Horarios habituales del mentor:</span>
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedMentor.availableTimes?.map((slot, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      if (slot.includes(':')) {
                        const parts = slot.split(' ');
                        if (parts.length > 1) setBookingTime(parts[1]);
                      }
                    }}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-cyan-500/20 text-slate-200 border border-slate-700 hover:border-cyan-400 font-medium transition-colors"
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleScheduleMentor} className="space-y-4">
              
              {/* Date Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Fecha de la Sesión
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                  <input
                    type="date"
                    required
                    min={getTodayString()}
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* Time Input & Quick Slots */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Hora de la Sesión
                </label>
                <div className="relative mb-2">
                  <Clock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                  <input
                    type="time"
                    required
                    value={bookingTime}
                    onChange={(e) => setBookingTime(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="w-full text-[11px] text-slate-500">Horarios recomendados:</span>
                  {['09:00', '11:00', '14:00', '16:00', '18:00', '20:00'].map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setBookingTime(slot)}
                      className={`text-xs px-2.5 py-1 rounded-lg border transition-colors ${
                        bookingTime === slot
                          ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400'
                          : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {slot} hrs
                    </button>
                  ))}
                </div>
              </div>

              {/* Topic */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Tema Principal de la Sesión
                </label>
                <textarea
                  rows={2}
                  placeholder="Ej. Revisión de código de mi proyecto de React o preparación de entrevista"
                  value={bookingTopic}
                  onChange={(e) => setBookingTopic(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                ></textarea>
              </div>

              {/* Summary Box */}
              <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-500">Fecha y Hora:</span>
                  <span className="font-bold text-cyan-400">{bookingDate} a las {bookingTime} hrs</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Formato:</span>
                  <span>Videollamada Google Meet 1 a 1</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Confirmar Reserva ({bookingDate})</span>
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
