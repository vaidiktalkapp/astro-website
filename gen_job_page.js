const fs = require('fs');
let code = fs.readFileSync('src/app/(main)/book-a-puja/rudrabhishek/page.tsx', 'utf8');

// Slug & API
code = code.split("'/pujas/rudrabhishek'").join("'/pujas/job-attract-confirm-puja'");
code = code.split('localStorage.getItem(\'rudra_timer_start\')').join("localStorage.getItem('job_timer_start')");
code = code.split("localStorage.setItem('rudra_timer_start'").join("localStorage.setItem('job_timer_start'");

// Function name
code = code.split('export default function RudrabhishekPage()').join('export default function JobAttractPage()');

// Default image
code = code.split('"/pooja/Rudraabhishek.webp"').join('"/pooja/Job Attract & Confirm Puja.webp"');
code = code.split("'/pooja/Rudraabhishek.webp'").join("'/pooja/Job Attract & Confirm Puja.webp'");

// Title
code = code.split('>Rudrabhishek Puja<').join('>Job Attract &amp; Confirm Puja<');

// Breadcrumb
code = code.split('Rudrabhishek Puja\n        </p>').join('Job Attract &amp; Confirm Puja\n        </p>');

// Tagline
code = code.split("Heal doshas &amp; invite Lord Shiva&apos;s blessings for strength &amp; protection.").join(
  "Manifest the right job, remove career blocks &amp; attract success with divine blessings."
);

// Meta lines
code = code.split('Join Live Online — from anywhere in India').join('Book Online — from anywhere in India');
code = code.split('Performed on Auspicious Muhurat — Shubh Tithi &amp; Nakshatra').join('Career-focused ritual on Auspicious Muhurat &amp; Shubh Nakshatra');
code = code.split('Sankalp in your Name &amp; Gotra by experienced Pandits').join('Sankalp with your Name, Gotra &amp; Career intention');

// Stats
code = code.split('15K+ already booked this puja').join('8K+ professionals booked this puja');
code = code.split('★ 4.9 (7.9K Reviews)').join('★ 4.8 (5.2K Reviews)');

// Price fallback
code = code.split('|| 1599').join('|| 1999');

// Benefits
code = code.split(
  '["Remove negative energies & evil eye", "Pacify Shani, Rahu & Ketu doshas", "Healing & emotional balance", "Protection during astrological dasha periods", "Deepen spiritual connection with Lord Shiva"]'
).join(
  '["Remove career blocks & job rejections", "Attract new job opportunities & interviews", "Overcome delays in job confirmation", "Neutralise negative planetary effects on career", "Build confidence & professional aura"]'
);

// About section
code = code.split(
  'The Rudrabhishek Puja is one of the most sacred and potent Vedic rituals dedicated to Lord Shiva in his fierce yet benevolent form — Rudra. It involves the ceremonial bathing (abhishek) of the Shiva Lingam with sacred offerings like water, milk, honey, curd, ghee, and belpatra, accompanied by powerful Vedic mantras from the Rudram Chamakam.'
).join(
  'The Job Attract & Confirm Puja is a powerful Vedic ritual combining the energies of Lord Ganesh (remover of obstacles), Goddess Lakshmi (wealth & prosperity), and Surya Dev (career success). It is performed with a personalized Sankalp that includes your name, gotra, and specific career intention to remove planetary blocks causing job delays or rejections.'
);
code = code.split(
  'This divine pooja is known to destroy negative karma, pacify planetary doshas (especially linked to Rahu, Ketu, and Shani), protect from misfortunes, and bless the devotee with inner strength, peace, and spiritual awakening. Devotees can participate online and receive blessed prasad at home.'
).join(
  'This puja is ideal for job seekers, those awaiting interview results, professionals seeking promotion, or anyone facing repeated career setbacks. It removes the karmic and astrological obstructions that prevent the right opportunities from arriving. Devotees can participate online and receive blessed prasad at home.'
);
code = code.split(
  'The sacred Rudrabhishek is performed with complete Vedic procedures ensuring the maximum spiritual benefit for every devotee.'
).join(
  'The ritual is performed on auspicious Muhurat days by experienced Pandits who specialize in career-related pujas, ensuring maximum spiritual benefit and faster manifestation for every devotee.'
);

