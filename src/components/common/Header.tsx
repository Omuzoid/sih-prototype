import React, { useState } from 'react';
import { ShieldCheck, User, LogOut, Globe, SlidersHorizontal, AlertTriangle, Key } from 'lucide-react';
import { useLM } from '../../context/LMContext';

interface HeaderProps {
  onOpenDemoControls: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenDemoControls }) => {
  const { currentUser, activeRole, logout, loginAsDemo, isOfflineMode, setIsOfflineMode, offlineQueue, setCurrentTab } = useLM();
  const [language, setLanguage] = useState<'EN' | 'HI'>('EN');

  return (
    <header className="sticky top-0 z-40 bg-gov-navy text-white shadow-md border-b border-gov-navyLight">
      {/* Top National Identity Bar */}
      <div className="bg-[#061121] py-1 px-4 text-xs text-slate-300 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <span className="inline-flex items-center font-medium">
              <span className="w-2.5 h-1.5 bg-gov-saffron rounded-xs mr-1 inline-block"></span>
              <span className="w-2.5 h-1.5 bg-white rounded-xs mr-1 inline-block"></span>
              <span className="w-2.5 h-1.5 bg-gov-green rounded-xs mr-2 inline-block"></span>
              GOVERNMENT OF INDIA
            </span>
            <span className="hidden sm:inline text-slate-500">|</span>
            <span className="hidden sm:inline text-slate-400">Ministry of Consumer Affairs, Food & Public Distribution</span>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            {/* Bilingual Switcher */}
            <button 
              onClick={() => setLanguage(l => l === 'EN' ? 'HI' : 'EN')} 
              className="hover:text-amber-400 transition-colors flex items-center space-x-1 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700"
            >
              <Globe className="w-3 h-3 text-amber-400" />
              <span>{language === 'EN' ? 'English | हिंदी' : 'हिंदी | English'}</span>
            </button>

            {/* Prototype Banner Indicator */}
            <span className="bg-amber-500/20 text-amber-300 font-semibold px-2 py-0.5 rounded border border-amber-500/40 text-[10px]">
              SIH 2026 PROTOTYPE
            </span>

            {/* Demo Controls Quick Button */}
            <button 
              onClick={onOpenDemoControls}
              className="bg-gov-saffron hover:bg-gov-saffronDark text-slate-950 font-semibold px-2 py-0.5 rounded transition-all shadow text-[11px] flex items-center space-x-1"
            >
              <SlidersHorizontal className="w-3 h-3" />
              <span>Demo Panel</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Branding Header */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentTab('home')}>
          {/* Emblem & Logo Icon */}
          <div className="bg-gradient-to-br from-amber-400 to-amber-600 p-2.5 rounded-lg text-slate-950 shadow-lg">
            <ShieldCheck className="w-7 h-7 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-heading font-extrabold text-xl tracking-tight text-white">LM-DVS</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-gov-blue text-amber-300 rounded border border-blue-700">
                LEGAL METROLOGY
              </span>
            </div>
            <p className="text-xs text-slate-300 font-medium">
              Digital Verification & Lifecycle Management Platform
            </p>
          </div>
        </div>

        {/* User Role Switcher & Controls */}
        <div className="flex items-center space-x-3">
          {/* Offline Mode Toggle Simulation */}
          <button
            onClick={() => setIsOfflineMode(!isOfflineMode)}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center space-x-1.5 border transition-all ${
              isOfflineMode 
                ? 'bg-red-500/20 text-red-300 border-red-500/50 animate-pulse' 
                : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
            }`}
            title="Simulate Field Inspection Network Disconnection"
          >
            <AlertTriangle className={`w-3.5 h-3.5 ${isOfflineMode ? 'text-red-400' : 'text-emerald-400'}`} />
            <span>{isOfflineMode ? 'OFFLINE MODE' : 'ONLINE'}</span>
            {offlineQueue.length > 0 && (
              <span className="bg-red-500 text-white font-bold rounded-full w-4 h-4 text-[10px] flex items-center justify-center">
                {offlineQueue.length}
              </span>
            )}
          </button>

          {/* User Account / Role Selector */}
          {activeRole === 'public' ? (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentTab('login')}
                className="bg-gov-saffron hover:bg-amber-600 text-slate-950 font-bold px-4 py-1.5 rounded-md text-xs transition-colors flex items-center space-x-1 shadow"
              >
                <Key className="w-3.5 h-3.5" />
                <span>Portal Login</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-3 bg-slate-800/90 border border-slate-700 rounded-lg p-1.5 px-3">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center overflow-hidden text-amber-400 font-bold text-xs">
                  {currentUser?.avatar ? (
                    <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-4 h-4" />
                  )}
                </div>
                <div className="text-left hidden md:block">
                  <div className="text-xs font-semibold text-white leading-tight">{currentUser?.name}</div>
                  <div className="text-[10px] text-amber-400 uppercase font-medium">{activeRole}</div>
                </div>
              </div>

              <div className="h-6 w-px bg-slate-700"></div>

              <button
                onClick={logout}
                className="text-slate-400 hover:text-red-400 text-xs font-medium transition-colors flex items-center space-x-1"
                title="Logout"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
