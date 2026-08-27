export type UserRole = 'public' | 'trader' | 'inspector' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  businessName?: string;
  district?: string;
  state?: string;
  badgeNumber?: string;
  avatar?: string;
}

export type InstrumentStatus = 'VERIFIED' | 'PENDING_INSPECTION' | 'EXPIRING_SOON' | 'EXPIRED' | 'REJECTED' | 'HIGH_RISK';
export type VerificationType = 'INITIAL' | 'RE-VERIFICATION' | 'POST_REPAIR' | 'SURPRISE_AUDIT';
export type AccuracyClass = 'CLASS_I' | 'CLASS_II' | 'CLASS_III' | 'CLASS_IIII';

export interface Instrument {
  id: string; // e.g. LM-DVS-2026-000928
  uuid: string; // Cryptographic UUID
  qrToken: string;
  qrSignature: string;
  isTampered?: boolean;
  serialNumber: string;
  type: string; // e.g. "Electronic Weighing Scale", "Weighbridge 50T", "Fuel Dispensing Pump"
  category: 'WEIGHING_SCALE' | 'WEIGHBRIDGE' | 'FUEL_DISPENSER' | 'PLATFORM_SCALE' | 'RETAIL_MEASURE' | 'OTHER';
  manufacturer: string;
  model: string;
  capacity: string; // e.g. "50 kg", "60 Tonnes"
  accuracyClass: AccuracyClass;
  measurementUnit: string; // e.g. "kg", "grams", "Liters"
  yearOfManufacture: number;
  
  // Trader / Owner Details
  traderId: string;
  traderName: string;
  businessName: string;
  contactNumber: string;
  email: string;
  address: string;
  district: string;
  state: string;
  pincode: string;
  latitude: number;
  longitude: number;
  
  // Verification lifecycle
  status: InstrumentStatus;
  registrationDate: string;
  lastVerificationDate?: string;
  expiryDate?: string;
  riskScore: number; // 0 to 100
  riskReason?: string;
  feePaid: boolean;
  appointmentId?: string;
  appointmentDate?: string;
  assignedInspectorId?: string;
  assignedInspectorName?: string;
  
  certificateId?: string;
}

export interface MeasurementRecord {
  id: string;
  testWeight: number; // e.g. 10.0
  expectedReading: number; // 10.0
  observedReading: number; // 10.02
  error: number; // +0.02
  errorPercentage: number; // +0.2%
  mpeTolerance: number; // +/- 0.05
  result: 'PASS' | 'FAIL';
}

export interface PhysicalCheckitem {
  id: string;
  title: string;
  category: 'PHYSICAL' | 'IDENTIFICATION' | 'CALIBRATION';
  status: 'PASS' | 'FAIL' | 'NA';
  notes?: string;
}

export interface InspectionRecord {
  id: string; // e.g. LM-INS-2026-00912
  instrumentId: string;
  traderName: string;
  businessName: string;
  address: string;
  inspectorId: string;
  inspectorName: string;
  scheduledDate: string;
  completionDate?: string;
  status: 'SCHEDULED' | 'IN_PROGRESS' | 'PASSED' | 'FAILED' | 'SYNC_PENDING';
  
  // Verification Checks
  gpsVerified: boolean;
  gpsDistanceMeters: number;
  checklist: PhysicalCheckitem[];
  measurements: MeasurementRecord[];
  ocrReadingDetected?: number;
  ocrConfidence?: number;
  ocrImageSimulated?: string;
  photoEvidenceUrls: string[];
  inspectorSignature?: string;
  remarks?: string;
  overallMpeResult?: 'PASS' | 'FAIL';
  createdOffline?: boolean;
}

export interface Certificate {
  id: string; // LM-CERT-2026-88192
  instrumentId: string;
  serialNumber: string;
  instrumentType: string;
  traderName: string;
  businessName: string;
  address: string;
  issueDate: string;
  expiryDate: string;
  inspectorId: string;
  inspectorName: string;
  district: string;
  state: string;
  qrToken: string;
  qrSignature: string;
  status: 'VALID' | 'REVOKED' | 'EXPIRED';
}

export interface CitizenComplaint {
  id: string; // LM-CMP-2026-0012
  instrumentId?: string;
  category: 'INCORRECT_MEASUREMENT' | 'DAMAGED_SEAL' | 'SUSPICIOUS_QR' | 'EXPIRED_CERTIFICATE' | 'OTHER';
  description: string;
  reporterPhone?: string;
  reporterEmail?: string;
  evidencePhotoUrl?: string;
  location: string;
  district: string;
  state: string;
  submittedAt: string;
  status: 'OPEN' | 'UNDER_INVESTIGATION' | 'RESOLVED' | 'DISMISSED';
  assignedInspectorId?: string;
  resolutionNotes?: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
}

export interface RiskAnomalyAlert {
  id: string;
  type: 'HIGH_FREQUENCY' | 'GPS_MISMATCH' | 'QR_TAMPER' | 'DUPLICATE_REG' | 'UNUSUALLY_HIGH_PASS';
  title: string;
  description: string;
  entityId: string; // Inspector ID or Device ID
  entityType: 'INSPECTOR' | 'INSTRUMENT' | 'CERTIFICATE';
  riskScore: number; // 0 to 100
  timestamp: string;
  status: 'ACTIVE' | 'INVESTIGATING' | 'RESOLVED';
}

export interface AuditLog {
  id: string;
  timestamp: string;
  actorName: string;
  actorRole: UserRole;
  action: string;
  entityId: string;
  details: string;
  ipAddress: string;
}

export interface PaymentTransaction {
  id: string; // LMTXN202608271234
  instrumentId: string;
  traderId: string;
  amount: number;
  paymentMethod: 'UPI' | 'CARD' | 'NET_BANKING' | 'BHARATKOSH';
  status: 'SUCCESS' | 'FAILED' | 'PENDING';
  timestamp: string;
  receiptNumber: string;
}
