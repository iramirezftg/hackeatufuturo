import React, { useState } from 'react';
import { 
  Award, Linkedin, Download, Share2, ShieldCheck, CheckCircle2, 
  ExternalLink, Copy, Check, QrCode, Sparkles, Star, Calendar, FileText
} from 'lucide-react';

export default function DigitalCertificates({ user }) {
  const studentName = user?.name || 'Carlos Mendoza';

  const certificates = [
    {
      id: 'CERT-HKT-984210',
      title: 'Full-Stack Modern Web & AI Apps Certification',
      issueDate: '24 de Julio, 2026',
      issueMonthYear: 'Julio 2026',
      instructor: 'Alex Rivera (Ex-Google Senior Lead)',
      skills: ['React.js', 'Node.js', 'TypeScript', 'LLM Integrations', 'System Design'],
      credentialUrl: 'https://hackeatufuturo.com/verify/CERT-HKT-984210',
      linkedinParams: {
        name: 'Full-Stack Modern Web & AI Apps Certification',
        organizationName: 'Hackea Tu Futuro',
        issueYear: '2026',
        issueMonth: '7',
        certId: 'CERT-HKT-984210',
        certUrl: 'https://hackeatufuturo.com/verify/CERT-HKT-984210'
      }
    },
    {
      id: 'CERT-HKT-772109',
      title: 'AI Career Preparation & Technical Mock Interviews',
      issueDate: '15 de Junio, 2026',
      issueMonthYear: 'Junio 2026',
      instructor: 'Comité de Mentoría & Career Coaching',
      skills: ['Estrategia de Entrevistas', 'Optimización ATS', 'Negociación Salarial'],
      credentialUrl: 'https://hackeatufuturo.com/verify/CERT-HKT-772109',
      linkedinParams: {
        name: 'AI Career Preparation & Technical Mock Interviews',
        organizationName: 'Hackea Tu Futuro',
        issueYear: '2026',
        issueMonth: '6',
        certId: 'CERT-HKT-772109',
        certUrl: 'https://hackeatufuturo.com/verify/CERT-HKT-772109'
      }
    }
  ];

  const [selectedCertId, setSelectedCertId] = useState(certificates[0].id);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);

  const currentCert = certificates.find(c => c.id === selectedCertId) || certificates[0];

  // Construct LinkedIn Add Certification URL
  const linkedinAddUrl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(currentCert.linkedinParams.name)}&organizationName=${encodeURIComponent(currentCert.linkedinParams.organizationName)}&issueYear=${currentCert.linkedinParams.issueYear}&issueMonth=${currentCert.linkedinParams.issueMonth}&certId=${currentCert.linkedinParams.certId}&certUrl=${encodeURIComponent(currentCert.linkedinParams.certUrl)}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentCert.credentialUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-950/70 via-slate-900 to-purple-950/70 border border-amber-500/30 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold shadow-lg">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Certificación Oficial Verificable 🎓</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Certificados Digitales & Credenciales
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Acredita tus competencias técnicas ante empresas e instructores. Añade tus certificados verificables a tu perfil de LinkedIn en un solo clic.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={linkedinAddUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all shadow-lg shadow-blue-600/30 flex items-center gap-2"
            >
              <Linkedin className="w-4.5 h-4.5 fill-current" />
              <span>Agregar a LinkedIn</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Grid: Certificate Selector & Live Certificate Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Cert List (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Tus Certificados Emitidos</h3>
          <div className="space-y-3">
            {certificates.map((cert) => {
              const isSelected = cert.id === selectedCertId;
              return (
                <button
                  key={cert.id}
                  onClick={() => setSelectedCertId(cert.id)}
                  className={`w-full p-5 rounded-2xl border text-left transition-all relative overflow-hidden ${
                    isSelected
                      ? 'bg-gradient-to-r from-amber-500/10 via-slate-900 to-slate-950 border-amber-500 text-white shadow-xl'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">{cert.id}</span>
                    <span className="text-[10px] font-semibold text-emerald-400 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> Verificado
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white leading-snug">{cert.title}</h4>
                  <p className="text-xs text-slate-400 mt-1">Emitido: {cert.issueMonthYear}</p>
                </button>
              );
            })}
          </div>

          {/* Verification Badge Info */}
          <div className="p-5 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Validación Blockchain & QR activa</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Cualquier reclutador puede verificar la autenticidad de este certificado escaneando el código QR o ingresando el ID de credencial.
            </p>
            <button
              onClick={() => setShowVerifyModal(true)}
              className="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-amber-300 border border-slate-800 transition-colors"
            >
              🛡️ Probar Verificador de Autenticidad
            </button>
          </div>
        </div>

        {/* Right Column: Visual Certificate Canvas & Action Buttons (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Certificate Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-medium">Credencial:</span>
              <span className="text-xs font-mono font-bold text-cyan-300">{currentCert.id}</span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <a
                href={linkedinAddUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md flex items-center gap-1.5 transition-all"
              >
                <Linkedin className="w-4 h-4 fill-current" />
                <span>Agregar a LinkedIn</span>
              </a>

              <button
                onClick={handleCopyLink}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs border border-slate-700 flex items-center gap-1.5 transition-colors"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? '¡Enlace Copiado!' : 'Copiar URL'}</span>
              </button>

              <button
                onClick={() => alert('Generando archivo PDF en alta resolución para descarga...')}
                className="px-3.5 py-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500/30 font-bold text-xs flex items-center gap-1.5 transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Descargar PDF</span>
              </button>
            </div>
          </div>

          {/* Luxury Certificate Visual Frame */}
          <div className="relative p-2 bg-gradient-to-br from-amber-500 via-yellow-600 to-amber-700 rounded-3xl shadow-2xl overflow-hidden">
            <div className="bg-[#060a14] p-8 sm:p-12 rounded-[22px] border border-amber-500/40 relative space-y-8 text-center overflow-hidden">
              
              {/* Background watermark seal */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
                <Award className="w-96 h-96 text-amber-400" />
              </div>

              {/* Certificate Header */}
              <div className="space-y-2 relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[11px] font-bold uppercase tracking-widest">
                  <Sparkles className="w-3.5 h-3.5" /> Hackea Tu Futuro • Certificación Oficial
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 font-serif tracking-wide pt-2">
                  Certificado de Excelencia
                </h2>
                <p className="text-xs text-slate-400 tracking-wider uppercase">Este certificado oficial se otorga con orgullo a:</p>
              </div>

              {/* Student Name */}
              <div className="relative z-10 py-2">
                <h3 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight border-b-2 border-amber-500/40 inline-block px-8 pb-3 font-serif">
                  {studentName}
                </h3>
              </div>

              {/* Course Title & Statement */}
              <div className="space-y-3 max-w-xl mx-auto relative z-10">
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Por haber completado satisfactoriamente los módulos de formación práctica, evaluaciones técnicas y proyectos reales del programa:
                </p>
                <h4 className="text-lg sm:text-xl font-extrabold text-cyan-300">
                  {currentCert.title}
                </h4>
              </div>

              {/* Skills badges */}
              <div className="flex flex-wrap items-center justify-center gap-2 relative z-10 pt-2">
                {currentCert.skills.map((skill, i) => (
                  <span key={i} className="px-3 py-1 rounded-lg bg-slate-900 text-amber-300 border border-amber-500/30 text-xs font-semibold">
                    ⚡ {skill}
                  </span>
                ))}
              </div>

              {/* Footer Signatures & QR Code */}
              <div className="grid grid-cols-1 sm:grid-cols-3 items-end gap-6 pt-8 border-t border-slate-800/80 relative z-10 text-xs">
                
                {/* Signature 1 */}
                <div className="space-y-1 text-center sm:text-left">
                  <div className="font-serif italic text-amber-300 text-base font-bold">Alex Rivera</div>
                  <div className="text-[11px] text-slate-400 border-t border-slate-700 pt-1">Lead Technical Instructor</div>
                </div>

                {/* QR Code & Official Badge */}
                <div className="flex flex-col items-center justify-center space-y-1">
                  <div className="p-2 bg-white rounded-xl shadow-md">
                    <QrCode className="w-12 h-12 text-slate-950" />
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono mt-1">ID: {currentCert.id}</span>
                </div>

                {/* Signature 2 */}
                <div className="space-y-1 text-center sm:text-right">
                  <div className="font-serif italic text-amber-300 text-base font-bold">Hackea Tu Futuro</div>
                  <div className="text-[11px] text-slate-400 border-t border-slate-700 pt-1">Comité de Acreditación AI</div>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Verification Modal */}
      {showVerifyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-lg bg-[#080d1a] border border-amber-500/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
                <h4 className="text-lg font-bold text-white">Verificador de Autenticidad</h4>
              </div>
              <button onClick={() => setShowVerifyModal(false)} className="text-slate-400 hover:text-white text-sm font-bold">✕</button>
            </div>

            <div className="p-5 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl space-y-2">
              <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Certificado Válido & Auténtico
              </span>
              <h5 className="text-base font-bold text-white">{currentCert.title}</h5>
              <div className="text-xs text-slate-300 space-y-1">
                <p><strong>Titular:</strong> {studentName}</p>
                <p><strong>Emisor:</strong> Hackea Tu Futuro</p>
                <p><strong>ID de Credencial:</strong> {currentCert.id}</p>
                <p><strong>Fecha de Emisión:</strong> {currentCert.issueDate}</p>
              </div>
            </div>

            <button
              onClick={() => setShowVerifyModal(false)}
              className="w-full py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700"
            >
              Cerrar Verificador
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
