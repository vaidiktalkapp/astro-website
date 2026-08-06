import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#fffdf9] flex flex-col overflow-x-clip text-[#3a1216] font-sans relative">
      <div className="fixed inset-0 z-0 pointer-events-none opacity-19" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='140' height='140' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20l2-8 2 8 8 2-8 2-2 8-2-8-8-2z' fill='%23d97706' fill-opacity='0.4'/%3E%3Ccircle cx='70' cy='40' r='1.5' fill='%23ee6c1e' fill-opacity='0.7'/%3E%3Ccircle cx='110' cy='100' r='2.5' fill='%23d97706' fill-opacity='0.5'/%3E%3Cpath d='M90 110l1.5-5 1.5 5 5 1.5-5 1.5-1.5 5-1.5-5-5-1.5z' fill='%23ee6c1e' fill-opacity='0.3'/%3E%3Ccircle cx='40' cy='90' r='1' fill='%23d97706' fill-opacity='0.4'/%3E%3Ccircle cx='120' cy='30' r='1.5' fill='%23ee6c1e' fill-opacity='0.3'/%3E%3C/svg%3E")`, backgroundSize: '140px 140px' }}></div>
      <div className="flex flex-1 min-w-0 flex-col">
        <Header />
        
        <main className="flex-1 min-w-0 w-full flex flex-col items-center justify-start pt-4 pb-24 px-6 relative z-10">
          <div className="max-w-2xl mx-auto text-center flex flex-col items-center mt-4 md:mt-8">
            {/* Spiritual Cosmic Graphic */}
            <div className="relative w-48 h-48 mx-auto mb-8 animate-[spin_60s_linear_infinite]">
              <svg viewBox="0 0 100 100" className="w-full h-full text-[#ee6c1e] opacity-30">
                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
                <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="1" />
                <path d="M50 5 L50 95 M5 50 L95 50 M18 18 L82 82 M18 82 L82 18" stroke="currentColor" strokeWidth="1" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center animate-[spin_60s_linear_infinite_reverse]">
                <span className="text-[72px] font-black text-[#5c1420] font-sans">404</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-[#5c1420] mb-4 font-serif">
              Astrologically Lost in Space
            </h1>
            <p className="text-[#6E2F37] text-lg md:text-xl mb-10 max-w-lg mx-auto leading-relaxed">
              It seems the stars haven't aligned for this page. The path you're looking for might have shifted into another dimension.
            </p>
            
            <Link 
              href="/" 
              className="inline-flex items-center gap-3 bg-[#ee6c1e] hover:bg-[#d84315] text-white font-bold text-lg px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-[0_8px_24px_rgba(238,108,30,0.25)] hover:-translate-y-1"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              Return to Homepage
            </Link>
          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
}
