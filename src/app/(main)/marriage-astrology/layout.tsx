import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Marriage & Relationship Astrology | Kundali Matching & Manglik Dosh',
  description: 'Get expert Vedic astrology guidance for marriage delay, love vs arranged marriage prediction, Kundali matching (Guna Milan), and Manglik Dosh remedies.',
  keywords: 'Marriage Astrology, Kundali Matching, Manglik Dosh, Love Marriage Prediction, Vedic Astrology Marriage, 7th House Astrology, Marriage Delay Remedies',
  openGraph: {
    title: 'Marriage & Relationship Astrology Guidance',
    description: 'Expert Vedic astrology guidance for your relationship, Kundali matching, and Manglik Dosh remedies.',
    type: 'website',
  },
};

export default function MarriageRelationshipLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
