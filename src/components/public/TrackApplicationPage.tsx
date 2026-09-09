import React, { useState } from 'react';
import { Search, Calendar, CheckCircle2, Clock, ShieldCheck, AlertCircle, Building, User, MapPin } from 'lucide-react';
import { useLM } from '../../context/LMContext';

export const TrackApplicationPage: React.FC = () => {
  const { getApplicationTimeline, language } = useLM();
  const [searchId, setSearchId] = useState<string>('LM-DVS-2026-000928');
  const [activeSearch, setActiveSearch] = useState<string>('LM-DVS-2026-000928');

  const result = getApplicationTimeline(activeSearch);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchId.trim()) {
      setActiveSearch(searchId.trim());
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 text-left">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0B2348] to-[#07152F] text-white p-6 rounded-2xl shadow-md space-y-2 border border-slate-800">
        <div className="inline-flex items-center space-x-2 bg-amber-500/20 text-amber-300 text-xs font-bold px-3 py-1 rounded-full border border-amber-500/40">
          <Calendar className="w-3.5 h-3.5" />
          <span>{language === 'hi' ? 'राष्ट्रीय आवेदन ट्रैकिंग पोर्टल' : 'NATIONAL APPLICATION TRACKING PORTAL'}</span>
        </div>
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
          {language === 'hi' ? 'आवेदन स्थिति ट्रैक करें' : 'Track Verification Application'}
        </h1>
        <p className="text-slate-300 text-xs sm:text-sm">
          {language === 'hi'
            ? 'अपनी सत्यापन स्थिति का पालन करने के लिए अपना आवेदन संख्या, उपकरण आईडी या मोबाइल नंबर दर्ज करें।'
            : 'Enter your Application Number (LM-APT...), Device ID (LM-DVS...), or Serial Number to monitor your verification lifecycle.'}
        </p>
      </div>

      {/* Search Input Box */}
      <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-4">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder="e.g. LM-DVS-2026-000928 or LM-APT-2026-00812"
              className="w-full pl-9 pr-3 py-3 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono font-bold text-slate-900 focus:ring-2 focus:ring-amber-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
          </div>
          <button
            type="submit"
            className="bg-[#0B2348] hover:bg-[#102A52] text-white font-extrabold text-xs px-6 py-3 rounded-lg shadow transition-colors"
          >
            {language === 'hi' ? 'स्थिति खोजें' : 'Track Status'}
          </button>
        </form>

        {/* Quick Samples */}
        <div className="flex flex-wrap items-center gap-2 text-xs pt-2 border-t border-slate-100">
          <span className="text-slate-500 font-medium">Quick Demo Samples:</span>
          <button
            onClick={() => { setSearchId('LM-DVS-2026-000928'); setActiveSearch('LM-DVS-2026-000928'); }}
            className="px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded font-mono font-bold hover:bg-emerald-100"
          >
            LM-DVS-2026-000928 (Verified)
          </button>
          <button
            onClick={() => { setSearchId('LM-DVS-2026-000932'); setActiveSearch('LM-DVS-2026-000932'); }}
            className="px-2.5 py-1 bg-blue-50 text-blue-800 border border-blue-200 rounded font-mono font-bold hover:bg-blue-100"
          >
            LM-DVS-2026-000932 (Pending Inspection)
          </button>
        </div>
      </div>

      {/* Timeline Results Card */}
      {result && result.instrument ? (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-lg p-6 space-y-6 animate-in fade-in duration-200">
          
          {/* Header Specs */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row justify-between gap-3 text-xs">
            <div>
              <span className="text-slate-500 font-medium">Target Device ID:</span>
              <div className="font-mono font-extrabold text-[#0B2348] text-base">{result.instrument.id}</div>
              <div className="text-slate-700 font-bold mt-0.5">{result.instrument.businessName}</div>
              <div className="text-slate-500">{result.instrument.type} ({result.instrument.serialNumber})</div>
            </div>

            <div className="text-right sm:text-right">
              <span className="text-slate-500 font-medium">Current Status:</span>
              <div>
                <span className={`inline-block font-extrabold text-xs px-2.5 py-1 rounded border mt-1 ${
                  result.instrument.status === 'VERIFIED'
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                    : 'bg-blue-100 text-blue-800 border-blue-300'
                }`}>
                  {result.instrument.status}
                </span>
              </div>
              <div className="text-[10px] text-slate-400 mt-1 font-mono">{result.instrument.district}, {result.instrument.state}</div>
            </div>
          </div>

          {/* Timeline Steps */}
          <div className="space-y-4">
            <h3 className="font-heading font-bold text-slate-900 text-base border-b pb-2">
              {language === 'hi' ? 'सत्यापन प्रक्रिया की समयरेखा' : 'Verification Progress Timeline'}
            </h3>

            <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {result.steps.map(step => (
                <div key={step.step} className="relative flex items-start space-x-3 text-xs">
                  
                  {/* Step Icon Indicator */}
                  <div className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${
                    step.status === 'COMPLETED'
                      ? 'bg-emerald-600 text-white'
                      : step.status === 'IN_PROGRESS'
                        ? 'bg-amber-500 text-slate-950 animate-pulse'
                        : 'bg-slate-200 text-slate-500'
                  }`}>
                    {step.status === 'COMPLETED' ? '✓' : step.step}
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex-1 flex justify-between items-center">
                    <div>
                      <div className="font-bold text-slate-900 text-sm">
                        {language === 'hi' ? step.labelHi : step.label}
                      </div>
                      {step.date && (
                        <div className="text-[11px] text-slate-500 font-mono mt-0.5">Timestamp / Log: {step.date}</div>
                      )}
                    </div>

                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded ${
                      step.status === 'COMPLETED'
                        ? 'bg-emerald-100 text-emerald-800'
                        : step.status === 'IN_PROGRESS'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-100 text-slate-500'
                    }`}>
                      {step.status}
                    </span>
                  </div>

                </div>
              ))}
            </div>
          </div>

        </div>
      ) : (
        <div className="bg-white border border-slate-200 p-8 rounded-2xl text-center space-y-3">
          <AlertCircle className="w-10 h-10 text-amber-500 mx-auto" />
          <h3 className="font-bold text-slate-900 text-base">No record found for "{activeSearch}"</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try searching for demo device ID <strong className="font-mono text-slate-800">LM-DVS-2026-000928</strong> above.
          </p>
        </div>
      )}

    </div>
  );
};
