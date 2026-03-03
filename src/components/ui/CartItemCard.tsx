import { Server, Trash2, Cpu, HardDrive } from "lucide-react";
import type { CartItem } from "@/store/useCartStore";

interface CartItemCardProps {
    item: CartItem;
    onRemove: (id: string) => void;
}

export const CartItemCard = ({ item, onRemove }: CartItemCardProps) => {
    return (
        <div className="group relative p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800/50 hover:border-indigo-500/30 transition-all hover:bg-neutral-900/60 flex gap-6">
            <div className="p-4 rounded-2xl bg-indigo-500/10 text-indigo-400 h-fit shrink-0">
                <Server size={32} />
            </div>

            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h4 className="font-bold text-2xl text-white leading-none mb-2">{item.sku.name}</h4>
                        <div className="flex gap-3">
                            <span className="text-xs uppercase font-black tracking-widest text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
                                {item.billingCycle}
                            </span>
                            <span className="text-xs uppercase font-black tracking-widest text-neutral-500 bg-neutral-800 px-3 py-1 rounded-full">
                                {item.sku.type}
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={() => onRemove(item.id)}
                        className="p-2 text-neutral-600 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all"
                    >
                        <Trash2 size={24} />
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4">
                    <div className="flex items-center gap-3 text-lg text-neutral-300">
                        <Cpu size={20} className="text-indigo-500/60" />
                        <span className="font-medium">
                            RAM: <span className="text-white font-bold">{item.sku.ram} GB</span>
                            {item.extraRam > 0 && (
                                <span className="ml-2 text-indigo-400 font-black text-base drop-shadow-[0_0_8px_rgba(129,140,248,0.4)]">
                                    (+{item.extraRam} GB)
                                </span>
                            )}
                        </span>
                    </div>
                    <div className="flex items-center gap-3 text-lg text-neutral-300">
                        <HardDrive size={20} className="text-indigo-500/60" />
                        <span className="font-medium">
                            SSD: <span className="text-white font-bold">{item.sku.disk} GB</span>
                            {item.extraDisk > 0 && (
                                <span className="ml-2 text-emerald-400 font-black text-base drop-shadow-[0_0_8px_rgba(52,211,153,0.4)]">
                                    (+{item.extraDisk} GB)
                                </span>
                            )}
                        </span>
                    </div>
                </div>

                <div className="mt-6 pt-4 flex items-center justify-between border-t border-neutral-800/40">
                    <span className="text-sm text-neutral-500 font-bold uppercase tracking-[0.2em]">Subtotal</span>
                    <span className="text-3xl font-black text-white italic tracking-tighter">
                        ฿{item.prices.totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                </div>
            </div>
        </div>
    );
};
