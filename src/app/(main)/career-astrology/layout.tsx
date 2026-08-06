import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Career & Job Astrology | Business Success & Promotion Prediction',
  description: 'Get expert Vedic astrology guidance for career growth, job instability, business vs job decisions, government job yogas, and workplace politics remedies.',
  keywords: 'Career Astrology, Job Prediction, Business Astrology, Vedic Astrology Career, 10th House Astrology, Promotion Remedies, Government Job Yoga',
  openGraph: {
    title: 'Career & Job Astrology Guidance',
    description: 'Expert Vedic astrology guidance for your career, job changes, and business growth.',
    type: 'website',
  },
};

export default function CareerJobLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
