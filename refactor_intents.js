const fs = require('fs');
const path = require('path');

const folders = [
  'marriage-astrology',
  'career-astrology',
  'finance-astrology',
  'love-astrology',
  'health-astrology',
  'education-astrology',
  'child-astrology',
  'property-astrology'
];

const basePath = path.join(__dirname, 'src/app/(main)');

for (const folder of folders) {
  const folderPath = path.join(basePath, folder);
  const pagePath = path.join(folderPath, 'page.tsx');
  
  if (!fs.existsSync(pagePath)) continue;

  const content = fs.readFileSync(pagePath, 'utf8');
  
  // 1. Rename to Client component
  // Find the function name
  const funcMatch = content.match(/export default function ([A-Za-z0-9_]+)\(\)/);
  if (!funcMatch) {
    console.log(`Could not find function in ${folder}`);
    continue;
  }
  const funcName = funcMatch[1];
  const clientName = funcName.replace('Page', 'Client');

  // Replace function signature
  let newContent = content.replace(
    `export default function ${funcName}() {`,
    `export default function ${clientName}({ 
  initialAstrologers = [], 
  initialAiAstrologers = [], 
  initialFaqs = null, 
  initialSuccessStories = null, 
  initialBanner = null 
}: any) {`
  );

  // Replace useStates
  newContent = newContent.replace(/const \[astrologers, setAstrologers\] = useState<any\[\]>\(\[\]\);/, `const [astrologers, setAstrologers] = useState<any[]>(initialAstrologers);`);
  newContent = newContent.replace(/const \[loadingAstros, setLoadingAstros\] = useState\(true\);/, `const [loadingAstros, setLoadingAstros] = useState(initialAstrologers.length === 0);`);
  
  newContent = newContent.replace(/const \[aiAstrologers, setAiAstrologers\] = useState<any\[\]>\(\[\]\);/, `const [aiAstrologers, setAiAstrologers] = useState<any[]>(initialAiAstrologers);`);
  newContent = newContent.replace(/const \[loadingAiAstros, setLoadingAiAstros\] = useState\(true\);/, `const [loadingAiAstros, setLoadingAiAstros] = useState(initialAiAstrologers.length === 0);`);
  
  newContent = newContent.replace(/const \[faqs, setFaqs\] = useState<\{[^\}]+\}\[\]>\(defaultFaqs\);/, `const [faqs, setFaqs] = useState<{q: string; a: string}[]>(initialFaqs || defaultFaqs);`);
  newContent = newContent.replace(/const \[successStories, setSuccessStories\] = useState<\{[^\}]+\}\[\]>\(defaultSuccessStories\);/, `const [successStories, setSuccessStories] = useState<{name: string; before: string; after: string}[]>(initialSuccessStories || defaultSuccessStories);`);
  newContent = newContent.replace(/const \[banner, setBanner\] = useState\(\{ url: '' \}\);/, `const [banner, setBanner] = useState(initialBanner || { url: '' });`);

  // Add early returns in fetch functions
  newContent = newContent.replace(
    /const fetchAstrologers = async \(\) => {/g,
    `const fetchAstrologers = async () => {\n      if (initialAstrologers.length > 0) return;`
  );
  
  newContent = newContent.replace(
    /const fetchAiAstrologers = async \(\) => {/g,
    `const fetchAiAstrologers = async () => {\n      if (initialAiAstrologers.length > 0) return;`
  );

  newContent = newContent.replace(
    /const fetchSettings = async \(\) => {/g,
    `const fetchSettings = async () => {\n      if (initialFaqs || initialSuccessStories || initialBanner) return;`
  );

  const clientFileName = `${clientName}.tsx`;
  fs.writeFileSync(path.join(folderPath, clientFileName), newContent);
  
  // 2. Create Server Component
  const serverContent = `import ${clientName} from './${clientName}';

export const revalidate = 60; // ISR cache for 60 seconds

async function fetchInitialData() {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.vaidiktalk.com/api/v1';
    
    const [astrosRes, aiAstrosRes, settingsRes] = await Promise.all([
      fetch(\`\${API_URL}/astrologers/search?limit=10&isOnline=true\`, { next: { revalidate: 60 } }),
      fetch(\`\${API_URL}/ai-astrologers\`, { next: { revalidate: 60 } }),
      fetch(\`\${API_URL}/smart-kundali-settings/${folder}\`, { next: { revalidate: 3600 } })
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
      astrologers: astrosData.data || [],
      aiAstrologers: aiAstrosData,
      settings: settingsData
    };
  } catch (error) {
    console.error('Error fetching SSR data for ${folder}:', error);
    return { astrologers: [], aiAstrologers: [], settings: null };
  }
}

export default async function Page() {
  const data = await fetchInitialData();
  
  return (
    <${clientName} 
      initialAstrologers={data.astrologers}
      initialAiAstrologers={data.aiAstrologers}
      initialFaqs={data.settings?.faqs}
      initialSuccessStories={data.settings?.successStories}
      initialBanner={data.settings?.banner}
    />
  );
}
`;

  fs.writeFileSync(pagePath, serverContent);
  console.log(`Processed ${folder}`);
}

console.log('All done!');
