const fs = require('fs');
const path = 'd:/server-vaidik/vaidik-admin-main/admin-portal/src/app/(dashboard)/smart-kundali-settings/page.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Add state for heroHeading and heroSubheading
content = content.replace(
  /const \[schemaMarkup, setSchemaMarkup\] = useState\(''\);/,
  "const [schemaMarkup, setSchemaMarkup] = useState('');\n  const [heroHeading, setHeroHeading] = useState('');\n  const [heroSubheading, setHeroSubheading] = useState('');"
);

// 2. Set them in fetchSettings
content = content.replace(
  /setSchemaMarkup\(res\.data\.schemaMarkup \|\| ''\);/,
  "setSchemaMarkup(res.data.schemaMarkup || '');\n        setHeroHeading(res.data.heroHeading || '');\n        setHeroSubheading(res.data.heroSubheading || '');"
);

// 3. Add to handleSave payload
content = content.replace(
  /schemaMarkup,/,
  "schemaMarkup,\n      heroHeading,\n      heroSubheading,"
);

// 4. Add the JSX fields to the Hero Banner section
const heroInputJSX = `          <div className="space-y-4">
            <div>
              <Label>Main Heading (H1)</Label>
              <Input
                value={heroHeading}
                onChange={(e) => setHeroHeading(e.target.value)}
                placeholder="Discover What Your Numbers Reveal"
                className="mt-1"
              />
            </div>
            <div>
              <Label>Subheading</Label>
              <Input
                value={heroSubheading}
                onChange={(e) => setHeroSubheading(e.target.value)}
                placeholder="Find out how your name and mobile number affect your destiny."
                className="mt-1"
              />
            </div>`;

content = content.replace(
  /<div className=\"space-y-4\">\r?\n\s*<div>\r?\n\s*<Label>Banner URL<\/Label>/,
  heroInputJSX + '\n            <div>\n              <Label>Banner URL</Label>'
);

fs.writeFileSync(path, content);
console.log('Updated admin page.tsx');
