import { describe, it, expect } from 'vitest';
import { formatPhone } from '../formatters';

describe('formatPhone', () => {
  it('formats a 10-digit US phone number', () => {
    expect(formatPhone('5551234567')).toBe('(555) 123-4567');
  });

  it('leaves already formatted values unchanged', () => {
    expect(formatPhone('(555) 123-4567')).toBe('(555) 123-4567');
  });
});
