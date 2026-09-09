import React from 'react';
import { Scale, ExternalLink, Award, Lock, FileCheck, Phone, Mail } from 'lucide-react';
import { useLM } from '../../context/LMContext';

export const Footer: React.FC = () => {
  const { setCurrentTab, language } = useLM();

  return (
    <footer className="bg-[#07152F] text-slate-300 border-t-4 border-gov-saffron pt-12 pb-6 mt-16 text-xs text-left">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        
        {/* Col 1: Govt Identity */}
        <div>
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-[#0B2348] border border-amber-400 flex items-center justify-center text-amber-400 shadow">
              <Scale className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <h4 className="text-white font-extrabold text-base leading-tight font-heading">LEGAL METRIX</h4>
              <p className="text-[10px] text-amber-400 font-bold uppercase">Legal Metrology Division</p>
            </div>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed mb-3">
            Department of Consumer Affairs<br />
            Ministry of Consumer Affairs, Food & Public Distribution<br />
            Government of India, Krishi Bhawan, New Delhi - 110001
          </p>
          <div className="flex items-center space-x-2 text-slate-300 text-[11px] font-mono">
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <span>National Helpline: 1800-11-4000</span>
          </div>
        </div>

        {/* Col 2: Public & Citizen Portals */}
        <div>
          <h4 className="text-white font-bold text-sm mb-3 border-b border-slate-700 pb-1">Public & Citizen Services</h4>
          <ul className="space-y-2 text-slate-300 text-xs">
            <li>
              <button onClick={() => setCurrentTab('public-qr')} className="hover:text-amber-400 transition-colors flex items-center space-x-1">
                <ExternalLink className="w-3 h-3 text-amber-400" />
                <span>Instant QR Instrument Verification</span>
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentTab('track-app')} className="hover:text-amber-400 transition-colors flex items-center space-x-1">
                <ExternalLink className="w-3 h-3 text-amber-400" />
                <span>Track Application Progress Timeline</span>
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
                <span>7-Step Verification Workflow</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Institutional Metadata */}
        <div>
          <h4 className="text-white font-bold text-sm mb-3 border-b border-slate-700 pb-1">Institutional Metadata</h4>
          <div className="space-y-2 text-slate-400 text-xs font-mono">
            <div>Content Managed By: <strong className="text-slate-200">Legal Metrology Division</strong></div>
            <div>Designed For: <strong className="text-slate-200">Smart India Hackathon 2026</strong></div>
            <div>Last Updated: <strong className="text-slate-200">09 September 2026</strong></div>
            <div>Portal Version: <strong className="text-amber-400">Prototype 1.0 (BETA)</strong></div>
          </div>
        </div>

        {/* Col 4: Hackathon Disclaimer */}
        <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2">
          <h4 className="text-amber-400 font-bold text-xs uppercase tracking-wider">SIH 2026 Hackathon Prototype</h4>
          <p className="text-[11px] text-slate-400 leading-normal">
            Built for <strong className="text-white">SIH26036</strong> problem statement. This is a simulated frontend demonstration portal.
          </p>
          <div className="bg-slate-950 p-2 rounded text-[10px] text-slate-300 font-mono flex items-center justify-between">
            <span>PORTAL IDENTITY:</span>
            <span className="text-emerald-400 font-bold">LEGAL METRIX</span>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 pt-4 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-slate-500 text-[11px]">
        <p>© 2026 Legal Metrology Division, Department of Consumer Affairs, Govt. of India. SIH 2026 Prototype.</p>
        <div className="flex space-x-3 mt-2 md:mt-0 text-slate-400">
          <a href="#" className="hover:underline">Accessibility Statement</a>
          <span>•</span>
          <a href="#" className="hover:underline">Privacy Policy</a>
          <span>•</span>
          <a href="#" className="hover:underline">Terms of Service</a>
          <span>•</span>
          <a href="#" className="hover:underline">Sitemap</a>
        </div>
      </div>
    </footer>
  );
};
