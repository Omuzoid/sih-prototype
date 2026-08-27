import React, { useState } from 'react';
import { 
  Building, PlusCircle, ShieldCheck, Clock, AlertTriangle, 
  CreditCard, Calendar, QrCode, FileText, Search, ExternalLink 
} from 'lucide-react';
import { useLM } from '../../context/LMContext';
import { Instrument } from '../../types';
import { RegisterInstrumentWizard } from './RegisterInstrumentWizard';
import { FeeCalculatorModal } from './FeeCalculatorModal';
import { PaymentGatewayModal } from './PaymentGatewayModal';
import { SlotBookingModal } from './SlotBookingModal';
import { CertificateViewer } from './CertificateViewer';

export const TraderDashboard: React.FC = () => {
  const { currentUser, instruments, certificates, setCurrentTab } = useLM();

  const [searchFilter, setSearchFilter] = useState<string>('');
  const [selectedInstForPayment, setSelectedInstForPayment] = useState<Instrument | null>(null);
  const [selectedInstForBooking, setSelectedInstForBooking] = useState<Instrument | null>(null);
  const [selectedCertForView, setSelectedCertForView] = useState<any | null>(null);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState<boolean>(false);

  const traderInstruments = instruments.filter(
    i => i.traderId === currentUser?.id || currentUser?.role === 'admin'
  );

  const validCertsCount = traderInstruments.filter(i => i.status === 'VERIFIED').length;
  const pendingCount = traderInstruments.filter(i => i.status === 'PENDING_INSPECTION').length;
  const expiringCount = traderInstruments.filter(i => i.status === 'EXPIRING_SOON' || i.status === 'EXPIRED').length;

  const filteredInstruments = traderInstruments.filter(i => 
    i.id.toLowerCase().includes(searchFilter.toLowerCase()) ||
    i.serialNumber.toLowerCase().includes(searchFilter.toLowerCase()) ||
    i.type.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 text-left">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-gov-navy to-slate-900 text-white p-6 rounded-2xl shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-amber-500/20 text-amber-300 text-xs font-bold px-2.5 py-0.5 rounded border border-amber-500/40 uppercase">
              Trader & Mandi Portal
            </span>
            <span className="text-xs text-slate-400">GSTIN: 08AAACS9182A1Z9</span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl text-white mt-1">
            Welcome, {currentUser?.businessName || currentUser?.name}
          </h1>
          <p className="text-slate-300 text-xs mt-0.5">
            District: {currentUser?.district || 'Jaipur Urban'}, {currentUser?.state || 'Rajasthan'}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setCurrentTab('trader-register')}
            className="bg-gov-saffron hover:bg-amber-600 text-slate-950 font-extrabold text-xs px-4 py-2.5 rounded-lg transition-all shadow flex items-center space-x-1.5 border border-amber-400"
          >
            <PlusCircle className="w-4 h-4 text-slate-950" />
            <span>+ Register New Instrument</span>
          </button>

          <button
            onClick={() => setIsCalculatorOpen(true)}
            className="bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 font-bold text-xs px-3.5 py-2.5 rounded-lg transition-all flex items-center space-x-1.5"
          >
            <CreditCard className="w-4 h-4" />
            <span>Fee Calculator</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs">
          <div className="text-xs font-bold text-slate-500">Total Registered</div>
          <div className="text-2xl font-extrabold font-heading text-slate-900 mt-1">{traderInstruments.length}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Instruments on record</div>
        </div>

        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs">
          <div className="text-xs font-bold text-emerald-700">Valid Certifications</div>
          <div className="text-2xl font-extrabold font-heading text-emerald-600 mt-1">{validCertsCount}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Active QR verification seals</div>
        </div>

        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs">
          <div className="text-xs font-bold text-blue-700">Pending Inspections</div>
          <div className="text-2xl font-extrabold font-heading text-blue-600 mt-1">{pendingCount}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Slots booked / fee paid</div>
        </div>

        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs">
          <div className="text-xs font-bold text-amber-700">Expiring / Expired</div>
          <div className="text-2xl font-extrabold font-heading text-amber-600 mt-1">{expiringCount}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Requires renewal</div>
        </div>
      </div>

      {/* Instruments Master Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden space-y-4">
        
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-heading font-bold text-slate-900 text-base">My Equipment & Verification Status</h3>
            <p className="text-xs text-slate-500">Manage registered scales, liquid meters, and weighbridges</p>
          </div>

          <div className="relative w-full sm:w-64">
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Search ID, serial or model..."
              className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-3">Device ID</th>
                <th className="p-3">Type & Model</th>
                <th className="p-3">Capacity</th>
                <th className="p-3">Fee Status</th>
                <th className="p-3">Verification Status</th>
                <th className="p-3">Expiry Date</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredInstruments.map(inst => {
                const cert = certificates.find(c => c.instrumentId === inst.id);

                return (
                  <tr key={inst.id} className="hover:bg-slate-50/80 transition-colors">
                    
                    <td className="p-3">
                      <div className="font-mono font-bold text-slate-900">{inst.id}</div>
                      <div className="text-[10px] text-slate-400 font-mono">SN: {inst.serialNumber}</div>
                    </td>

                    <td className="p-3">
                      <div className="font-bold text-slate-800">{inst.type}</div>
                      <div className="text-[10px] text-slate-500">{inst.manufacturer} ({inst.model})</div>
                    </td>

                    <td className="p-3 font-semibold text-slate-900">
                      {inst.capacity}
                    </td>

                    <td className="p-3">
                      {inst.feePaid ? (
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-300">
                          PAID ₹250
                        </span>
                      ) : (
                        <button
                          onClick={() => setSelectedInstForPayment(inst)}
                          className="bg-amber-500 hover:bg-amber-600 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded shadow transition-colors"
                        >
                          PAY FEE ₹250
                        </button>
                      )}
                    </td>

                    <td className="p-3">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                        inst.status === 'VERIFIED'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                          : inst.status === 'PENDING_INSPECTION'
                            ? 'bg-blue-50 text-blue-700 border-blue-300'
                            : inst.status === 'EXPIRING_SOON'
                              ? 'bg-amber-50 text-amber-700 border-amber-300'
                              : 'bg-red-50 text-red-700 border-red-300'
                      }`}>
                        {inst.status}
                      </span>
                    </td>

                    <td className="p-3 font-mono font-medium text-slate-700">
                      {inst.expiryDate || 'N/A'}
                    </td>

                    <td className="p-3 text-right space-x-1">
                      {inst.feePaid && !inst.appointmentDate && (
                        <button
                          onClick={() => setSelectedInstForBooking(inst)}
                          className="bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold px-2.5 py-1 rounded transition-colors"
                        >
                          Book Slot
                        </button>
                      )}

                      {cert && (
                        <button
                          onClick={() => setSelectedCertForView(cert)}
                          className="bg-gov-navy hover:bg-slate-800 text-white text-[10px] font-bold px-2.5 py-1 rounded transition-colors"
                        >
                          Certificate
                        </button>
                      )}
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>

      {/* Payment Gateway Modal */}
      {selectedInstForPayment && (
        <PaymentGatewayModal
          instrument={selectedInstForPayment}
          amount={250}
          onClose={() => setSelectedInstForPayment(null)}
        />
      )}

      {/* Slot Booking Modal */}
      {selectedInstForBooking && (
        <SlotBookingModal
          instrument={selectedInstForBooking}
          onClose={() => setSelectedInstForBooking(null)}
        />
      )}

      {/* Fee Calculator Modal */}
      {isCalculatorOpen && (
        <FeeCalculatorModal onClose={() => setIsCalculatorOpen(false)} />
      )}

      {/* Certificate Viewer Modal */}
      {selectedCertForView && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-3xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-heading font-bold text-lg text-gov-navy">Digital Verification Certificate</h3>
              <button onClick={() => setSelectedCertForView(null)} className="text-slate-500 hover:text-slate-900 text-sm font-bold">Close ✕</button>
            </div>
            <CertificateViewer certificate={selectedCertForView} />
          </div>
        </div>
      )}

    </div>
  );
};
