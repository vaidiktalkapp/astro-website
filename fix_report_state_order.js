const fs = require('fs');
const path = require('path');

// Fix remaining 5 pages - move settings state BEFORE hook call
const pages = [
  {
    dir: 'kundali/kundali-matching',
    functionName: 'KundaliMatchingPage',
    hookName: 'Kundali Matching',
    slug: 'kundali-matching',
    amount: 499,
  },
  {
    dir: 'kundali/personalized-lal-kitab',
    functionName: 'PersonalizedLalKitabPage',
    hookName: 'Personalized Lal Kitab',
    slug: 'personalized-lal-kitab',
    amount: 799,
  },
  {
    dir: 'kundali/hastlikhit-kundali',
    functionName: 'HastlikhitKundaliPage',
    hookName: 'Hastlikhit Kundali',
    slug: 'hastlikhit-kundali',
    amount: 999,
  },
  {
    dir: 'numerology/fortune-numerology',
    functionName: 'FortuneNumerologyPage',
    hookName: 'Fortune Numerology',
    slug: 'fortune-numerology',
    amount: 449,
  },
  {
    dir: 'numerology/name-mobile-number-numerology',
    functionName: 'NameMobileNumerologyPage',
    hookName: 'Name & Mobile Numerology',
    slug: 'name-mobile-number-numerology',
    amount: 399,
  },
];

const baseDir = path.join(__dirname, 'src', 'app', '(main)', 'report');

pages.forEach(({ dir, hookName, slug, amount }) => {
  const pagePath = path.join(baseDir, dir, 'page.tsx');
  if (!fs.existsSync(pagePath)) {
    console.log('NOT FOUND:', pagePath);
    return;
  }

  let content = fs.readFileSync(pagePath, 'utf-8');

  // Find if hook is placed before settings state - look for pattern
  const hookPattern = /const \{ formData, handleChange, handleSubmit, isProcessing \} = useReportBooking\(\{[\s\S]*?\}\);/;
  const hookMatch = content.match(hookPattern);
  if (!hookMatch) {
    console.log('Hook not found in:', dir);
    return;
  }

  // Check if settings state is declared after hook (problem)
  const hookIdx = content.indexOf(hookMatch[0]);
  const settingsStatePattern = /const \[settings, setSettings\] = useState<any>\(null\);/;
  const settingsMatch = content.match(settingsStatePattern);
  if (!settingsMatch) {
    console.log('Settings state not found in:', dir);
    return;
  }
  const settingsIdx = content.indexOf(settingsMatch[0]);

  if (settingsIdx > hookIdx) {
    // Problem: hook is before settings — need to reorder
    // Extract all state declarations that come after the hook
    const hookEnd = hookIdx + hookMatch[0].length;
    
    // Find the component function start to determine what to restructure
    // Strategy: remove hook from current position, then find where settings is, insert hook after all state declarations
    
    // Remove hook from current position
    let withoutHook = content.slice(0, hookIdx) + content.slice(hookEnd);
    
    // Find settings state in the modified content and insert hook after all state declarations
    const allStatePattern = /(\n  const \[[^\]]+, set[^\]]+\] = useState[^;]+;\n)+/;
    const statesMatch = withoutHook.match(allStatePattern);
    
    if (statesMatch) {
      const statesEnd = withoutHook.indexOf(statesMatch[0]) + statesMatch[0].length;
      const newHook = `\n  const { formData, handleChange, handleSubmit, isProcessing } = useReportBooking({\n    name: '${hookName}',\n    slug: '${slug}',\n    amount: settings?.price || settings?.discountedPrice || ${amount},\n  });\n`;
      content = withoutHook.slice(0, statesEnd) + newHook + withoutHook.slice(statesEnd);
      console.log('✅ Reordered states in:', dir);
    } else {
      console.log('Could not find state block in:', dir);
    }
  } else {
    console.log('ℹ️ Order already correct in:', dir);
  }

  fs.writeFileSync(pagePath, content, 'utf-8');
});

console.log('\nState ordering fix complete!');
