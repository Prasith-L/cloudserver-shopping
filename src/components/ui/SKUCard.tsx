import type { SKU } from '../../types/server';

interface SKUCardProps {
    sku: SKU;
    isSelected: boolean;
    onSelect: (sku: SKU) => void;
    billingCycle: 'hourly' | 'monthly';
}

export const SKUCard = ({ sku, isSelected, onSelect, billingCycle }: SKUCardProps) => {
    const price = billingCycle === 'hourly' ? sku.price_hourly : sku.price_monthly;
    const cycleLabel = billingCycle === 'hourly' ? 'hr' : 'mo';

    return (
        <button
            onClick={() => onSelect(sku)}
            className={`group relative p-6 rounded-2xl border transition-all duration-300 text-left flex flex-col h-full ${isSelected
                ? 'bg-indigo-600/5 border-indigo-500 shadow-2xl shadow-indigo-500/10 ring-1 ring-indigo-500/50'
                : 'bg-neutral-900/50 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900'
                }`}
        >
            {/* Header: Name & Price */}
            <div className="flex justify-between items-start mb-6">
                <h3 className={`text-xl font-bold transition-colors ${isSelected ? 'text-white' : 'text-neutral-200 group-hover:text-white'
                    }`}>
                    {sku.name}
                </h3>
                <div className="text-right">
                    <div className="text-lg font-bold text-white">
                        ฿{price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    <div className="text-xs text-neutral-500 uppercase tracking-widest font-medium">
                        per {cycleLabel}
                    </div>
                </div>
            </div>

            {/* Specs List */}
            <div className="space-y-3 mb-8 flex-1">
                <div className="flex items-center gap-3 text-lg">
                    <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]" />
                    <span className="text-neutral-300 font-medium">{sku.cpu} vCPUs</span>
                </div>
                <div className="flex items-center gap-3 text-lg">
                    <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                    <span className="text-neutral-300 font-medium">{sku.ram} GB RAM</span>
                </div>
                <div className="flex items-center gap-3 text-lg">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                    <span className="text-neutral-300 font-medium">{sku.disk} GB SSD Storage</span>
                </div>
            </div>

            {/* Subtle selection ring for hover */}
            {!isSelected && (
                <div className="absolute inset-0 rounded-2xl border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            )}
        </button>
    );
};
