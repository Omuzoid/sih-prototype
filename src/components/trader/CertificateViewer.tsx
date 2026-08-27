import React from 'react';
import { ShieldCheck, QrCode, Printer, Download, Award, CheckCircle2, Lock } from 'lucide-react';
import { Certificate, Instrument } from '../../types';

interface CertificateViewerProps {
  certificate: Certificate;
  instrument?: Instrument;
}

export const CertificateViewer: React.FC<CertificateViewerProps> = ({ certificate, instrument }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-4 text-left">
      
      {/* Action Bar (No Print) */}
      <div className="no-print flex justify-end space-x-2">
        <button
          onClick={handlePrint}
          className="bg-gov-navy text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors flex items-center space-x-1.5 shadow"
        >
          <Printer className="w-4 h-4 text-amber-400" />
          <span>Print / Save PDF Certificate</span>
        </button>
      </div>

      {/* Printable Certificate Parchment Box */}
      <div 
        id="printable-certificate"
        className="bg-white border-8 border-double border-gov-navy p-8 rounded-xl shadow-xl space-y-6 text-slate-900 font-sans relative overflow-hidden"
      >
        {/* Subtle Watermark Badge */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
          <ShieldCheck className="w-96 h-96 text-gov-navy" />
        </div>

        {/* Prototype Banner */}
        <div className="text-center border-b-2 border-slate-900 pb-4 space-y-1">
          <div className="text-[10px] uppercase font-bold tracking-widest text-slate-500">
            DIGITAL PROTOTYPE CERTIFICATE — SIH 2026
          </div>
          <div className="font-heading font-extrabold text-xl text-gov-navy uppercase tracking-tight">
            GOVERNMENT OF INDIA
          </div>
          <div className="text-xs font-bold text-slate-800">
            MINISTRY OF CONSUMER AFFAIRS, FOOD & PUBLIC DISTRIBUTION
          </div>
          <div className="text-xs font-bold text-amber-800 uppercase tracking-wide">
            DEPARTMENT OF CONSUMER AFFAIRS — LEGAL METROLOGY DIVISION
          </div>
        </div>

        {/* Title */}
        <div className="text-center py-2 bg-slate-50 border-y border-slate-200">
          <h2 className="font-heading font-extrabold text-lg text-slate-900 uppercase tracking-wider">
            CERTIFICATE OF VERIFICATION
          </h2>
          <p className="text-[11px] text-slate-600 font-medium">
            Issued under Section 24 of The Legal Metrology Act, 2009 & Rule 16 of Legal Metrology (General) Rules, 2011
          </p>
        </div>

        {/* Certificate Details Grid */}
        <div className="grid grid-cols-2 gap-4 text-xs">
          
          <div className="space-y-1.5 border-r border-slate-200 pr-4">
            <div>
              <span className="text-slate-500">Certificate Number:</span>
              <div className="font-mono font-extrabold text-slate-900 text-sm">{certificate.id}</div>
            </div>

            <div>
              <span className="text-slate-500">Instrument Device ID:</span>
              <div className="font-mono font-bold text-amber-800">{certificate.instrumentId}</div>
            </div>

            <div>
              <span className="text-slate-500">Serial Number:</span>
              <div className="font-mono font-bold text-slate-800">{certificate.serialNumber}</div>
            </div>

            <div>
              <span className="text-slate-500">Instrument Category & Type:</span>
              <div className="font-bold text-slate-900">{certificate.instrumentType}</div>
            </div>

            <div>
              <span className="text-slate-500">Maximum Capacity:</span>
              <div className="font-bold text-slate-800">{instrument?.capacity || '50 KG'}</div>
            </div>
          </div>

          <div className="space-y-1.5 pl-2">
            <div>
              <span className="text-slate-500">Registered Trader / Business:</span>
              <div className="font-bold text-slate-900 text-sm">{certificate.businessName}</div>
            </div>

            <div>
              <span className="text-slate-500">Proprietor Name:</span>
              <div className="font-semibold text-slate-800">{certificate.traderName}</div>
            </div>

            <div>
              <span className="text-slate-500">Premises Address:</span>
              <div className="text-slate-800 leading-tight">{certificate.address}</div>
            </div>

            <div>
              <span className="text-slate-500">Verification Date:</span>
              <div className="font-bold text-slate-900">{certificate.issueDate}</div>
            </div>

            <div>
              <span className="text-slate-500">Valid Up To:</span>
              <div className="font-extrabold text-emerald-700 text-sm">{certificate.expiryDate}</div>
            </div>
          </div>

        </div>

        {/* Verification Result Box */}
        <div className="bg-emerald-50 border border-emerald-300 p-4 rounded-xl flex items-center justify-between text-xs">
          <div className="flex items-center space-x-3">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 flex-shrink-0" />
            <div>
              <div className="font-bold text-emerald-900 text-sm">VERIFICATION STATUS: PASSED & CERTIFIED</div>
              <div className="text-emerald-700 text-[11px]">
                Instrument error calibration complies strictly with statutory Class III Maximum Permissible Error (MPE) tolerances.
              </div>
            </div>
          </div>

          <div className="text-right font-mono text-[10px] text-slate-500 hidden sm:block">
            <span>SEAL REF:</span><br />
            <span className="font-bold text-slate-800">GOV-LM-2026-OK</span>
          </div>
        </div>

        {/* Footer Cryptographic QR & Signature Section */}
        <div className="grid grid-cols-2 gap-4 items-end pt-4 border-t border-slate-300 text-xs">
          
          {/* HMAC QR Box */}
          <div className="flex items-center space-x-3">
            <div className="bg-white p-1 border border-slate-300 rounded shadow-xs">
              <QrCode className="w-16 h-16 text-slate-950" />
            </div>
            <div className="text-[10px] space-y-0.5 font-mono">
              <div className="font-bold text-slate-900">Cryptographic Seal</div>
              <div className="text-emerald-700 font-bold">HMAC-SHA256: VALID</div>
              <div className="text-slate-500 truncate max-w-[140px]">{certificate.qrSignature}</div>
            </div>
          </div>

          {/* Officer Signature */}
          <div className="text-right space-y-1">
            <div className="font-serif italic text-slate-800 text-sm font-bold border-b border-slate-400 pb-1 inline-block">
              {certificate.inspectorName}
            </div>
            <div className="text-[10px] text-slate-600 font-bold">Legal Metrology Officer</div>
            <div className="text-[9px] text-slate-400 font-mono">Digitally Signed Authorization Token</div>
          </div>

        </div>

      </div>

    </div>
  );
};
