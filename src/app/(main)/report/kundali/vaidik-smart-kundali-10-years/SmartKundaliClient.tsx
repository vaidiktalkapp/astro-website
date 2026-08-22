'use client';
import { useState } from 'react';
import { Plus, Minus, X } from 'lucide-react';

type FaqBlock =
  | { type: 'p'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'table'; headers: string[]; rows: string[][] };

interface FaqItem {
  q: string;
  content: FaqBlock[];
}

const FaqAnswer = ({ blocks }: { blocks: FaqBlock[] }) => (
  <div className="text-gray-850 text-[15px] leading-relaxed space-y-4 font-medium">
    {blocks.map((block, i) => {
      if (block.type === 'p') return <p key={i}>{block.text}</p>;
      if (block.type === 'list') return (
        <ul key={i} className="space-y-2">
          {block.items.map((item, j) => (
            <li key={j} className="flex gap-2.5 items-start">
              <span className="text-[#d68636] font-bold flex-shrink-0 mt-[2px]">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
      if (block.type === 'table') return (
        <div key={i} className="overflow-x-auto border border-[#ebdcc7] rounded-md">
          <table className="w-full text-left border-collapse min-w-[480px]">
            <thead>
              <tr className="bg-[#fdfaf6]">
                {block.headers.map((h, hi) => (
                  <th key={hi} className="text-[#5c1a1f] text-[13px] font-bold uppercase tracking-wide px-4 py-3 whitespace-nowrap border-b border-[#ebdcc7]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr key={ri} className="bg-white">
                  {row.map((cell, ci) => (
                    <td key={ci} className={`px-4 py-3 text-[14px] border-b border-[#ebdcc7] ${ci === 0 ? 'font-bold text-[#5c1a1f] whitespace-nowrap' : ''}`}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      return null;
    })}
  </div>
);

export function FaqSection({ faqs }: { faqs: FaqItem[] }) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  return (
    <section className="py-16 md:py-24 bg-white" id="faqSection">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-[28px] md:text-[36px] font-serif font-bold text-[#5c1a1f] mb-12 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-[#ebdcc7] rounded-xl overflow-hidden bg-[#fdfaf6]">
              <button
                className="w-full px-6 py-5 text-left flex justify-between items-center font-bold text-[#5c1a1f] hover:bg-[#f4ece3] transition-colors text-[16px]"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <span className="pr-4">{faq.q}</span>
                {openFaq === i ? <Minus className="w-5 h-5 flex-shrink-0 text-[#d68636]" /> : <Plus className="w-5 h-5 flex-shrink-0 text-[#d68636]" />}
              </button>
              {openFaq === i && (
                <div className="px-6 pb-6 pt-2 bg-[#fdfaf6]">
                  <FaqAnswer blocks={faq.content} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Lightbox({ src, onClose }: { src: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={onClose}>
      <button className="absolute top-6 right-6 text-white bg-white/20 rounded-full p-2 hover:bg-white/40"><X className="w-6 h-6" /></button>
      <img src={src} className="max-w-full max-h-full object-contain rounded-lg" alt="Preview" />
    </div>
  );
}

export function ScreenshotGallery({ screenshots }: { screenshots: { url: string }[] }) {
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  return (
    <>
      {lightboxImg && <Lightbox src={lightboxImg} onClose={() => setLightboxImg(null)} />}
      <div className="flex gap-3 md:gap-4 overflow-x-auto hide-scroll snap-x snap-mandatory pb-4">
        {screenshots.map((s, i) => (
          <div key={i} className="shrink-0 w-[200px] sm:w-[240px] md:w-[280px] lg:w-[300px] aspect-[3/4] rounded-2xl overflow-hidden shadow-xl snap-center cursor-pointer border-[3px] border-white hover:scale-[1.02] transition-transform"
            onClick={() => setLightboxImg(s.url)}>
            <img src={s.url} alt={`Report page ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
          </div>
        ))}
      </div>
    </>
  );
}
