const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src', 'app', '(main)', 'book-a-puja');

// Function to process a file
const processFile = (filePath, slug) => {
  let content = fs.readFileSync(filePath, 'utf-8');

  // Skip dynamic folder and main page
  if (slug === '[slug]' || slug === 'page.tsx' || slug === 'components' || !filePath.endsWith('page.tsx')) return;

  // Add the import statement
  if (!content.includes('usePujaBooking')) {
    content = content.replace(
      "import Link from 'next/link';",
      "import Link from 'next/link';\nimport { usePujaBooking } from '../../../../hooks/usePujaBooking';"
    );
  }

  // Remove old state
  content = content.replace(/const \[formData, setFormData\] = useState\(\{[\s\S]*?\}\);/g, '');
  content = content.replace(/const handleChange = \([^)]*\) => \{[\s\S]*?\};/g, '');
  content = content.replace(/const handleSubmit = \([^)]*\) => \{[\s\S]*?\};/g, '');

  // Find the Title and Amount to pass into the hook
  // We'll use a regex to find something like: 
  // <h1 className="..."> Rudrabhishek <span ...>Pooja</span> </h1>
  // Or just parse the file content manually
  let title = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  let amount = 1599;
  
  const amountMatch = content.match(/@ ₹(\d+)/) || content.match(/Proceed to Book • ₹(\d+)/) || content.match(/₹(\d+)/);
  if (amountMatch) {
    amount = parseInt(amountMatch[1], 10);
  }

  const hookCode = `
  const { formData, handleChange, handleSubmit, isProcessing } = usePujaBooking({
    title: '${title}',
    slug: '${slug}',
    amount: ${amount}
  });
`;
  
  // Insert hook after dynamicData useState
  if (content.includes('const [dynamicData, setDynamicData] = useState<any>(null);')) {
    if (!content.includes('const { formData, handleChange')) {
      content = content.replace(
        'const [dynamicData, setDynamicData] = useState<any>(null);',
        `const [dynamicData, setDynamicData] = useState<any>(null);\n${hookCode}`
      );
    }
  } else if (!content.includes('const { formData, handleChange')) {
     content = content.replace(
        'const [selectedImage, setSelectedImage] = useState<string | null>(null);',
        `const [selectedImage, setSelectedImage] = useState<string | null>(null);\n${hookCode}`
     );
  }

  // Update inputs
  content = content.replace(/name="name"(?! value)/g, 'name="name" value={formData.name} onChange={handleChange}');
  content = content.replace(/name="gotra"(?! value)/g, 'name="gotra" value={formData.gotra} onChange={handleChange}');
  content = content.replace(/name="phone"(?! value)/g, 'name="phone" value={formData.phone} onChange={handleChange}');
  content = content.replace(/name="email"(?! value)/g, 'name="email" value={formData.email} onChange={handleChange}');
  content = content.replace(/name="location"(?! value)/g, 'name="location" value={formData.location} onChange={handleChange}');
  content = content.replace(/name="date"(?! value)/g, 'name="date" value={formData.date} onChange={handleChange}');
  content = content.replace(/name="message"(?! value)/g, 'name="message" value={formData.message} onChange={handleChange}');

  // Update onSubmit
  content = content.replace(/onSubmit=\{\(e\) => \{.*?\}\}/g, 'onSubmit={handleSubmit}');
  
  // Update Buttons (adding disabled={isProcessing})
  content = content.replace(/<button([^>]*)type="submit"([^>]*)>/g, (match, p1, p2) => {
     if(match.includes('disabled={isProcessing}')) return match;
     let updated = `<button${p1}type="submit" disabled={isProcessing}${p2}>`;
     // add disabled styles if it has className
     if(updated.includes('className="')) {
        updated = updated.replace(/className="([^"]+)"/, 'className="$1 disabled:opacity-70 disabled:cursor-not-allowed"');
     }
     return updated;
  });
  
  content = content.replace(/>\s*Proceed to Book(.*?)</g, '> {isProcessing ? "Processing..." : "Proceed to Book$1"} <');
  content = content.replace(/>\s*Confirm Booking\s*</g, '> {isProcessing ? "Processing..." : "Confirm Booking"} <');

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log('Updated:', slug);
};

// Iterate over folders
fs.readdirSync(directoryPath).forEach(file => {
  const fullPath = path.join(directoryPath, file);
  if (fs.statSync(fullPath).isDirectory()) {
    const pagePath = path.join(fullPath, 'page.tsx');
    if (fs.existsSync(pagePath)) {
      processFile(pagePath, file);
    }
  }
});

console.log('All static pages updated successfully.');
