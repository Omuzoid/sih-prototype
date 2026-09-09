import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserProfile, Instrument, InspectionRecord, Certificate, 
  CitizenComplaint, RiskAnomalyAlert, AuditLog, UserRole,
  LanguageMode, FontSizeScale, ApplicationStatusStep
} from '../types';
import { 
  DEMO_USERS, INITIAL_INSTRUMENTS, INITIAL_INSPECTIONS, 
  INITIAL_CERTIFICATES, INITIAL_COMPLAINTS, INITIAL_RISK_ALERTS, 
  INITIAL_AUDIT_LOGS 
} from '../data/seedData';
import { generateDeviceID, generateQRToken, generateUUID } from '../utils/crypto';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
}

interface LMContextType {
  // Current user & authentication
  currentUser: UserProfile | null;
  activeRole: UserRole;
  setCurrentUser: (user: UserProfile | null) => void;
  setActiveRole: (role: UserRole) => void;
  loginAsDemo: (role: UserRole) => void;
  logout: () => void;
  
  // Accessibility & Bilingual State
  language: LanguageMode;
  setLanguage: (lang: LanguageMode) => void;
  fontSizeScale: FontSizeScale;
  setFontSizeScale: (scale: FontSizeScale) => void;
  isHighContrast: boolean;
  setIsHighContrast: (contrast: boolean) => void;

  // Global Search & Navigation
  globalSearchQuery: string;
  setGlobalSearchQuery: (q: string) => void;
  globalSearchCategory: string;
  setGlobalSearchCategory: (cat: string) => void;
  currentTab: string;
  setCurrentTab: (tab: string) => void;

  // Data stores
  instruments: Instrument[];
  inspections: InspectionRecord[];
  certificates: Certificate[];
  complaints: CitizenComplaint[];
  riskAlerts: RiskAnomalyAlert[];
  auditLogs: AuditLog[];
  offlineQueue: InspectionRecord[];
  isOfflineMode: boolean;
  setIsOfflineMode: (offline: boolean) => void;
  
  // Actions
  registerInstrument: (data: Omit<Instrument, 'id' | 'uuid' | 'qrToken' | 'qrSignature' | 'status' | 'registrationDate' | 'riskScore' | 'feePaid'>) => Instrument;
  payVerificationFee: (instrumentId: string, amount: number, method: 'UPI' | 'CARD' | 'NET_BANKING' | 'BHARATKOSH') => void;
  bookInspectionSlot: (instrumentId: string, date: string, timeSlot: string) => void;
  submitInspection: (record: InspectionRecord) => void;
  syncOfflineQueue: () => void;
  fileCitizenComplaint: (complaint: Omit<CitizenComplaint, 'id' | 'submittedAt' | 'status'>) => CitizenComplaint;
  toggleQRTamperSimulation: (instrumentId: string) => void;
  triggerDemoAnomaly: () => void;
  resetDemoData: () => void;
  getApplicationTimeline: (id: string) => { instrument?: Instrument; steps: ApplicationStatusStep[] } | null;

  // UI Toasts
  toasts: Toast[];
  addToast: (type: Toast['type'], title: string, message: string) => void;
  removeToast: (id: string) => void;
}

const LMContext = createContext<LMContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'legal_metrix_sih_2026_state_v2';

