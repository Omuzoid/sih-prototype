import React from 'react';
import { MessageSquare, ShieldCheck, Calendar, Share2, Eye, HelpCircle } from 'lucide-react';
import { useLM } from '../../context/LMContext';

export const FloatingRightDock: React.FC = () => {
  const { setCurrentTab, loginAsDemo, addToast, isHighContrast, setIsHighContrast } = useLM();

  return (
    <aside aria-label="Quick Action Floating Toolbar" className="fixed right-3 top-1/3 z-40 flex flex-col space-y-2.5">
      
      {/* 1. Chat Assistant / Help */}
      <button
        onClick={() => addToast('info', 'Legal Metrology Helpline', 'Contact 1800-11-4000 for verification assistance.')}
        className="w-10 h-10 rounded-full bg-[#0B2348] hover:bg-[#102A52] text-amber-400 border border-slate-700 shadow-xl flex items-center justify-center transition-transform hover:scale-110 group relative"
        title="Helpline Assistant"
      >
        <MessageSquare className="w-5 h-5" />
        <span className="absolute right-12 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Helpline Chat
        </span>
      </button>

      {/* 2. Officer Login */}
      <button
        onClick={() => loginAsDemo('inspector')}
        className="w-10 h-10 rounded-full bg-[#0B2348] hover:bg-[#102A52] text-emerald-400 border border-slate-700 shadow-xl flex items-center justify-center transition-transform hover:scale-110 group relative"
        title="Inspector Field Login"
      >
        <ShieldCheck className="w-5 h-5" />
        <span className="absolute right-12 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Inspector App
        </span>
      </button>

      {/* 3. Book Appointment */}
      <button
        onClick={() => {
          loginAsDemo('trader');
          setCurrentTab('trader-booking');
        }}
        className="w-10 h-10 rounded-full bg-[#0B2348] hover:bg-[#102A52] text-amber-300 border border-slate-700 shadow-xl flex items-center justify-center transition-transform hover:scale-110 group relative"
        title="Book Verification Appointment"
      >
        <Calendar className="w-5 h-5" />
        <span className="absolute right-12 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Book Slot
        </span>
      </button>

      {/* 4. Share Platform */}
      <button
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          addToast('success', 'URL Copied', 'Portal link copied to clipboard.');
        }}
        className="w-10 h-10 rounded-full bg-[#0B2348] hover:bg-[#102A52] text-blue-300 border border-slate-700 shadow-xl flex items-center justify-center transition-transform hover:scale-110 group relative"
        title="Share Portal"
      >
        <Share2 className="w-5 h-5" />
        <span className="absolute right-12 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Share Portal
        </span>
      </button>

      {/* 5. Contrast Toggle */}
      <button
        onClick={() => {
          setIsHighContrast(!isHighContrast);
          if (!isHighContrast) document.body.classList.add('high-contrast');
          else document.body.classList.remove('high-contrast');
        }}
        className="w-10 h-10 rounded-full bg-[#0B2348] hover:bg-[#102A52] text-purple-300 border border-slate-700 shadow-xl flex items-center justify-center transition-transform hover:scale-110 group relative"
        title="High Contrast"
      >
        <Eye className="w-5 h-5" />
        <span className="absolute right-12 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Contrast Mode
        </span>
      </button>

    </aside>
  );
};
