import React, { useState } from 'react';
import { 
  ShieldCheck, QrCode, Search, CheckCircle, Smartphone, 
  Award, Lock, FileText, ArrowRight, Building, Users, AlertTriangle, 
  ChevronRight, Scale, Calendar, Layers, Map, Eye, Bell 
} from 'lucide-react';
import { useLM } from '../../context/LMContext';
import { NoticeTicker } from '../common/NoticeTicker';
import { FloatingRightDock } from '../common/FloatingRightDock';

export const LandingPage: React.FC = () => {
  const { 
    setCurrentTab, loginAsDemo, instruments, certificates, 
    language, globalSearchQuery, setGlobalSearchQuery, 
    globalSearchCategory, setGlobalSearchCategory 
  } = useLM();

  const [searchInput, setSearchInput] = useState<string>('');
  const [categoryInput, setCategoryInput] = useState<string>('All Categories');

  const handleHeroSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setGlobalSearchQuery(searchInput.trim());
      setGlobalSearchCategory(categoryInput);

      if (searchInput.toLowerCase().startsWith('lm-apt') || categoryInput === 'Application') {
        setCurrentTab('track-app');
      } else {
        setCurrentTab('public-qr');
      }
    }
  };

  const handleChipClick = (term: string, tab: string) => {
    setGlobalSearchQuery(term);
    setCurrentTab(tab);
  };

  return (
    <div className="space-y-12">
      
      {/* 1. Notice Ticker */}
      <NoticeTicker />

      {/* 2. Floating Right Utility Dock */}
      <FloatingRightDock />

      {/* 3. HERO SECTION (Sandstone Monument Visual Background Overlay) */}
      <section className="relative gov-monument-bg text-white pt-16 pb-24 px-4 overflow-hidden border-b border-slate-800">
        <div className="max-w-6xl mx-auto text-center space-y-6 relative z-10">
          
          {/* Emblem & Sanskrit Motto */}
          <div className="space-y-2">
            <div className="w-16 h-16 rounded-full bg-[#07152F]/90 border-2 border-amber-400 flex items-center justify-center text-amber-400 mx-auto shadow-2xl">
              <Scale className="w-9 h-9 stroke-[2.2]" />
            </div>
            
            <div className="font-heading font-bold text-amber-300 text-sm tracking-widest uppercase">
              सत्यं मानं प्रमाणं च
            </div>

            <div className="text-[11px] font-bold text-slate-300 tracking-wider uppercase font-mono">
              LEGAL METROLOGY • STANDARDS OF WEIGHTS & MEASURES
            </div>
          </div>

          {/* Title & Beta Badge */}
          <div className="space-y-2">
            <div className="inline-flex items-center justify-center space-x-3">
              <h1 className="font-heading font-extrabold text-4xl sm:text-6xl text-white tracking-tight">
                metrology.gov.in
              </h1>
              <span className="bg-amber-400 text-slate-950 font-extrabold text-xs px-2.5 py-1 rounded shadow uppercase">
                BETA
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold font-heading text-amber-200">
              {language === 'hi' ? 'विधिक माप विज्ञान का राष्ट्रीय पोर्टल' : 'National Portal of Legal Metrology'}
            </h2>

            <p className="text-slate-300 text-sm max-w-2xl mx-auto leading-relaxed">
              {language === 'hi'
                ? 'जहाँ सरकारी मानक और सार्वजनिक विश्वास का मिलन होता है। वाणिज्यिक बाट और माप का पारदर्शी सत्यापन और प्रमाणन।'
                : 'Where Government Standards & Public Assurance Converge. Transparent verification, secure certification, and lifecycle tracking.'}
            </p>
          </div>

          {/* Large Horizontal 950px Search Box */}
          <div className="pt-4 max-w-4xl mx-auto">
            <form 
              onSubmit={handleHeroSearchSubmit}
              className="bg-white rounded-xl shadow-2xl p-2 border border-slate-200 flex flex-col sm:flex-row items-center gap-2 text-slate-900"
            >
              <div className="relative flex-1 w-full">
                <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder={language === 'hi' ? 'प्रमाणपत्र / उपकरण / आवेदन संख्या खोजें...' : 'Search for Certificate / Instrument / Application / Officer...'}
                  className="w-full pl-11 pr-4 py-3 bg-transparent text-xs font-semibold text-slate-900 placeholder-slate-400 focus:outline-hidden"
                />
              </div>

              <div className="w-full sm:w-44 border-t sm:border-t-0 sm:border-l border-slate-200 pt-2 sm:pt-0 sm:pl-2">
                <select
                  value={categoryInput}
                  onChange={(e) => setCategoryInput(e.target.value)}
                  className="w-full py-2 bg-transparent text-xs font-bold text-slate-700 focus:outline-hidden cursor-pointer"
                >
                  <option value="All Categories">All Categories</option>
                  <option value="Certificate">Certificate</option>
                  <option value="Instrument">Instrument</option>
                  <option value="Application">Application</option>
                  <option value="Trader">Trader</option>
                  <option value="Inspector">Inspector</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto bg-gov-red hover:bg-red-700 text-white font-extrabold text-xs px-8 py-3 rounded-lg shadow-md transition-all flex items-center justify-center space-x-2"
              >
                <Search className="w-4 h-4 text-white" />
                <span>{language === 'hi' ? 'खोजें' : 'SEARCH'}</span>
              </button>
            </form>

            {/* Trending Search Chips */}
            <div className="pt-3 flex flex-wrap items-center justify-center gap-2 text-xs">
              <span className="text-slate-300 font-medium">Trending Searches:</span>
              <button
                type="button"
                onClick={() => handleChipClick('LM-DVS-2026-000928', 'public-qr')}
                className="px-2.5 py-1 bg-white/10 hover:bg-white/20 text-white rounded border border-white/20 text-[11px] font-medium"
              >
                Verify Certificate
              </button>
              <button
                type="button"
                onClick={() => handleChipClick('LM-APT-2026-00812', 'track-app')}
                className="px-2.5 py-1 bg-white/10 hover:bg-white/20 text-white rounded border border-white/20 text-[11px] font-medium"
              >
                Track Application
              </button>
              <button
                type="button"
                onClick={() => handleChipClick('WEIGHBRIDGE', 'trader-register')}
                className="px-2.5 py-1 bg-white/10 hover:bg-white/20 text-white rounded border border-white/20 text-[11px] font-medium"
              >
                Weighbridge Stamping
              </button>
              <button
                type="button"
                onClick={() => handleChipClick('FUEL_DISPENSER', 'trader-register')}
                className="px-2.5 py-1 bg-white/10 hover:bg-white/20 text-white rounded border border-white/20 text-[11px] font-medium"
              >
                Fuel Dispenser Calibration
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* 4. FLOATING STATISTICS PANEL (Overlapping Hero) */}
      <section className="max-w-7xl mx-auto px-4 -mt-14 relative z-20">
        <div className="bg-white border border-slate-200 rounded-2xl shadow-xl p-6 grid grid-cols-2 md:grid-cols-6 gap-4 text-center divide-x-0 md:divide-x divide-slate-100">
          
          <div className="p-2 space-y-1">
            <div className="text-2xl font-extrabold font-heading text-[#0B2348]">13,934</div>
            <div className="text-xs font-bold text-slate-700">Registered Devices</div>
            <div className="text-[10px] text-slate-400">National Registry</div>
          </div>

          <div className="p-2 space-y-1">
            <div className="text-2xl font-extrabold font-heading text-emerald-600">3,680</div>
            <div className="text-xs font-bold text-slate-700">Verified Seals</div>
            <div className="text-[10px] text-slate-400">Valid Calibration</div>
          </div>

          <div className="p-2 space-y-1">
            <div className="text-2xl font-extrabold font-heading text-blue-600">2,306</div>
            <div className="text-xs font-bold text-slate-700">Active Applications</div>
            <div className="text-[10px] text-slate-400">Under Process</div>
          </div>

          <div className="p-2 space-y-1">
            <div className="text-2xl font-extrabold font-heading text-amber-600">3,975</div>
            <div className="text-xs font-bold text-slate-700">Certificates Issued</div>
            <div className="text-[10px] text-slate-400">HMAC Signed</div>
          </div>

          <div className="p-2 space-y-1">
            <div className="text-2xl font-extrabold font-heading text-purple-600">1,207</div>
            <div className="text-xs font-bold text-slate-700">Active Officers</div>
            <div className="text-[10px] text-slate-400">Field Auditors</div>
          </div>

          <div className="p-2 space-y-1">
            <div className="text-2xl font-extrabold font-heading text-red-600">18</div>
            <div className="text-xs font-bold text-slate-700">High Risk Alerts</div>
            <div className="text-[10px] text-slate-400">AI Detected</div>
          </div>

        </div>
      </section>

      {/* 5. DIGITAL LEGAL METROLOGY SERVICES GRID */}
      <section className="max-w-7xl mx-auto px-4 text-left space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-gov-saffron uppercase tracking-widest">Digital Governance Services</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#0B2348]">
            {language === 'hi' ? 'विधिक माप विज्ञान सेवाएं' : 'Digital Legal Metrology Services'}
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto">
            Access verification, certification, and compliance services through one unified digital platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <ServiceCard
            title="Register Instrument"
            desc="Onboard commercial scales, weighbridges, and meters."
            icon={Building}
            onClick={() => setCurrentTab('trader-register')}
          />
          <ServiceCard
            title="Verify Certificate"
            desc="Check official calibration certificates using QR seals."
            icon={ShieldCheck}
            onClick={() => setCurrentTab('public-qr')}
          />
          <ServiceCard
            title="Book Inspection"
            desc="Schedule field visits with district metrology officers."
            icon={Calendar}
            onClick={() => {
              loginAsDemo('trader');
              setCurrentTab('trader-booking');
            }}
          />
          <ServiceCard
            title="Track Application"
            desc="Check step-by-step application progress in real-time."
            icon={FileText}
            onClick={() => setCurrentTab('track-app')}
          />
          <ServiceCard
            title="Fee Calculator"
            desc="Compute statutory verification charges for equipment."
            icon={Layers}
            onClick={() => setCurrentTab('trader-calculator')}
          />
          <ServiceCard
            title="Field Inspector App"
            desc="Mobile field toolkit with GPS geofence and AI OCR."
            icon={Smartphone}
            onClick={() => loginAsDemo('inspector')}
          />
          <ServiceCard
            title="Government Command Center"
            desc="GIS compliance map and AI risk anomaly monitoring."
            icon={Map}
            onClick={() => loginAsDemo('admin')}
          />
          <ServiceCard
            title="Lodge Consumer Grievance"
            desc="Report incorrect weight bias or damaged seal stamps."
            icon={AlertTriangle}
            onClick={() => setCurrentTab('citizen-complaint')}
          />
        </div>
      </section>

      {/* 6. HOW THE VERIFICATION PROCESS WORKS */}
      <section className="bg-slate-100 py-12 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 text-left space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-gov-navy uppercase tracking-widest">Transparent Governance</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#0B2348]">
              {language === 'hi' ? 'सत्यापन प्रक्रिया कैसे काम करती है' : 'How the Verification Process Works'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-7 gap-2">
            <StepChip num="01" title="Register" subtitle="Instrument specs" />
            <StepChip num="02" title="Fee Payment" subtitle="Bharatkosh portal" />
            <StepChip num="03" title="Schedule" subtitle="Officer appointment" />
            <StepChip num="04" title="Field Visit" subtitle="GPS geofence check" />
            <StepChip num="05" title="MPE Calibration" subtitle="Class III error check" />
            <StepChip num="06" title="Digital Certificate" subtitle="HMAC signature" />
            <StepChip num="07" title="QR Verification" subtitle="Citizen QR sticker" />
          </div>
        </div>
      </section>

      {/* 7. LATEST NOTICES BOARD & STATUTORY ADVISORIES */}
      <section className="max-w-7xl mx-auto px-4 text-left">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b pb-3">
            <div className="flex items-center space-x-2">
              <Bell className="w-5 h-5 text-gov-red" />
              <h3 className="font-heading font-extrabold text-base text-[#0B2348]">
                {language === 'hi' ? 'नवीनतम सरकारी सूचनाएं' : 'Latest Government Notices & Advisories'}
              </h3>
            </div>
            <span className="text-xs text-slate-500 font-mono">LEGAL METROLOGY DIVISION</span>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            <NoticeRow
              date="09 Sept 2026"
              cat="MANDATORY CYCLE"
              title="Annual Verification Cycle 2026–27: Commercial weighing instruments must be re-verified before expiry."
            />
            <NoticeRow
              date="01 Sept 2026"
              cat="SECURITY ADVISORY"
              title="Mandatory attachment of HMAC SHA-256 cryptographic QR seals on all verified weighbridges."
            />
            <NoticeRow
              date="18 Aug 2026"
              cat="INSPECTOR CIRCULAR"
              title="GPS geofencing compliance mandatory for all field inspector mobile audit logs."
            />
          </div>
        </div>
      </section>

    </div>
  );
};