export const LMProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => DEMO_USERS[0]);
  const [activeRole, setActiveRole] = useState<UserRole>('public');
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [language, setLanguage] = useState<LanguageMode>('en');
  const [fontSizeScale, setFontSizeScale] = useState<FontSizeScale>('normal');
  const [isHighContrast, setIsHighContrast] = useState<boolean>(false);
  const [isOfflineMode, setIsOfflineMode] = useState<boolean>(false);
  
  const [globalSearchQuery, setGlobalSearchQuery] = useState<string>('');
  const [globalSearchCategory, setGlobalSearchCategory] = useState<string>('All Categories');
  
  const [toasts, setToasts] = useState<Toast[]>([]);

  const [instruments, setInstruments] = useState<Instrument[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_instruments`);
    return saved ? JSON.parse(saved) : INITIAL_INSTRUMENTS;
  });

  const [inspections, setInspections] = useState<InspectionRecord[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_inspections`);
    return saved ? JSON.parse(saved) : INITIAL_INSPECTIONS;
  });

  const [certificates, setCertificates] = useState<Certificate[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_certificates`);
    return saved ? JSON.parse(saved) : INITIAL_CERTIFICATES;
  });

  const [complaints, setComplaints] = useState<CitizenComplaint[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_complaints`);
    return saved ? JSON.parse(saved) : INITIAL_COMPLAINTS;
  });

  const [riskAlerts, setRiskAlerts] = useState<RiskAnomalyAlert[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_alerts`);
    return saved ? JSON.parse(saved) : INITIAL_RISK_ALERTS;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_logs`);
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });

  const [offlineQueue, setOfflineQueue] = useState<InspectionRecord[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_offline_queue`);
    return saved ? JSON.parse(saved) : [];
  });

  // LocalStorage Sync
  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_instruments`, JSON.stringify(instruments));
  }, [instruments]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_inspections`, JSON.stringify(inspections));
  }, [inspections]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_certificates`, JSON.stringify(certificates));
  }, [certificates]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_complaints`, JSON.stringify(complaints));
  }, [complaints]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_alerts`, JSON.stringify(riskAlerts));
  }, [riskAlerts]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_logs`, JSON.stringify(auditLogs));
  }, [auditLogs]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_offline_queue`, JSON.stringify(offlineQueue));
  }, [offlineQueue]);

  // Toast Notifications
  const addToast = (type: Toast['type'], title: string, message: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => removeToast(id), 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const addAuditLog = (action: string, entityId: string, details: string) => {
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      actorName: currentUser?.name || 'Public Guest User',
      actorRole: activeRole,
      action,
      entityId,
      details,
      ipAddress: '192.168.1.104'
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const loginAsDemo = (role: UserRole) => {
    setActiveRole(role);
    const user = DEMO_USERS.find(u => u.role === role) || DEMO_USERS[0];
    setCurrentUser(user);
    if (role === 'admin') setCurrentTab('admin-command');
    else if (role === 'trader') setCurrentTab('trader-dashboard');
    else if (role === 'inspector') setCurrentTab('inspector-field');
    else setCurrentTab('home');

    addToast('info', 'Demo Role Activated', `Logged in as ${user.name} (${role.toUpperCase()})`);
    addAuditLog('USER_LOGIN', user.id, `User logged in with role: ${role}`);
  };

  const logout = () => {
    setActiveRole('public');
    setCurrentUser(null);
    setCurrentTab('home');
    addToast('info', 'Logged Out', 'Returned to public portal.');
  };

  // Trader Actions
  const registerInstrument = (data: Omit<Instrument, 'id' | 'uuid' | 'qrToken' | 'qrSignature' | 'status' | 'registrationDate' | 'riskScore' | 'feePaid'>): Instrument => {
    const newId = generateDeviceID(Math.floor(1000 + Math.random() * 9000));
    const uuid = generateUUID();
    const { token, signature } = generateQRToken(newId, data.serialNumber);

    const newInst: Instrument = {
      ...data,
      id: newId,
      uuid,
      qrToken: token,
      qrSignature: signature,
      status: 'PENDING_INSPECTION',
      registrationDate: new Date().toISOString().split('T')[0],
      riskScore: 10,
      feePaid: false
    };

    setInstruments(prev => [newInst, ...prev]);
    addAuditLog('REGISTER_INSTRUMENT', newId, `Registered new ${newInst.category}: ${newInst.serialNumber}`);
    addToast('success', 'Instrument Registered', `Device ID ${newId} created successfully.`);
    return newInst;
  };

  const payVerificationFee = (instrumentId: string, amount: number, method: 'UPI' | 'CARD' | 'NET_BANKING' | 'BHARATKOSH') => {
    setInstruments(prev => prev.map(inst => {
      if (inst.id === instrumentId) {
        return { ...inst, feePaid: true };
      }
      return inst;
    }));

    addAuditLog('PAYMENT_COMPLETED', instrumentId, `Statutory fee ₹${amount} paid via ${method}.`);
    addToast('success', 'Payment Successful', `Receipt generated for Instrument ${instrumentId}.`);
  };

  const bookInspectionSlot = (instrumentId: string, date: string, timeSlot: string) => {
    const aptId = `LM-APT-2026-${Math.floor(10000 + Math.random() * 90000)}`;

    setInstruments(prev => prev.map(inst => {
      if (inst.id === instrumentId) {
        return {
          ...inst,
          appointmentId: aptId,
          appointmentDate: date,
          assignedInspectorId: 'usr-insp-1',
          assignedInspectorName: 'Ramesh K. Patel'
        };
      }
      return inst;
    }));

    const targetInst = instruments.find(i => i.id === instrumentId);
    if (targetInst) {
      const newInsp: InspectionRecord = {
        id: `LM-INS-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        instrumentId,
        traderName: targetInst.traderName,
        businessName: targetInst.businessName,
        address: targetInst.address,
        inspectorId: 'usr-insp-1',
        inspectorName: 'Ramesh K. Patel',
        scheduledDate: `${date} ${timeSlot}`,
        status: 'SCHEDULED',
        gpsVerified: false,
        gpsDistanceMeters: 0,
        checklist: [],
        measurements: [],
        photoEvidenceUrls: []
      };
      setInspections(prev => [newInsp, ...prev]);
    }

    addAuditLog('BOOK_INSPECTION', instrumentId, `Slot booked for ${date} (${timeSlot}). Inspector assigned.`);
    addToast('success', 'Inspection Booked', `Slot confirmed for ${date} (${timeSlot}).`);
  };

  // Inspector Actions
  const submitInspection = (record: InspectionRecord) => {
    if (isOfflineMode) {
      const offlineRecord = { ...record, status: 'SYNC_PENDING' as const, createdOffline: true };
      setOfflineQueue(prev => [...prev, offlineRecord]);
      addToast('warning', 'Saved Offline', `Inspection saved to local offline storage queue.`);
      return;
    }

    const isPass = record.overallMpeResult === 'PASS';
    const certId = isPass ? `LM-CERT-2026-${Math.floor(10000 + Math.random() * 90000)}` : undefined;

    setInspections(prev => prev.map(i => i.id === record.id ? record : i));

    setInstruments(prev => prev.map(inst => {
      if (inst.id === record.instrumentId) {
        const today = new Date().toISOString().split('T')[0];
        const nextYear = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        return {
          ...inst,
          status: isPass ? 'VERIFIED' : 'REJECTED',
          lastVerificationDate: today,
          expiryDate: isPass ? nextYear : undefined,
          certificateId: certId,
          riskScore: isPass ? 5 : 90,
          riskReason: isPass ? undefined : 'Field inspection failed MPE tolerance limits.'
        };
      }
      return inst;
    }));

    if (isPass && certId) {
      const inst = instruments.find(i => i.id === record.instrumentId);
      if (inst) {
        const newCert: Certificate = {
          id: certId,
          instrumentId: inst.id,
          serialNumber: inst.serialNumber,
          instrumentType: inst.type,
          traderName: inst.traderName,
          businessName: inst.businessName,
          address: inst.address,
          issueDate: new Date().toISOString().split('T')[0],
          expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          inspectorId: record.inspectorId,
          inspectorName: record.inspectorName,
          district: inst.district,
          state: inst.state,
          qrToken: inst.qrToken,
          qrSignature: inst.qrSignature,
          status: 'VALID'
        };
        setCertificates(prev => [newCert, ...prev]);
      }
    }

    addAuditLog('SUBMIT_INSPECTION', record.id, `Inspection completed. Result: ${isPass ? 'PASSED' : 'FAILED'}.`);
    addToast(isPass ? 'success' : 'error', `Inspection ${isPass ? 'PASSED' : 'FAILED'}`, `Certificate ${certId ? certId + ' generated.' : 'denied.'}`);
  };

  const syncOfflineQueue = () => {
    if (offlineQueue.length === 0) {
      addToast('info', 'Sync Complete', 'No pending records in offline queue.');
      return;
    }

    offlineQueue.forEach(record => {
      submitInspection({ ...record, status: 'PASSED', createdOffline: false });
    });

    setOfflineQueue([]);
    addToast('success', 'Queue Synchronized', `Successfully synced ${offlineQueue.length} records to national server.`);
    addAuditLog('OFFLINE_SYNC', 'SYSTEM', `Synchronized ${offlineQueue.length} offline inspection records.`);
  };

  // Citizen Complaint
  const fileCitizenComplaint = (data: Omit<CitizenComplaint, 'id' | 'submittedAt' | 'status'>): CitizenComplaint => {
    const cmpId = `LM-CMP-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newCmp: CitizenComplaint = {
      ...data,
      id: cmpId,
      submittedAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      status: 'OPEN'
    };

    setComplaints(prev => [newCmp, ...prev]);
    
    if (data.instrumentId) {
      setInstruments(prev => prev.map(inst => {
        if (inst.id === data.instrumentId) {
          return {
            ...inst,
            riskScore: Math.min(100, inst.riskScore + 30),
            riskReason: `Citizen complaint logged: ${data.description.substring(0, 50)}...`
          };
        }
        return inst;
      }));
    }

    addAuditLog('FILE_COMPLAINT', cmpId, `Citizen complaint filed for ${data.district}, ${data.state}.`);
    addToast('success', 'Complaint Registered', `Complaint ID ${cmpId} submitted to Legal Metrology officer.`);
    return newCmp;
  };

  // Demo Controls
  const toggleQRTamperSimulation = (instrumentId: string) => {
    setInstruments(prev => prev.map(inst => {
      if (inst.id === instrumentId) {
        const newTamperState = !inst.isTampered;
        return {
          ...inst,
          isTampered: newTamperState,
          status: newTamperState ? 'HIGH_RISK' : 'VERIFIED',
          riskScore: newTamperState ? 98 : 10,
          riskReason: newTamperState ? 'Cryptographic QR token HMAC signature mismatch simulated.' : undefined
        };
      }
      return inst;
    }));

    addToast('warning', 'Tampering Simulated', `Instrument ${instrumentId} QR token signature set to ${instruments.find(i => i.id === instrumentId)?.isTampered ? 'VALID' : 'INVALID'}.`);
  };

  const triggerDemoAnomaly = () => {
    const newAlert: RiskAnomalyAlert = {
      id: `ALT-2026-${Math.floor(100 + Math.random() * 900)}`,
      type: 'HIGH_FREQUENCY',
      title: 'High Inspection Speed Anomaly',
      description: 'Inspector LM-INS-1029 completed 6 field calibrations in under 9 minutes.',
      entityId: 'usr-insp-1',
      entityType: 'INSPECTOR',
      riskScore: 89,
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      status: 'ACTIVE'
    };
    setRiskAlerts(prev => [newAlert, ...prev]);
    addToast('error', 'AI Anomaly Triggered', 'High risk inspection frequency anomaly created in Admin Command Center.');
  };

  const resetDemoData = () => {
    setInstruments(INITIAL_INSTRUMENTS);
    setInspections(INITIAL_INSPECTIONS);
    setCertificates(INITIAL_CERTIFICATES);
    setComplaints(INITIAL_COMPLAINTS);
    setRiskAlerts(INITIAL_RISK_ALERTS);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    setOfflineQueue([]);
    localStorage.clear();
    addToast('info', 'Demo Reset', 'All system state reset to initial Legal Metrix baseline.');
  };

  // Application Tracking Timeline Generator
  const getApplicationTimeline = (searchId: string) => {
    const term = searchId.trim().toLowerCase();
    const inst = instruments.find(i => 
      i.id.toLowerCase() === term || 
      i.uuid.toLowerCase() === term ||
      (i.appointmentId && i.appointmentId.toLowerCase() === term)
    );

    if (!inst) return null;

    const steps: ApplicationStatusStep[] = [
      {
        step: 1,
        label: 'Application & Registration Submitted',
        labelHi: 'आवेदन और पंजीकरण प्रस्तुत किया गया',
        date: inst.registrationDate,
        status: 'COMPLETED'
      },
      {
        step: 2,
        label: 'Document & Premise Verification',
        labelHi: 'दस्तावेज़ और परिसर का सत्यापन',
        date: inst.registrationDate,
        status: 'COMPLETED'
      },
      {
        step: 3,
        label: 'Statutory Fee Payment',
        labelHi: 'वैधानिक शुल्क भुगतान',
        date: inst.registrationDate,
        status: inst.feePaid ? 'COMPLETED' : 'IN_PROGRESS'
      },
      {
        step: 4,
        label: 'Inspection Slot Booked',
        labelHi: 'निरीक्षण स्लॉट बुक किया गया',
        date: inst.appointmentDate || (inst.feePaid ? 'Awaiting Booking' : undefined),
        status: inst.appointmentId ? 'COMPLETED' : inst.feePaid ? 'IN_PROGRESS' : 'PENDING'
      },
      {
        step: 5,
        label: 'GPS Field Inspection & MPE Check',
        labelHi: 'जीपीएस क्षेत्र निरीक्षण और एमपीई जांच',
        date: inst.lastVerificationDate || (inst.appointmentDate ? inst.appointmentDate : undefined),
        status: inst.status === 'VERIFIED' || inst.status === 'REJECTED' ? 'COMPLETED' : inst.appointmentId ? 'IN_PROGRESS' : 'PENDING'
      },
      {
        step: 6,
        label: 'Digital Certificate Generation',
        labelHi: 'डिजिटल प्रमाणपत्र निर्माण',
        date: inst.lastVerificationDate,
        status: inst.certificateId ? 'COMPLETED' : inst.status === 'VERIFIED' ? 'IN_PROGRESS' : 'PENDING'
      },
      {
        step: 7,
        label: 'HMAC QR Verification Seal Assigned',
        labelHi: 'एचएमएसी क्यूआर सत्यापन सील प्रदान की गई',
        date: inst.lastVerificationDate,
        status: inst.certificateId ? 'COMPLETED' : 'PENDING'
      }
    ];

    return { instrument: inst, steps };
  };

  return (
    <LMContext.Provider value={{
      currentUser,
      activeRole,
      setCurrentUser,
      setActiveRole,
      loginAsDemo,
      logout,
      language,
      setLanguage,
      fontSizeScale,
      setFontSizeScale,
      isHighContrast,
      setIsHighContrast,
      globalSearchQuery,
      setGlobalSearchQuery,
      globalSearchCategory,
      setGlobalSearchCategory,
      instruments,
      inspections,
      certificates,
      complaints,
      riskAlerts,
      auditLogs,
      offlineQueue,
      isOfflineMode,
      setIsOfflineMode,
      registerInstrument,
      payVerificationFee,
      bookInspectionSlot,
      submitInspection,
      syncOfflineQueue,
      fileCitizenComplaint,
      toggleQRTamperSimulation,
      triggerDemoAnomaly,
      resetDemoData,
      getApplicationTimeline,
      toasts,
      addToast,
      removeToast,
      currentTab,
      setCurrentTab
    }}>
      {children}
    </LMContext.Provider>
  );
};

export const useLM = () => {
  const context = useContext(LMContext);
  if (!context) {
    throw new Error('useLM must be used within an LMProvider');
  }
  return context;
};
