import React from 'react';
import { Header } from './Header';
import { SummarySidebar } from './Sidebar';

interface MainLayoutProps {
    children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <div className="min-h-screen bg-neutral-950 text-white flex flex-col font-sans selection:bg-indigo-500/30">
            <Header />
            <div className="flex flex-1 flex-row">
                <main className="flex-1 overflow-y-auto">
                    <div className="p-8 max-w-5xl mx-auto">
                        {children}
                    </div>
                </main>
                <SummarySidebar />
            </div>
        </div>
    );
};