// Package perks
code = code.split('"Energised 5 Mukhi Rudraksha"').join('"Career success yantra energised for you"');
code = code.split('"Special Energised Rudraksha"').join('"Energised career success kavach"');
code = code.split('"Rudraksha + Gotra Sankalp"').join('"Gotra Sankalp + Yantra for all family"');

// SVG icons - use briefcase/work themed
const SingleIcon = `() => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`;
const CoupleIcon = `() => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`;
const FamilyIcon = `() => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`;

code = code.split(
  "const SingleIcon = () => <svg width=\"28\" height=\"28\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#d97706\" strokeWidth=\"1.8\" strokeLinecap=\"round\" strokeLinejoin=\"round\"><path d=\"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2\"/><circle cx=\"12\" cy=\"7\" r=\"4\"/></svg>;"
).join(`const SingleIcon = ${SingleIcon};`);
code = code.split(
  "const CoupleIcon = () => <svg width=\"28\" height=\"28\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#d97706\" strokeWidth=\"1.8\" strokeLinecap=\"round\" strokeLinejoin=\"round\"><path d=\"M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2\"/><circle cx=\"9\" cy=\"7\" r=\"4\"/><path d=\"M23 21v-2a4 4 0 0 0-3-3.87\"/><path d=\"M16 3.13a4 4 0 0 1 0 7.75\"/></svg>;"
).join(`const CoupleIcon = ${CoupleIcon};`);
code = code.split(
  "const FamilyIcon = () => <svg width=\"28\" height=\"28\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#d97706\" strokeWidth=\"1.8\" strokeLinecap=\"round\" strokeLinejoin=\"round\"><path d=\"M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z\"/><polyline points=\"9 22 9 12 15 12 15 22\"/></svg>;"
).join(`const FamilyIcon = ${FamilyIcon};`);

// Package names
code = code.split('"Single"').join('"Seeker"');
code = code.split('"Couple"').join('"Professional"');
code = code.split('"Family"').join('"Premium"');
code = code.split('"For 1 Devotee"').join('"For 1 Job Seeker"');
code = code.split('"For 2 Devotees"').join('"For 1 + Spouse / Parent"');
code = code.split('"For up to 4 Devotees"').join('"Family Career Blessing"');

// Checkout link
code = code.split('/book-a-puja/rudrabhishek/checkout').join('/book-a-puja/job-attract-confirm-puja/checkout');

// Testimonials
const oldTestimonials = `  const testimonials = [
    { name: "Priya Sharma", city: "New Delhi", review: "The puja was absolutely divine. The pandit was deeply knowledgeable and performed every ritual with precision. The prasad arrived beautifully packed. Highly recommend Vaidik Talk.", initial: "P" },
    { name: "Rajesh Gupta", city: "Mumbai", review: "Skeptical at first, but this completely changed my view of online pujas. The sankalp was taken in my name and gotra. Felt immense peace throughout.", initial: "R" },
    { name: "Anita Mehta", city: "Bengaluru", review: "Everything was well organized. I received timely updates throughout the puja. It was a wonderful spiritual experience. The HD video was a lovely touch.", initial: "A" },
    { name: "Suresh Nair", city: "Kochi", review: "The Sankalp with my name and gotra made the puja feel very personal. I am grateful for the blessings and positive energy received.", initial: "S" },
    { name: "Kavita Singh", city: "Jaipur", review: "Performed the Rudrabhishek for my father's health. We saw remarkable improvement within days. The entire experience was seamless and devotional.", initial: "K" },
    { name: "Arjun Verma", city: "Pune", review: "Best online puja service I have used. The priests were learned and the live video made it feel as if I was right there at the temple.", initial: "A" },
  ];`;
