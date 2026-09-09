import React, { useState } from 'react';
import { 
  Smartphone, MapPin, QrCode, CheckCircle2, AlertTriangle, 
  Camera, Calculator, PenTool, RefreshCw, ShieldCheck, 
  WifiOff, ArrowRight, ArrowLeft, RotateCcw, Clock, Upload, Check, X, Scale 
} from 'lucide-react';
import { useLM } from '../../context/LMContext';
import { InspectionRecord, MeasurementRecord, PhysicalCheckitem } from '../../types';
import { calculateMPE } from '../../utils/mpe';

export const InspectorMobileApp: React.FC = () => {
  const { 
    inspections, currentUser, submitInspection, 
    isOfflineMode, setIsOfflineMode, offlineQueue, 
    syncOfflineQueue, instruments 
  } = useLM();

  const [activeTab, setActiveTab] = useState<'assignments' | 'inspection' | 'sync'>('assignments');
  const [selectedInspection, setSelectedInspection] = useState<InspectionRecord | null>(inspections[0] || null);

  const [wizardStep, setWizardStep] = useState<number>(1);
  const [gpsSimLocation, setGpsSimLocation] = useState<'PREMISES' | '500M_AWAY'>('PREMISES');

  const [checklist, setChecklist] = useState<PhysicalCheckitem[]>([
    { id: 'c1', title: 'Instrument Intact & Housing Sealed', category: 'PHYSICAL', status: 'PASS' },
    { id: 'c2', title: 'Display Readout Functional & Zero Clear', category: 'PHYSICAL', status: 'PASS' },
    { id: 'c3', title: 'Serial & Model Number Matches Plate', category: 'IDENTIFICATION', status: 'PASS' },
    { id: 'c4', title: 'Physical Lead/Plastic Stamp Intact', category: 'PHYSICAL', status: 'PASS' },
    { id: 'c5', title: 'Standard Test Weight Calibration Check', category: 'CALIBRATION', status: 'PASS' }
  ]);

  const [isOcrScanning, setIsOcrScanning] = useState<boolean>(false);
  const [ocrDetectedValue, setOcrDetectedValue] = useState<number | null>(null);

  const [measurements, setMeasurements] = useState<MeasurementRecord[]>([
    calculateMPE(10.0, 10.005, 'CLASS_III'),
    calculateMPE(25.0, 25.010, 'CLASS_III')
  ]);

  const [newTestWeight, setNewTestWeight] = useState<string>('50.0');
  const [newObservedWeight, setNewObservedWeight] = useState<string>('50.020');

  const [isSigned, setIsSigned] = useState<boolean>(true);
  const [signatureText, setSignatureText] = useState<string>('Ramesh K. Patel (LM-INS-1029)');
  const [remarks, setRemarks] = useState<string>('Instrument verified in accordance with Legal Metrology Rules 2011.');

  const isOverallPass = checklist.every(c => c.status === 'PASS' || c.status === 'NA') && 
                        measurements.every(m => m.result === 'PASS');

  const handleStartInspection = (insp: InspectionRecord) => {
    setSelectedInspection(insp);
    setWizardStep(1);
    setActiveTab('inspection');
  };

  const handleRunAIOCR = () => {
    setIsOcrScanning(true);
    setTimeout(() => {
      setIsOcrScanning(false);
      setOcrDetectedValue(10.020);
      const newM = calculateMPE(10.0, 10.020, 'CLASS_III');
      setMeasurements(prev => [...prev, newM]);
    }, 1500);
  };

  const handleAddMeasurement = () => {
    const tw = parseFloat(newTestWeight);
    const ow = parseFloat(newObservedWeight);
    if (!isNaN(tw) && !isNaN(ow)) {
      const m = calculateMPE(tw, ow, 'CLASS_III');
      setMeasurements(prev => [...prev, m]);
    }
  };

  const handleCompleteFinalInspection = () => {
    if (!selectedInspection) return;

    const completedRecord: InspectionRecord = {
      ...selectedInspection,
      completionDate: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      status: isOverallPass ? 'PASSED' : 'FAILED',
      gpsVerified: gpsSimLocation === 'PREMISES',
      gpsDistanceMeters: gpsSimLocation === 'PREMISES' ? 14 : 520,
      checklist,
      measurements,
      ocrReadingDetected: ocrDetectedValue || undefined,
      ocrConfidence: ocrDetectedValue ? 98.4 : undefined,
      inspectorSignature: signatureText,
      remarks,
      overallMpeResult: isOverallPass ? 'PASS' : 'FAIL',
      photoEvidenceUrls: [
        'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=400&auto=format&fit=crop&q=80'
      ]
    };

    submitInspection(completedRecord);
    setWizardStep(7);
  };

  return (
    <div className="max-w-md mx-auto px-2 py-4 space-y-4 text-left font-sans pb-20">
      
      {/* Mobile Header Bar */}
      <div className="bg-[#0B2348] text-white p-4 rounded-2xl shadow-lg border border-slate-800 space-y-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 font-bold flex items-center justify-center text-xs">
              <Scale className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div>
              <div className="font-heading font-extrabold text-sm text-white">Legal Metrix Field Inspector App</div>
              <div className="text-[10px] text-amber-300">Officer: Ramesh K. Patel (LM-INS-1029)</div>
            </div>
          </div>

          <button
            onClick={() => setIsOfflineMode(!isOfflineMode)}
            className={`px-2.5 py-1 rounded text-[10px] font-bold flex items-center space-x-1 border transition-all ${
              isOfflineMode
                ? 'bg-red-500/20 text-red-300 border-red-500/50'
                : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
            }`}
          >
            <WifiOff className="w-3 h-3" />
            <span>{isOfflineMode ? 'OFFLINE' : 'ONLINE'}</span>
          </button>
        </div>

        {/* Navigation Switcher */}
        <div className="grid grid-cols-3 gap-1 bg-[#07152F] p-1 rounded-xl text-center text-xs font-bold">
          <button
            onClick={() => setActiveTab('assignments')}
            className={`py-1.5 rounded-lg transition-all ${
              activeTab === 'assignments' ? 'bg-gov-saffron text-white shadow-xs' : 'text-slate-300'
            }`}
          >
            Today's Visits
          </button>

          <button
            onClick={() => setActiveTab('inspection')}
            className={`py-1.5 rounded-lg transition-all ${
              activeTab === 'inspection' ? 'bg-gov-saffron text-white shadow-xs' : 'text-slate-300'
            }`}
          >
            Inspection
          </button>

          <button
            onClick={() => setActiveTab('sync')}
            className={`py-1.5 rounded-lg transition-all flex items-center justify-center space-x-1 ${
              activeTab === 'sync' ? 'bg-gov-saffron text-white shadow-xs' : 'text-slate-300'
            }`}
          >
            <span>Sync ({offlineQueue.length})</span>
          </button>
        </div>
      </div>

      {/* TAB 1: ASSIGNMENTS LIST */}
      {activeTab === 'assignments' && (
        <div className="space-y-3 animate-in fade-in duration-200">
          <div className="flex justify-between items-center text-xs font-bold text-slate-700 px-1">
            <span>Scheduled Audits ({inspections.length})</span>
            <span className="text-amber-800 font-mono">Jaipur Urban</span>
          </div>

          {inspections.map(insp => (
            <div key={insp.id} className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs space-y-3 text-xs">
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-mono font-bold text-amber-800 text-[11px]">{insp.instrumentId}</span>
                  <h4 className="font-bold text-slate-900 text-sm">{insp.businessName}</h4>
                  <p className="text-[11px] text-slate-500">{insp.traderName}</p>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                  insp.status === 'PASSED'
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                    : insp.status === 'FAILED'
                      ? 'bg-red-100 text-red-800 border-red-300'
                      : 'bg-blue-100 text-blue-800 border-blue-300'
                }`}>
                  {insp.status}
                </span>
              </div>

              <div className="flex items-center space-x-3 text-[11px] text-slate-600 bg-slate-50 p-2 rounded-lg">
                <MapPin className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
                <span className="truncate">{insp.address}</span>
              </div>

              <div className="flex justify-between items-center pt-1">
                <span className="text-[10px] text-slate-400 font-mono">Dist: 2.4 km away</span>
                <button
                  onClick={() => handleStartInspection(insp)}
                  className="bg-[#0B2348] hover:bg-[#102A52] text-white font-bold text-xs px-4 py-1.5 rounded-lg flex items-center space-x-1 shadow"
                >
                  <span>Start Audit</span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: INSPECTION WIZARD */}
      {activeTab === 'inspection' && selectedInspection && (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden text-xs animate-in fade-in duration-200">
          
          {/* Step Bar */}
          <div className="bg-[#07152F] text-white p-3 flex justify-between items-center">
            <span className="font-bold text-[11px] text-amber-300 uppercase">
              STEP {wizardStep} / 7 — {selectedInspection.instrumentId}
            </span>
            <span className="font-mono text-[10px] text-slate-400">Class III MPE</span>
          </div>

          <div className="p-4 space-y-4">
            
            {/* STEP 1: Instrument Details & QR Scan */}
            {wizardStep === 1 && (
              <div className="space-y-4">
                <h3 className="font-heading font-bold text-sm text-slate-900 border-b pb-1">1. Verify Instrument Specs & QR</h3>
                
                <div className="bg-slate-50 p-3 rounded-lg border space-y-1">
                  <div>Business: <strong>{selectedInspection.businessName}</strong></div>
                  <div>Trader: <strong>{selectedInspection.traderName}</strong></div>
                  <div>Address: <strong>{selectedInspection.address}</strong></div>
                </div>

                <div className="border-2 border-dashed border-slate-300 p-4 rounded-xl text-center space-y-2 bg-slate-50">
                  <QrCode className="w-10 h-10 text-slate-700 mx-auto" />
                  <div className="font-bold text-slate-900">Scan Instrument QR Sticker</div>
                  <button
                    onClick={() => setWizardStep(2)}
                    className="bg-gov-saffron text-white font-extrabold px-4 py-2 rounded-lg shadow"
                  >
                    Simulate QR Scan Match ✓
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: GPS Geofence Verification */}
            {wizardStep === 2 && (
              <div className="space-y-4">
                <h3 className="font-heading font-bold text-sm text-slate-900 border-b pb-1">2. GPS Premises Geofence</h3>
                
                <div className="bg-slate-900 text-white p-4 rounded-xl space-y-2 text-center">
                  <MapPin className="w-8 h-8 text-amber-400 mx-auto" />
                  <div className="font-bold text-sm">Premises GPS Audit</div>

                  <div className="text-[11px] text-slate-300 font-mono">
                    Target: 26.9124 N, 75.7873 E<br />
                    Inspector Current: 26.9125 N, 75.7874 E
                  </div>

                  <div className={`py-1.5 rounded font-bold text-xs ${
                    gpsSimLocation === 'PREMISES'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-red-500/20 text-red-300 border border-red-500/40'
                  }`}>
                    {gpsSimLocation === 'PREMISES' ? '✓ LOCATION MATCH (14m Away)' : '⚠ LOCATION MISMATCH (520m Away)'}
                  </div>
                </div>

                {/* Simulation Control for Demo */}
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 block">SIMULATION CONTROL FOR SIH DEMO:</span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setGpsSimLocation('PREMISES')}
                      className={`py-1.5 rounded font-bold ${gpsSimLocation === 'PREMISES' ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'}`}
                    >
                      At Premises (Match)
                    </button>
                    <button
                      onClick={() => setGpsSimLocation('500M_AWAY')}
                      className={`py-1.5 rounded font-bold ${gpsSimLocation === '500M_AWAY' ? 'bg-red-600 text-white' : 'bg-slate-200 text-slate-700'}`}
                    >
                      500m Away (Mismatch)
                    </button>
                  </div>
                </div>

                <div className="flex justify-between pt-2">
                  <button onClick={() => setWizardStep(1)} className="px-3 py-1.5 text-slate-600 font-bold">Back</button>
                  <button onClick={() => setWizardStep(3)} className="bg-[#0B2348] text-white px-5 py-2 rounded-lg font-bold">Next: Checklist</button>
                </div>
              </div>
            )}

            {/* STEP 3: Physical Checklist */}
            {wizardStep === 3 && (
              <div className="space-y-4">
                <h3 className="font-heading font-bold text-sm text-slate-900 border-b pb-1">3. Physical & Identity Checklist</h3>
                
                <div className="space-y-2">
                  {checklist.map(item => (
                    <div key={item.id} className="flex justify-between items-center p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                      <span className="font-medium text-slate-800 pr-2">{item.title}</span>
                      <button
                        onClick={() => {
                          setChecklist(prev => prev.map(c => c.id === item.id ? { ...c, status: c.status === 'PASS' ? 'FAIL' : 'PASS' } : c));
                        }}
                        className={`px-2.5 py-1 rounded font-bold text-[10px] ${
                          item.status === 'PASS' ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'
                        }`}
                      >
                        {item.status}
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between pt-2">
                  <button onClick={() => setWizardStep(2)} className="px-3 py-1.5 text-slate-600 font-bold">Back</button>
                  <button onClick={() => setWizardStep(4)} className="bg-[#0B2348] text-white px-5 py-2 rounded-lg font-bold">Next: AI OCR</button>
                </div>
              </div>
            )}

            {/* STEP 4: AI OCR Meter Reader Feature */}
            {wizardStep === 4 && (
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-1">
                  <h3 className="font-heading font-bold text-sm text-slate-900">4. AI OCR Meter Reader</h3>
                  <span className="bg-purple-100 text-purple-800 font-bold text-[10px] px-2 py-0.5 rounded border border-purple-300">
                    SIH WINNING-EDGE AI
                  </span>
                </div>

                <div className="bg-slate-950 text-white p-4 rounded-xl text-center space-y-3 relative overflow-hidden">
                  <div className="relative border-2 border-dashed border-amber-400 p-6 rounded-lg bg-slate-900">
                    <Camera className="w-8 h-8 text-amber-400 mx-auto mb-1" />
                    <div className="font-mono text-lg font-extrabold text-amber-300 tracking-widest">
                      {isOcrScanning ? 'PROCESSING IMAGE...' : ocrDetectedValue ? `${ocrDetectedValue.toFixed(3)} kg` : 'DISPLAY READOUT'}
                    </div>
                    {ocrDetectedValue && (
                      <div className="text-[10px] text-emerald-400 font-bold mt-1">
                        OCR Confidence: 98.4% (Class III Digit Model)
                      </div>
                    )}
                  </div>

                  <button
                    onClick={handleRunAIOCR}
                    disabled={isOcrScanning}
                    className="w-full py-2.5 bg-purple-700 hover:bg-purple-800 text-white font-extrabold rounded-lg shadow flex items-center justify-center space-x-1"
                  >
                    {isOcrScanning ? (
                      <span>Analyzing Digit Readout...</span>
                    ) : (
                      <span>Capture Scale Display with AI OCR</span>
                    )}
                  </button>
                </div>

                <div className="flex justify-between pt-2">
                  <button onClick={() => setWizardStep(3)} className="px-3 py-1.5 text-slate-600 font-bold">Back</button>
                  <button onClick={() => setWizardStep(5)} className="bg-[#0B2348] text-white px-5 py-2 rounded-lg font-bold">Next: MPE Check</button>
                </div>
              </div>
            )}

            {/* STEP 5: Interactive MPE Calculation Engine */}
            {wizardStep === 5 && (
              <div className="space-y-4">
                <h3 className="font-heading font-bold text-sm text-slate-900 border-b pb-1">5. MPE Calibration Tolerance</h3>
                
                <div className="bg-slate-50 p-3 rounded-lg border space-y-2">
                  <span className="font-bold text-slate-800 text-[11px]">Add Standard Test Weight Record:</span>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Expected (kg)"
                      value={newTestWeight}
                      onChange={(e) => setNewTestWeight(e.target.value)}
                      className="w-1/2 p-2 bg-white border rounded font-mono font-bold"
                    />
                    <input
                      type="text"
                      placeholder="Observed (kg)"
                      value={newObservedWeight}
                      onChange={(e) => setNewObservedWeight(e.target.value)}
                      className="w-1/2 p-2 bg-white border rounded font-mono font-bold"
                    />
                  </div>
                  <button
                    onClick={handleAddMeasurement}
                    className="w-full py-1.5 bg-gov-saffron text-white font-bold rounded shadow-xs"
                  >
                    Compute MPE Error & Add
                  </button>
                </div>

                {/* Measurement Results Table */}
                <div className="space-y-2">
                  <span className="font-bold text-slate-800 text-[11px]">Recorded Test Runs ({measurements.length}):</span>
                  {measurements.map((m, idx) => (
                    <div key={m.id} className="bg-white border p-2.5 rounded-lg flex justify-between items-center text-[11px]">
                      <div>
                        <div className="font-bold font-mono">Test {idx + 1}: {m.testWeight} kg</div>
                        <div className="text-slate-500 font-mono">Observed: {m.observedReading} kg (Err: {m.error > 0 ? `+${m.error}` : m.error})</div>
                      </div>
                      <span className={`px-2 py-0.5 font-bold rounded ${m.result === 'PASS' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                        {m.result} (±{m.mpeTolerance})
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between pt-2">
                  <button onClick={() => setWizardStep(4)} className="px-3 py-1.5 text-slate-600 font-bold">Back</button>
                  <button onClick={() => setWizardStep(6)} className="bg-[#0B2348] text-white px-5 py-2 rounded-lg font-bold">Next: Signature</button>
                </div>
              </div>
            )}

            {/* STEP 6: Digital Signature */}
            {wizardStep === 6 && (
              <div className="space-y-4">
                <h3 className="font-heading font-bold text-sm text-slate-900 border-b pb-1">6. Officer Signature Authorization</h3>
                
                <div className="space-y-2">
                  <label className="font-bold text-slate-700 block">Officer Signature String</label>
                  <input
                    type="text"
                    value={signatureText}
                    onChange={(e) => setSignatureText(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border rounded font-serif italic text-slate-900 font-bold"
                  />
                </div>

                <div className="space-y-2">
                  <label className="font-bold text-slate-700 block">Inspector Remarks</label>
                  <textarea
                    rows={2}
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border rounded text-slate-900"
                  ></textarea>
                </div>

                <div className="p-3 bg-slate-900 text-white rounded-xl space-y-1 text-center">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Computed Inspection Status</div>
                  <div className={`font-extrabold text-base ${isOverallPass ? 'text-emerald-400' : 'text-red-400'}`}>
                    {isOverallPass ? '✓ VERIFICATION PASSED' : '✕ VERIFICATION FAILED'}
                  </div>
                </div>

                <div className="flex justify-between pt-2">
                  <button onClick={() => setWizardStep(5)} className="px-3 py-1.5 text-slate-600 font-bold">Back</button>
                  <button
                    onClick={handleCompleteFinalInspection}
                    className="bg-gov-saffron text-white font-extrabold px-6 py-2.5 rounded-lg shadow"
                  >
                    Submit Audit & Issue Certificate
                  </button>
                </div>
              </div>
            )}

            {/* STEP 7: FINAL COMPLETED DECISION */}
            {wizardStep === 7 && (
              <div className="py-6 text-center space-y-4 animate-in zoom-in-95 duration-200">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-inner ${
                  isOverallPass ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'
                }`}>
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div>
                  <h3 className="font-heading font-extrabold text-xl text-slate-900">
                    {isOverallPass ? 'Verification Certificate Issued' : 'Verification Rejected'}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Device ID: <strong className="font-mono text-amber-800">{selectedInspection.instrumentId}</strong>
                  </p>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border space-y-1 text-xs text-left font-mono">
                  <div>GPS Audit: <strong className="text-emerald-800">VERIFIED (14m)</strong></div>
                  <div>MPE Calibration: <strong>{isOverallPass ? 'PASS' : 'FAIL'}</strong></div>
                  <div>HMAC Token: <strong>GENERATED & SIGNED</strong></div>
                </div>

                <button
                  onClick={() => setActiveTab('assignments')}
                  className="bg-[#0B2348] text-white font-bold text-xs px-6 py-2.5 rounded-lg hover:bg-[#102A52]"
                >
                  Return to Assignments List
                </button>
              </div>
            )}

          </div>

        </div>
      )}

      {/* TAB 3: OFFLINE SYNC QUEUE */}
      {activeTab === 'sync' && (
        <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm space-y-4 text-xs animate-in fade-in duration-200">
          <div className="flex justify-between items-center border-b pb-2">
            <h3 className="font-heading font-bold text-slate-900 text-sm">Offline Local Sync Queue</h3>
            <span className="font-bold text-amber-800 font-mono">{offlineQueue.length} Pending</span>
          </div>

          <p className="text-slate-600">
            Inspections saved locally in remote mandis without cell signal are stored safely in device storage.
          </p>

          {offlineQueue.length === 0 ? (
            <div className="py-8 text-center text-slate-400 space-y-1">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
              <div>All field records synchronized with national server.</div>
            </div>
          ) : (
            <div className="space-y-2">
              {offlineQueue.map(item => (
                <div key={item.id} className="p-3 bg-slate-50 border rounded-lg flex justify-between items-center">
                  <div>
                    <div className="font-bold font-mono text-slate-900">{item.instrumentId}</div>
                    <div className="text-slate-500 text-[10px]">{item.businessName}</div>
                  </div>
                  <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-300">
                    PENDING SYNC
                  </span>
                </div>
              ))}

              <button
                onClick={syncOfflineQueue}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg shadow flex items-center justify-center space-x-1"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Simulate Network Restoration & Sync All</span>
              </button>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
