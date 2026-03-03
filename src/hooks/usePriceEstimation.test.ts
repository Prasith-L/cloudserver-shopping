import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { usePriceEstimation } from './usePriceEstimation';
import type { SKU, Addon, BillingCycle } from '../types/server';

const mockSKU: SKU = {
    sku: 'standard-1',
    name: 'Standard Instance',
    type: 'virtual-machine',
    cpu: 2,
    ram: 4,
    disk: 40,
    price_hourly: 0.01,
    price_monthly: 7.00
};

const mockAddons: Addon[] = [
    {
        id: 'ram-addon',
        type: 'ram',
        name: 'Extra RAM',
        unit: 'GB',
        price_per_unit_hourly: 0.002,
        price_per_unit_monthly: 1.50
    },
    {
        id: 'disk-addon',
        type: 'disk',
        name: 'Extra Disk',
        unit: 'GB',
        price_per_unit_hourly: 0.0001,
        price_per_unit_monthly: 0.10
    }
];

describe('usePriceEstimation', () => {
    it('should return zeros when no SKU is selected', () => {
        const { result } = renderHook(() => usePriceEstimation({
            selectedSKU: null,
            extraRam: 0,
            extraDisk: 0,
            addons: mockAddons,
            billingCycle: 'monthly'
        }));

        expect(result.current.totalPrice).toBe(0);
        expect(result.current.basePrice).toBe(0);
    });

    it('should calculate monthly price correctly with add-ons', () => {
        const { result } = renderHook(() => usePriceEstimation({
            selectedSKU: mockSKU,
            extraRam: 2, // 2 * 1.50 = 3.00
            extraDisk: 10, // 10 * 0.10 = 1.00
            addons: mockAddons,
            billingCycle: 'monthly'
        }));

        // Monthly base (7.00) + RAM (3.00) + Disk (1.00) = 11.00
        expect(result.current.basePrice).toBe(7.00);
        expect(result.current.ramPrice).toBe(3.00);
        expect(result.current.diskPrice).toBe(1.00);
        expect(result.current.totalPrice).toBe(11.00);
    });

    it('should calculate hourly price correctly with add-ons', () => {
        const { result } = renderHook(() => usePriceEstimation({
            selectedSKU: mockSKU,
            extraRam: 5, // 5 * 0.002 = 0.01
            extraDisk: 100, // 100 * 0.0001 = 0.01
            addons: mockAddons,
            billingCycle: 'hourly'
        }));

        // Hourly base (0.01) + RAM (0.01) + Disk (0.01) = 0.03
        expect(result.current.basePrice).toBe(0.01);
        expect(result.current.ramPrice).toBe(0.01);
        expect(result.current.diskPrice).toBe(0.01);
        expect(result.current.totalPrice).toBe(0.03);
    });

    it('should re-calculate when inputs change', () => {
        const { result, rerender } = renderHook(
            ({ extraRam }) => usePriceEstimation({
                selectedSKU: mockSKU,
                extraRam,
                extraDisk: 0,
                addons: mockAddons,
                billingCycle: 'monthly'
            }),
            { initialProps: { extraRam: 0 } }
        );

        expect(result.current.totalPrice).toBe(7.00);

        // Update RAM to 4GB (4 * 1.50 = 6.00)
        rerender({ extraRam: 4 });
        expect(result.current.totalPrice).toBe(13.00);
    });

    it('should switch between billing cycles correctly with the same configuration', () => {
        const { result, rerender } = renderHook<any, { billingCycle: BillingCycle }>(
            ({ billingCycle }) => usePriceEstimation({
                selectedSKU: mockSKU,
                extraRam: 10,  // Monthly 15.00 | Hourly 0.02
                extraDisk: 0,
                addons: mockAddons,
                billingCycle
            }),
            { initialProps: { billingCycle: 'monthly' } }
        );

        // Initial Monthly: 7.00 (base) + 15.00 (RAM) = 22.00
        expect(result.current.totalPrice).toBe(22.00);

        // Switch to Hourly: 0.01 (base) + 0.02 (RAM) = 0.03
        rerender({ billingCycle: 'hourly' });
        expect(result.current.totalPrice).toBe(0.03);
    });
});
