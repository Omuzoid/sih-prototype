import React, { useState } from 'react';
import { LMProvider, useLM } from './context/LMContext';
import { Header } from './components/common/Header';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { DemoControls } from './components/common/DemoControls';
import { ToastContainer } from './components/common/ToastContainer';

// Public Components
import { LandingPage } from './components/public/LandingPage';
import { PublicQRVerification } from './components/public/PublicQRVerification';
import { CitizenComplaintModal } from './components/public/CitizenComplaintModal';
import { TrackApplicationPage } from './components/public/TrackApplicationPage';
import { HowItWorksPage } from './components/public/HowItWorksPage';
import { AboutPage } from './components/public/AboutPage';
import { LoginPage } from './components/public/LoginPage';

// Trader Components
import { TraderDashboard } from './components/trader/TraderDashboard';
import { RegisterInstrumentWizard } from './components/trader/RegisterInstrumentWizard';
import { FeeCalculatorModal } from './components/trader/FeeCalculatorModal';

// Inspector Components
import { InspectorMobileApp } from './components/inspector/InspectorMobileApp';

// Admin Components
import { AdminDashboard } from './components/admin/AdminDashboard';

const AppContent: React.FC = () => {
  const { currentTab, setCurrentTab } = useLM();
  const [isDemoControlsOpen, setIsDemoControlsOpen] = useState<boolean>(false);

  const renderTabContent = () => {
    switch (currentTab) {
      case 'home':
        return <LandingPage />;
      case 'public-qr':
        return <PublicQRVerification />;
      case 'track-app':
        return <TrackApplicationPage />;
      case 'citizen-complaint':
        return (
          <div className="space-y-6 max-w-4xl mx-auto px-4 py-8">
            <PublicQRVerification />
            <CitizenComplaintModal onClose={() => setCurrentTab('home')} />
          </div>
        );
      case 'how-it-works':
        return <HowItWorksPage />;
      case 'about':
        return <AboutPage />;
      case 'login':
        return <LoginPage />;
      
      // Trader Tab Actions
      case 'trader-dashboard':
      case 'trader-certificates':
      case 'trader-booking':
        return <TraderDashboard />;
      case 'trader-register':
        return <RegisterInstrumentWizard />;
      case 'trader-calculator':
        return (
          <div>
            <TraderDashboard />
            <FeeCalculatorModal onClose={() => setCurrentTab('trader-dashboard')} />
          </div>
        );
      
      // Inspector Tab Actions
      case 'inspector-field':
      case 'inspector-assignments':
      case 'inspector-history':
      case 'inspector-sync':
        return <InspectorMobileApp />;

      // Admin Command Center Actions
      case 'admin-command':
      case 'admin-registry':
      case 'admin-map':
      case 'admin-anomalies':
      case 'admin-complaints':
      case 'admin-audit':
        return <AdminDashboard />;

      default:
        return <LandingPage />;
    }
  };

  return (
    <div id="main-content" className="min-h-screen flex flex-col bg-[#F4F5F7] text-slate-800 font-sans selection:bg-amber-100 selection:text-amber-900">
      
      {/* Header */}
      <Header onOpenDemoControls={() => setIsDemoControlsOpen(true)} />

      {/* Role-based Navigation Bar */}
      <Navbar />

      {/* Main Page Body */}
      <main className="flex-1">
        {renderTabContent()}
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Presentation Demo Mode Control Drawer */}
      <DemoControls
        isOpen={isDemoControlsOpen}
        onClose={() => setIsDemoControlsOpen(false)}
      />

      {/* Real-time Toast Notifications */}
      <ToastContainer />

    </div>
  );
};

export function App() {
  return (
    <LMProvider>
      <AppContent />
    </LMProvider>
  );
}

export default App;
