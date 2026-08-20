const fs = require('fs');
let code = fs.readFileSync('src/app/(main)/book-a-puja/rudrabhishek/page.tsx', 'utf8');

// Replace Rudrabhishek text with dynamic puja title
code = code.split('Rudrabhishek Puja').join("{puja?.title || 'Puja'}");
code = code.split('Rudrabhishek').join("{puja?.title || 'Puja'}");
code = code.split('1599').join("{puja?.discountedPrice || puja?.price || 1599}");

// For images array in Carousel
code = code.split(
  `"/pooja/Rudraabhishek.webp",`
).join(
  `puja?.image ? (puja.image.startsWith('/pooja') ? puja.image : getImageUrl(puja.image, puja.title)) : '/pooja/Rudraabhishek.webp',`
);
// For the <img> tag inside ABOUT POOJA
code = code.split(
  `<img src="/pooja/Rudraabhishek.webp" alt="About Puja"`
).join(
  `<img src={puja?.image ? (puja.image.startsWith('/pooja') ? puja.image : getImageUrl(puja.image, puja.title)) : '/pooja/Rudraabhishek.webp'} alt={puja?.title || 'Puja'}`
);

code = code.split(
  `<img src="/pooja/Rudraabhishek.webp" alt="Temple"`
).join(
  `<img src={puja?.image ? (puja.image.startsWith('/pooja') ? puja.image : getImageUrl(puja.image, puja.title)) : '/pooja/Rudraabhishek.webp'} alt="Temple"`
);

// Replace checkout links
code = code.split(`href="/book-a-puja/rudrabhishek/checkout"`).join("href={`/book-a-puja/${slug}/checkout`}");

// We need to inject the fetch logic for dynamic slug
code = code.replace(
  `const [dynamicData, setDynamicData] = useState<any>(null);`,
  `const params = useParams();\n  const slug = params?.slug as string;\n  const [puja, setPuja] = useState<any>(null);`
);

code = code.replace(
  `const response = await axios.get(\`\${apiUrl}/pujas/rudrabhishek\`);`,
  `const response = await axios.get(\`\${apiUrl}/pujas/\${slug}\`);`
);

code = code.replace(
  `setDynamicData(response.data);`,
  `setPuja(response.data);`
);

code = code.replace(
  `export default function RudrabhishekPage() {`,
  `import { useParams, notFound } from 'next/navigation';\n\nexport default function DynamicPujaPage() {`
);

code = code.replace(
  `const galleryImages = dynamicData?.gallery?.length > 0 ? dynamicData.gallery : defaultImages;`,
  `const galleryImages = puja?.gallery?.length > 0 ? puja.gallery : defaultImages;`
);

code = code.replace(
  `const price = dynamicData?.discountedPrice || dynamicData?.price || 1599;`,
  `const price = puja?.discountedPrice || puja?.price || 1599;`
);

// Add notFound check
code = code.replace(
  `if (loading) return <div className="min-h-screen flex items-center justify-center font-bold text-[#666]">Loading Puja Details...</div>;`,
  `if (loading) return <div className="min-h-screen flex items-center justify-center font-bold text-[#666]">Loading Puja Details...</div>;\n  if (!puja) notFound();`
);

// Fix hook dependency
code = code.replace(
  `useEffect(() => {`,
  `useEffect(() => {\n    if (!slug) return;`
);

code = code.replace(
  `}, []);`,
  `}, [slug]);`
);


fs.writeFileSync('src/app/(main)/book-a-puja/[slug]/page.tsx', code);
console.log('Script executed successfully!');
