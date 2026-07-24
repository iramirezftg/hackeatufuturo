import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Pricing from './components/Pricing';
import DeferredPayment from './components/DeferredPayment';
import Services from './components/Services';
import Mentor from './components/Mentor';
import Testimonials from './components/Testimonials';
import Universities from './components/Universities';
import Enterprise from './components/Enterprise';
import Faq from './components/Faq';
import Footer from './components/Footer';
import AICoachModal from './components/AICoachModal';
import RegisterModal from './components/RegisterModal';
import PaymentModal from './components/PaymentModal';
import StudentDashboard from './components/StudentDashboard';
import { AuthProvider, useAuth } from './context/AuthContext';

function MainAppContent() {
  const { user } = useAuth();

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('register');
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [aiCoachOpen, setAiCoachOpen] = useState(false);
  const [currentView, setCurrentView] = useState('landing'); // 'landing' or 'dashboard'

  const handleOpenAuth = (mode = 'register') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleSelectPlan = (planType) => {
    if (planType === 'free') {
      handleOpenAuth('register');
      return;
    }

    let planData = {
      id: 'pro',
      name: 'Programa Premium Hackea Tu Futuro',
      price: '$2,999 MXN',
      priceNumber: 2999
    };

    if (planType === 'isa' || planType === 'deferred') {
      planData = {
        id: 'isa',
        name: 'Acuerdo de Ingresos Compartidos (ISA)',
        price: '$0 Iniciales',
        priceNumber: 0
      };
    }

    setSelectedPlan(planData);
    if (!user) {
      // Prompt user to login or register first
      handleOpenAuth('login');
    } else {
      setPaymentModalOpen(true);
    }
  };

  if (currentView === 'dashboard' && user) {
    return (
      <StudentDashboard
        onGoHome={() => setCurrentView('landing')}
        onOpenAICoach={() => setAiCoachOpen(true)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#060913] text-slate-100 font-sans antialiased overflow-x-hidden selection:bg-cyan-500 selection:text-white">
      {/* Navigation Header */}
      <Navbar
        onOpenAuth={handleOpenAuth}
        onOpenDashboard={() => setCurrentView('dashboard')}
      />

      {/* Main Page Sections */}
      <main>
        <Hero
          onOpenAICoach={() => setAiCoachOpen(true)}
          onSelectPremium={() => handleSelectPlan('pro')}
        />

        <Pricing
          onSelectPlan={(plan) => handleSelectPlan(plan)}
        />

        <DeferredPayment
          onApplyDeferred={() => handleSelectPlan('isa')}
        />

        <Services
          onSelectService={() => handleSelectPlan('pro')}
        />

        <Mentor />

        <Testimonials />

        <Universities />

        <Enterprise
          onContactEnterprise={() => handleOpenAuth('register')}
        />

        <Faq />
      </main>

      {/* Footer */}
      <Footer onOpenAuth={handleOpenAuth} />

      {/* Interactive Modals */}
      <AICoachModal
        isOpen={aiCoachOpen}
        onClose={() => setAiCoachOpen(false)}
      />

      <RegisterModal
        isOpen={authModalOpen}
        mode={authMode}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={() => {
          if (selectedPlan) {
            setPaymentModalOpen(true);
          } else {
            setCurrentView('dashboard');
          }
        }}
      />

      <PaymentModal
        isOpen={paymentModalOpen}
        plan={selectedPlan}
        onClose={() => setPaymentModalOpen(false)}
        onSuccess={() => setCurrentView('dashboard')}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainAppContent />
    </AuthProvider>
  );
}
