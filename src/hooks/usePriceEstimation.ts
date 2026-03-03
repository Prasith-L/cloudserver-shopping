import { useMemo } from 'react';
import type { SKU, Addon, BillingCycle } from '../types/server';

interface PriceEstimationProps {
    selectedSKU: SKU | null;
    extraRam: number; // GB
    extraDisk: number; // GB
    addons: Addon[];
    billingCycle: BillingCycle;
}

export const usePriceEstimation = ({
    selectedSKU,
    extraRam,
    extraDisk,
    addons,
    billingCycle,
}: PriceEstimationProps) => {
    const estimation = useMemo(() => {
        if (!selectedSKU) {
            return {
                basePrice: 0,
                ramPrice: 0,
                diskPrice: 0,
                totalPrice: 0,
            };
        }

        // Find addon definitions from the data
        const ramAddon = addons.find((a) => a.type === 'ram');
        const diskAddon = addons.find((a) => a.type === 'disk');

        // Get rates based on billing cycle
        const basePrice = billingCycle === 'hourly' ? selectedSKU.price_hourly : selectedSKU.price_monthly;

        const ramRate = billingCycle === 'hourly'
            ? (ramAddon?.price_per_unit_hourly || 0)
            : (ramAddon?.price_per_unit_monthly || 0);

        const diskRate = billingCycle === 'hourly'
            ? (diskAddon?.price_per_unit_hourly || 0)
            : (diskAddon?.price_per_unit_monthly || 0);

        // Calculate component prices
        const ramPrice = extraRam * ramRate;
        const diskPrice = extraDisk * diskRate;
        const totalPrice = basePrice + ramPrice + diskPrice;

        return {
            basePrice,
            ramPrice,
            diskPrice,
            totalPrice,
        };
    }, [selectedSKU, extraRam, extraDisk, addons, billingCycle]);

    return estimation;
};
