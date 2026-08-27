import React from 'react';
import { 
  ShieldCheck, QrCode, Search, CheckCircle, Smartphone, 
  Award, Lock, FileText, ArrowRight, Building, Users, AlertTriangle, ChevronRight 
} from 'lucide-react';
import { useLM } from '../../context/LMContext';

export const LandingPage: React.FC = () => {
  const { setCurrentTab, loginAsDemo, instruments, certificates } = useLM();

  return (
    <div className="space-y-16">
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-gov-navy via-[#0B1E38] to-slate-900 text-white pt-12 pb-20 px-4 overflow-hidden border-b border-slate-800">
        
        {/* Subtle Background Geometry */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#FF9933_1px,transparent_1px)] [background-size:24px_24px]"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Left Column Text */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            <div className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/30 text-amber-300 px-3.5 py-1 rounded-full text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              <span>National Legal Metrology Digital Transformation</span>
            </div>

            <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-white leading-tight">
              Verify. Certify. Protect Every <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">Measurement.</span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
              A centralized digital platform for verification, certification, and lifecycle tracking of weighing and measuring instruments across India. Preventing fraudulent stamping, paper registers, and inspection tampering.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => setCurrentTab('public-qr')}
                className="bg-gov-saffron hover:bg-amber-600 text-slate-950 font-extrabold px-6 py-3.5 rounded-lg text-sm transition-all shadow-lg flex items-center space-x-2 border border-amber-400 group"
              >
                <QrCode className="w-5 h-5 text-slate-950" />
                <span>Verify an Instrument QR</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => setCurrentTab('login')}
                className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-6 py-3.5 rounded-lg text-sm transition-all border border-slate-700 flex items-center space-x-2"
              >
                <Lock className="w-4 h-4 text-amber-400" />
                <span>Government / Portal Login</span>
              </button>
            </div>

            {/* Statutory Seal Badges */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-400 border-t border-slate-800">
              <span className="flex items-center space-x-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Legal Metrology Act 2009 Compliant</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <Lock className="w-4 h-4 text-blue-400" />
                <span>HMAC Cryptographic Verification</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <Smartphone className="w-4 h-4 text-amber-400" />
                <span>Offline Field App Ready</span>
              </span>
            </div>

          </div>

          {/* Right Column Hero Instrument Visual Mockup */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900/90 border border-slate-700 rounded-2xl p-6 shadow-2xl space-y-4 relative">
              
              {/* Header Badge */}
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></div>
                  <span className="text-xs font-bold text-slate-200">SAMPLE CERTIFIED DEVICE</span>
                </div>
                <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-500/40">
                  VERIFIED & SIGNED
                </span>
              </div>

              {/* Instrument Details */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Device ID:</span>
                  <span className="font-mono font-bold text-amber-300">LM-DVS-2026-000928</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Category:</span>
                  <span className="font-semibold text-white">Electronic Weighing Scale (50 KG)</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Trader Premises:</span>
                  <span className="font-semibold text-white">Sharma General Store, Jaipur</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Accuracy Class:</span>
                  <span className="font-mono text-blue-300">Class III (MPE ± 0.02 kg)</span>
                </div>
              </div>

              {/* Simulated QR & Cryptographic Seal Box */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                <div className="space-y-1">
                  <div className="text-[11px] font-bold text-white">Cryptographic Verification Seal</div>
                  <div className="text-[9px] font-mono text-emerald-400">HMAC-SHA256:0x8f29a10cf8a9e4b21c</div>
                  <div className="text-[10px] text-slate-400">Valid until: 10 Feb 2027</div>
                </div>

                <div className="bg-white p-1.5 rounded-lg flex-shrink-0 shadow cursor-pointer hover:scale-105 transition-transform" onClick={() => setCurrentTab('public-qr')}>
                  <QrCode className="w-14 h-14 text-slate-950" />
                </div>
              </div>

              <button
                onClick={() => setCurrentTab('public-qr')}
                className="w-full py-2 bg-gov-saffron/20 hover:bg-gov-saffron/30 text-amber-300 font-bold text-xs rounded-lg border border-gov-saffron/50 transition-colors"
              >
                Click to Test Interactive QR Verification
              </button>

            </div>
          </div>

        </div>
      </section>

      {/* Platform Statistics */}
      <section className="max-w-7xl mx-auto px-4 -mt-10 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard title="Registered Instruments" value="2,48,391" subtitle="Across 28 States & UTs" icon={Building} color="text-amber-500" />
          <StatCard title="Active Certifications" value={`${certificates.length + 193480}`} subtitle="Valid Digital Seals" icon={ShieldCheck} color="text-emerald-500" />
          <StatCard title="Inspections This Month" value="18,392" subtitle="GPS-Verified Inspections" icon={CheckCircle} color="text-blue-500" />
          <StatCard title="System Compliance" value="97.4%" subtitle="MPE Accuracy Standard" icon={Award} color="text-purple-500" />
        </div>
      </section>

      {/* How LM-DVS Works (5 Steps) */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center space-y-2 mb-12">
          <span className="text-xs font-bold text-gov-saffron uppercase tracking-widest">End-to-End Lifecycle</span>
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-gov-navy">How LM-DVS Works</h2>
          <p className="text-slate-600 text-sm max-w-xl mx-auto">
            A seamless digital pipeline connecting traders, field inspectors, legal metrology officers, and citizens.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <WorkflowStep number="1" title="Register Instrument" desc="Traders onboard equipment, specifications & premises GPS." icon={Building} />
          <WorkflowStep number="2" title="Pay & Schedule" desc="Calculate statutory verification fee and book slot." icon={FileText} />
          <WorkflowStep number="3" title="Field Verification" desc="Inspector verifies GPS, runs physical checklist & MPE check." icon={Smartphone} />
          <WorkflowStep number="4" title="Digital Certificate" desc="Automated PASS certificate & tamper-evident QR seal generated." icon={ShieldCheck} />
          <WorkflowStep number="5" title="Public QR Scan" desc="Citizens scan physical sticker to verify calibration status instantly." icon={QrCode} />
        </div>
      </section>

      {/* Why This Matters / Core Problem Solver Cards */}
      <section className="bg-slate-100 py-12 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center space-y-2 mb-10">
            <span className="text-xs font-bold text-gov-blue uppercase tracking-widest">Legal Metrology Impact</span>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-gov-navy">Solving Core Governance Challenges</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              title="Prevent Offline Stamping Fraud"
              desc="Eliminates fake physical verification stamps and manual paper registers with HMAC cryptographic digital signatures."
              icon={Lock}
            />
            <FeatureCard
              title="AI & GPS Geofenced Field Audits"
              desc="Inspectors must be physically within premise GPS coordinates. AI OCR captures digital meter readings directly."
              icon={Smartphone}
            />
            <FeatureCard
              title="Rural Offline Operations"
              desc="Field inspectors can perform full calibrations in remote mandis without internet. Syncs automatically upon reconnection."
              icon={CheckCircle}
            />
            <FeatureCard
              title="Instant Citizen Empowering"
              desc="Consumers at retail shops can scan QR stickers using any mobile camera without downloading an app or logging in."
              icon={QrCode}
            />
            <FeatureCard
              title="AI Risk & Anomaly Detector"
              desc="Flag suspicious inspection speeds (e.g. 18 inspections in 34 minutes), duplicate registrations, or location mismatches."
              icon={AlertTriangle}
            />
            <FeatureCard
              title="National GIS Compliance Map"
              desc="Real-time map dashboard for Legal Metrology Directors showing state/district compliance heatmaps and expiring devices."
              icon={Building}
            />
          </div>
        </div>
      </section>

      {/* Role Action Cards */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* For Citizens */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">For Citizens</h3>
              <p className="text-slate-600 text-xs leading-relaxed mb-4">
                Scan the QR sticker on any commercial weighing scale, fuel pump, or weighbridge to check valid government certification.
              </p>
            </div>
            <button
              onClick={() => setCurrentTab('public-qr')}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg transition-colors flex items-center justify-center space-x-1"
            >
              <span>Scan / Verify QR Code</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* For Traders */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
                <Building className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">For Traders & Mandis</h3>
              <p className="text-slate-600 text-xs leading-relaxed mb-4">
                Register instruments online, calculate statutory verification fees, book inspector appointments, and download certificates.
              </p>
            </div>
            <button
              onClick={() => loginAsDemo('trader')}
              className="w-full py-2.5 bg-gov-saffron hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center justify-center space-x-1"
            >
              <span>Access Trader Portal</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* For Officers */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">For Metrology Officers</h3>
              <p className="text-slate-600 text-xs leading-relaxed mb-4">
                Conduct field inspections with mobile GPS verification, automatic MPE error calculator, AI OCR reader, and offline sync.
              </p>
            </div>
            <button
              onClick={() => loginAsDemo('inspector')}
              className="w-full py-2.5 bg-gov-navy hover:bg-slate-800 text-white font-bold text-xs rounded-lg transition-colors flex items-center justify-center space-x-1"
            >
              <span>Open Field Inspector Toolkit</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

    </div>
  );
};

const StatCard: React.FC<{ title: string; value: string; subtitle: string; icon: React.ElementType; color: string }> = ({ title, value, subtitle, icon: Icon, color }) => (
  <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex items-center space-x-3">
    <div className={`p-3 rounded-lg bg-slate-50 border border-slate-100 ${color}`}>
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <div className="text-2xl font-extrabold font-heading text-slate-900">{value}</div>
      <div className="text-xs font-bold text-slate-700">{title}</div>
      <div className="text-[10px] text-slate-400">{subtitle}</div>
    </div>
  </div>
);

const WorkflowStep: React.FC<{ number: string; title: string; desc: string; icon: React.ElementType }> = ({ number, title, desc, icon: Icon }) => (
  <div className="bg-white border border-slate-200 rounded-xl p-4 text-left relative shadow-xs">
    <div className="flex items-center justify-between mb-3">
      <div className="w-7 h-7 rounded-full bg-gov-navy text-amber-400 font-extrabold text-xs flex items-center justify-center">
        {number}
      </div>
      <Icon className="w-5 h-5 text-slate-400" />
    </div>
    <h4 className="font-bold text-slate-900 text-sm mb-1">{title}</h4>
    <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
  </div>
);

const FeatureCard: React.FC<{ title: string; desc: string; icon: React.ElementType }> = ({ title, desc, icon: Icon }) => (
  <div className="bg-white border border-slate-200 p-5 rounded-xl text-left space-y-2 shadow-xs">
    <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-gov-saffronDark flex items-center justify-center">
      <Icon className="w-5 h-5" />
    </div>
    <h4 className="font-bold text-slate-900 text-sm">{title}</h4>
    <p className="text-slate-600 text-xs leading-relaxed">{desc}</p>
  </div>
);