const newTestimonials = `  const testimonials = [
    { name: "Vikram Nair", city: "Bengaluru", review: "I had been jobless for 8 months. Within 3 weeks of doing this puja, I got a call from a top IT company and cleared the interview. Truly miraculous.", initial: "V" },
    { name: "Priya Sharma", city: "New Delhi", review: "Got my promotion within 45 days of booking this puja. The Sankalp was taken in my name and the pandit performed everything with full devotion.", initial: "P" },
    { name: "Rahul Mehta", city: "Mumbai", review: "Was facing repeated rejections for 6 months. After the puja, I received 3 interview calls in a single week. Highly recommend Vaidik Talk.", initial: "R" },
    { name: "Sunita Verma", city: "Lucknow", review: "My son had been waiting for his offer letter for months. After this puja, his letter came within 10 days. We are so grateful.", initial: "S" },
    { name: "Arjun Das", city: "Pune", review: "The entire experience was smooth and spiritual. The priest explained each step. Got placed in an MNC 5 weeks after the puja.", initial: "A" },
    { name: "Kavita Joshi", city: "Ahmedabad", review: "Best puja I have ever booked online. The HD video, prasad delivery, and follow-up were all excellent. My career path changed completely.", initial: "K" },
  ];`;
code = code.split(oldTestimonials).join(newTestimonials);

// Steps (already generic, keep as is — just update desc slightly)
code = code.split('"Add devotee Name & Gotra. The verified pandit will use these at the puja."').join(
  '"Add your Name, Gotra & career intention (job/promotion). The pandit will personalize the Sankalp."'
);

// FAQs
const oldFaqs = `  const faqs = [
    { q: "Who is the Rudrabhishek Puja meant for?", a: "Rudrabhishek is for devotees seeking relief from malefic planetary effects (Shani, Rahu, Ketu), negative energies, health issues, or those wishing to deepen their spiritual connection with Lord Shiva." },
    { q: "Which deity is worshipped during Rudrabhishek?", a: "The puja is dedicated to Lord Shiva in his Rudra form — the fierce and compassionate destroyer of ego and negative karma." },
    { q: "Is the puja performed using my name and gotra?", a: "Yes. A personal Sankalp is taken in your name and gotra by the Pandit before beginning the ritual, making the puja spiritually personalized to you." },
    { q: "When is the best time to perform Rudrabhishek?", a: "Auspicious days include Mondays, Maha Shivratri, Shravan Maas (entire month), Pradosh Vrat, and Masik Shivratri." },
    { q: "Who performs the puja?", a: "Verified and experienced Shaiva Pandits from sacred places like Kashi (Varanasi), Ujjain, and Kedarnath perform the ritual." },
  ];`;
const newFaqs = `  const faqs = [
    { q: "Who should book the Job Attract & Confirm Puja?", a: "Anyone facing job search difficulties, repeated interview rejections, delayed offer letters, or seeking a promotion should book this puja. It is also beneficial for those starting a new business or career." },
    { q: "Which deities are worshipped in this puja?", a: "The puja invokes Lord Ganesh (obstacle remover), Goddess Lakshmi (prosperity), and Surya Dev (career & authority) to align positive energies for career success." },
    { q: "How soon can I expect results?", a: "Most devotees report positive career shifts — interview calls, offer letters, or promotions — within 30-45 days of performing the puja." },
    { q: "Is the puja performed using my name and gotra?", a: "Yes. A personal Sankalp is taken in your name, gotra, and specific career intention before the ritual begins, making the puja spiritually personalized to your goal." },
    { q: "Can I perform this for a promotion or business growth?", a: "Absolutely. This puja works for any career advancement — new job, promotion, business growth, client attraction, or professional recognition." },
  ];`;
code = code.split(oldFaqs).join(newFaqs);

// Why Vaidik Talk
code = code.split(
  "Vaidik Talk is a dedicated puja platform built to provide authentic Vedic rituals. Every puja is performed by verified pandits with a real sankalp taken in your name — so devotees in India and abroad can participate with complete peace of mind."
).join(
  "Vaidik Talk is a dedicated puja platform connecting professionals with verified Pandits for authentic Vedic rituals. Every career puja is performed with a real Sankalp taken in your name and intention — so you can receive divine blessings from anywhere in India or abroad."
);

fs.writeFileSync('src/app/(main)/book-a-puja/job-attract-confirm-puja/page.tsx', code);
console.log('Job Attract page created successfully!');
