import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { SKU, BillingCycle } from '../types/server';

export interface CartItem {
    id: string; // Unique ID for each item in the cart
    sku: SKU;
    extraRam: number;
    extraDisk: number;
    billingCycle: BillingCycle;
    prices: {
        basePrice: number;
        ramPrice: number;
        diskPrice: number;
        totalPrice: number;
    };
    addedAt: number;
}

interface CartStore {
    items: CartItem[];
    addToCart: (item: Omit<CartItem, 'id' | 'addedAt'>) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
    getTotalItems: () => number;
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],

            addToCart: (item) => {
                const newItem: CartItem = {
                    ...item,
                    id: Math.random().toString(36).substring(7),
                    addedAt: Date.now(),
                };

                set((state) => ({
                    items: [...state.items, newItem],
                }));
            },

            removeFromCart: (id) => {
                set((state) => ({
                    items: state.items.filter((item) => item.id !== id),
                }));
            },

            clearCart: () => set({ items: [] }),

            getTotalItems: () => get().items.length,
        }),
        {
            name: 'cloudforest-cart-storage',
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);
