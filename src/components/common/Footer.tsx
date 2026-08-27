import React from 'react';
import { ShieldCheck, ExternalLink, Award, Lock, FileCheck, Phone, Mail } from 'lucide-react';
import { useLM } from '../../context/LMContext';

export const Footer: React.FC = () => {
  const { setCurrentTab } = useLM();

  return (
    <footer className="bg-gov-navy text-slate-300 border-t-4 border-gov-saffron pt-10 pb-6 mt-16 text-xs">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        
        {/* Col 1: Govt Identity */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <div className="bg-amber-400 p-1.5 rounded text-slate-950">
              <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h4 className="text-white font-bold text-base leading-tight font-heading">LM-DVS INDIA</h4>
              <p className="text-[10px] text-amber-400 font-semibold uppercase">Legal Metrology Division</p>
            </div>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed mb-3">
            Department of Consumer Affairs<br />
            Ministry of Consumer Affairs, Food & Public Distribution<br />
            Government of India, Krishi Bhawan, New Delhi - 110001
          </p>
          <div className="flex items-center space-x-2 text-slate-400 text-[11px]">
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <span>Toll-Free National Helpline: 1915</span>
          </div>
        </div>

        {/* Col 2: Quick Portals */}
        <div>
          <h4 className="text-white font-bold text-sm mb-3 border-b border-slate-700 pb-1">Public & Citizen Services</h4>
          <ul className="space-y-2 text-slate-300">
            <li>
              <button onClick={() => setCurrentTab('public-qr')} className="hover:text-amber-400 transition-colors flex items-center space-x-1">
                <ExternalLink className="w-3 h-3 text-amber-400" />
                <span>Instant QR Instrument Verification</span>
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentTab('citizen-complaint')} className="hover:text-amber-400 transition-colors flex items-center space-x-1">
                <ExternalLink className="w-3 h-3 text-amber-400" />
                <span>File Consumer Weight Complaint</span>
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentTab('how-it-works')} className="hover:text-amber-400 transition-colors flex items-center space-x-1">
                <ExternalLink className="w-3 h-3 text-amber-400" />
                <span>5-Step Verification Process</span>
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentTab('about')} className="hover:text-amber-400 transition-colors flex items-center space-x-1">
                <ExternalLink className="w-3 h-3 text-amber-400" />
                <span>Legal Metrology Act & Rules 2011</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Statutory Pillars */}
        <div>
          <h4 className="text-white font-bold text-sm mb-3 border-b border-slate-700 pb-1">Platform Protections</h4>
          <div className="space-y-2.5 text-slate-400 text-xs">
            <div className="flex items-start space-x-2">
              <Lock className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>HMAC Cryptographic Tamper-Proof QR Seals</span>
            </div>
            <div className="flex items-start space-x-2">
              <Award className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
              <span>GPS Geofenced Field Inspector Verification</span>
            </div>
            <div className="flex items-start space-x-2">
              <FileCheck className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
              <span>AI OCR Digit Verification & MPE Tolerance Engine</span>
            </div>
          </div>
        </div>

        {/* Col 4: Hackathon Disclaimer */}
        <div className="bg-slate-900/80 p-3.5 rounded-lg border border-slate-800">
          <h4 className="text-amber-400 font-bold text-xs uppercase tracking-wider mb-2">SIH 2026 Hackathon Prototype</h4>
          <p className="text-[11px] text-slate-400 leading-normal mb-3">
            Designed for <strong className="text-white">SIH26036</strong> problem statement. Simulated frontend demonstration platform — not connected to live government databases.
          </p>
          <div className="bg-slate-800 p-2 rounded text-[10px] text-slate-300 font-mono flex items-center justify-between">
            <span>STATUS: FRONTEND PROTOTYPE</span>
            <span className="text-emerald-400 font-bold">ONLINE</span>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 pt-4 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-slate-500 text-[11px]">
        <p>© 2026 Department of Consumer Affairs — Legal Metrology Division. Built for SIH 2026.</p>
        <p className="mt-2 md:mt-0">Designed according to GOI Digital Service Accessibility Guidelines.</p>
      </div>
    </footer>
  );
};
