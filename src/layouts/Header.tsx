import { CartModal } from '../components/CartModal';

export const Header = () => {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-md">
            <div className="mx-auto flex h-20 items-center justify-between px-8">
                <div className="flex items-center gap-3">
                    <h1 className="text-xl font-bold text-white tracking-tight">Deploy new server</h1>
                </div>

                <div className="flex items-center gap-8">
                    <CartModal />

                    <div className="h-10 w-10 rounded-2xl bg-neutral-800 border border-neutral-700 flex items-center justify-center text-sm font-bold text-white hover:border-indigo-500 transition-colors cursor-pointer">
                        JD
                    </div>
                </div>
            </div>
        </header>
    );
};
