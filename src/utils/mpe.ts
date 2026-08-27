import { AccuracyClass, MeasurementRecord } from '../types';

/**
 * Demo Maximum Permissible Error (MPE) Calculation Engine
 * Note: Prototype uses simplified demo configuration tolerances.
 */
export function calculateMPE(
  testWeight: number,
  observedReading: number,
  accuracyClass: AccuracyClass = 'CLASS_III'
): MeasurementRecord {
  const error = Number((observedReading - testWeight).toFixed(4));
  const errorPercentage = testWeight > 0 
    ? Number(((error / testWeight) * 100).toFixed(3)) 
    : 0;

  // Demo MPE Tolerance calculation based on class & test weight
  let mpeTolerance = 0.05; // Default +/- 0.05 kg for demo
  
  if (accuracyClass === 'CLASS_I') {
    mpeTolerance = 0.001; // +/- 1 gram
  } else if (accuracyClass === 'CLASS_II') {
    mpeTolerance = 0.01;  // +/- 10 grams
  } else if (accuracyClass === 'CLASS_III') {
    // 0.1% or min 0.02
    mpeTolerance = Math.max(0.02, Number((testWeight * 0.0015).toFixed(3)));
  } else if (accuracyClass === 'CLASS_IIII') {
    mpeTolerance = Math.max(0.05, Number((testWeight * 0.003).toFixed(3)));
  }

  const isPass = Math.abs(error) <= mpeTolerance;

  return {
    id: `m-${Math.random().toString(36).substring(2, 9)}`,
    testWeight,
    expectedReading: testWeight,
    observedReading,
    error,
    errorPercentage,
    mpeTolerance,
    result: isPass ? 'PASS' : 'FAIL'
  };
}

export function computeVerificationFee(category: string, capacity: string): number {
  let baseFee = 250;
  if (category === 'WEIGHBRIDGE') baseFee = 2500;
  if (category === 'FUEL_DISPENSER') baseFee = 1200;
  if (category === 'PLATFORM_SCALE') baseFee = 600;
  if (category === 'RETAIL_MEASURE') baseFee = 150;
  return baseFee;
}
