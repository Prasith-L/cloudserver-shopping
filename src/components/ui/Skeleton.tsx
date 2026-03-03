export const Skeleton = ({ className }: { className?: string }) => {
    return (
        <div className={`animate-pulse rounded-2xl bg-neutral-800/50 ${className}`} />
    );
};

export const SKUCardSkeleton = () => {
    return (
        <div className="p-6 rounded-2xl border border-neutral-800 bg-neutral-900/40 space-y-6">
            <div className="flex justify-between items-start">
                <Skeleton className="h-7 w-32" />
                <div className="text-right space-y-2">
                    <Skeleton className="h-6 w-20 ml-auto" />
                    <Skeleton className="h-3 w-12 ml-auto" />
                </div>
            </div>
            <div className="space-y-3 pt-2">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-4/5" />
                <Skeleton className="h-5 w-3/4" />
            </div>
            <div className="pt-4 flex items-center justify-between opacity-50">
                <Skeleton className="h-3 w-20" />
                <div className="flex gap-1">
                    <Skeleton className="h-2 w-2 rounded-full" />
                    <Skeleton className="h-2 w-2 rounded-full" />
                    <Skeleton className="h-2 w-2 rounded-full" />
                </div>
            </div>
        </div>
    );
};

export const AddonSkeleton = () => {
    return (
        <div className="p-8 rounded-3xl bg-neutral-900/50 border border-neutral-800 space-y-6">
            <div className="flex items-center justify-between text-right">
                <div className="flex items-center gap-4">
                    <Skeleton className="h-12 w-12 rounded-xl" />
                    <div className="space-y-2 text-left">
                        <Skeleton className="h-6 w-24" />
                        <Skeleton className="h-4 w-32" />
                    </div>
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-6 w-16 ml-auto" />
                    <Skeleton className="h-3 w-10 ml-auto" />
                </div>
            </div>
            <Skeleton className="h-14 w-full rounded-xl" />
        </div>
    );
};
