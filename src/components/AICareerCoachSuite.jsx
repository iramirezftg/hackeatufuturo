import React, { useState } from 'react';
import { 
  Bot, Sparkles, MessageSquare, FileText, Video, BarChart3, Target, 
  Upload, CheckCircle2, AlertCircle, ArrowRight, Zap, RefreshCw, Send, 
  Award, TrendingUp, ShieldCheck, Play, UserCheck, BookOpen, Star, Lock,
  Mail, Calendar, Clock, Brain, Code2, Users, Check, Copy, ChevronRight
} from 'lucide-react';

import UpgradeModal from './UpgradeModal';

export default function AICareerCoachSuite({ onOpenGlobalCoach }) {
  // Modules: 'chat', 'cv', 'mock', 'followup', 'roadmap', 'analytics', 'recommendations'
  const [activeModule, setActiveModule] = useState('chat');
  const [currentPlan, setCurrentPlan] = useState('pro'); // 'free' or 'pro'
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);
  const [restrictedFeatureName, setRestrictedFeatureName] = useState('');

  const handleModuleClick = (moduleId, featureTitle, isPremium) => {
    if (currentPlan === 'free' && isPremium) {
      setRestrictedFeatureName(featureTitle);
      setUpgradeModalOpen(true);
    } else {
      setActiveModule(moduleId);
    }
  };

  // ================= MODULE 1: CHAT CON COACH IA =================
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'bot',
      text: '¡Hola! Soy tu AI Career Coach 24/7. Estoy listo para ayudarte con estrategias de carrera, optimización de CV, técnicas de negociación salarial o preparación para tu próxima entrevista.',
    },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const samplePrompts = [
    '¿Cómo negocio un salario un 20% más alto?',
    '¿Cómo optimizo mis proyectos en GitHub para destacar ante recruiters?',
    '¿Qué preguntas debo hacerle al reclutador al final de la entrevista?',
    'Dame una estrategia para cambiar de área a Fullstack Developer',
  ];

  const handleSendChat = (text) => {
    const messageToSend = text || chatInput;
    if (!messageToSend.trim()) return;

    const newMsgs = [...chatMessages, { sender: 'user', text: messageToSend }];
    setChatMessages(newMsgs);
    setChatInput('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = '¡Excelente pregunta! ';
      const lower = messageToSend.toLowerCase();

      if (lower.includes('salario') || lower.includes('20%') || lower.includes('negocio')) {
        reply += 'Para negociar un incremento salarial del 20% o más:\n\n1. **Investiga el mercado:** Consulta rangos salariales en Glassdoor o Levels.fyi para tu rol y nivel de experiencia.\n2. **Demuestra impacto medible:** No hables solo de tus responsabilidades, resalta métricas reales (ej. "Optimicé la velocidad de la app en un 35% y reduje bugs en producción").\n3. **Ancla alto con un rango:** En lugar de dar una cifra exacta, da un rango donde tu objetivo deseado sea el valor mínimo.\n4. **Considera el paquete total:** Si el sueldo base es fijo, negocia bonos, días libres adicionales, presupuesto para capacitación o trabajo remoto.';
      } else if (lower.includes('cv') || lower.includes('github')) {
        reply += 'Para destacar en tu perfil técnico:\n\n• Agrega READMEs profesionales con GIFs/demos en vivo en tus proyectos.\n• Destaca la arquitectura y las tecnologías que usaste.\n• Incluye métricas de rendimiento y enlaces funcionales.';
      } else if (lower.includes('entrevista') || lower.includes('preguntas')) {
        reply += 'Al final de la entrevista, haz preguntas estratégicas como:\n\n1. "¿Cuáles son los mayores desafíos técnicos que el equipo enfrenta actualmente?"\n2. "¿Cómo miden el éxito de este rol en los primeros 90 días?"\n3. "¿Qué oportunidades de crecimiento o mentoría existen dentro del equipo?"';
      } else {
        reply += 'Para alcanzar tu siguiente objetivo profesional, te recomiendo definir un roadmap de 90 días enfocado en proyectos reales de alto impacto, práctica constante de algoritmos/arquitectura y retroalimentación directa con mentores seniors.';
      }

      setChatMessages([...newMsgs, { sender: 'bot', text: reply }]);
      setIsTyping(false);
    }, 1000);
  };

  // ================= MODULE 2: ANÁLISIS DE CV CON IA =================
  const [cvFile, setCvFile] = useState(null);
  const [isAnalyzingCV, setIsAnalyzingCV] = useState(false);
  const [cvResult, setCvResult] = useState(null);

  const handleSimulateCVUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setCvFile(file);
      analyzeCV(file.name);
    }
  };

  const analyzeCV = (fileName) => {
    setIsAnalyzingCV(true);
    setCvResult(null);

    setTimeout(() => {
      setIsAnalyzingCV(false);
      setCvResult({
        fileName: fileName || 'Mi_Curriculum_Tech.pdf',
        atsScore: 88,
        summary: 'Tu CV tiene una estructura sólida con keywords clave de desarrollo Frontend y React.',
        strengths: [
          'Estructura clara de secciones y formato legible por filtros ATS.',
          'Manejo destacado de stack moderno (React, JavaScript ES6+, Tailwind CSS).',
          'Inclusión de enlaces a proyectos en GitHub y repositorios públicos.'
        ],
        weaknesses: [
          'Faltan métricas cuantitativas de impacto en las descripciones de tus experiencias pasadas.',
          'Sección de Educación podría sintetizarse para dar más peso a Proyectos y Logros Técnicos.'
        ],
        actionableTips: [
          'Reemplaza verbos pasivos por verbos de acción ("Lideré", "Implementé", "Reduje").',
          'Agrega palabras clave de Backend (Node.js, Express, PostgreSQL) para aspirar a roles Fullstack.',
          'Asegúrate de colocar tu correo electrónico y LinkedIn en la cabecera principal.'
        ]
      });
    }, 2000);
  };

  // ================= MODULE 3: MOCK INTERVIEWS (3 CATEGORÍAS BASE44) =================
  const [selectedInterviewCategory, setSelectedInterviewCategory] = useState(null); // 'hr', 'psychometric', 'technical'
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [isEvaluating, setIsEvaluating] = useState(false);

  const interviewDetails = {
    hr: {
      title: 'Entrevista HR (Recursos Humanos)',
      badge: '✓ Gratis',
      badgeClass: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
      category: 'RECURSOS HUMANOS',
      questions: [
        'Cuéntame sobre una ocasión donde tuviste que manejar un cambio de prioridades inesperado.',
        '¿Por qué te interesa unirte a nuestra empresa y qué esperas de tu líder directo?'
      ]
    },
    psychometric: {
      title: 'Evaluación Psicométrica & Liderazgo',
      badge: '👑 Premium',
      badgeClass: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
      category: 'TESTS DE PERSONALIDAD Y APTITUD',
      questions: [
        'En un escenario de alta presión donde un entregable crítico falla a 1 hora del lanzamiento, ¿cuáles son tus primeras 3 acciones?',
        '¿Cómo prefieres recibir retroalimentación constructiva cuando cometes un error técnico?'
      ]
    },
    technical: {
      title: 'Entrevista Técnica (Coding & System Design)',
      badge: '👑 Premium',
      badgeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      category: 'CODING & SYSTEM DESIGN',
      questions: [
        '¿Cómo diseñarías una arquitectura frontend para soportar renderizado en tiempo real con WebSockets y fallback a Polling?',
        'Explica la diferencia entre mutar estado directamente vs inmutabilidad en React y sus efectos en el motor de reconciliación.'
      ]
    }
  };

  const handleEvaluateAnswer = () => {
    if (!userAnswer.trim()) return;
    setIsEvaluating(true);

    setTimeout(() => {
      setIsEvaluating(false);
      setFeedback({
        score: 94,
        positives: 'Estructura clara de respuesta usando el método STAR. Demostraste aplomo y madurez profesional.',
        improvement: 'Puedes sintetizar la parte introductoria para dar más tiempo a la solución técnica planteada.',
        starScore: '⭐⭐⭐⭐⭐'
      });
    }, 1500);
  };

  // ================= MODULE 4: ASISTENTE POST-ENTREVISTA (BASE44 SCREENSHOT 1) =================
  const [followupData, setFollowupData] = useState({
    company: '',
    role: '',
    interviewer: '',
    summary: '',
    feedback: ''
  });
  const [isGeneratingEmail, setIsGeneratingEmail] = useState(false);
  const [generatedEmail, setGeneratedEmail] = useState(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleGenerateFollowup = (e) => {
    e.preventDefault();
    if (!followupData.company || !followupData.role) return;

    setIsGeneratingEmail(true);
    setGeneratedEmail(null);

    setTimeout(() => {
      setIsGeneratingEmail(false);
      const interviewerName = followupData.interviewer || 'Equipo de Selección';
      const emailBody = `Asunto: Agradecimiento por la entrevista para el puesto de ${followupData.role} en ${followupData.company}

Estimado/a ${interviewerName},

Querías agradecerte sinceramente por el tiempo dedicado durante la entrevista de hoy para el rol de ${followupData.role} en ${followupData.company}.

Disfruté mucho aprender más sobre la visión del equipo y los proyectos que están impulsando. ${followupData.summary ? `En particular, me entusiasmó mucho nuestra conversación sobre: "${followupData.summary}".` : ''}

${followupData.feedback ? `Aprecio mucho los comentarios compartidos respecto a: "${followupData.feedback}".` : ''}

Quedo a tu entera disposición si necesitan referencias adicionales o muestras de mi trabajo. Espero con entusiasmo los siguientes pasos del proceso.

Saludos cordiales,
[Tu Nombre]
[Tu Teléfono / LinkedIn]`;

      setGeneratedEmail(emailBody);
    }, 1500);
  };

  // ================= MODULE 5: GENERADOR DE RUTA DE CARRERA (BASE44 SCREENSHOT 2) =================
  const [roadmapSubTab, setRoadmapSubTab] = useState('roadmap'); // 'roadmap', 'sessions', 'messages', 'resources'
  const [directMessages, setDirectMessages] = useState([
    { sender: 'coach', text: '¡Hola! He revisado tu perfil y el progreso de tu Ruta de Carrera. ¿Tienes alguna duda sobre la preparación para tu próxima entrevista?', time: '10:30 AM' },
    { sender: 'user', text: 'Hola Coach, sí. Quería preguntar si el proyecto de React que agregué está listo para presentar a los reclutadores.', time: '10:32 AM' },
    { sender: 'coach', text: '¡Se ve excelente! Solo te sugiero agregar un diagrama breve de arquitectura en el README para que los ingenieros seniors entiendan tu toma de decisiones.', time: '10:35 AM' }
  ]);
  const [directInput, setDirectInput] = useState('');

  const [roadmapForm, setRoadmapForm] = useState({
    currentRole: 'Software Engineer',
    skills: 'Python, React, SQL, Leadership',
    interests: 'Product Management, Innovation, Team Leadership',
    experienceYears: '5',
    education: 'Computer Science',
    expectedSalary: '$100k - $150k',
    workLifeBalance: 'Medio'
  });
  const [isGeneratingRoadmap, setIsGeneratingRoadmap] = useState(false);
  const [generatedRoadmap, setGeneratedRoadmap] = useState(null);

  const handleGenerateRoadmap = (e) => {
    e.preventDefault();
    setIsGeneratingRoadmap(true);
    setGeneratedRoadmap(null);

    setTimeout(() => {
      setIsGeneratingRoadmap(false);
      setGeneratedRoadmap({
        targetTitle: 'Senior Engineering Manager / Staff Technical Lead',
        timeframe: '12 a 18 meses',
        estimatedSalary: roadmapForm.expectedSalary || '$110k - $140k USD',
        milestones: [
          {
            phase: 'Fase 1: Meses 1 - 3 (Consolidación Técnica & Arquitectura)',
            action: 'Profundizar en System Design para sistemas distribuidos y mentoría de desarrolladores Juniors.',
            skills: ['System Architecture', 'Code Review Best Practices', 'Performance Profiling']
          },
          {
            phase: 'Fase 2: Meses 4 - 8 (Liderazgo de Proyectos & Producto)',
            action: 'Liderar células de desarrollo multifuncionales conectando métricas de ingeniería con OKRs de negocio.',
            skills: ['Agile Roadmap Planning', 'Cross-functional Collaboration', 'Product Analytics']
          },
          {
            phase: 'Fase 3: Meses 9 - 12 (Estrategia & Negociación)',
            action: 'Optimizar procesos de contratación interna y representar al equipo en decisiones ejecutivas.',
            skills: ['Tech Hiring & Culture', 'Executive Communication', 'Budget & Resource Allocation']
          }
        ]
      });
    }, 1800);
  };

  // ================= MODULE 6: ANALYTICS & RECOMENDACIONES =================
  const skillMetrics = [
    { name: 'JavaScript / ES6+', score: 90, market: 85, color: 'bg-yellow-500' },
    { name: 'React.js & Architecture', score: 85, market: 80, color: 'bg-cyan-500' },
    { name: 'Node.js & Backend APIs', score: 75, market: 78, color: 'bg-green-500' },
    { name: 'Algoritmos & Estructuras', score: 68, market: 75, color: 'bg-purple-500' },
    { name: 'Técnicas de Entrevista', score: 82, market: 70, color: 'bg-pink-500' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Interactive Plan Switcher Bar for Demo Testing */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-slate-950 border border-slate-800 p-4 rounded-2xl gap-3">
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400 font-semibold">Modo de Cuenta:</span>
          <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${
            currentPlan === 'pro' 
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' 
              : 'bg-slate-800 text-slate-300 border border-slate-700'
          }`}>
            {currentPlan === 'pro' ? '👑 PLAN PREMIUM PRO' : '⚡ PLAN GRATUITO'}
          </span>
          <span className="text-[11px] text-slate-500 hidden md:inline">
            (Cambia para probar el bloqueo de funciones Premium vs Gratis)
          </span>
        </div>

        <button
          onClick={() => setCurrentPlan(currentPlan === 'pro' ? 'free' : 'pro')}
          className="text-xs px-4 py-2 rounded-xl bg-purple-600/20 text-purple-300 border border-purple-500/30 hover:bg-purple-600/30 font-bold transition-all shadow-sm"
        >
          Probar como {currentPlan === 'pro' ? 'Usuario Gratuito' : 'Usuario Premium 👑'}
        </button>
      </div>

      {/* Hero Welcome Premium Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-900/70 via-indigo-900/50 to-slate-900 border border-purple-500/30 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold shadow-lg">
              <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>{currentPlan === 'pro' ? '¡Bienvenido a Premium! 🎉' : 'Nivel Gratuito Activo ⚡'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              AI Career Coach Suite
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {currentPlan === 'pro' 
                ? 'Tienes acceso completo a todas las funciones de tu AI Career Coach: Generador de Rutas de Carrera, Simuladores de Entrevista y Analytics de Mercado.'
                : 'Explora el Chat IA y la Ruta de Carrera. Actualiza a Premium para desbloquear Analytics de Mercado y Simuladores de Entrevista Avanzados.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button 
              onClick={() => setActiveModule('chat')}
              className="px-5 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-cyan-500/25 flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat IA 24/7</span>
            </button>
            <button 
              onClick={() => setActiveModule('roadmap')}
              className="px-5 py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm transition-all shadow-lg shadow-purple-600/25 flex items-center gap-2"
            >
              <Target className="w-4 h-4" />
              <span>Ruta de Carrera</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Bar Sub-Tabs */}
      <div className="flex items-center gap-2 p-1.5 bg-slate-900/90 border border-slate-800 rounded-2xl overflow-x-auto no-scrollbar">
        {[
          { id: 'chat', label: 'Chat Coach IA', icon: MessageSquare, isPremium: false },
          { id: 'mock', label: 'Simulador Entrevistas', icon: Video, isPremium: false },
          { id: 'followup', label: 'Seguimiento Post-Entrevista', icon: Mail, isPremium: false },
          { id: 'roadmap', label: 'Ruta de Carrera', icon: Target, isPremium: false },
          { id: 'cv', label: 'Análisis de CV', icon: FileText, isPremium: false },
          { id: 'analytics', label: 'Analytics', icon: BarChart3, badge: '👑', isPremium: true },
          { id: 'recommendations', label: 'Recomendaciones', icon: Star, badge: '👑', isPremium: true },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeModule === tab.id;
          const isLocked = currentPlan === 'free' && tab.isPremium;
          return (
            <button
              key={tab.id}
              onClick={() => handleModuleClick(tab.id, tab.label, tab.isPremium)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 ${
                isActive
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md font-bold'
                  : isLocked
                  ? 'text-slate-500 hover:text-amber-400 bg-slate-950/50'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {isLocked ? <Lock className="w-3.5 h-3.5 text-amber-400 ml-0.5" /> : tab.badge ? <span className="text-[11px] text-amber-400">{tab.badge}</span> : null}
            </button>
          );
        })}
      </div>

      {/* ================= MODULE 1: CHAT CON COACH IA ================= */}
      {activeModule === 'chat' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">
                <Bot className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  Chat con Coach IA
                  <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-semibold">24/7 ACTIVO</span>
                </h3>
                <p className="text-xs text-slate-400">Tu coach personal disponible para resolver dudas de carrera y negociación.</p>
              </div>
            </div>
          </div>

          <div className="bg-[#070b14] border border-slate-800/80 rounded-2xl p-4 sm:p-6 min-h-[320px] max-h-[420px] overflow-y-auto space-y-4">
            {chatMessages.map((m, idx) => (
              <div key={idx} className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                {m.sender === 'bot' && (
                  <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-cyan-400" />
                  </div>
                )}
                <div className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed whitespace-pre-line ${
                  m.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-none'
                    : 'bg-slate-800/90 text-slate-200 border border-slate-700 rounded-tl-none'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 justify-start items-center text-xs text-slate-400 italic">
                <Bot className="w-4 h-4 text-cyan-400 animate-spin" />
                <span>Coach IA está analizando tu consulta...</span>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold text-slate-400">💡 Prueba estas consultas destacadas:</p>
            <div className="flex flex-wrap gap-2">
              {samplePrompts.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSendChat(prompt)}
                  className="text-xs bg-slate-800 hover:bg-slate-700 text-cyan-300 px-3.5 py-2 rounded-xl border border-slate-700 transition-colors text-left font-medium"
                >
                  ⚡ {prompt}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
              placeholder="Pregúntale a tu coach sobre salario, CV o entrevistas..."
              className="flex-1 px-4 py-3.5 rounded-2xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500 transition-all"
            />
            <button
              onClick={() => handleSendChat()}
              className="px-6 py-3.5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition-all shadow-lg flex items-center justify-center shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ================= MODULE 3: MOCK INTERVIEWS (EXACTO A SCREENSHOT 3) ================= */}
      {activeModule === 'mock' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Elige tu tipo de entrevista</h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Practica con simuladores interactivos entrenados para evaluar cultura, psicología laboral y código.
            </p>
          </div>

          {/* 3 Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: HR */}
            <div className="bg-slate-950/90 border border-blue-500/30 hover:border-blue-400 rounded-3xl p-6 flex flex-col justify-between space-y-6 shadow-xl transition-all relative overflow-hidden group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <span className="px-3 py-1 rounded-lg bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-500/40">
                    ✓ Gratis
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-extrabold text-blue-400 uppercase tracking-wider block mb-1">
                    RECURSOS HUMANOS
                  </span>
                  <h3 className="text-xl font-bold text-white">Entrevista HR</h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    Domina las preguntas de comportamiento, cultura empresarial y negociación salarial. Aprende a presentarte con confianza.
                  </p>
                </div>

                <div className="space-y-2 pt-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" /><span>Preguntas de comportamiento</span></div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" /><span>Presentación personal</span></div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" /><span>Negociación salarial</span></div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" /><span>Fit cultural</span></div>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-800">
                <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
                  <span>⏱ 25 min</span>
                  <span>• Principiante</span>
                </div>
                <button
                  onClick={() => setSelectedInterviewCategory('hr')}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-slate-950 font-bold text-sm transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Comenzar ahora</span>
                </button>
              </div>
            </div>

            {/* Card 2: Psicométrica */}
            <div className="bg-slate-950/90 border border-purple-500/30 hover:border-purple-400 rounded-3xl p-6 flex flex-col justify-between space-y-6 shadow-xl transition-all relative overflow-hidden group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
                    <Brain className="w-6 h-6" />
                  </div>
                  <span className="px-3 py-1 rounded-lg bg-purple-500/20 text-purple-300 text-xs font-bold border border-purple-500/40 flex items-center gap-1">
                    👑 Premium
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-extrabold text-purple-400 uppercase tracking-wider block mb-1">
                    TESTS DE PERSONALIDAD Y APTITUD
                  </span>
                  <h3 className="text-xl font-bold text-white">Evaluación Psicométrica</h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    Descubre tu perfil de personalidad profesional, aptitudes cognitivas y estilo de liderazgo con tests validados.
                  </p>
                </div>

                <div className="space-y-2 pt-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" /><span>Test de personalidad</span></div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" /><span>Aptitudes cognitivas</span></div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" /><span>Inteligencia emocional</span></div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" /><span>Estilo de liderazgo</span></div>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-800">
                <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
                  <span>⏱ 20 min</span>
                  <span>• Intermedio</span>
                </div>
                <button
                  onClick={() => {
                    if (currentPlan === 'free') {
                      setRestrictedFeatureName('Evaluación Psicométrica & Aptitud');
                      setUpgradeModalOpen(true);
                    } else {
                      setSelectedInterviewCategory('psychometric');
                    }
                  }}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>{currentPlan === 'free' ? '🔒 Desbloquear con Premium' : 'Comenzar ahora'}</span>
                </button>
              </div>
            </div>

            {/* Card 3: Técnica */}
            <div className="bg-slate-950/90 border border-emerald-500/30 hover:border-emerald-400 rounded-3xl p-6 flex flex-col justify-between space-y-6 shadow-xl transition-all relative overflow-hidden group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                    <Code2 className="w-6 h-6" />
                  </div>
                  <span className="px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/40 flex items-center gap-1">
                    👑 Premium
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-wider block mb-1">
                    CODING & SYSTEM DESIGN
                  </span>
                  <h3 className="text-xl font-bold text-white">Entrevista Técnica</h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    Practica coding challenges, preguntas de algoritmos y diseño de sistemas con evaluación técnica instantánea.
                  </p>
                </div>

                <div className="space-y-2 pt-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /><span>Algoritmos y estructuras</span></div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /><span>System design</span></div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /><span>Preguntas de stack</span></div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /><span>Code review</span></div>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-800">
                <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
                  <span>⏱ 45 min</span>
                  <span>• Avanzado</span>
                </div>
                <button
                  onClick={() => {
                    if (currentPlan === 'free') {
                      setRestrictedFeatureName('Entrevista Técnica (Coding & System Design)');
                      setUpgradeModalOpen(true);
                    } else {
                      setSelectedInterviewCategory('technical');
                    }
                  }}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-sm transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>{currentPlan === 'free' ? '🔒 Desbloquear con Premium' : 'Comenzar ahora'}</span>
                </button>
              </div>
            </div>

          </div>

          {/* Active Category Simulator Drawer */}
          {selectedInterviewCategory && (
            <div className="bg-slate-950 border border-purple-500/40 rounded-3xl p-6 space-y-6 animate-fade-in">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs text-purple-400 font-bold uppercase">{interviewDetails[selectedInterviewCategory].category}</span>
                  <h3 className="text-lg font-bold text-white">{interviewDetails[selectedInterviewCategory].title}</h3>
                </div>
                <button 
                  onClick={() => setSelectedInterviewCategory(null)}
                  className="text-xs text-slate-400 hover:text-white px-3 py-1.5 bg-slate-900 rounded-xl border border-slate-800"
                >
                  ✕ Cerrar Simulador
                </button>
              </div>

              <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-xs text-cyan-400 font-semibold uppercase">Pregunta del Evaluador IA</span>
                <p className="text-white font-semibold text-sm sm:text-base">
                  "{interviewDetails[selectedInterviewCategory].questions[0]}"
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300">Tu Respuesta:</label>
                <textarea
                  rows={4}
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Escribe tu respuesta detallada como en la entrevista real..."
                  className="w-full p-4 rounded-2xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleEvaluateAnswer}
                  disabled={isEvaluating}
                  className="px-6 py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm shadow-lg flex items-center gap-2"
                >
                  {isEvaluating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Award className="w-4 h-4" />}
                  <span>{isEvaluating ? 'Evaluando...' : 'Evaluar Respuesta con IA'}</span>
                </button>
              </div>

              {feedback && (
                <div className="bg-slate-900 border border-purple-500/30 rounded-2xl p-5 space-y-3 animate-fade-in">
                  <div className="flex items-center justify-between">
                    <h5 className="text-sm font-bold text-white flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-purple-400" /> Evaluación de IA
                    </h5>
                    <div className="text-amber-400 font-bold text-sm">{feedback.starScore} ({feedback.score}/100)</div>
                  </div>
                  <p className="text-xs text-emerald-300 bg-emerald-950/40 p-3 rounded-xl border border-emerald-500/20">
                    ✅ {feedback.positives}
                  </p>
                  <p className="text-xs text-amber-300 bg-amber-950/40 p-3 rounded-xl border border-amber-500/20">
                    🎯 {feedback.improvement}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ================= MODULE 4: ASISTENTE SEGUIMIENTO POST-ENTREVISTA (EXACTO A SCREENSHOT 1) ================= */}
      {activeModule === 'followup' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-8">
          
          {/* Header Banner Purple matching Screenshot 1 */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 text-white shadow-lg space-y-1">
            <div className="flex items-center gap-2 font-bold text-lg">
              <Mail className="w-5 h-5" />
              <h3>Asistente de Seguimiento Post-Entrevista</h3>
            </div>
            <p className="text-xs sm:text-sm text-purple-100 opacity-90">
              Genera emails de agradecimiento, consejos y próximos pasos personalizados
            </p>
          </div>

          {/* Form matching Screenshot 1 */}
          <form onSubmit={handleGenerateFollowup} className="bg-white rounded-2xl p-6 sm:p-8 text-slate-900 space-y-6 shadow-xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800">
                  Empresa <span className="text-rose-500">* requerido</span>
                </label>
                <input
                  type="text"
                  required
                  value={followupData.company}
                  onChange={(e) => setFollowupData({ ...followupData, company: e.target.value })}
                  placeholder="Ej: Google"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-purple-600 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800">
                  Puesto <span className="text-rose-500">* requerido</span>
                </label>
                <input
                  type="text"
                  required
                  value={followupData.role}
                  onChange={(e) => setFollowupData({ ...followupData, role: e.target.value })}
                  placeholder="Ej: Software Engineer"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-purple-600 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800">
                Nombre del entrevistador (opcional)
              </label>
              <input
                type="text"
                value={followupData.interviewer}
                onChange={(e) => setFollowupData({ ...followupData, interviewer: e.target.value })}
                placeholder="Ej: Juan García"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-purple-600 transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800">
                Resumen de la entrevista (opcional)
              </label>
              <textarea
                rows={3}
                value={followupData.summary}
                onChange={(e) => setFollowupData({ ...followupData, summary: e.target.value })}
                placeholder="Menciona los temas principales, proyectos discutidos, preguntas que respondiste bien, etc."
                className="w-full p-4 rounded-xl border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-purple-600 transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800">
                Feedback recibido (opcional)
              </label>
              <textarea
                rows={3}
                value={followupData.feedback}
                onChange={(e) => setFollowupData({ ...followupData, feedback: e.target.value })}
                placeholder="Si recibiste feedback inmediato, comparte lo que comentaron"
                className="w-full p-4 rounded-xl border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-purple-600 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={isGeneratingEmail}
              className="w-full py-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm shadow-lg transition-all flex items-center justify-center gap-2"
            >
              {isGeneratingEmail ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Mail className="w-5 h-5" />}
              <span>{isGeneratingEmail ? 'Generando Correo de Seguimiento...' : 'Generar Seguimiento'}</span>
            </button>
          </form>

          {/* Generated Result */}
          {generatedEmail && (
            <div className="bg-slate-950 border border-purple-500/40 rounded-2xl p-6 space-y-4 animate-fade-in">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-bold text-purple-400 uppercase">Borrador de Correo Generado por IA</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(generatedEmail);
                    setCopiedEmail(true);
                    setTimeout(() => setCopiedEmail(false), 3000);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-purple-600/20 text-purple-300 hover:bg-purple-600/30 text-xs font-semibold border border-purple-500/30 flex items-center gap-1.5"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedEmail ? '¡Copiado!' : 'Copiar Texto'}</span>
                </button>
              </div>

              <pre className="p-4 bg-slate-900 rounded-xl text-slate-200 text-xs sm:text-sm font-sans whitespace-pre-wrap leading-relaxed border border-slate-800">
                {generatedEmail}
              </pre>

              <div className="p-4 bg-purple-950/40 rounded-xl border border-purple-500/30 text-xs text-purple-200 flex items-center gap-2">
                <Zap className="w-4 h-4 text-purple-400 shrink-0" />
                <span><strong>Consejo Post-Entrevista:</strong> Envía este correo dentro de las primeras 24 horas hábiles tras finalizar tu entrevista.</span>
              </div>
            </div>
          )}

        </div>
      )}

      {/* ================= MODULE 5: GENERADOR DE RUTA DE CARRERA (EXACTO A SCREENSHOT 2) ================= */}
      {activeModule === 'roadmap' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-8">
          
          {/* Sub-tabs header matching Screenshot 2 */}
          <div className="flex border-b border-slate-800 gap-6 text-sm font-semibold overflow-x-auto no-scrollbar">
            <button
              onClick={() => setRoadmapSubTab('roadmap')}
              className={`py-2 border-b-2 flex items-center gap-2 font-bold transition-all ${
                roadmapSubTab === 'roadmap'
                  ? 'border-purple-500 text-purple-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Target className="w-4 h-4" /> Ruta de Carrera
            </button>
            <button
              onClick={() => setRoadmapSubTab('sessions')}
              className={`py-2 border-b-2 flex items-center gap-2 font-bold transition-all ${
                roadmapSubTab === 'sessions'
                  ? 'border-purple-500 text-purple-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Calendar className="w-4 h-4" /> Sesiones
            </button>
            <button
              onClick={() => setRoadmapSubTab('messages')}
              className={`py-2 border-b-2 flex items-center gap-2 font-bold transition-all ${
                roadmapSubTab === 'messages'
                  ? 'border-purple-500 text-purple-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <MessageSquare className="w-4 h-4" /> Mensajes
            </button>
            <button
              onClick={() => setRoadmapSubTab('resources')}
              className={`py-2 border-b-2 flex items-center gap-2 font-bold transition-all ${
                roadmapSubTab === 'resources'
                  ? 'border-purple-500 text-purple-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <BookOpen className="w-4 h-4" /> Recursos
            </button>
          </div>

          {/* SUB-TAB 1: RUTA DE CARRERA (FORM & ROADMAP) */}
          {roadmapSubTab === 'roadmap' && (
            <div className="space-y-8 animate-fade-in">
              {/* Header Banner matching Screenshot 2 */}
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 text-white shadow-lg space-y-1">
                <div className="flex items-center gap-2 font-bold text-lg">
                  <Target className="w-5 h-5" />
                  <h3>Generador de Ruta de Carrera</h3>
                </div>
                <p className="text-xs sm:text-sm text-purple-100 opacity-90">
                  Obtén un plan personalizado basado en tus habilidades e intereses
                </p>
              </div>

              {/* Form matching Screenshot 2 */}
              <form onSubmit={handleGenerateRoadmap} className="bg-white rounded-2xl p-6 sm:p-8 text-slate-900 space-y-6 shadow-xl">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800">
                    Tu rol actual <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={roadmapForm.currentRole}
                    onChange={(e) => setRoadmapForm({ ...roadmapForm, currentRole: e.target.value })}
                    placeholder="Ej: Software Engineer"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-purple-600 transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800">
                    Habilidades (separadas por comas) <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={roadmapForm.skills}
                    onChange={(e) => setRoadmapForm({ ...roadmapForm, skills: e.target.value })}
                    placeholder="Ej: Python, React, SQL, Leadership"
                    className="w-full p-4 rounded-xl border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-purple-600 transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800">
                    Intereses (separados por comas) <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={roadmapForm.interests}
                    onChange={(e) => setRoadmapForm({ ...roadmapForm, interests: e.target.value })}
                    placeholder="Ej: Product Management, Innovation, Team Leadership"
                    className="w-full p-4 rounded-xl border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-purple-600 transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800">Años de experiencia</label>
                    <input
                      type="text"
                      value={roadmapForm.experienceYears}
                      onChange={(e) => setRoadmapForm({ ...roadmapForm, experienceYears: e.target.value })}
                      placeholder="5"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-purple-600 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800">Educación (opcional)</label>
                    <input
                      type="text"
                      value={roadmapForm.education}
                      onChange={(e) => setRoadmapForm({ ...roadmapForm, education: e.target.value })}
                      placeholder="Ej: Computer Science"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-purple-600 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800">Rango salarial esperado (opcional)</label>
                    <input
                      type="text"
                      value={roadmapForm.expectedSalary}
                      onChange={(e) => setRoadmapForm({ ...roadmapForm, expectedSalary: e.target.value })}
                      placeholder="Ej: $100k - $150k"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-purple-600 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800">Balance trabajo-vida</label>
                    <select
                      value={roadmapForm.workLifeBalance}
                      onChange={(e) => setRoadmapForm({ ...roadmapForm, workLifeBalance: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-purple-600 transition-colors bg-white"
                    >
                      <option value="Alto">Alto (Prioridad en flexibilidad y bienestar)</option>
                      <option value="Medio">Medio (Equilibrio estándar)</option>
                      <option value="Intensivo">Intensivo (Crecimiento acelerado)</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isGeneratingRoadmap}
                  className="w-full py-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  {isGeneratingRoadmap ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Target className="w-5 h-5" />}
                  <span>{isGeneratingRoadmap ? 'Generando Ruta de Carrera...' : 'Generar Mi Ruta de Carrera'}</span>
                </button>
              </form>

              {/* Generated Roadmap Result */}
              {generatedRoadmap && (
                <div className="bg-slate-950 border border-purple-500/40 rounded-3xl p-6 sm:p-8 space-y-6 animate-fade-in">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                    <div>
                      <span className="text-xs font-bold text-purple-400 uppercase">Roadmap Estratégico Generado</span>
                      <h4 className="text-xl font-bold text-white">{generatedRoadmap.targetTitle}</h4>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold">
                        ⏱ {generatedRoadmap.timeframe}
                      </div>
                      <div className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
                        💰 {generatedRoadmap.estimatedSalary}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {generatedRoadmap.milestones.map((m, idx) => (
                      <div key={idx} className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
                        <h5 className="text-sm font-bold text-purple-300 flex items-center gap-2">
                          <ChevronRight className="w-4 h-4 text-purple-400" />
                          {m.phase}
                        </h5>
                        <p className="text-xs text-slate-300">{m.action}</p>
                        <div className="flex flex-wrap gap-2 pt-1">
                          {m.skills.map((skill, sIdx) => (
                            <span key={sIdx} className="px-2.5 py-1 rounded-lg bg-slate-800 text-cyan-300 text-[11px] border border-slate-700 font-medium">
                              ⚡ {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SUB-TAB 2: SESIONES DE CARRERA */}
          {roadmapSubTab === 'sessions' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-purple-400" />
                    Sesiones de Acompañamiento & Mentoría
                  </h3>
                  <p className="text-xs text-slate-400">Revisa tus sesiones de carrera agendadas y accede a las grabaciones pasadas.</p>
                </div>
                <button className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md">
                  + Agendar Nueva Sesión
                </button>
              </div>

              {/* Upcoming Session Card */}
              <div className="bg-slate-950 border border-purple-500/40 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                    🔴 Próxima Sesión Confirmada
                  </span>
                  <span className="text-xs text-slate-400">ID: #SES-9821</span>
                </div>

                <div className="space-y-1">
                  <h4 className="text-lg font-bold text-white">Revisión Estratégica de Ruta de Carrera & Portafolio</h4>
                  <p className="text-xs text-slate-400">Mentor: Carlos Mendoza (Staff Engineer & Career Coach)</p>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 bg-slate-900 p-4 rounded-xl border border-slate-800">
                  <div className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-purple-400" /><span>Mañana, 16:00 hrs</span></div>
                  <div className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-purple-400" /><span>45 minutos de duración</span></div>
                  <div className="flex items-center gap-1.5"><Video className="w-4 h-4 text-purple-400" /><span>Google Meet</span></div>
                </div>

                <div className="flex gap-3">
                  <button className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md">
                    ▶ Unirse a la Sesión en Vivo
                  </button>
                  <button className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs border border-slate-700">
                    Reagendar
                  </button>
                </div>
              </div>

              {/* Past Sessions History */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
                <h4 className="text-sm font-bold text-white">Historial de Sesiones Completadas</h4>
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
                  <div>
                    <h5 className="text-sm font-bold text-slate-200">Mock Interview Técnica & Algoritmos</h5>
                    <p className="text-xs text-slate-400">18 Jul 2026 • Evaluación de Calificación: 92/100</p>
                  </div>
                  <button className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-semibold border border-slate-700">
                    📥 Ver Reporte
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* SUB-TAB 3: MENSAJES DIRECTOS CON COACH */}
          {roadmapSubTab === 'messages' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-purple-400" />
                    Mensajes Directos con tu Coach
                  </h3>
                  <p className="text-xs text-slate-400">Canal directo para dudas específicas sobre tu ruta de carrera y ofertas laborales.</p>
                </div>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4 min-h-[350px] flex flex-col justify-between">
                <div className="space-y-4 overflow-y-auto max-h-[350px]">
                  {directMessages.map((msg, idx) => (
                    <div key={idx} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                      <div className={`max-w-[80%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-purple-600 text-white rounded-tr-none'
                          : 'bg-slate-900 text-slate-200 border border-slate-800 rounded-tl-none'
                      }`}>
                        {msg.text}
                      </div>
                      <span className="text-[10px] text-slate-500 mt-1 px-1">{msg.time}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
                  <input
                    type="text"
                    value={directInput}
                    onChange={(e) => setDirectInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && directInput.trim()) {
                        setDirectMessages([...directMessages, { sender: 'user', text: directInput, time: 'Justo ahora' }]);
                        setDirectInput('');
                      }
                    }}
                    placeholder="Escribe un mensaje a tu mentor o coach..."
                    className="flex-1 px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-purple-500"
                  />
                  <button
                    onClick={() => {
                      if (directInput.trim()) {
                        setDirectMessages([...directMessages, { sender: 'user', text: directInput, time: 'Justo ahora' }]);
                        setDirectInput('');
                      }
                    }}
                    className="px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs"
                  >
                    Enviar
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* SUB-TAB 4: RECURSOS DE CARRERA */}
          {roadmapSubTab === 'resources' && (
            <div className="space-y-6 animate-fade-in">
              <div className="border-b border-slate-800 pb-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-purple-400" />
                  Recursos & Guías Descargables
                </h3>
                <p className="text-xs text-slate-400">Descarga plantillas optimizadas, guías de mensajería y solucionarios de entrevistas tech.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3 hover:border-purple-500/40 transition-all">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded bg-blue-500/20 text-blue-300 text-[10px] font-bold">PLANTILLA CV</span>
                    <span className="text-xs text-slate-400">PDF / DOCX</span>
                  </div>
                  <h4 className="text-sm font-bold text-white">Plantilla de CV Optimizado ATS 2026</h4>
                  <p className="text-xs text-slate-400">Estructura probada para pasar filtros automáticos de grandes empresas tech.</p>
                  <button className="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-purple-300 border border-slate-800">
                    📥 Descargar Plantilla
                  </button>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3 hover:border-purple-500/40 transition-all">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">LINKEDIN GUIDE</span>
                    <span className="text-xs text-slate-400">PDF (15 pág)</span>
                  </div>
                  <h4 className="text-sm font-bold text-white">Guía de Mensajería Fría a Recruiters</h4>
                  <p className="text-xs text-slate-400">5 plantillas comprobadas con 70% de tasa de respuesta para postulaciones.</p>
                  <button className="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-emerald-300 border border-slate-800">
                    📥 Descargar Guía
                  </button>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3 hover:border-purple-500/40 transition-all">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded bg-purple-500/20 text-purple-300 text-[10px] font-bold">EXCEL TOOL</span>
                    <span className="text-xs text-slate-400">XLSX</span>
                  </div>
                  <h4 className="text-sm font-bold text-white">Calculadora de Negociación Salarial LATAM & US</h4>
                  <p className="text-xs text-slate-400">Calcula tu tarifa por hora, impuestos aproximados y ofertas equivalentes.</p>
                  <button className="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-purple-300 border border-slate-800">
                    📥 Descargar Calculadora
                  </button>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3 hover:border-purple-500/40 transition-all">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold">ALGORITMOS</span>
                    <span className="text-xs text-slate-400">PDF / MD</span>
                  </div>
                  <h4 className="text-sm font-bold text-white">Top 50 Preguntas de Algoritmos & System Design</h4>
                  <p className="text-xs text-slate-400">Solucionario con código comentado en JavaScript, Python y Java.</p>
                  <button className="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-amber-300 border border-slate-800">
                    📥 Descargar Solucionario
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      )}

      {/* ================= MODULE 2: ANÁLISIS DE CV CON IA ================= */}
      {activeModule === 'cv' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-cyan-400" />
                Análisis de CV con IA
              </h3>
              <p className="text-xs text-slate-400">Sube tu CV para recibir feedback detallado y optimizar tu score frente a sistemas ATS.</p>
            </div>
            
            <div className="px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold flex items-center gap-2 self-start sm:self-auto">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              <span>Los CVs optimizados tienen 3x más llamadas de reclutadores</span>
            </div>
          </div>

          <div className="border-2 border-dashed border-slate-700 hover:border-cyan-500/60 rounded-3xl p-8 text-center bg-slate-950/50 transition-all">
            <input
              type="file"
              id="cv-upload"
              accept=".pdf,.doc,.docx"
              onChange={handleSimulateCVUpload}
              className="hidden"
            />
            <label htmlFor="cv-upload" className="cursor-pointer flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">
                <Upload className="w-7 h-7 text-cyan-400" />
              </div>
              <div>
                <p className="text-white font-bold text-sm">Arrastra tu CV aquí o <span className="text-cyan-400 underline">haz clic para examinar</span></p>
                <p className="text-xs text-slate-400 mt-1">Formatos soportados: PDF, DOC, DOCX (Máx 5MB)</p>
              </div>
              <button 
                type="button" 
                onClick={() => analyzeCV('CV_Junior_Fullstack.pdf')}
                className="mt-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-cyan-300 border border-slate-700"
              >
                📄 O probar con CV de ejemplo
              </button>
            </label>
          </div>

          {isAnalyzingCV && (
            <div className="p-8 bg-slate-950 rounded-2xl border border-cyan-500/30 text-center space-y-3">
              <RefreshCw className="w-8 h-8 text-cyan-400 animate-spin mx-auto" />
              <h4 className="text-white font-bold">La IA está escaneando tu CV...</h4>
              <p className="text-xs text-slate-400">Verificando palabras clave, formato ATS y métricas de impacto.</p>
            </div>
          )}

          {cvResult && !isAnalyzingCV && (
            <div className="space-y-6 bg-slate-950 border border-slate-800 rounded-2xl p-6 animate-fade-in">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-slate-900 p-6 rounded-2xl border border-slate-800">
                <div className="space-y-1 text-center md:text-left">
                  <span className="text-xs text-slate-400 font-medium">Archivo analizado</span>
                  <h4 className="text-lg font-bold text-white">{cvResult.fileName}</h4>
                  <p className="text-xs text-slate-300">{cvResult.summary}</p>
                </div>
                
                <div className="flex items-center gap-4 bg-cyan-950/40 border border-cyan-500/30 px-6 py-4 rounded-2xl text-center shrink-0">
                  <div>
                    <span className="text-3xl font-extrabold text-cyan-400">{cvResult.atsScore}</span>
                    <span className="text-xs text-cyan-300 block font-semibold">Score ATS / 100</span>
                  </div>
                  <CheckCircle2 className="w-8 h-8 text-cyan-400" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3">
                  <h5 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> Puntos Fuertes Detectados
                  </h5>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {cvResult.strengths.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3">
                  <h5 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" /> Áreas de Oportunidad
                  </h5>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {cvResult.weaknesses.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-amber-400 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ================= MODULE 6: ANALYTICS PREMIUM ================= */}
      {activeModule === 'analytics' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-purple-400" />
                Analytics de Carrera
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold">🔒 Premium</span>
              </h3>
              <p className="text-xs text-slate-400">Visualiza tu nivel de habilidades en comparación con la demanda actual del mercado laboral tech.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-5">
              <h4 className="text-sm font-bold text-white">Nivel de Dominio vs Exigencia del Mercado</h4>
              <div className="space-y-4">
                {skillMetrics.map((item, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-slate-200">{item.name}</span>
                      <span className="text-purple-400 font-bold">{item.score}% (Mercado: {item.market}%)</span>
                    </div>
                    <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden flex">
                      <div className={`h-full ${item.color} rounded-full transition-all duration-1000`} style={{ width: `${item.score}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-950/60 to-slate-950 border border-indigo-500/30 rounded-2xl p-6 space-y-4 flex flex-col justify-between">
              <div>
                <span className="text-xs text-indigo-400 font-bold uppercase tracking-wider">Diagnóstico IA</span>
                <h4 className="text-lg font-extrabold text-white mt-1">Listo para roles Senior Technical Lead</h4>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Tu perfil supera el estándar en JavaScript, React y Liderazgo. Se recomienda profundizar en <strong className="text-purple-300">System Architecture</strong> para alcanzar rangos superiores.
                </p>
              </div>

              <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 text-center space-y-1">
                <span className="text-xs text-slate-400">Rango Salarial Estimado</span>
                <span className="text-xl font-extrabold text-emerald-400 block">$2,500 - $4,200 USD / mes</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODULE 7: RECOMENDACIONES PREMIUM ================= */}
      {activeModule === 'recommendations' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-400" />
                Recomendaciones Personalizadas
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold">🔒 Premium</span>
              </h3>
              <p className="text-xs text-slate-400">Sugerencias únicas de cursos, mentores y vacantes basadas en tu historial y objetivos.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4 hover:border-cyan-500/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">Curso Recomendado</span>
                <h4 className="text-sm font-bold text-white mt-0.5">Optimización de Performance en React & Next.js</h4>
                <p className="text-xs text-slate-400 mt-1">Cierra la brecha en renderizado y arquitectura avanzada.</p>
              </div>
              <button className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-cyan-300 border border-slate-800 transition-colors">
                Ver Contenido del Curso
              </button>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4 hover:border-purple-500/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-purple-400 font-bold uppercase tracking-wider">Mentor Recomendado</span>
                <h4 className="text-sm font-bold text-white mt-0.5">Carlos Mendoza (Staff Engineer)</h4>
                <p className="text-xs text-slate-400 mt-1">Especialista en simulacros de entrevista y negociación salarial.</p>
              </div>
              <button className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-purple-300 border border-slate-800 transition-colors">
                Agendar Sesión 1 a 1
              </button>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4 hover:border-emerald-500/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <Star className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">Vacante Recomendada (95% Match)</span>
                <h4 className="text-sm font-bold text-white mt-0.5">Frontend Developer (Remoto LATAM)</h4>
                <p className="text-xs text-slate-400 mt-1">Startup US • $2,200 - $2,800 USD / mes.</p>
              </div>
              <button className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-emerald-300 border border-slate-800 transition-colors">
                Postularse con CV optimizado
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upgrade Modal for Paywall Gating */}
      <UpgradeModal
        isOpen={upgradeModalOpen}
        onClose={() => setUpgradeModalOpen(false)}
        featureName={restrictedFeatureName}
      />

    </div>
  );
}
