import { create } from 'zustand';
import type { SKU, ServerType, CloudforestData, BillingCycle } from '../types/server';
import dataJson from '../interview-supplemental-files-main/frontend/data.json';

interface DeploymentStore {
    // Data State
    data: CloudforestData | null;
    isLoading: boolean;
    error: string | null;

    // UI State
    selectedType: ServerType;
    selectedSKU: SKU | null;
    extraRam: number;
    extraDisk: number;
    billingCycle: BillingCycle;

    // Actions
    fetchData: () => Promise<void>;
    setSelectedType: (type: ServerType) => void;
    setSelectedSKU: (sku: SKU | null) => void;
    setExtraRam: (val: number) => void;
    setExtraDisk: (val: number) => void;
    setBillingCycle: (cycle: BillingCycle) => void;
}

export const useDeploymentStore = create<DeploymentStore>((set, get) => ({
    data: null,
    isLoading: true,
    error: null,
    selectedType: 'virtual-machine',
    selectedSKU: null,
    extraRam: 0,
    extraDisk: 0,
    billingCycle: 'monthly',

    fetchData: async () => {
        set({ isLoading: true, error: null, data: null });

        // Simulating network delay
        const randomDelay = Math.floor(Math.random() * 2000) + 1000;

        await new Promise((resolve) => setTimeout(resolve, randomDelay));

        const isError = Math.random() < 0.1; // 10% chance

        if (isError) {
            set({ error: 'Error fetching data, please try again', isLoading: false });
        } else {
            const data = dataJson as CloudforestData;
            set({ data, isLoading: false });

            // Auto-select first SKU for the current type
            const currentType = get().selectedType;
            const filteredSKUs = data.skus.filter(s => s.type === currentType);
            if (filteredSKUs.length > 0) {
                set({ selectedSKU: filteredSKUs[0] });
            }
        }
    },

    setSelectedType: (type) => {
        set({ selectedType: type });
        // Auto-select first SKU of the new type
        const data = get().data;
        if (data) {
            const filteredSKUs = data.skus.filter(s => s.type === type);
            if (filteredSKUs.length > 0) {
                set({ selectedSKU: filteredSKUs[0] });
            }
        }
    },

    setSelectedSKU: (sku) => set({ selectedSKU: sku }),
    setExtraRam: (val) => set({ extraRam: val }),
    setExtraDisk: (val) => set({ extraDisk: val }),
    setBillingCycle: (cycle) => set({ billingCycle: cycle }),
}));
