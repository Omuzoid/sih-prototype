// Cryptographic simulation for Tamper-Evident QR Seals (HMAC / Asymmetric signature concept)

export function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export function generateDeviceID(index: number = Math.floor(1000 + Math.random() * 9000)): string {
  return `LM-DVS-2026-${String(index).padStart(6, '0')}`;
}

export function generateQRToken(deviceId: string, serial: string): { token: string; signature: string } {
  // Simulated SHA-256 HMAC hash
  const raw = `${deviceId}:${serial}:GOV_INDIA_LM_KEY_2026`;
  let hash = 0;
  for (let i = 0; i < raw.length; i++) {
    const char = raw.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  const tokenHex = Math.abs(hash).toString(16).padStart(8, '0');
  const signature = `HMAC-SHA256:0x${tokenHex}f8a9e4b21c`;
  
  return {
    token: `LMQR-${deviceId}-${tokenHex.toUpperCase()}`,
    signature
  };
}

export function verifyQRSignature(token: string, signature: string, isTamperedFlag?: boolean): boolean {
  if (isTamperedFlag) return false;
  return signature.includes('0x') && token.startsWith('LMQR-');
}
