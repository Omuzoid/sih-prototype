import React from 'react';
import { 
  ShieldCheck, User, LogOut, Globe, SlidersHorizontal, AlertTriangle, Key, 
  Calendar, PhoneCall, Scale, ArrowRight, PlusCircle, Sun, Moon, Eye
} from 'lucide-react';
import { useLM } from '../../context/LMContext';

interface HeaderProps {
  onOpenDemoControls: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenDemoControls }) => {
  const { 
    currentUser, activeRole, logout, isOfflineMode, setIsOfflineMode, 
    offlineQueue, setCurrentTab, language, setLanguage, fontSizeScale, 
    setFontSizeScale, isHighContrast, setIsHighContrast 
  } = useLM();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  const handleFontChange = (scale: 'small' | 'normal' | 'large') => {
    setFontSizeScale(scale);
    document.body.className = document.body.className
      .replace(/font-scale-\w+/g, '') + ` font-scale-${scale}`;
  };

  const handleContrastToggle = () => {
    setIsHighContrast(!isHighContrast);
    if (!isHighContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  };

  return (
    <header className="w-full shadow-md z-40">
      
      {/* 1. TOP UTILITY BAR (Thin Dark Navy #07152F) */}
      <div className="bg-[#07152F] text-slate-300 text-[11px] py-1 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          
          {/* Left Info Items */}
          <div className="flex items-center space-x-3 text-slate-300">
            <span className="inline-flex items-center font-medium text-emerald-400">
              <span className="w-2 h-2 bg-emerald-400 rounded-full mr-1.5 animate-pulse"></span>
              {language === 'hi' ? 'राष्ट्रीय विधिक माप विज्ञान सत्यापन प्रणाली' : 'National Legal Metrology Verification System'}
            </span>

            <span className="text-slate-600">|</span>

            <span className="hidden sm:inline-flex items-center space-x-1 text-slate-300 font-mono">
              <Calendar className="w-3 h-3 text-amber-400" />
              <span>Wed, 09 Sept, 2026</span>
            </span>

            <span className="hidden md:inline-flex text-slate-600">|</span>

            <span className="hidden md:inline-flex items-center space-x-1 text-slate-300">
              <PhoneCall className="w-3 h-3 text-amber-400" />
              <span>{language === 'hi' ? 'टोल-फ्री हेल्पलाइन:' : 'Toll-Free National Helpline:'}</span>
              <strong className="text-white font-mono font-bold">1800-11-4000</strong>
              <span className="text-[10px] text-slate-400">(9:30 AM - 6:00 PM)</span>
            </span>
          </div>

          {/* Right Utility & Accessibility Controls */}
          <div className="flex items-center space-x-3">
            
            {/* Skip to Main Content */}
            <a 
              href="#main-content" 
              className="hover:text-amber-300 transition-colors hidden lg:inline-block text-[10px] font-medium"
            >
              {language === 'hi' ? 'मुख्य विषय वस्तु पर जाएं' : 'Skip to main content'}
            </a>

            {/* Font Scale A- A A+ */}
            <div className="hidden sm:flex items-center space-x-1 bg-slate-900/80 px-1.5 py-0.5 rounded border border-slate-700 text-[10px] font-bold font-mono">
              <button 
                onClick={() => handleFontChange('small')}
                className={`px-1 hover:text-amber-400 ${fontSizeScale === 'small' ? 'text-amber-400' : 'text-slate-400'}`}
                title="Small Font"
              >
                A-
              </button>
              <button 
                onClick={() => handleFontChange('normal')}
                className={`px-1 hover:text-amber-400 ${fontSizeScale === 'normal' ? 'text-amber-400' : 'text-slate-400'}`}
                title="Normal Font"
              >
                A
              </button>
              <button 
                onClick={() => handleFontChange('large')}
                className={`px-1 hover:text-amber-400 ${fontSizeScale === 'large' ? 'text-amber-400' : 'text-slate-400'}`}
                title="Large Font"
              >
                A+
              </button>
            </div>

            {/* High Contrast Toggle */}
            <button
              onClick={handleContrastToggle}
              className="p-1 rounded bg-slate-900 border border-slate-700 hover:text-amber-300 transition-colors text-[10px] flex items-center space-x-1"
              title="Toggle High Contrast Mode"
            >
              <Eye className="w-3 h-3 text-amber-400" />
            </button>

            {/* Hindi / English Language Switcher */}
            <button 
              onClick={toggleLanguage}
              className="hover:text-amber-300 transition-colors flex items-center space-x-1 bg-slate-900 px-2 py-0.5 rounded border border-slate-700 font-bold text-[11px]"
            >
              <Globe className="w-3 h-3 text-amber-400" />
              <span>{language === 'en' ? 'अ / A' : 'A / अ'}</span>
            </button>

            {/* Indian Flag Badge */}
            <span className="text-sm" title="Government of India">🇮🇳</span>

            {/* SIH Prototype Badge & Demo Drawer Button */}
            <button 
              onClick={onOpenDemoControls}
              className="bg-gov-saffron hover:bg-gov-saffronDark text-white font-extrabold px-2 py-0.5 rounded transition-all shadow text-[10px] flex items-center space-x-1"
            >
              <SlidersHorizontal className="w-3 h-3" />
              <span>SIH DEMO PANEL</span>
            </button>

          </div>

        </div>
      </div>

      {/* 2. MAIN INSTITUTIONAL HEADER (White Background) */}
      <div className="bg-white text-slate-900 py-3.5 px-4 border-b border-slate-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Brand Identity */}
          <div 
            className="flex items-center space-x-3 cursor-pointer text-left" 
            onClick={() => setCurrentTab('home')}
          >
            {/* Custom Scales Emblem Badge */}
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0B2348] to-[#07152F] border-2 border-amber-500 flex items-center justify-center text-amber-400 shadow-md flex-shrink-0">
              <Scale className="w-7 h-7 stroke-[2.2]" />
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <span className="font-heading font-extrabold text-2xl tracking-tight text-[#0B2348]">
                  LEGAL METROLOGY
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-gov-red text-white rounded">
                  DIGITAL PORTAL
                </span>
              </div>
              <p className="text-xs text-slate-600 font-medium">
                {language === 'hi'
                  ? 'बाट और माप सत्यापन, प्रमाणन और जीवनचक्र प्रबंधन प्रणाली'
                  : 'Weights & Measures Verification, Certification and Lifecycle Management'}
              </p>
            </div>
          </div>

          {/* User Auth Buttons or Active Account */}
          <div className="flex items-center space-x-3">
            
            {/* Field Offline Status Indicator */}
            <button
              onClick={() => setIsOfflineMode(!isOfflineMode)}
              className={`px-3 py-1.5 rounded-md text-xs font-bold flex items-center space-x-1.5 border transition-all ${
                isOfflineMode 
                  ? 'bg-red-100 text-red-800 border-red-300 animate-pulse' 
                  : 'bg-emerald-50 text-emerald-800 border-emerald-300'
              }`}
              title="Field Offline Mode Toggle"
            >
              <AlertTriangle className={`w-3.5 h-3.5 ${isOfflineMode ? 'text-red-600' : 'text-emerald-600'}`} />
              <span>{isOfflineMode ? 'OFFLINE MODE' : 'ONLINE'}</span>
              {offlineQueue.length > 0 && (
                <span className="bg-red-600 text-white font-extrabold rounded-full w-4 h-4 text-[10px] flex items-center justify-center">
                  {offlineQueue.length}
                </span>
              )}
            </button>

            {activeRole === 'public' ? (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentTab('login')}
                  className="border border-slate-300 hover:bg-slate-50 text-[#0B2348] font-bold px-4 py-2 rounded-md text-xs transition-colors flex items-center space-x-1.5 shadow-xs"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                  <span>{language === 'hi' ? 'लॉगिन' : 'Login'}</span>
                </button>

                <button
                  onClick={() => {
                    setCurrentTab('trader-register');
                  }}
                  className="bg-gov-red hover:bg-red-700 text-white font-extrabold px-4 py-2 rounded-md text-xs transition-colors flex items-center space-x-1.5 shadow-md"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>{language === 'hi' ? '+ पंजीकरण' : '+ Register'}</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3 bg-slate-100 border border-slate-300 rounded-lg p-1.5 px-3">
                <div className="flex items-center space-x-2">
                  <div className="w-7 h-7 rounded-full bg-[#0B2348] text-amber-400 flex items-center justify-center font-bold text-xs">
                    <User className="w-4 h-4" />
                  </div>
                  <div className="text-left hidden md:block">
                    <div className="text-xs font-bold text-[#0B2348] leading-tight">{currentUser?.name}</div>
                    <div className="text-[10px] text-gov-saffron uppercase font-bold">{activeRole}</div>
                  </div>
                </div>

                <div className="h-6 w-px bg-slate-300"></div>

                <button
                  onClick={logout}
                  className="text-slate-500 hover:text-red-600 text-xs font-bold transition-colors flex items-center space-x-1"
                  title="Logout"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

          </div>

        </div>
      </div>

    </header>
  );
};
