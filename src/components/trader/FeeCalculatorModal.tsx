import React, { useState } from 'react';
import { X, Calculator, CreditCard, CheckCircle2 } from 'lucide-react';
import { computeVerificationFee } from '../../utils/mpe';

interface FeeCalculatorModalProps {
  onClose: () => void;
}

export const FeeCalculatorModal: React.FC<FeeCalculatorModalProps> = ({ onClose }) => {
  const [category, setCategory] = useState<string>('WEIGHING_SCALE');
  const [capacity, setCapacity] = useState<string>('50 kg');
  const [locationType, setLocationType] = useState<'PREMISES' | 'OFFICE'>('PREMISES');

  const baseFee = computeVerificationFee(category, capacity);
  const locationConcession = locationType === 'PREMISES' ? 100 : 0; // Field conveyance charge
  const gst = Math.round((baseFee + locationConcession) * 0.18);
  const totalFee = baseFee + locationConcession + gst;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-6 shadow-2xl animate-in zoom-in-95 duration-200 text-left">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center space-x-2">
            <div className="bg-amber-100 p-2 rounded-lg text-amber-700">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-base text-slate-900">Verification Fee Calculator</h3>
              <p className="text-xs text-slate-500">Statutory Schedule (Rules 2011)</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Inputs */}
        <div className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Equipment Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg font-bold text-slate-900"
            >
              <option value="WEIGHING_SCALE">Counter Weighing Scale (Up to 50kg)</option>
              <option value="WEIGHBRIDGE">Heavy Pitless Weighbridge (Up to 60T)</option>
              <option value="FUEL_DISPENSER">Fuel Dispensing Pump / Flow Meter</option>
              <option value="PLATFORM_SCALE">Industrial Platform Scale (Up to 500kg)</option>
              <option value="RETAIL_MEASURE">Retail Measure / Fabric Meter</option>
            </select>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Inspection Location</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setLocationType('PREMISES')}
                className={`p-2.5 rounded-lg border font-bold text-center transition-all ${
                  locationType === 'PREMISES'
                    ? 'bg-gov-navy text-white border-slate-900 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-300'
                }`}
              >
                At Trader Premises
              </button>

              <button
                type="button"
                onClick={() => setLocationType('OFFICE')}
                className={`p-2.5 rounded-lg border font-bold text-center transition-all ${
                  locationType === 'OFFICE'
                    ? 'bg-gov-navy text-white border-slate-900 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-300'
                }`}
              >
                At District Office
              </button>
            </div>
          </div>

          {/* Breakdown Box */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 font-mono text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Statutory Base Fee:</span>
              <span className="font-bold">₹{baseFee}</span>
            </div>

            <div className="flex justify-between text-slate-600">
              <span>Conveyance & Field Charge:</span>
              <span className="font-bold">₹{locationConcession}</span>
            </div>

            <div className="flex justify-between text-slate-600">
              <span>GST (18% Statutory):</span>
              <span className="font-bold">₹{gst}</span>
            </div>

            <div className="border-t border-slate-300 pt-2 flex justify-between font-bold text-sm text-slate-900">
              <span>Total Payable Amount:</span>
              <span className="text-amber-700 font-extrabold">₹{totalFee}</span>
            </div>
          </div>

          <p className="text-[10px] text-slate-400">
            Note: Prototype schedule based on standard Legal Metrology (General) Rules.
          </p>

          <button
            onClick={onClose}
            className="w-full py-2.5 bg-gov-saffron hover:bg-amber-600 text-slate-950 font-bold rounded-lg shadow"
          >
            Close Calculator
          </button>
        </div>

      </div>
    </div>
  );
};
