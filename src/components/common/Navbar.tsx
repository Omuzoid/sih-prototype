import React from 'react';
import { 
  Home, QrCode, AlertCircle, HelpCircle, Info, Key, 
  LayoutDashboard, PlusCircle, Calculator, Calendar, ShieldCheck, 
  Map, Activity, FileText, History, RefreshCw, Smartphone
} from 'lucide-react';
import { useLM } from '../../context/LMContext';

export const Navbar: React.FC = () => {
  const { activeRole, currentTab, setCurrentTab, offlineQueue } = useLM();

  const renderNavLinks = () => {
    if (activeRole === 'public') {
      return (
        <>
          <NavButton id="home" label="Home" icon={Home} active={currentTab === 'home'} onClick={setCurrentTab} />
          <NavButton id="public-qr" label="Verify QR Code" icon={QrCode} active={currentTab === 'public-qr'} highlight onClick={setCurrentTab} />
          <NavButton id="citizen-complaint" label="File Complaint" icon={AlertCircle} active={currentTab === 'citizen-complaint'} onClick={setCurrentTab} />
          <NavButton id="how-it-works" label="How It Works" icon={HelpCircle} active={currentTab === 'how-it-works'} onClick={setCurrentTab} />
          <NavButton id="about" label="About LM-DVS" icon={Info} active={currentTab === 'about'} onClick={setCurrentTab} />
        </>
      );
    }

    if (activeRole === 'trader') {
      return (
        <>
          <NavButton id="trader-dashboard" label="Trader Dashboard" icon={LayoutDashboard} active={currentTab === 'trader-dashboard'} onClick={setCurrentTab} />
          <NavButton id="trader-register" label="+ Register Instrument" icon={PlusCircle} active={currentTab === 'trader-register'} highlight onClick={setCurrentTab} />
          <NavButton id="trader-calculator" label="Fee Calculator" icon={Calculator} active={currentTab === 'trader-calculator'} onClick={setCurrentTab} />
          <NavButton id="trader-booking" label="Book Inspection" icon={Calendar} active={currentTab === 'trader-booking'} onClick={setCurrentTab} />
          <NavButton id="trader-certificates" label="My Certificates" icon={ShieldCheck} active={currentTab === 'trader-certificates'} onClick={setCurrentTab} />
        </>
      );
    }

    if (activeRole === 'inspector') {
      return (
        <>
          <NavButton id="inspector-field" label="Field Inspection App" icon={Smartphone} active={currentTab === 'inspector-field'} highlight onClick={setCurrentTab} />
          <NavButton id="inspector-assignments" label="Today's Assignments" icon={Calendar} active={currentTab === 'inspector-assignments'} onClick={setCurrentTab} />
          <NavButton id="inspector-history" label="Inspection History" icon={History} active={currentTab === 'inspector-history'} onClick={setCurrentTab} />
          <NavButton 
            id="inspector-sync" 
            label={`Offline Queue (${offlineQueue.length})`} 
            icon={RefreshCw} 
            active={currentTab === 'inspector-sync'} 
            onClick={setCurrentTab} 
            badge={offlineQueue.length > 0 ? offlineQueue.length : undefined}
          />
        </>
      );
    }

    if (activeRole === 'admin') {
      return (
        <>
          <NavButton id="admin-command" label="Command Center" icon={LayoutDashboard} active={currentTab === 'admin-command'} onClick={setCurrentTab} />
          <NavButton id="admin-registry" label="Master Registry" icon={FileText} active={currentTab === 'admin-registry'} onClick={setCurrentTab} />
          <NavButton id="admin-map" label="National GIS Map" icon={Map} active={currentTab === 'admin-map'} onClick={setCurrentTab} />
          <NavButton id="admin-anomalies" label="AI Risk & Anomalies" icon={Activity} active={currentTab === 'admin-anomalies'} highlight onClick={setCurrentTab} />
          <NavButton id="admin-complaints" label="Complaints Desk" icon={AlertCircle} active={currentTab === 'admin-complaints'} onClick={setCurrentTab} />
          <NavButton id="admin-audit" label="Audit Trail" icon={History} active={currentTab === 'admin-audit'} onClick={setCurrentTab} />
        </>
      );
    }

    return null;
  };

  return (
    <nav className="bg-slate-900 border-b border-slate-800 text-slate-200 shadow-sm sticky top-[73px] z-30">
      <div className="max-w-7xl mx-auto px-4 overflow-x-auto scrollbar-none">
        <div className="flex items-center space-x-1 py-1 min-w-max">
          {renderNavLinks()}
        </div>
      </div>
    </nav>
  );
};

interface NavButtonProps {
  id: string;
  label: string;
  icon: React.ElementType;
  active: boolean;
  highlight?: boolean;
  badge?: number;
  onClick: (id: string) => void;
}

const NavButton: React.FC<NavButtonProps> = ({ id, label, icon: Icon, active, highlight, badge, onClick }) => {
  return (
    <button
      onClick={() => onClick(id)}
      className={`px-3.5 py-2 rounded-md text-xs font-medium flex items-center space-x-1.5 transition-all ${
        active 
          ? 'bg-gov-saffron text-slate-950 font-bold shadow' 
          : highlight 
            ? 'bg-blue-600/30 text-blue-200 hover:bg-blue-600/50 border border-blue-500/40' 
            : 'text-slate-300 hover:bg-slate-800 hover:text-white'
      }`}
    >
      <Icon className="w-4 h-4" />
      <span>{label}</span>
      {badge !== undefined && (
        <span className="ml-1 bg-amber-500 text-slate-950 font-extrabold text-[10px] px-1.5 py-0.2 rounded-full">
          {badge}
        </span>
      )}
    </button>
  );
};
