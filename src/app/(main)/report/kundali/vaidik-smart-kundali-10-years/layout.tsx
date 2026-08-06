import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vaidik Smart Kundali (10-Year Forecast) - Career, Marriage & Wealth',
  description: 'Get your 10-Year Premium Vaidik Kundali by India\'s most trusted astrologers. Unlock detailed predictions on career, finance, marriage, karmic lessons, and personalized remedies. Order your 250+ page report today.',
  keywords: ['Vaidik Kundali', '10 Year Kundli', 'Premium Kundli', 'Astrology Report', 'Career Prediction', 'Marriage Horoscope', 'Future Prediction', 'VaidikTalk'],
  authors: [{ name: 'VaidikTalk', url: 'https://vaidiktalk.com/' }],
  alternates: {
    canonical: 'https://vaidiktalk.com/report/kundali/vaidik-smart-kundali-10-years',
  },
  verification: {
    google: 'your-google-site-verification-code-here', // Replace with your actual code
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Vaidik Smart Kundali (10-Year Forecast) - Career, Marriage & Wealth',
    description: 'Unlock detailed predictions on career, finance, marriage, and karmic lessons with our premium 250+ page Kundali report.',
    url: 'https://vaidiktalk.com/report/kundali/vaidik-smart-kundali-10-years',
    siteName: 'VaidikTalk',
    images: [
      {
        url: 'https://vaidiktalk.com/images/vaidik-smart-kundali-og.jpg', 
        width: 1200,
        height: 630,
        alt: 'Vaidik Smart Kundali 10-Year Forecast',
        type: 'image/jpeg',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vaidik Smart Kundali (10-Year Forecast)',
    description: 'Unlock your next 10 years of predictions on career, finance, and marriage. Get your premium Kundali report today.',
    images: ['https://vaidiktalk.com/images/vaidik-smart-kundali-og.jpg'],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#5c1a1f',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
