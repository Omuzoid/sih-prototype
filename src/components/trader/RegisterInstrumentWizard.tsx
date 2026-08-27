import React, { useState } from 'react';
import { 
  Building, MapPin, Upload, CheckCircle2, ArrowRight, ArrowLeft, 
  ShieldCheck, QrCode, Sparkles, FileText, Camera, CreditCard 
} from 'lucide-react';
import { useLM } from '../../context/LMContext';
import { AccuracyClass, Instrument } from '../../types';

export const RegisterInstrumentWizard: React.FC = () => {
  const { registerInstrument, currentUser, setCurrentTab } = useLM();

  const [step, setStep] = useState<number>(1);
  const [createdDevice, setCreatedDevice] = useState<Instrument | null>(null);

  // Form State
  const [type, setType] = useState<string>('Electronic Counter Weighing Scale');
  const [category, setCategory] = useState<Instrument['category']>('WEIGHING_SCALE');
  const [manufacturer, setManufacturer] = useState<string>('Essae-Teraoka Ltd.');
  const [model, setModel] = useState<string>('DS-215 Precision Counter');
  const [serialNumber, setSerialNumber] = useState<string>(`SHARMA-SCALE-${Math.floor(1000 + Math.random() * 9000)}`);
  const [capacity, setCapacity] = useState<string>('50');
  const [accuracyClass, setAccuracyClass] = useState<AccuracyClass>('CLASS_III');
  const [measurementUnit, setMeasurementUnit] = useState<string>('kg');
  const [yearOfManufacture, setYearOfManufacture] = useState<number>(2025);

  // Premises
  const [businessName, setBusinessName] = useState<string>(currentUser?.businessName || 'Sharma General & Grocery Mandi');
  const [traderName, setTraderName] = useState<string>(currentUser?.name || 'Rajesh Kumar Sharma');
  const [contactNumber, setContactNumber] = useState<string>('+91 98111 22334');
  const [email, setEmail] = useState<string>('trader@lmdvs.demo');
  const [address, setAddress] = useState<string>('Shop No. 14, Main Market, Johari Bazaar');
  const [district, setDistrict] = useState<string>('Jaipur Urban');
  const [state, setState] = useState<string>('Rajasthan');
  const [pincode, setPincode] = useState<string>('302003');
  const [latitude, setLatitude] = useState<number>(26.9124);
  const [longitude, setLongitude] = useState<number>(75.7873);

  const handleUseGPSLocation = () => {
    // Simulate Browser Geo-location
    setLatitude(26.9124 + (Math.random() - 0.5) * 0.01);
    setLongitude(75.7873 + (Math.random() - 0.5) * 0.01);
  };

  const handleFinalRegister = () => {
    const newInst = registerInstrument({
      serialNumber,
      type,
      category,
      manufacturer,
      model,
      capacity: `${capacity} ${measurementUnit}`,
      accuracyClass,
      measurementUnit,
      yearOfManufacture,
      traderId: currentUser?.id || 'usr-trader-1',
      traderName,
      businessName,
      contactNumber,
      email,
      address,
      district,
      state,
      pincode,
      latitude,
      longitude
    });

    setCreatedDevice(newInst);
    setStep(6); // Success Step
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-8 text-left">
      
      {/* Step Header */}
      <div className="bg-gov-navy text-white p-6 rounded-2xl shadow-md border border-slate-800">
        <div className="flex justify-between items-center mb-2">
          <span className="bg-amber-500/20 text-amber-300 font-bold text-xs px-2.5 py-0.5 rounded border border-amber-500/40 uppercase">
            Statutory Registration Wizard
          </span>
          <span className="text-xs font-mono font-bold text-slate-300">STEP {step} OF 5</span>
        </div>
        <h1 className="font-heading font-extrabold text-2xl text-white">Register Commercial Instrument</h1>
        <p className="text-slate-300 text-xs">Legal Metrology Act 2009 Digital Lifecycle Onboarding</p>

        {/* Progress Bar */}
        {step <= 5 && (
          <div className="w-full bg-slate-800 h-2 rounded-full mt-4 overflow-hidden">
            <div 
              className="bg-gov-saffron h-full transition-all duration-300"
              style={{ width: `${(step / 5) * 100}%` }}
            ></div>
          </div>
        )}
      </div>

      {/* STEP 1: Instrument Info */}
      {step === 1 && (
        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-4 text-xs animate-in fade-in duration-200">
          <h3 className="font-heading font-bold text-base text-slate-900 border-b pb-2">Step 1 — Equipment Specifications</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Instrument Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg font-medium text-slate-900"
              >
                <option value="WEIGHING_SCALE">Counter Weighing Scale</option>
                <option value="WEIGHBRIDGE">Heavy Pitless Weighbridge</option>
                <option value="FUEL_DISPENSER">Fuel / Liquid Dispenser</option>
                <option value="PLATFORM_SCALE">Industrial Platform Scale</option>
                <option value="RETAIL_MEASURE">Retail Measure Device</option>
                <option value="OTHER">Other Measuring Device</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Specific Equipment Type *</label>
              <input
                type="text"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-medium"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Manufacturer Name *</label>
              <input
                type="text"
                value={manufacturer}
                onChange={(e) => setManufacturer(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Model Name / Number *</label>
              <input
                type="text"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Serial Number (Etched on Plate) *</label>
              <input
                type="text"
                value={serialNumber}
                onChange={(e) => setSerialNumber(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg font-mono font-bold text-slate-900"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Maximum Capacity & Unit *</label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  className="w-2/3 p-2.5 bg-slate-50 border border-slate-300 rounded-lg font-bold text-slate-900"
                />
                <select
                  value={measurementUnit}
                  onChange={(e) => setMeasurementUnit(e.target.value)}
                  className="w-1/3 p-2.5 bg-slate-50 border border-slate-300 rounded-lg font-bold text-slate-900"
                >
                  <option value="kg">kg</option>
                  <option value="grams">grams</option>
                  <option value="Tonnes">Tonnes</option>
                  <option value="Liters">Liters</option>
                  <option value="meters">meters</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Legal Accuracy Class *</label>
              <select
                value={accuracyClass}
                onChange={(e) => setAccuracyClass(e.target.value as any)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg font-mono text-slate-900"
              >
                <option value="CLASS_I">Class I (Special Accuracy / Jewelers)</option>
                <option value="CLASS_II">Class II (High Accuracy / Pharma)</option>
                <option value="CLASS_III">Class III (Medium Accuracy / Retail Counter)</option>
                <option value="CLASS_IIII">Class IIII (Ordinary Accuracy / Heavy Mandi)</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Year of Manufacture *</label>
              <input
                type="number"
                value={yearOfManufacture}
                onChange={(e) => setYearOfManufacture(Number(e.target.value))}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg font-bold text-slate-900"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              onClick={() => setStep(2)}
              className="bg-gov-navy text-white px-6 py-2.5 rounded-lg font-bold flex items-center space-x-1 hover:bg-slate-800"
            >
              <span>Next: Ownership</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Ownership */}
      {step === 2 && (
        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-4 text-xs animate-in fade-in duration-200">
          <h3 className="font-heading font-bold text-base text-slate-900 border-b pb-2">Step 2 — Business & Owner Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Registered Business / Shop Name *</label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg font-bold text-slate-900"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Trader / Proprietor Full Name *</label>
              <input
                type="text"
                value={traderName}
                onChange={(e) => setTraderName(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Official Mobile Contact *</label>
              <input
                type="text"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg font-mono text-slate-900"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Email Address *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-between">
            <button onClick={() => setStep(1)} className="px-4 py-2 text-slate-600 font-bold flex items-center space-x-1">
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button onClick={() => setStep(3)} className="bg-gov-navy text-white px-6 py-2.5 rounded-lg font-bold flex items-center space-x-1">
              <span>Next: Premises GPS</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Premises & GPS */}
      {step === 3 && (
        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-4 text-xs animate-in fade-in duration-200">
          <h3 className="font-heading font-bold text-base text-slate-900 border-b pb-2">Step 3 — Shop Premises & GPS Geofence</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="font-bold text-slate-700 block mb-1">Street Address / Shop No. *</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">District *</label>
              <input
                type="text"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-bold"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">State *</label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-bold"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">PIN Code *</label>
              <input
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg font-mono text-slate-900"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">GPS Coordinates (Geofenced Field Inspections)</label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  readOnly
                  value={`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`}
                  className="w-full p-2.5 bg-slate-100 border border-slate-300 rounded-lg font-mono font-bold text-slate-800"
                />
                <button
                  type="button"
                  onClick={handleUseGPSLocation}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-3 py-2 rounded-lg text-[11px] whitespace-nowrap flex items-center space-x-1"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Fetch GPS</span>
                </button>
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-between">
            <button onClick={() => setStep(2)} className="px-4 py-2 text-slate-600 font-bold flex items-center space-x-1">
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button onClick={() => setStep(4)} className="bg-gov-navy text-white px-6 py-2.5 rounded-lg font-bold flex items-center space-x-1">
              <span>Next: Documents</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Documents Upload Simulation */}
      {step === 4 && (
        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-4 text-xs animate-in fade-in duration-200">
          <h3 className="font-heading font-bold text-base text-slate-900 border-b pb-2">Step 4 — Upload Supporting Documents</h3>
          
          <div className="space-y-3">
            <div className="border-2 border-dashed border-slate-300 p-4 rounded-xl text-center bg-slate-50 hover:bg-slate-100 transition-colors">
              <FileText className="w-6 h-6 text-slate-400 mx-auto mb-1" />
              <span className="font-bold text-slate-800 block">Purchase Bill / Tax Invoice Document</span>
              <span className="text-[10px] text-slate-400">PDF, JPG up to 5MB (Simulated)</span>
            </div>

            <div className="border-2 border-dashed border-slate-300 p-4 rounded-xl text-center bg-slate-50 hover:bg-slate-100 transition-colors">
              <Camera className="w-6 h-6 text-slate-400 mx-auto mb-1" />
              <span className="font-bold text-slate-800 block">Instrument Photograph & Metal Plate Photo</span>
              <span className="text-[10px] text-slate-400">PNG, JPG showing etched serial number</span>
            </div>
          </div>

          <div className="pt-4 flex justify-between">
            <button onClick={() => setStep(3)} className="px-4 py-2 text-slate-600 font-bold flex items-center space-x-1">
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button onClick={() => setStep(5)} className="bg-gov-navy text-white px-6 py-2.5 rounded-lg font-bold flex items-center space-x-1">
              <span>Next: Review</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: Final Review */}
      {step === 5 && (
        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-4 text-xs animate-in fade-in duration-200">
          <h3 className="font-heading font-bold text-base text-slate-900 border-b pb-2">Step 5 — Final Statutory Review</h3>
          
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <div className="flex justify-between font-bold text-sm text-slate-900 border-b pb-1">
              <span>{type}</span>
              <span className="font-mono text-amber-700">{category}</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-slate-700">
              <div>Serial No: <strong className="font-mono">{serialNumber}</strong></div>
              <div>Capacity: <strong>{capacity} {measurementUnit}</strong></div>
              <div>Manufacturer: <strong>{manufacturer} ({model})</strong></div>
              <div>Class: <strong>{accuracyClass}</strong></div>
              <div>Business: <strong>{businessName}</strong></div>
              <div>Location: <strong>{district}, {state}</strong></div>
            </div>
          </div>

          <div className="pt-4 flex justify-between">
            <button onClick={() => setStep(4)} className="px-4 py-2 text-slate-600 font-bold flex items-center space-x-1">
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              onClick={handleFinalRegister}
              className="bg-gov-saffron hover:bg-amber-600 text-slate-950 font-extrabold px-8 py-3 rounded-lg text-sm shadow flex items-center space-x-2 border border-amber-400"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>Register Instrument & Generate Device UUID</span>
            </button>
          </div>
        </div>
      )}

      {/* SUCCESS STEP 6 */}
      {step === 6 && createdDevice && (
        <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-xl text-center space-y-6 animate-in zoom-in-95 duration-300">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <span className="bg-emerald-500/20 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full border border-emerald-400">
              REGISTRATION SUCCESSFUL
            </span>
            <h2 className="font-heading font-extrabold text-2xl text-slate-900 mt-2">
              Instrument Registered in National Registry
            </h2>
          </div>

          <div className="bg-slate-950 text-white p-6 rounded-xl space-y-3 text-left max-w-md mx-auto border border-slate-800 font-mono text-xs">
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400">LM-DVS Device ID:</span>
              <span className="font-bold text-amber-300 text-sm">{createdDevice.id}</span>
            </div>

            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400">128-bit Device UUID:</span>
              <span className="text-slate-200 truncate max-w-[180px]">{createdDevice.uuid}</span>
            </div>

            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400">HMAC QR Token:</span>
              <span className="text-emerald-400 font-bold">{createdDevice.qrToken}</span>
            </div>

            <div className="text-[10px] text-slate-400 text-center pt-1 font-sans">
              Cryptographically associated with Legal Metrology Division key ring.
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <button
              onClick={() => setCurrentTab('trader-dashboard')}
              className="bg-gov-navy text-white text-xs font-bold px-6 py-2.5 rounded-lg hover:bg-slate-800 transition-colors"
            >
              Return to Trader Dashboard
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
