import { describe, expect, it } from 'vitest';
import { formatPrice, twCb } from '@/utils/helper';

describe('twCb', () => {
	it('should join class names', () => {
		expect(twCb('foo', 'bar')).toBe('foo bar');
	});

	it('should filter out falsy values', () => {
		expect(twCb('foo', false, null, undefined, 'bar')).toBe('foo bar');
	});

	it('should return empty string for no valid classes', () => {
		expect(twCb(false, null, undefined)).toBe('');
	});
});

describe('formatPrice', () => {
	it('should format a price with two decimal places', () => {
		expect(formatPrice(29.99)).toBe('$29.99');
	});

	it('should format a whole number price', () => {
		expect(formatPrice(10)).toBe('$10.00');
	});

	it('should format zero', () => {
		expect(formatPrice(0)).toBe('$0.00');
	});
});
