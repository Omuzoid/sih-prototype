import React from 'react';
import { 
  X, Play, ShieldAlert, WifiOff, RefreshCw, UserCheck, 
  RotateCcw, Sliders, CheckCircle2, ChevronRight, AlertTriangle
} from 'lucide-react';
import { useLM } from '../../context/LMContext';
import { UserRole } from '../../types';

interface DemoControlsProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DemoControls: React.FC<DemoControlsProps> = ({ isOpen, onClose }) => {
  const { 
    loginAsDemo, activeRole, setCurrentTab, 
    toggleQRTamperSimulation, triggerDemoAnomaly, 
    isOfflineMode, setIsOfflineMode, syncOfflineQueue, 
    offlineQueue, resetDemoData, instruments 
  } = useLM();

  if (!isOpen) return null;

  const targetDemoInstrument = instruments[0] || { id: 'LM-DVS-2026-000928' };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-slate-900 text-white h-full shadow-2xl flex flex-col border-l border-slate-700 animate-in slide-in-from-right duration-300">
        
        {/* Drawer Header */}
        <div className="bg-gov-navy px-5 py-4 border-b border-slate-700 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-gov-saffron p-1 rounded text-slate-950">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-base text-white">SIH 2026 Presentation Control</h3>
              <p className="text-[11px] text-amber-300">Interactive Demo Workflows & Simulations</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 text-xs">
          
          {/* Quick Presentation Story Acts */}
          <div>
            <h4 className="text-amber-400 font-bold uppercase tracking-wider text-[11px] mb-2 flex items-center space-x-1">
              <Play className="w-3.5 h-3.5" />
              <span>SIH Presentation Demo Story (4 Acts)</span>
            </h4>
            <div className="space-y-2">
              <button
                onClick={() => {
                  loginAsDemo('trader');
                  setCurrentTab('trader-register');
                  onClose();
                }}
                className="w-full text-left p-2.5 rounded-lg bg-slate-800 hover:bg-slate-750 border border-slate-700 transition-all flex items-center justify-between group"
              >
                <div>
                  <div className="font-bold text-amber-300 text-xs">ACT 1 — Trader Registration & Fee</div>
                  <div className="text-[10px] text-slate-400">Register scale, calculate fee & book inspection slot</div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  loginAsDemo('inspector');
                  setCurrentTab('inspector-field');
                  onClose();
                }}
                className="w-full text-left p-2.5 rounded-lg bg-slate-800 hover:bg-slate-750 border border-slate-700 transition-all flex items-center justify-between group"
              >
                <div>
                  <div className="font-bold text-emerald-300 text-xs">ACT 2 — Inspector Field Mobile App</div>
                  <div className="text-[10px] text-slate-400">GPS geofence, AI/OCR scale read & MPE pass/fail</div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  loginAsDemo('public');
                  setCurrentTab('public-qr');
                  onClose();
                }}
                className="w-full text-left p-2.5 rounded-lg bg-slate-800 hover:bg-slate-750 border border-slate-700 transition-all flex items-center justify-between group"
              >
                <div>
                  <div className="font-bold text-blue-300 text-xs">ACT 3 — Public Zero-Login QR Scan</div>
                  <div className="text-[10px] text-slate-400">Verify certificate & test cryptographic seal check</div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  loginAsDemo('admin');
                  setCurrentTab('admin-command');
                  onClose();
                }}
                className="w-full text-left p-2.5 rounded-lg bg-slate-800 hover:bg-slate-750 border border-slate-700 transition-all flex items-center justify-between group"
              >
                <div>
                  <div className="font-bold text-purple-300 text-xs">ACT 4 — Government Command Center</div>
                  <div className="text-[10px] text-slate-400">GIS map, AI anomaly detection & audit log monitoring</div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Quick Role Switcher */}
          <div>
            <h4 className="text-slate-400 font-bold uppercase tracking-wider text-[11px] mb-2 flex items-center space-x-1">
              <UserCheck className="w-3.5 h-3.5" />
              <span>Switch User Role</span>
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {(['public', 'trader', 'inspector', 'admin'] as UserRole[]).map(role => (
                <button
                  key={role}
                  onClick={() => {
                    loginAsDemo(role);
                    onClose();
                  }}
                  className={`p-2 rounded font-bold uppercase text-[11px] border text-center transition-all ${
                    activeRole === role
                      ? 'bg-gov-saffron text-slate-950 border-amber-400 shadow'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          {/* Simulation Trigger Controls */}
          <div>
            <h4 className="text-slate-400 font-bold uppercase tracking-wider text-[11px] mb-2 flex items-center space-x-1">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              <span>Interactive Simulation Controls</span>
            </h4>
            <div className="space-y-2">
              
              {/* QR Tamper Simulator */}
              <button
                onClick={() => toggleQRTamperSimulation(targetDemoInstrument.id)}
                className={`w-full p-2.5 rounded-lg border text-left flex items-center space-x-2 transition-all ${
                  targetDemoInstrument.isTampered
                    ? 'bg-red-500/20 border-red-500/50 text-red-200'
                    : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-750'
                }`}
              >
                <ShieldAlert className="w-4 h-4 text-red-400 flex-shrink-0" />
                <div className="flex-1">
                  <div className="font-bold">Toggle QR Seal Tampering</div>
                  <div className="text-[10px] text-slate-400">
                    Status: {targetDemoInstrument.isTampered ? 'TAMPERED (Invalid Signature)' : 'VALID (Signature Intact)'}
                  </div>
                </div>
              </button>

              {/* Anomaly Generator */}
              <button
                onClick={() => triggerDemoAnomaly()}
                className="w-full p-2.5 rounded-lg bg-slate-800 hover:bg-slate-750 border border-slate-700 text-left flex items-center space-x-2 transition-all"
              >
                <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <div>
                  <div className="font-bold text-amber-300">Generate AI Risk Anomaly</div>
                  <div className="text-[10px] text-slate-400">Inject high inspection frequency alert into Admin panel</div>
                </div>
              </button>

              {/* Offline Mode Toggle & Sync */}
              <div className="p-2.5 rounded-lg bg-slate-800 border border-slate-700 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <WifiOff className="w-4 h-4 text-blue-400" />
                    <div>
                      <div className="font-bold text-slate-200">Field Offline Mode</div>
                      <div className="text-[10px] text-slate-400">Queue inspections without internet</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOfflineMode(!isOfflineMode)}
                    className={`px-2.5 py-1 rounded font-bold text-[10px] uppercase transition-all ${
                      isOfflineMode ? 'bg-red-500 text-white' : 'bg-slate-700 text-slate-300'
                    }`}
                  >
                    {isOfflineMode ? 'OFFLINE' : 'ONLINE'}
                  </button>
                </div>

                {offlineQueue.length > 0 && (
                  <button
                    onClick={syncOfflineQueue}
                    className="w-full py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-bold text-[11px] flex items-center justify-center space-x-1 transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Sync {offlineQueue.length} Pending Records Now</span>
                  </button>
                )}
              </div>

            </div>
          </div>

          {/* Reset System State */}
          <div className="pt-4 border-t border-slate-800">
            <button
              onClick={resetDemoData}
              className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded border border-slate-700 font-bold text-xs flex items-center justify-center space-x-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Demo State to Initial Seed</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
