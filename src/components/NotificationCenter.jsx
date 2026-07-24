import React, { useState } from 'react';
import { 
  Bell, Flame, MessageSquare, Gift, FileText, Trophy, 
  Check, Trash2, X, Sparkles, ChevronRight, CheckCircle2
} from 'lucide-react';

export default function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState('all'); // 'all', 'unread', 'streak'

  const [notifications, setNotifications] = useState([
    {
      id: 'notif_1',
      title: '¡Tu racha de 14 días vence hoy a medianoche! 🔥',
      message: 'Resuelve 1 reto técnico en el IDE Sandbox antes de que termine el día para mantener tus 14 días en fuego.',
      type: 'streak',
      icon: Flame,
      color: 'text-amber-400 bg-amber-500/20 border-amber-500/30',
      time: 'Hace 45 min',
      unread: true,
      actionTab: 'sandbox'
    },
    {
      id: 'notif_2',
      title: 'Carlos Mendoza (Mentor Staff) te envió un mensaje 💬',
      message: 'Revisé el código de tu proyecto React. Agrégale el diagrama de arquitectura en el README para la entrevista.',
      type: 'message',
      icon: MessageSquare,
      color: 'text-purple-400 bg-purple-500/20 border-purple-500/30',
      time: 'Hace 2 horas',
      unread: true,
      actionTab: 'ai-coach'
    },
    {
      id: 'notif_3',
      title: '¡Nuevo amigo registrado con tu enlace! 🎁',
      message: 'María Fernanda Ruiz se unió a Hackea Tu Futuro. Has ganado 1 Mes de AI Coach Premium GRATIS.',
      type: 'referral',
      icon: Gift,
      color: 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30',
      time: 'Hace 1 día',
      unread: true,
      actionTab: 'referrals'
    },
    {
      id: 'notif_4',
      title: 'Análisis de CV completado 📄',
      message: 'Tu archivo "Mi_Curriculum_Tech.pdf" ha obtenido un puntaje de compatibilidad ATS de 88/100.',
      type: 'cv',
      icon: FileText,
      color: 'text-cyan-400 bg-cyan-500/20 border-cyan-500/30',
      time: 'Hace 2 días',
      unread: false,
      actionTab: 'ai-coach'
    },
    {
      id: 'notif_5',
      title: '¡Insignia Desbloqueada! 🏆',
      message: 'Felicidades, has obtenido la medalla "Racha Imparable 🔥" por tus 7 días consecutivos activo.',
      type: 'badge',
      icon: Trophy,
      color: 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30',
      time: 'Hace 3 días',
      unread: false,
      actionTab: 'badges'
    }
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, unread: false } : n));
  };

  const deleteNotif = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'unread') return n.unread;
    if (filter === 'streak') return n.type === 'streak';
    return true;
  });

  return (
    <div className="relative inline-block">
      
      {/* Bell Icon Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-all shadow-md flex items-center justify-center"
        title="Centro de Notificaciones"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 text-white font-extrabold text-[10px] flex items-center justify-center border-2 border-[#080d1a] animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Floating Popover Drawer */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-[#080d1a] border border-slate-800 rounded-3xl shadow-2xl z-50 overflow-hidden animate-fade-in space-y-3">
          
          {/* Header */}
          <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-cyan-400" />
              <h3 className="font-bold text-white text-sm">Notificaciones</h3>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-[10px] font-extrabold">
                  {unreadCount} sin leer
                </span>
              )}
            </div>

            <div className="flex items-center gap-1">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-[11px] font-semibold text-cyan-400 hover:underline px-2 py-1"
                >
                  Marcar leídas
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Filter Sub-Tabs */}
          <div className="px-4 flex gap-2 text-xs font-semibold">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-xl transition-all ${
                filter === 'all' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              Todas ({notifications.length})
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-3 py-1 rounded-xl transition-all ${
                filter === 'unread' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              Sin Leer ({unreadCount})
            </button>
            <button
              onClick={() => setFilter('streak')}
              className={`px-3 py-1 rounded-xl transition-all ${
                filter === 'streak' ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              🔥 Alerta Racha
            </button>
          </div>

          {/* Notifications List */}
          <div className="max-h-[380px] overflow-y-auto px-4 pb-4 space-y-2.5">
            {filteredNotifications.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-500 italic">
                No tienes notificaciones en esta sección.
              </div>
            ) : (
              filteredNotifications.map((n) => {
                const Icon = n.icon;
                return (
                  <div
                    key={n.id}
                    onClick={() => markAsRead(n.id)}
                    className={`p-3.5 rounded-2xl border transition-all relative space-y-2 cursor-pointer ${
                      n.unread
                        ? 'bg-slate-900/90 border-cyan-500/40 hover:border-cyan-400'
                        : 'bg-slate-950/60 border-slate-800/80 text-slate-400'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2.5">
                        <div className={`p-2 rounded-xl border shrink-0 ${n.color}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="space-y-1">
                          <h4 className={`text-xs font-bold leading-snug ${n.unread ? 'text-white' : 'text-slate-300'}`}>
                            {n.title}
                          </h4>
                          <p className="text-[11px] text-slate-400 leading-relaxed">{n.message}</p>
                        </div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNotif(n.id);
                        }}
                        className="text-slate-600 hover:text-rose-400 p-1 shrink-0"
                        title="Borrar notificación"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-800/60">
                      <span>{n.time}</span>
                      {n.unread && <span className="text-cyan-400 font-bold">• No Leída</span>}
                    </div>
                  </div>
                );
              })
            )}
          </div>

        </div>
      )}

    </div>
  );
}
