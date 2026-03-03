export interface Addon {
    id: string;
    type: string;
    name: string;
    unit: string;
    price_per_unit_hourly: number;
    price_per_unit_monthly: number;
}

export type ServerType = 'virtual-machine' | 'dedicated';

export interface SKU {
    sku: string;
    type: ServerType;
    name: string;
    cpu: number;
    ram: number;
    disk: number;
    price_hourly: number;
    price_monthly: number;
}

export interface CloudforestData {
    addons: Addon[];
    skus: SKU[];
}

export type BillingCycle = 'hourly' | 'monthly';
