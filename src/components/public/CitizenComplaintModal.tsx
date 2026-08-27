import React, { useState } from 'react';
import { X, AlertTriangle, CheckCircle2, Upload, Camera } from 'lucide-react';
import { useLM } from '../../context/LMContext';
import { Instrument } from '../../types';

interface CitizenComplaintModalProps {
  instrument?: Instrument;
  onClose: () => void;
}

export const CitizenComplaintModal: React.FC<CitizenComplaintModalProps> = ({ instrument, onClose }) => {
  const { fileCitizenComplaint } = useLM();

  const [category, setCategory] = useState<'INCORRECT_MEASUREMENT' | 'DAMAGED_SEAL' | 'SUSPICIOUS_QR' | 'EXPIRED_CERTIFICATE' | 'OTHER'>('INCORRECT_MEASUREMENT');
  const [description, setDescription] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    const newCmp = fileCitizenComplaint({
      instrumentId: instrument?.id,
      category,
      description,
      reporterPhone: phone || undefined,
      reporterEmail: email || undefined,
      location: instrument ? `${instrument.businessName}, ${instrument.address}` : 'Commercial Mandi Premises',
      district: instrument?.district || 'Jaipur Urban',
      state: instrument?.state || 'Rajasthan',
      priority: category === 'INCORRECT_MEASUREMENT' || category === 'SUSPICIOUS_QR' ? 'HIGH' : 'MEDIUM'
    });

    setSubmittedId(newCmp.id);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-6 shadow-2xl animate-in zoom-in-95 duration-200 text-left">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center space-x-2">
            <div className="bg-red-100 p-2 rounded-lg text-red-600">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-base text-slate-900">Report a Measurement Concern</h3>
              <p className="text-xs text-slate-500">Legal Metrology Consumer Protection Desk</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {submittedId ? (
          <div className="py-6 text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-lg text-slate-900">Complaint Submitted Successfully</h4>
              <p className="text-xs text-slate-600 mt-1">
                Reference ID: <strong className="font-mono text-emerald-700 font-bold">{submittedId}</strong>
              </p>
            </div>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Your grievance has been assigned to the Legal Metrology District Inspector for immediate field audit.
            </p>
            <button
              onClick={onClose}
              className="bg-gov-navy text-white text-xs font-bold px-6 py-2.5 rounded-lg hover:bg-slate-800 transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            
            {instrument && (
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1">
                <div className="font-bold text-slate-900">Target Instrument: {instrument.id}</div>
                <div className="text-slate-600">{instrument.businessName} — {instrument.type}</div>
              </div>
            )}

            <div>
              <label className="font-bold text-slate-700 block mb-1">Issue Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg font-medium text-slate-900 focus:ring-2 focus:ring-amber-500"
              >
                <option value="INCORRECT_MEASUREMENT">Short Weight / Incorrect Measurement Bias</option>
                <option value="DAMAGED_SEAL">Damaged or Missing Verification Seal Stamp</option>
                <option value="SUSPICIOUS_QR">Suspicious or Invalid QR Sticker Code</option>
                <option value="EXPIRED_CERTIFICATE">Using Expired Calibration Certificate</option>
                <option value="OTHER">Other Metrology Violation</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Grievance Description *</label>
              <textarea
                rows={3}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe what happened (e.g. scale read 5 kg but actual item was 4.6 kg, counter zero offset faulty...)"
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-amber-500"
              ></textarea>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Mobile Number (Optional)</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Email (Optional)</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="citizen@gmail.com"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Attach Photo Evidence (Simulated)</label>
              <div className="border-2 border-dashed border-slate-300 p-4 rounded-lg text-center hover:bg-slate-50 transition-colors cursor-pointer">
                <Camera className="w-6 h-6 text-slate-400 mx-auto mb-1" />
                <span className="text-[11px] text-slate-500 font-medium">Click or tap to capture weight scale photo</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow"
              >
                Lodge Official Complaint
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
