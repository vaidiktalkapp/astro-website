import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Business & Finance Astrology | Wealth, Investment & Business Success',
  description: 'Get expert Vedic astrology guidance for business growth, wealth accumulation, debt recovery, and stock market investments.',
  keywords: 'Wealth Astrology, Business Astrology, Finance Predictions, Vedic Astrology Wealth, Dhana Yoga, Business Success Remedies',
  openGraph: {
    title: 'Business & Finance Astrology Guidance',
    description: 'Expert Vedic astrology guidance for your business growth, investments, and wealth accumulation.',
    type: 'website',
  },
};

export default function FinanceAstrologyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
