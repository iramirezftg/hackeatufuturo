import React, { useState } from 'react';
import { X, CreditCard, ShieldCheck, CheckCircle2, Lock, Sparkles, ArrowRight, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function PaymentModal({ isOpen, plan, onClose, onSuccess }) {
  if (!isOpen || !plan) return null;

  const { user, token, updateUserState } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successData, setSuccessData] = useState(null);

  const isISA = plan.id === 'isa' || plan.id === 'deferred';

  const [cardForm, setCardForm] = useState({
    cardNumber: '4242 •••• •••• 4242',
    cardHolder: user ? user.name : 'Carlos Mendoza',
    expiry: '12/28',
    cvc: '123'
  });

  const handleCheckout = async (e) => {
    e.preventDefault();
    setError('');

    if (!user) {
      setError('Debes iniciar sesión o registrarte antes de continuar con la compra.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/payments/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          planId: plan.id,
          planName: plan.name,
          amount: plan.priceNumber || 0,
          paymentMethod: isISA ? 'Acuerdo ISA' : 'Tarjeta de Crédito / Débito',
          isISA
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Error procesando la transacción.');
      }

      setSuccessData(data);
      if (data.user) {
        updateUserState(data.user);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-lg bg-[#080d1a] border border-slate-800 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {successData ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">¡Suscripción Activada!</h3>
              <p className="text-sm text-slate-300 mt-1">
                {isISA
                  ? 'Tu solicitud de Pago Diferido ha sido aprobada. Tienes acceso total.'
                  : `Has adquirido con éxito el ${plan.name}.`}
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-left space-y-2 text-xs text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-500">Transacción ID:</span>
                <span className="font-mono text-cyan-400">{successData.transaction?.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Monto:</span>
                <span className="font-bold text-white">${successData.transaction?.amount} MXN</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Método:</span>
                <span>{successData.transaction?.paymentMethod}</span>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                if (onSuccess) onSuccess();
              }}
              className="w-full py-3.5 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2"
            >
              <span>Ir a Mi Dashboard de Estudiante</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-1">
                <Sparkles className="w-4 h-4" />
                <span>Checkout Seguro 256-Bit</span>
              </div>
              <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
              <p className="text-sm text-slate-400 mt-1">
                {isISA
                  ? 'Estudia ahora $0 iniciales y paga cuando consigas empleo tech.'
                  : `Acceso inmediato al programa completo por ${plan.price || '$1,499 MXN'}`}
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
                {error}
              </div>
            )}

            <form onSubmit={handleCheckout} className="space-y-4">
              {isISA ? (
                <div className="p-4 bg-slate-900 border border-cyan-500/30 rounded-2xl space-y-3 text-xs text-slate-300">
                  <div className="flex items-center gap-2 font-bold text-white">
                    <ShieldCheck className="w-5 h-5 text-cyan-400" />
                    <span>Acuerdo de Ingresos Compartidos (ISA)</span>
                  </div>
                  <p>
                    Al hacer clic en "Confirmar e Iniciar Programa", aceptas iniciar tu capacitación con $0 MXN de desembolso inicial. Sólo aportarás un porcentaje de tu salario cuando superes los $15,000 MXN mensuales.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                      Nombre del Titular
                    </label>
                    <input
                      type="text"
                      required
                      value={cardForm.cardHolder}
                      onChange={(e) => setCardForm({ ...cardForm, cardHolder: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                      Número de Tarjeta
                    </label>
                    <div className="relative">
                      <CreditCard className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        required
                        value={cardForm.cardNumber}
                        onChange={(e) => setCardForm({ ...cardForm, cardNumber: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                        Expiración
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="MM/AA"
                        value={cardForm.expiry}
                        onChange={(e) => setCardForm({ ...cardForm, expiry: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                        CVC / CVV
                      </label>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                        <input
                          type="password"
                          required
                          placeholder="123"
                          value={cardForm.cvc}
                          onChange={(e) => setCardForm({ ...cardForm, cvc: e.target.value })}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin text-slate-950" />
                      <span>Procesando inscripción...</span>
                    </>
                  ) : (
                    <>
                      <span>{isISA ? 'Confirmar e Iniciar Programa ($0 MXN)' : `Pagar ${plan.price || '$1,499 MXN'}`}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-slate-500 text-xs text-center mt-2">
                <Lock className="w-3.5 h-3.5" />
                <span>Garantía de reembolso de 14 días sin preguntas.</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
