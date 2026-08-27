import React, { useState } from 'react';
import { X, CreditCard, CheckCircle2, ShieldCheck, Lock, RefreshCw, FileText } from 'lucide-react';
import { useLM } from '../../context/LMContext';
import { Instrument } from '../../types';

interface PaymentGatewayModalProps {
  instrument: Instrument;
  amount: number;
  onClose: () => void;
}

export const PaymentGatewayModal: React.FC<PaymentGatewayModalProps> = ({ instrument, amount, onClose }) => {
  const { payVerificationFee } = useLM();

  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'CARD' | 'NET_BANKING' | 'BHARATKOSH'>('UPI');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [txnId, setTxnId] = useState<string>('');

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const generatedTxn = `LMTXN2026${Math.floor(100000 + Math.random() * 900000)}`;
      setTxnId(generatedTxn);
      payVerificationFee(instrument.id, amount, paymentMethod);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-6 shadow-2xl animate-in zoom-in-95 duration-200 text-left">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center space-x-2">
            <div className="bg-gov-navy text-amber-400 p-2 rounded-lg">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-base text-slate-900">Bharatkosh Govt Payment Gateway</h3>
              <p className="text-xs text-slate-500">Legal Metrology Statutory Fee Collection</p>
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
              <h4 className="font-heading font-bold text-lg text-slate-900">Payment Completed Successfully</h4>
              <p className="text-xs text-slate-600 mt-1">
                Transaction Ref: <strong className="font-mono text-emerald-700 font-bold">{txnId}</strong>
              </p>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs text-slate-700 space-y-1 font-mono">
              <div>Amount Paid: <strong>₹{amount}</strong></div>
              <div>Device ID: <strong>{instrument.id}</strong></div>
            </div>
            <button
              onClick={onClose}
              className="bg-gov-navy text-white text-xs font-bold px-6 py-2.5 rounded-lg hover:bg-slate-800 transition-colors"
            >
              Proceed to Book Inspection Slot
            </button>
          </div>
        ) : (
          <div className="space-y-4 text-xs">
            
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
              <div className="flex justify-between font-bold text-slate-900">
                <span>{instrument.id}</span>
                <span className="font-mono text-amber-700">₹{amount}.00</span>
              </div>
              <div className="text-[11px] text-slate-600">{instrument.type} ({instrument.serialNumber})</div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Select Payment Gateway *</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('UPI')}
                  className={`p-2.5 rounded-lg border text-center font-bold transition-all ${
                    paymentMethod === 'UPI'
                      ? 'bg-gov-saffron text-slate-950 border-amber-400 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-300'
                  }`}
                >
                  BHIM / UPI ID
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('BHARATKOSH')}
                  className={`p-2.5 rounded-lg border text-center font-bold transition-all ${
                    paymentMethod === 'BHARATKOSH'
                      ? 'bg-gov-saffron text-slate-950 border-amber-400 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-300'
                  }`}
                >
                  Bharatkosh Portal
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('CARD')}
                  className={`p-2.5 rounded-lg border text-center font-bold transition-all ${
                    paymentMethod === 'CARD'
                      ? 'bg-gov-saffron text-slate-950 border-amber-400 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-300'
                  }`}
                >
                  Credit / Debit Card
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('NET_BANKING')}
                  className={`p-2.5 rounded-lg border text-center font-bold transition-all ${
                    paymentMethod === 'NET_BANKING'
                      ? 'bg-gov-saffron text-slate-950 border-amber-400 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-300'
                  }`}
                >
                  Net Banking
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handlePay}
                disabled={isProcessing}
                className="w-full py-3 bg-gov-navy hover:bg-slate-800 text-white font-extrabold text-sm rounded-lg transition-all shadow flex items-center justify-center space-x-2"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-amber-400" />
                    <span>Processing Bharatkosh Authorization...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 text-amber-400" />
                    <span>Pay Statutory Fee ₹{amount}</span>
                  </>
                )}
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
