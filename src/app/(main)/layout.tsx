'use client';

import { Suspense } from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import { RealTimeProvider } from '../../context/RealTimeContext';
import ChatWaitingModal from '../../components/modals/ChatWaitingModal';
import CallWaitingModal from '../../components/modals/CallWaitingModal';
import PromoBannerModal from '../../components/modals/PromoBannerModal';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#fffdf9] flex flex-col overflow-x-clip text-[#3a1216] font-sans relative">
      {/* Global Spiritual Sprinkles Pattern Disabled */}
      <div className="flex flex-1 min-w-0 flex-col">
        <Header />
        
        <RealTimeProvider>
          <main className="flex-1 min-w-0 w-full flex flex-col">
            {children}
            <ChatWaitingModal />
            <CallWaitingModal />
            <PromoBannerModal />
            
            <Footer />
          </main>
        </RealTimeProvider>
      </div>
    </div>
  );
}