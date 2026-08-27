import React, { useState } from 'react';
import { 
  Building, CreditCard, Smartphone, ShieldCheck, QrCode, ArrowRight, CheckCircle 
} from 'lucide-react';
import { useLM } from '../../context/LMContext';

export const HowItWorksPage: React.FC = () => {
  const { setCurrentTab, loginAsDemo } = useLM();
  const [activeStep, setActiveStep] = useState<number>(1);

  const steps = [
    {
      num: 1,
      title: "Digital Onboarding & Registration",
      role: "Trader / Manufacturer",
      icon: Building,
      summary: "Trader registers instrument parameters, manufacturer, serial number, accuracy class, and shop GPS premises location.",
      details: "System generates a unique LM-DVS Device ID (e.g. LM-DVS-2026-000928) and a 128-bit cryptographic UUID.",
      actionText: "Try Trader Registration Wizard",
      actionRole: "trader" as const
    },
    {
      num: 2,
      title: "Statutory Fee & Inspector Booking",
      role: "Trader / Bharatkosh",
      icon: CreditCard,
      summary: "Fee calculator computes statutory verification charges. Payment is processed via UPI/Card/Bharatkosh.",
      details: "Trader selects an available date and time slot for a Legal Metrology officer to visit premises.",
      actionText: "Test Fee Calculator",
      actionRole: "trader" as const
    },
    {
      num: 3,
      title: "GPS-Verified Field Inspection",
      role: "Legal Metrology Officer",
      icon: Smartphone,
      summary: "Inspector opens mobile field tool. GPS distance is geofenced (must be within 50 meters of trader shop).",
      details: "Inspector conducts physical checks, captures scale readout using AI OCR, and records test weight errors.",
      actionText: "Open Field Inspector App",
      actionRole: "inspector" as const
    },
    {
      num: 4,
      title: "MPE Check & Digital Certificate",
      role: "Legal Metrology Engine",
      icon: ShieldCheck,
      summary: "MPE engine calculates error percentage against legal tolerances. On PASS, digital certificate is signed.",
      details: "HMAC cryptographic QR seal token is generated and assigned for physical sticker printing.",
      actionText: "View Certificate Sample",
      actionRole: "admin" as const
    },
    {
      num: 5,
      title: "Public Citizen QR Verification",
      role: "Indian Consumer / Citizen",
      icon: QrCode,
      summary: "Any citizen at a retail counter scans the QR sticker on the scale to verify government certification.",
      details: "Zero-login experience showing valid dates, inspector signature, or tampered seal alert.",
      actionText: "Test Public QR Scanner",
      actionRole: "public" as const
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-10 text-left">
      
      <div className="text-center space-y-2">
        <span className="text-xs font-bold text-gov-saffron uppercase tracking-widest">End-to-End Governance Workflow</span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-gov-navy">How LM-DVS Works</h1>
        <p className="text-slate-600 text-sm max-w-xl mx-auto">
          Click through each stage to explore how the digital legal metrology lifecycle operates.
        </p>
      </div>

      {/* Interactive Timeline Tabs */}
      <div className="flex flex-wrap justify-between gap-2 border-b border-slate-200 pb-4">
        {steps.map(s => (
          <button
            key={s.num}
            onClick={() => setActiveStep(s.num)}
            className={`flex-1 min-w-[150px] p-3 rounded-xl border text-left transition-all ${
              activeStep === s.num
                ? 'bg-gov-navy text-white border-gov-navy shadow-md'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center space-x-2">
              <span className={`w-6 h-6 rounded-full text-xs font-extrabold flex items-center justify-center ${
                activeStep === s.num ? 'bg-amber-400 text-slate-950' : 'bg-slate-100 text-slate-700'
              }`}>
                0{s.num}
              </span>
              <span className="font-bold text-xs truncate">{s.title}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Active Stage Details Card */}
      {(() => {
        const step = steps.find(s => s.num === activeStep)!;
        const Icon = step.icon;

        return (
          <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-lg grid grid-cols-1 md:grid-cols-12 gap-8 items-center animate-in fade-in duration-300">
            
            <div className="md:col-span-8 space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-amber-500/10 text-amber-700 font-bold text-xs px-2.5 py-1 rounded border border-amber-300">
                  STAGE 0{step.num} — {step.role.toUpperCase()}
                </span>
              </div>

              <h2 className="font-heading font-extrabold text-2xl text-slate-900">{step.title}</h2>
              
              <p className="text-slate-700 text-sm leading-relaxed font-medium">
                {step.summary}
              </p>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
                <div className="font-bold text-slate-900">Technical Details:</div>
                <p>{step.details}</p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    loginAsDemo(step.actionRole);
                    if (step.actionRole === 'public') setCurrentTab('public-qr');
                    else if (step.actionRole === 'trader') setCurrentTab('trader-register');
                    else if (step.actionRole === 'inspector') setCurrentTab('inspector-field');
                    else setCurrentTab('admin-command');
                  }}
                  className="bg-gov-saffron hover:bg-amber-600 text-slate-950 font-bold text-xs px-5 py-2.5 rounded-lg transition-all shadow flex items-center space-x-2 border border-amber-400"
                >
                  <span>{step.actionText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="md:col-span-4 bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-amber-400/20 border border-amber-400/50 flex items-center justify-center text-amber-400">
                <Icon className="w-8 h-8" />
              </div>
              <div className="font-heading font-bold text-lg text-white">Stage {step.num} Complete</div>
              <p className="text-[11px] text-slate-400">Automated legal-metrology compliance check passed.</p>
            </div>

          </div>
        );
      })()}

    </div>
  );
};
