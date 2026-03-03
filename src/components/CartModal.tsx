import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CartItemCard } from "@/components/ui/CartItemCard";

export const CartModal = () => {
    const { items, removeFromCart, getTotalItems } = useCartStore();
    const itemCount = getTotalItems();

    const totalAmount = items.reduce((sum, item) => sum + item.prices.totalPrice, 0);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="relative p-3 rounded-2xl bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 transition-all active:scale-95 group">
                    <ShoppingCart size={24} className="group-hover:rotate-[-10deg] transition-transform" />
                    {itemCount > 0 && (
                        <span className="absolute -top-1 -right-1 w-6 h-6 bg-indigo-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-neutral-950">
                            {itemCount}
                        </span>
                    )}
                </button>
            </DialogTrigger>
            <DialogContent className="w-[95vw] sm:max-w-5xl bg-neutral-950 border-neutral-800 text-white p-0 grid grid-rows-[auto_1fr_auto] h-[85vh] gap-0 overflow-hidden rounded-3xl opacity-100">
                <DialogHeader className="p-6 border-b border-neutral-800">
                    <DialogTitle className="text-2xl font-bold flex items-center gap-3 text-white">
                        <ShoppingCart className="text-indigo-500" />
                        My Storage Cart
                    </DialogTitle>
                </DialogHeader>

                <div className="min-h-0 overflow-hidden">
                    <ScrollArea className="h-full">
                        <div className="px-6">
                            {items.length === 0 ? (
                                <div className="py-20 flex flex-col items-center justify-center text-center space-y-4">
                                    <div className="w-20 h-20 rounded-full bg-neutral-900 flex items-center justify-center text-neutral-600">
                                        <ShoppingCart size={40} />
                                    </div>
                                    <h3 className="text-xl font-bold text-white">Your cart is empty</h3>
                                    <p className="text-neutral-400 max-w-[240px]">Explore our SKUs and add some servers to your deployment.</p>
                                </div>
                            ) : (
                                <div className="py-6 space-y-4">
                                    {items.map((item) => (
                                        <CartItemCard
                                            key={item.id}
                                            item={item}
                                            onRemove={removeFromCart}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </div>

                <div className="p-8 border-t border-neutral-800 bg-neutral-900/40">
                    <div className="flex justify-between items-center mb-8">
                        <div className="flex flex-col">
                            <span className="text-neutral-500 font-bold uppercase tracking-[0.2em] text-[10px]">Grand Total</span>
                            <span className="text-neutral-400 text-xs italic">Includes extra resources</span>
                        </div>
                        <div className="text-right">
                            <span className="text-4xl font-black text-white tracking-tighter drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                                ฿{totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                            </span>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <Button className="flex-[1.5] py-7 text-lg font-bold bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl shadow-xl shadow-indigo-500/20 border-none transition-all active:scale-[0.98]">
                            Proceed to Checkout
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
