import React, { useState } from 'react';
import { X, Calendar, Clock, CheckCircle2, User } from 'lucide-react';
import { useLM } from '../../context/LMContext';
import { Instrument } from '../../types';

interface SlotBookingModalProps {
  instrument: Instrument;
  onClose: () => void;
}

export const SlotBookingModal: React.FC<SlotBookingModalProps> = ({ instrument, onClose }) => {
  const { bookInspectionSlot } = useLM();

  const [selectedDate, setSelectedDate] = useState<string>('2026-09-05');
  const [selectedSlot, setSelectedSlot] = useState<string>('10:30 AM');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [aptId, setAptId] = useState<string>('');

  const availableSlots = ['09:30 AM', '10:30 AM', '11:45 AM', '02:30 PM', '04:00 PM'];

  const handleBookingConfirm = () => {
    bookInspectionSlot(instrument.id, selectedDate, selectedSlot);
    setAptId(`LM-APT-2026-${Math.floor(10000 + Math.random() * 90000)}`);
    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-6 shadow-2xl animate-in zoom-in-95 duration-200 text-left">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center space-x-2">
            <div className="bg-blue-100 text-blue-700 p-2 rounded-lg">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-base text-slate-900">Book Field Verification Appointment</h3>
              <p className="text-xs text-slate-500">Legal Metrology Officer Visit</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="py-6 text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-lg text-slate-900">Appointment Confirmed!</h4>
              <p className="text-xs text-slate-600 mt-1">
                Appointment Ref: <strong className="font-mono text-emerald-700 font-bold">{aptId}</strong>
              </p>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs text-slate-700 space-y-1 font-mono">
              <div>Date: <strong>{selectedDate} ({selectedSlot})</strong></div>
              <div>Assigned Inspector: <strong>Ramesh K. Patel (LM-INS-1029)</strong></div>
            </div>
            <button
              onClick={onClose}
              className="bg-gov-navy text-white text-xs font-bold px-6 py-2.5 rounded-lg hover:bg-slate-800 transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <div className="space-y-4 text-xs">
            
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1">
              <div className="font-bold text-slate-900">{instrument.id} — {instrument.type}</div>
              <div className="text-slate-600">{instrument.businessName}, {instrument.district}</div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Select Inspection Date *</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg font-bold text-slate-900"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Select Inspector Slot *</label>
              <div className="grid grid-cols-3 gap-2">
                {availableSlots.map(slot => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedSlot(slot)}
                    className={`py-2 rounded-lg border text-center font-mono font-bold transition-all ${
                      selectedSlot === slot
                        ? 'bg-gov-navy text-white border-slate-900 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 text-blue-900 text-[11px] flex items-center space-x-2">
              <User className="w-4 h-4 text-blue-700 flex-shrink-0" />
              <span>Inspector Ramesh K. Patel (LM-INS-1029) is assigned for {instrument.district}.</span>
            </div>

            <button
              type="button"
              onClick={handleBookingConfirm}
              className="w-full py-3 bg-gov-saffron hover:bg-amber-600 text-slate-950 font-extrabold text-sm rounded-lg shadow border border-amber-400"
            >
              Confirm Inspection Slot
            </button>

          </div>
        )}

      </div>
    </div>
  );
};
