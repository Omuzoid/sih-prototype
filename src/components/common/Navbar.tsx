import React, { useState } from 'react';
import { 
  Home, QrCode, AlertCircle, HelpCircle, Info, Key, Search,
  LayoutDashboard, PlusCircle, Calculator, Calendar, ShieldCheck, 
  Map, Activity, FileText, History, RefreshCw, Smartphone, Layers
} from 'lucide-react';
import { useLM } from '../../context/LMContext';

export const Navbar: React.FC = () => {
  const { 
    activeRole, currentTab, setCurrentTab, offlineQueue, 
    language, globalSearchQuery, setGlobalSearchQuery 
  } = useLM();

  const [quickSearchInput, setQuickSearchInput] = useState<string>('');

  const handleQuickSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickSearchInput.trim()) {
      setGlobalSearchQuery(quickSearchInput.trim());
      setCurrentTab('public-qr');
    }
  };

  const navItems = [
    { id: 'home', labelEn: 'Home', labelHi: 'मुख्य पृष्ठ', icon: Home },
    { id: 'services', labelEn: 'Services', labelHi: 'सेवाएं', icon: Layers },
    { id: 'public-qr', labelEn: 'Verification', labelHi: 'सत्यापन', icon: QrCode },
    { id: 'certificates', labelEn: 'Certificates', labelHi: 'प्रमाणपत्र', icon: ShieldCheck },
    { id: 'track-app', labelEn: 'Track Application', labelHi: 'आवेदन ट्रैक करें', icon: Calendar },
    { id: 'about', labelEn: 'About', labelHi: 'हमारे बारे में', icon: Info },
    { id: 'citizen-complaint', labelEn: 'Contact / Complaint', labelHi: 'संपर्क / शिकायत', icon: AlertCircle },
  ];

  return (
    <nav className="bg-[#0B2348] text-white shadow-md border-b border-slate-800 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-stretch md:items-center justify-between">
        
        {/* Navigation Tab Links */}
        <div className="flex items-center space-x-1 overflow-x-auto scrollbar-none py-1 min-w-max">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = currentTab === item.id || 
              (item.id === 'services' && (currentTab === 'trader-register' || currentTab === 'trader-calculator')) ||
              (item.id === 'certificates' && currentTab === 'trader-certificates');

            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === 'services') {
                    if (activeRole === 'trader') setCurrentTab('trader-dashboard');
                    else if (activeRole === 'inspector') setCurrentTab('inspector-field');
                    else if (activeRole === 'admin') setCurrentTab('admin-command');
                    else setCurrentTab('how-it-works');
                  } else if (item.id === 'certificates') {
                    if (activeRole === 'trader') setCurrentTab('trader-certificates');
                    else setCurrentTab('public-qr');
                  } else {
                    setCurrentTab(item.id);
                  }
                }}
                className={`px-4 py-2.5 text-xs font-bold transition-all flex items-center space-x-1.5 border-b-2 ${
                  isActive
                    ? 'bg-[#102A52] text-amber-300 border-gov-saffron font-extrabold shadow-inner'
                    : 'border-transparent text-slate-200 hover:bg-[#102A52]/70 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{language === 'hi' ? item.labelHi : item.labelEn}</span>
              </button>
            );
          })}
        </div>

        {/* Quick Search Widget */}
        <form onSubmit={handleQuickSearchSubmit} className="py-1.5 px-2 md:px-0 flex items-center">
          <div className="relative w-full md:w-56">
            <input
              type="text"
              value={quickSearchInput}
              onChange={(e) => setQuickSearchInput(e.target.value)}
              placeholder={language === 'hi' ? 'त्वरित खोज...' : 'Quick Search...'}
              className="w-full pl-8 pr-3 py-1.5 bg-[#07152F] border border-slate-700 rounded-md text-xs font-medium text-white placeholder-slate-400 focus:outline-hidden focus:ring-1 focus:ring-amber-400"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          </div>
        </form>

      </div>
    </nav>
  );
};
