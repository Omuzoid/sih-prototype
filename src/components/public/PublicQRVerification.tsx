import React, { useState, useEffect } from 'react';
import { 
  QrCode, Search, ShieldCheck, ShieldAlert, AlertTriangle, 
  MapPin, Calendar, Building, FileText, CheckCircle2, User, Camera, Shield, RefreshCw 
} from 'lucide-react';
import { useLM } from '../../context/LMContext';
import { verifyQRSignature } from '../../utils/crypto';
import { CitizenComplaintModal } from './CitizenComplaintModal';
import { CertificateViewer } from '../trader/CertificateViewer';

export const PublicQRVerification: React.FC = () => {
  const { 
    instruments, certificates, toggleQRTamperSimulation, 
    globalSearchQuery, language 
  } = useLM();
  
  const [searchQuery, setSearchQuery] = useState<string>(globalSearchQuery || 'LM-DVS-2026-000928');
  const [activeDeviceId, setActiveDeviceId] = useState<string>(globalSearchQuery || 'LM-DVS-2026-000928');
  const [isScanningSim, setIsScanningSim] = useState<boolean>(false);
  const [isComplaintModalOpen, setIsComplaintModalOpen] = useState<boolean>(false);
  const [isCertModalOpen, setIsCertModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (globalSearchQuery) {
      setSearchQuery(globalSearchQuery);
      setActiveDeviceId(globalSearchQuery);
    }
  }, [globalSearchQuery]);

  const matchedInstrument = instruments.find(
    i => i.id.toLowerCase() === activeDeviceId.toLowerCase() || i.qrToken.toLowerCase() === activeDeviceId.toLowerCase()
  );

  const matchedCert = certificates.find(c => c.instrumentId === matchedInstrument?.id);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setActiveDeviceId(searchQuery.trim());
    }
  };

  const handleScanSimulation = () => {
    setIsScanningSim(true);
    setTimeout(() => {
      setIsScanningSim(false);
      setActiveDeviceId('LM-DVS-2026-000928');
    }, 1800);
  };

  const isSignatureValid = matchedInstrument 
    ? verifyQRSignature(matchedInstrument.qrToken, matchedInstrument.qrSignature, matchedInstrument.isTampered)
    : false;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#0B2348] to-[#07152F] text-white p-6 rounded-2xl shadow-md text-left space-y-2 border border-slate-800">
        <div className="inline-flex items-center space-x-2 bg-amber-500/20 text-amber-300 text-xs font-bold px-3 py-1 rounded-full border border-amber-500/40">
          <Shield className="w-3.5 h-3.5" />
          <span>ZERO-LOGIN PUBLIC CITIZEN VERIFICATION</span>
        </div>
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
          {language === 'hi' ? 'बाजार उपकरण का सत्यापन करें' : 'Verify Weighing & Measuring Instrument'}
        </h1>
        <p className="text-slate-300 text-xs sm:text-sm">
          {language === 'hi'
            ? 'किसी भी तराजू, पेट्रोल पंप या वेब्रिज पर आधिकारिक लीगल मैट्रिक्स क्यूआर स्टिकर को स्कैन करें।'
            : 'Scan the physical Legal Metrix QR sticker on any scale, petrol pump, or weighbridge to check official calibration certification.'}
        </p>
      </div>

      {/* Search & Camera Scanner Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Manual Input Search */}
          <form onSubmit={handleSearchSubmit} className="space-y-2 text-left">
            <label className="text-xs font-bold text-slate-700 block">
              Enter Device ID or QR Token
            </label>
            <div className="flex items-center space-x-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g. LM-DVS-2026-000928"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono font-bold text-slate-900 focus:ring-2 focus:ring-amber-500"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
              <button
                type="submit"
                className="bg-[#0B2348] hover:bg-[#102A52] text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-colors"
              >
                Verify
              </button>
            </div>
          </form>

          {/* Camera Scanner Simulation */}
          <div className="space-y-2 text-left">
            <label className="text-xs font-bold text-slate-700 block">
              Camera Scanner Simulation
            </label>
            <button
              type="button"
              onClick={handleScanSimulation}
              disabled={isScanningSim}
              className="w-full py-2.5 bg-gov-saffron hover:bg-gov-saffronDark text-white font-extrabold text-xs rounded-lg transition-all shadow flex items-center justify-center space-x-2"
            >
              {isScanningSim ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  <span>Scanning Camera Feed...</span>
                </>
              ) : (
                <>
                  <Camera className="w-4 h-4 text-white" />
                  <span>Tap to Simulate Live Camera QR Scan</span>
                </>
              )}
            </button>
          </div>

        </div>

        {/* Quick Demo Pre-set Badges */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs text-left">
          <span className="text-slate-500 font-medium">Quick Demo Samples:</span>
          <button
            onClick={() => { setSearchQuery('LM-DVS-2026-000928'); setActiveDeviceId('LM-DVS-2026-000928'); }}
            className="px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded font-mono font-bold hover:bg-emerald-100"
          >
            LM-DVS-2026-000928 (Verified Scale)
          </button>
          <button
            onClick={() => { setSearchQuery('LM-DVS-2026-000930'); setActiveDeviceId('LM-DVS-2026-000930'); }}
            className="px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded font-mono font-bold hover:bg-amber-100"
          >
            LM-DVS-2026-000930 (Expiring Weighbridge)
          </button>
          <button
            onClick={() => { setSearchQuery('LM-DVS-2026-000933'); setActiveDeviceId('LM-DVS-2026-000933'); }}
            className="px-2.5 py-1 bg-red-50 text-red-800 border border-red-200 rounded font-mono font-bold hover:bg-red-100"
          >
            LM-DVS-2026-000933 (Tampered Scale)
          </button>
        </div>

      </div>

      {/* Verification Results Panel */}
      {matchedInstrument ? (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-lg overflow-hidden text-left animate-in fade-in duration-300">
          
          {/* Result Header Banner */}
          <div className={`p-6 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
            !isSignatureValid
              ? 'bg-gov-red text-white border-red-700'
              : matchedInstrument.status === 'VERIFIED'
                ? 'bg-gov-green text-white border-emerald-700'
                : 'bg-gov-saffron text-white border-amber-600'
          }`}>
            
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-xs">
                {!isSignatureValid ? (
                  <ShieldAlert className="w-8 h-8 text-white" />
                ) : matchedInstrument.status === 'VERIFIED' ? (
                  <ShieldCheck className="w-8 h-8 text-white" />
                ) : (
                  <AlertTriangle className="w-8 h-8 text-white" />
                )}
              </div>
              <div>
                <div className="text-xs uppercase font-extrabold tracking-wider opacity-90">
                  Govt Verification Result
                </div>
                <h2 className="font-heading font-extrabold text-2xl">
                  {!isSignatureValid
                    ? '⚠ INVALID / TAMPERED QR SEAL'
                    : matchedInstrument.status === 'VERIFIED'
                      ? '✓ VERIFIED INSTRUMENT'
                      : `⚠ STATUS: ${matchedInstrument.status}`}
                </h2>
              </div>
            </div>

            {/* Cryptographic Signature Badge */}
            <div className="bg-slate-950/40 p-2.5 rounded-lg border border-white/20 text-xs">
              <div className="font-mono font-bold flex items-center space-x-1">
                <span>HMAC Signature Check:</span>
                <span className={isSignatureValid ? 'text-emerald-300' : 'text-red-300'}>
                  {isSignatureValid ? 'VALID' : 'FAILED'}
                </span>
              </div>
              <div className="text-[10px] opacity-80 font-mono mt-0.5 truncate max-w-xs">
                {matchedInstrument.qrSignature}
              </div>
            </div>

          </div>

          {/* Warning banner if tampered */}
          {!isSignatureValid && (
            <div className="bg-red-100 border-b border-red-200 p-4 text-red-950 text-xs flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <div>
                <strong>TAMPER WARNING:</strong> The cryptographic QR signature on this instrument does not match official Legal Metrix registry keys. Do not rely on measurements from this device.
              </div>
            </div>
          )}

          {/* Instrument Core Grid */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs border-b border-slate-100">
            
            <div className="space-y-3">
              <h3 className="font-bold text-slate-900 text-sm border-b pb-1">Instrument Specifications</h3>
              
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Device ID:</span>
                <span className="font-mono font-bold text-slate-900">{matchedInstrument.id}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Serial Number:</span>
                <span className="font-mono text-slate-800">{matchedInstrument.serialNumber}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Equipment Type:</span>
                <span className="font-bold text-slate-900">{matchedInstrument.type}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Manufacturer & Model:</span>
                <span className="text-slate-800">{matchedInstrument.manufacturer} ({matchedInstrument.model})</span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Max Capacity:</span>
                <span className="font-bold text-slate-900">{matchedInstrument.capacity} ({matchedInstrument.measurementUnit})</span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Accuracy Standard:</span>
                <span className="font-mono text-blue-800 font-semibold">{matchedInstrument.accuracyClass}</span>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-slate-900 text-sm border-b pb-1">Trader Premises & Certification</h3>
              
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Business Name:</span>
                <span className="font-bold text-slate-900">{matchedInstrument.businessName}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Registered Trader:</span>
                <span className="text-slate-800">{matchedInstrument.traderName}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Premises Address:</span>
                <span className="text-slate-800 text-right max-w-xs">{matchedInstrument.address}, {matchedInstrument.district}, {matchedInstrument.state}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Last Verified Date:</span>
                <span className="font-bold text-slate-900">{matchedInstrument.lastVerificationDate || 'N/A'}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Certificate Valid Until:</span>
                <span className="font-bold text-emerald-800">{matchedInstrument.expiryDate || 'N/A'}</span>
              </div>
            </div>

          </div>

          {/* Action Footer Buttons */}
          <div className="p-4 bg-slate-50 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsComplaintModalOpen(true)}
                className="bg-gov-red hover:bg-red-700 text-white font-bold text-xs px-4 py-2 rounded-lg transition-colors flex items-center space-x-1.5 shadow"
              >
                <AlertTriangle className="w-4 h-4" />
                <span>Report Weight Concern / File Complaint</span>
              </button>

              {matchedCert && (
                <button
                  onClick={() => setIsCertModalOpen(true)}
                  className="bg-[#0B2348] hover:bg-[#102A52] text-white font-bold text-xs px-4 py-2 rounded-lg transition-colors flex items-center space-x-1.5"
                >
                  <FileText className="w-4 h-4 text-amber-400" />
                  <span>View Official Certificate</span>
                </button>
              )}
            </div>

            {/* SIH Demo Toggle Button */}
            <button
              onClick={() => toggleQRTamperSimulation(matchedInstrument.id)}
              className="text-slate-700 hover:text-slate-900 border border-slate-300 bg-white px-3 py-1.5 rounded-md text-[11px] font-semibold transition-colors flex items-center space-x-1"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Simulate QR Seal Tamper Flag</span>
            </button>
          </div>

        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-3">
          <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto" />
          <h3 className="text-lg font-bold text-slate-900">No Instrument Found for "{activeDeviceId}"</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Check the device ID printed on the Legal Metrix sticker or click one of the pre-set demo buttons above.
          </p>
        </div>
      )}

      {/* Citizen Complaint Modal */}
      {isComplaintModalOpen && matchedInstrument && (
        <CitizenComplaintModal
          instrument={matchedInstrument}
          onClose={() => setIsComplaintModalOpen(false)}
        />
      )}

      {/* Official Certificate Modal */}
      {isCertModalOpen && matchedCert && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-3xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-heading font-bold text-lg text-[#0B2348]">Digital Verification Certificate Preview</h3>
              <button onClick={() => setIsCertModalOpen(false)} className="text-slate-500 hover:text-slate-900 text-sm font-bold">Close ✕</button>
            </div>
            <CertificateViewer certificate={matchedCert} instrument={matchedInstrument} />
          </div>
        </div>
      )}

    </div>
  );
};
