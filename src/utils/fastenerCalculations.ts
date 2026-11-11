/**
 * Fastener engineering calculations and standard reference data
 * for Malvik Engineers technical catalog and procurement tools.
 */

export interface MetricFastenerSpec {
  size: string; // e.g. "M16"
  diameterMm: number;
  pitchMm: number; // Standard coarse pitch
  stressAreaMm2: number; // Tensile stress area As
  nutWidthAcrossFlatsMm: number; // Hex nut standard
}

export const METRIC_COARSE_PITCH_MAP: Record<number, number> = {
  8: 1.25,
  10: 1.5,
  12: 1.75,
  14: 2.0,
  16: 2.0,
  18: 2.5,
  20: 2.5,
  22: 2.5,
  24: 3.0,
  27: 3.0,
  30: 3.5,
  33: 3.5,
  36: 4.0,
  39: 4.0,
  42: 4.5,
  48: 5.0,
  56: 5.5,
  64: 6.0,
  72: 6.0,
  80: 6.0,
  90: 6.0,
  100: 6.0,
};

/**
 * Calculates nominal tensile stress area (As) according to ISO 898-1 / ASME standards.
 * Formula: As = 0.7854 * (d - 0.9382 * P)^2
 */
export function calculateTensileStressArea(diameterMm: number, pitchMm: number): number {
  if (diameterMm <= 0 || pitchMm <= 0) return 0;
  const effectiveD = diameterMm - 0.9382 * pitchMm;
  if (effectiveD <= 0) return 0;
  const area = 0.7854 * Math.pow(effectiveD, 2);
  return Number(area.toFixed(2));
}

/**
 * Calculates estimated stud bolt weight in kilograms.
 * Steel density approx 7.85 g/cm3 (0.00000785 kg/mm3)
 * Formula: Volume * Density = (PI * (d/2)^2 * lengthMm) * 0.00000785
 * With thread allowance factor ~0.95
 */
export function estimateStudWeightKg(diameterMm: number, lengthMm: number, quantity: number = 1): number {
  if (diameterMm <= 0 || lengthMm <= 0 || quantity <= 0) return 0;
  const radius = diameterMm / 2;
  const volumeMm3 = Math.PI * Math.pow(radius, 2) * lengthMm * 0.95;
  const weightPerPiece = volumeMm3 * 0.00000785;
  const total = weightPerPiece * quantity;
  return Number(total.toFixed(3));
}

/**
 * Generates official Malvik Engineers RFQ Reference ID
 * Format: ME-RFQ-YYYY-XXXX
 */
export function generateEnquiryRef(seqNumber: number, year: number = new Date().getFullYear()): string {
  const padded = String(seqNumber).padStart(4, '0');
  return `ME-RFQ-${year}-${padded}`;
}

/**
 * Validates B2B procurement email address format
 */
export function isValidBusinessEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email.trim());
}

/**
 * Material yield strength & tensile rating lookup in MPa for standard Malvik grades
 */
export interface GradeProperties {
  tensileStrengthMpa: string;
  yieldStrengthMpa: string;
  hardnessRating: string;
  standard: string;
  category: 'Carbon & Alloy' | 'Stainless Steel' | 'High Performance';
}

export const MATERIAL_GRADES_DATABASE: Record<string, GradeProperties> = {
  'ASTM A193 B7': {
    tensileStrengthMpa: '860 min',
    yieldStrengthMpa: '720 min',
    hardnessRating: '321 HBW max (35 HRC)',
    standard: 'ASTM A193 / ASME SA193',
    category: 'Carbon & Alloy',
  },
  'ASTM A193 B7M': {
    tensileStrengthMpa: '690 min',
    yieldStrengthMpa: '550 min',
    hardnessRating: '235 HBW max (99 HRB)',
    standard: 'ASTM A193 (NACE MR0175)',
    category: 'Carbon & Alloy',
  },
  'ASTM A320 L7': {
    tensileStrengthMpa: '860 min',
    yieldStrengthMpa: '720 min',
    hardnessRating: '321 HBW max (Impact @ -101°C)',
    standard: 'ASTM A320 / ASME SA320',
    category: 'Carbon & Alloy',
  },
  'ASTM A193 B16': {
    tensileStrengthMpa: '860 min',
    yieldStrengthMpa: '725 min',
    hardnessRating: '321 HBW max',
    standard: 'ASTM A193 (High Temp to 593°C)',
    category: 'Carbon & Alloy',
  },
  'ASTM A194 2H': {
    tensileStrengthMpa: 'Proof Load 175 ksi',
    yieldStrengthMpa: 'Heavy Hex Nut Spec',
    hardnessRating: '248 - 327 HBW (24 - 35 HRC)',
    standard: 'ASTM A194 / ASME SA194',
    category: 'Carbon & Alloy',
  },
  'EN8 / AISI 1040': {
    tensileStrengthMpa: '550 - 700',
    yieldStrengthMpa: '280 min',
    hardnessRating: '160 - 210 HB',
    standard: 'BS 970 / ISO 683',
    category: 'Carbon & Alloy',
  },
  'AISI 4140': {
    tensileStrengthMpa: '850 - 1000',
    yieldStrengthMpa: '650 min',
    hardnessRating: '280 - 320 HBW',
    standard: 'ASTM A29 / AISI 4140',
    category: 'Carbon & Alloy',
  },
  'SS304 / A2-70': {
    tensileStrengthMpa: '700 min',
    yieldStrengthMpa: '450 min',
    hardnessRating: '215 HB max',
    standard: 'ASTM A193 B8 / ISO 3506-1',
    category: 'Stainless Steel',
  },
  'SS316 / A4-80': {
    tensileStrengthMpa: '800 min',
    yieldStrengthMpa: '600 min',
    hardnessRating: '220 HB max',
    standard: 'ASTM A193 B8M / ISO 3506-1',
    category: 'Stainless Steel',
  },
  'Duplex 2205 (UNS S31803 / S32205)': {
    tensileStrengthMpa: '760 - 900',
    yieldStrengthMpa: '550 min',
    hardnessRating: '293 HBW max (31 HRC)',
    standard: 'ASTM A276 / ASTM A479',
    category: 'High Performance',
  },
  'Super Duplex 2507 (UNS S32750)': {
    tensileStrengthMpa: '800 - 1000',
    yieldStrengthMpa: '600 min',
    hardnessRating: '310 HBW max (32 HRC)',
    standard: 'ASTM A276 / ASTM A479',
    category: 'High Performance',
  },
  'Inconel 625 (UNS N06625)': {
    tensileStrengthMpa: '827 min',
    yieldStrengthMpa: '414 min',
    hardnessRating: '175 - 220 HB',
    standard: 'ASTM B446 / NACE MR0175',
    category: 'High Performance',
  },
  'Monel 400 (UNS N04400)': {
    tensileStrengthMpa: '550 min',
    yieldStrengthMpa: '240 min',
    hardnessRating: '110 - 150 HB',
    standard: 'ASTM B164',
    category: 'High Performance',
  },
  'Alloy 20 (UNS N08020)': {
    tensileStrengthMpa: '551 min',
    yieldStrengthMpa: '241 min',
    hardnessRating: '217 HB max',
    standard: 'ASTM B473',
    category: 'High Performance',
  },
};