const ServiceCard: React.FC<{ title: string; desc: string; icon: React.ElementType; onClick: () => void }> = ({ title, desc, icon: Icon, onClick }) => (
  <div 
    onClick={onClick}
    className="bg-white border border-slate-200 p-5 rounded-xl space-y-3 hover:shadow-md hover:border-slate-300 transition-all cursor-pointer group flex flex-col justify-between"
  >
    <div className="space-y-2">
      <div className="w-10 h-10 rounded-lg bg-[#0B2348]/10 text-[#0B2348] flex items-center justify-center group-hover:bg-[#0B2348] group-hover:text-amber-400 transition-colors">
        <Icon className="w-5 h-5" />
      </div>
      <h4 className="font-bold text-slate-900 text-sm group-hover:text-[#0B2348]">{title}</h4>
      <p className="text-slate-600 text-xs leading-relaxed">{desc}</p>
    </div>

    <div className="text-[11px] font-bold text-gov-red flex items-center space-x-1 pt-1">
      <span>View Service</span>
      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
    </div>
  </div>
);

const StepChip: React.FC<{ num: string; title: string; subtitle: string }> = ({ num, title, subtitle }) => (
  <div className="bg-white border border-slate-200 p-3 rounded-xl text-center space-y-1 shadow-2xs">
    <span className="w-6 h-6 rounded-full bg-[#0B2348] text-amber-400 font-extrabold text-[10px] flex items-center justify-center mx-auto">
      {num}
    </span>
    <div className="font-bold text-[#0B2348] text-xs leading-tight">{title}</div>
    <div className="text-[10px] text-slate-400">{subtitle}</div>
  </div>
);

const NoticeRow: React.FC<{ date: string; cat: string; title: string }> = ({ date, cat, title }) => (
  <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
    <div className="flex items-center space-x-3">
      <span className="text-[10px] font-mono font-bold text-slate-400">{date}</span>
      <span className="bg-slate-100 text-slate-700 font-bold text-[9px] px-2 py-0.5 rounded border border-slate-200">
        {cat}
      </span>
      <span className="font-semibold text-slate-800">{title}</span>
    </div>
    <a href="#" className="text-gov-red hover:underline font-bold text-[11px] whitespace-nowrap">Read Notice →</a>
  </div>
);
