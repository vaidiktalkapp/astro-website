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
      {/* Global Spiritual Sprinkles Pattern */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-19" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='140' height='140' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20l2-8 2 8 8 2-8 2-2 8-2-8-8-2z' fill='%23d97706' fill-opacity='0.4'/%3E%3Ccircle cx='70' cy='40' r='1.5' fill='%23ee6c1e' fill-opacity='0.7'/%3E%3Ccircle cx='110' cy='100' r='2.5' fill='%23d97706' fill-opacity='0.5'/%3E%3Cpath d='M90 110l1.5-5 1.5 5 5 1.5-5 1.5-1.5 5-1.5-5-5-1.5z' fill='%23ee6c1e' fill-opacity='0.3'/%3E%3Ccircle cx='40' cy='90' r='1' fill='%23d97706' fill-opacity='0.4'/%3E%3Ccircle cx='120' cy='30' r='1.5' fill='%23ee6c1e' fill-opacity='0.3'/%3E%3C/svg%3E")`, backgroundSize: '140px 140px' }}></div>
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