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

export default function App() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('register');
  const [aiCoachOpen, setAiCoachOpen] = useState(false);

  const handleOpenAuth = (mode = 'register') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#060913] text-slate-100 font-sans antialiased overflow-x-hidden selection:bg-cyan-500 selection:text-white">
      {/* Navigation Header */}
      <Navbar
        onOpenAuth={handleOpenAuth}
        onOpenAICoach={() => setAiCoachOpen(true)}
      />

      {/* Main Page Sections */}
      <main>
        <Hero
          onOpenAICoach={() => setAiCoachOpen(true)}
          onSelectPremium={() => handleOpenAuth('register')}
        />

        <Pricing
          onSelectPlan={(plan) => handleOpenAuth('register')}
        />

        <DeferredPayment
          onApplyDeferred={() => handleOpenAuth('register')}
        />

        <Services
          onSelectService={(service) => handleOpenAuth('register')}
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
      />
    </div>
  );
}
