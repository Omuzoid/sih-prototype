import React from 'react';
import { ShieldCheck, Award, Lock, Users, Building, AlertTriangle, FileText, CheckCircle2, Scale } from 'lucide-react';
import { useLM } from '../../context/LMContext';

export const AboutPage: React.FC = () => {
  const { setCurrentTab, language } = useLM();

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-10 text-left">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0B2348] to-[#07152F] text-white p-8 rounded-2xl shadow-md space-y-3 border border-slate-800">
        <div className="inline-flex items-center space-x-2 bg-amber-500/20 text-amber-300 text-xs font-bold px-3 py-1 rounded-full border border-amber-500/40">
          <Scale className="w-4 h-4" />
          <span>DEPARTMENT OF CONSUMER AFFAIRS — LEGAL METROLOGY DIVISION</span>
        </div>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-white">
          {language === 'hi' ? 'लीगल मैट्रिक्स डिजिटल पोर्टल के बारे में' : 'About Legal Metrix Digital Portal'}
        </h1>
        <p className="text-slate-300 text-sm max-w-3xl leading-relaxed">
          The Legal Metrix National Legal Metrology Verification System digitizes and safeguards every commercial weight, scale, weighbridge, and liquid measuring device across the Union of India.
        </p>
      </div>

      {/* Problem vs Solution Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* The Challenge */}
        <div className="bg-red-50/70 border border-red-200 rounded-2xl p-6 space-y-3">
          <div className="flex items-center space-x-2 text-gov-red font-bold font-heading text-lg">
            <AlertTriangle className="w-5 h-5" />
            <h3>The Legacy Offline Challenge</h3>
          </div>
          <ul className="space-y-2 text-xs text-red-950 list-disc list-inside leading-relaxed">
            <li>Fraudulent offline lead stamping and counterfeit verification certificates.</li>
            <li>Manual paper registers causing delays in 1-year and 2-year re-verification schedules.</li>
            <li>Lack of real-time visibility for government directors into inspector field productivity.</li>
            <li>Consumers unable to verify whether retail weighing scales are legally calibrated.</li>
            <li>Poor cellular connectivity in rural mandis causing field verification bottlenecks.</li>
          </ul>
        </div>

        {/* The Solution */}
        <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-6 space-y-3">
          <div className="flex items-center space-x-2 text-emerald-800 font-bold font-heading text-lg">
            <CheckCircle2 className="w-5 h-5" />
            <h3>The Legal Metrix Digital Ecosystem</h3>
          </div>
          <ul className="space-y-2 text-xs text-emerald-950 list-disc list-inside leading-relaxed">
            <li>HMAC cryptographic QR code seals attached physically to every approved instrument.</li>
            <li>Mobile GPS geofencing ensuring inspectors physically conduct audits at trader premises.</li>
            <li>AI OCR display digit recognition automatically extracting calibration readings.</li>
            <li>Zero-login citizen verification allowing instant QR scans via any smartphone camera.</li>
            <li>Offline local storage mode enabling full field operations without cellular signal.</li>
          </ul>
        </div>

      </div>

      {/* Statutory Pillar Cards */}
      <div className="space-y-4">
        <h2 className="font-heading font-bold text-xl text-[#0B2348]">Statutory Framework & Pillars</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          
          <div className="bg-white border border-slate-200 p-5 rounded-xl space-y-2 shadow-xs">
            <div className="w-9 h-9 bg-blue-100 text-[#0B2348] rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">The Legal Metrology Act, 2009</h4>
            <p className="text-slate-600 leading-relaxed">
              Enforces standard weights, measures, and goods sold or distributed by weight, measure, or number across India.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-xl space-y-2 shadow-xs">
            <div className="w-9 h-9 bg-amber-100 text-amber-800 rounded-lg flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Cryptographic Security</h4>
            <p className="text-slate-600 leading-relaxed">
              Every certificate carries an asymmetric HMAC SHA-256 hash. Any physical tampering breaks the verification seal instantly.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-xl space-y-2 shadow-xs">
            <div className="w-9 h-9 bg-emerald-100 text-emerald-800 rounded-lg flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">MPE Error Calibration</h4>
            <p className="text-slate-600 leading-relaxed">
              Automated Maximum Permissible Error (MPE) calculations prevent subjective inspector bias or manual math errors.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
};
