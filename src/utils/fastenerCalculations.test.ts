import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateTensileStressArea,
  estimateStudWeightKg,
  generateEnquiryRef,
  isValidBusinessEmail,
  METRIC_COARSE_PITCH_MAP,
  MATERIAL_GRADES_DATABASE
} from './fastenerCalculations';

test('calculates tensile stress area correctly for standard metric fasteners', () => {
  // For M16 with 2.0mm pitch: As = 0.7854 * (16 - 0.9382 * 2.0)^2 = 0.7854 * (16 - 1.8764)^2 = 0.7854 * (14.1236)^2 = ~156.67 mm2
  const areaM16 = calculateTensileStressArea(16, 2.0);
  assert.ok(areaM16 > 155 && areaM16 < 158, `Expected ~156.7, got ${areaM16}`);

  // For M24 with 3.0mm pitch: As = 0.7854 * (24 - 0.9382 * 3.0)^2 = 0.7854 * (21.1854)^2 = ~352.5 mm2
  const areaM24 = calculateTensileStressArea(24, 3.0);
  assert.ok(areaM24 > 350 && areaM24 < 355, `Expected ~352.5, got ${areaM24}`);

  // Edge cases
  assert.equal(calculateTensileStressArea(0, 1.5), 0);
  assert.equal(calculateTensileStressArea(10, 0), 0);
});

test('estimates stud bolt weight realistically', () => {
  // M24 diameter, 300mm length, 1 stud
  const weightSingle = estimateStudWeightKg(24, 300, 1);
  // Volume: PI * 12^2 * 300 * 0.95 = ~129,000 mm3 * 0.00000785 = ~1.01 kg
  assert.ok(weightSingle > 0.9 && weightSingle < 1.2, `Expected ~1.0kg, got ${weightSingle}`);

  // Batch of 100 pieces
  const weightBatch = estimateStudWeightKg(24, 300, 100);
  assert.ok(weightBatch > 90 && weightBatch < 120, `Expected ~101kg, got ${weightBatch}`);
  assert.equal(estimateStudWeightKg(-5, 100, 1), 0);
});

test('generates formatted Malvik RFQ reference numbers', () => {
  assert.equal(generateEnquiryRef(1, 2026), 'ME-RFQ-2026-0001');
  assert.equal(generateEnquiryRef(42, 2026), 'ME-RFQ-2026-0042');
  assert.equal(generateEnquiryRef(1234, 2026), 'ME-RFQ-2026-1234');
});

test('validates business email addresses correctly', () => {
  assert.equal(isValidBusinessEmail('procurement@adani.com'), true);
  assert.equal(isValidBusinessEmail('engg.lead@lnt.in'), true);
  assert.equal(isValidBusinessEmail('invalid-email'), false);
  assert.equal(isValidBusinessEmail('missing@domain'), false);
  assert.equal(isValidBusinessEmail(''), false);
});

test('contains verified ASTM and high-performance material grades', () => {
  assert.ok(MATERIAL_GRADES_DATABASE['ASTM A193 B7']);
  assert.ok(MATERIAL_GRADES_DATABASE['ASTM A194 2H']);
  assert.ok(MATERIAL_GRADES_DATABASE['Duplex 2205 (UNS S31803 / S32205)']);
  assert.ok(METRIC_COARSE_PITCH_MAP[16] === 2.0);
  assert.ok(METRIC_COARSE_PITCH_MAP[100] === 6.0);
});
