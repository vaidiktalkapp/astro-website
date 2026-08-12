import MarriageRelationshipClient from './MarriageRelationshipClient';

export const revalidate = 60; // ISR cache for 60 seconds

async function fetchInitialData() {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.vaidiktalk.com/api/v1';
    
    const [astrosRes, aiAstrosRes, settingsRes] = await Promise.all([
      fetch(`${API_URL}/astrologers/search?limit=10&isOnline=true`, { next: { revalidate: 60 } }),
      fetch(`${API_URL}/ai-astrologers`, { next: { revalidate: 60 } }),
      fetch(`${API_URL}/smart-kundali-settings/marriage-astrology`, { next: { revalidate: 3600 } })
    ]);

    const astrosData = astrosRes.ok ? await astrosRes.json() : { data: [] };
    
    // AI Astrologers might return array directly or wrapped in data
    let aiAstrosData = [];
    if (aiAstrosRes.ok) {
      const raw = await aiAstrosRes.json();
      aiAstrosData = raw.data || raw.astrologers || (Array.isArray(raw) ? raw : []);
    }

    const settingsData = settingsRes.ok ? await settingsRes.json() : null;

    return {
      astrologers: Array.isArray(astrosData?.data) ? astrosData.data : (Array.isArray(astrosData) ? astrosData : []),
      aiAstrologers: Array.isArray(aiAstrosData) ? aiAstrosData : [],
      settings: settingsData
    };
  } catch (error) {
    console.error('Error fetching SSR data for marriage-astrology:', error);
    return { astrologers: [], aiAstrologers: [], settings: null };
  }
}

export default async function Page() {
  const data = await fetchInitialData();
  
  return (
    <MarriageRelationshipClient 
      initialAstrologers={data.astrologers}
      initialAiAstrologers={data.aiAstrologers}
      initialFaqs={data.settings?.faqs}
      initialSuccessStories={data.settings?.successStories}
      initialBanner={data.settings?.banner}
    />
  );
}
