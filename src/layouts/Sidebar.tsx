import { Button } from '../components/ui/button';
import { useDeploymentStore } from '../store/useDeploymentStore';
import { usePriceEstimation } from '../hooks/usePriceEstimation';
import { ShoppingCart, Server, Cpu, HardDrive, CreditCard } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';

export const SummarySidebar = () => {
    const {
        data,
        selectedSKU,
        extraRam,
        extraDisk,
        billingCycle,
        setBillingCycle
    } = useDeploymentStore();

    const prices = usePriceEstimation({
        selectedSKU,
        extraRam,
        extraDisk,
        addons: data?.addons || [],
        billingCycle,
    });

    const cycleLabel = billingCycle === 'hourly' ? 'hr' : 'mo';

    const addToCart = useCartStore((state) => state.addToCart);

    const handleAddToCart = () => {
        if (!selectedSKU) return;

        addToCart({
            sku: selectedSKU,
            extraRam,
            extraDisk,
            prices: {
                basePrice: prices.basePrice,
                ramPrice: prices.ramPrice,
                diskPrice: prices.diskPrice,
                totalPrice: prices.totalPrice
            },
            billingCycle
        });

        console.log('Added to cart:', selectedSKU.name);
    }

    return (
        <aside className="w-96 border-l border-neutral-800 bg-neutral-950/50 backdrop-blur-xl flex flex-col h-[calc(100vh-5rem)] sticky top-20 overflow-hidden shadow-[-20px_0_50px_rgba(0,0,0,0.5)]">
            {/* Header Summary */}
            <div className="p-8 border-b border-neutral-900 flex items-center justify-between bg-neutral-900/10">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-500">
                        <ShoppingCart size={22} />
                    </div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">Order Summary</h2>
                </div>
            </div>

            {/* Billing Cycle Toggle */}
            <div className="px-8 py-6">
                <label className="text-sm font-bold text-neutral-500 uppercase tracking-widest block mb-4">Billing Cycle</label>
                <div className="grid grid-cols-2 p-1.5 bg-neutral-900 rounded-2xl border border-neutral-800 ring-1 ring-white/5 shadow-inner">
                    <button
                        onClick={() => setBillingCycle('hourly')}
                        className={`py-2.5 px-4 rounded-xl text-sm font-bold transition-all duration-300 ${billingCycle === 'hourly'
                            ? 'bg-neutral-800 text-white shadow-lg shadow-black/20 ring-1 ring-white/10'
                            : 'text-neutral-500 hover:text-neutral-300'
                            }`}
                    >
                        Hourly
                    </button>
                    <button
                        onClick={() => setBillingCycle('monthly')}
                        className={`py-2.5 px-4 rounded-xl text-sm font-bold transition-all duration-300 ${billingCycle === 'monthly'
                            ? 'bg-neutral-800 text-white shadow-lg shadow-black/20 ring-1 ring-white/10'
                            : 'text-neutral-500 hover:text-neutral-300'
                            }`}
                    >
                        Monthly
                    </button>
                </div>
            </div>

            {/* Main Content - Scrollable if needed */}
            <div className="flex-1 overflow-y-auto px-8 py-4 space-y-8 custom-scrollbar">
                {selectedSKU ? (
                    <div className="space-y-8">
                        {/* Base SKU */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-neutral-500 uppercase tracking-widest text-[10px] font-bold">
                                <Server size={14} />
                                <span>Base Instance</span>
                            </div>
                            <div className="flex justify-between items-start gap-4">
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-1 leading-tight">{selectedSKU.name}</h3>
                                    <p className="text-sm text-neutral-500 font-medium">{selectedSKU.cpu} vCPUs • {selectedSKU.ram}GB RAM</p>
                                </div>
                                <div className="text-right">
                                    <div className="text-lg font-bold text-white">฿{prices.basePrice.toLocaleString()}</div>
                                    <div className="text-[10px] text-neutral-500 uppercase font-bold tracking-tighter">PER {cycleLabel}</div>
                                </div>
                            </div>
                        </div>

                        {/* Add-ons List */}
                        {(extraRam > 0 || extraDisk > 0) && (
                            <div className="space-y-6 pt-6 border-t border-neutral-900">
                                <div className="flex items-center gap-2 text-neutral-500 uppercase tracking-widest text-[10px] font-bold">
                                    <CreditCard size={14} />
                                    <span>Custom Add-ons</span>
                                </div>

                                <div className="space-y-4">
                                    {extraRam > 0 && (
                                        <div className="flex justify-between items-center group">
                                            <div className="flex items-center gap-3">
                                                <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 group-hover:scale-110 transition-transform">
                                                    <Cpu size={16} />
                                                </div>
                                                <span className="text-neutral-300 text-base font-medium">Extra RAM ({extraRam}GB)</span>
                                            </div>
                                            <span className="text-white font-bold text-base">+${prices.ramPrice.toLocaleString()}</span>
                                        </div>
                                    )}

                                    {extraDisk > 0 && (
                                        <div className="flex justify-between items-center group">
                                            <div className="flex items-center gap-3">
                                                <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform">
                                                    <HardDrive size={16} />
                                                </div>
                                                <span className="text-neutral-300 text-base font-medium">Extra Disk ({extraDisk}GB)</span>
                                            </div>
                                            <span className="text-white font-bold text-base">+${prices.diskPrice.toLocaleString()}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center py-20 px-4">
                        <div className="w-16 h-16 rounded-full bg-neutral-900 flex items-center justify-center text-neutral-700 mb-6 border border-neutral-800 border-dashed">
                            <ShoppingCart size={32} />
                        </div>
                        <p className="text-lg font-bold text-neutral-400 mb-2">No items selected</p>
                        <p className="text-sm text-neutral-600 leading-relaxed max-w-[200px]">Choose a server SKU to start your deployment.</p>
                    </div>
                )}
            </div>

            {/* Footer Payment Section */}
            <div className="p-8 border-t border-neutral-900 bg-neutral-900/20 space-y-8">
                <div className="space-y-2">
                    <div className="flex items-center justify-between group">
                        <span className="text-neutral-500 font-medium text-lg lg:text-xl">Estimated Total</span>
                        <div className="text-right">
                            <div className="text-3xl lg:text-4xl font-bold text-white tracking-tighter drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                                ฿{prices.totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </div>
                            <div className="text-[10px] lg:text-xs text-neutral-500 uppercase font-bold tracking-[0.2em]">
                                THB / {cycleLabel}
                            </div>
                        </div>
                    </div>
                </div>

                <Button
                    disabled={!selectedSKU}
                    onClick={handleAddToCart}
                    className={`w-full justify-center py-8 text-xl font-bold rounded-2xl shadow-2xl transition-all duration-300 active:scale-95 ${selectedSKU
                        ? 'bg-orange-500 hover:bg-orange-600 text-gray-800 shadow-orange-500/20 border-none'
                        : 'bg-neutral-800 text-neutral-600 border-neutral-700'
                        }`}
                    size="lg"
                >
                    Add to Cart
                </Button>
            </div>
        </aside>
    );
};
