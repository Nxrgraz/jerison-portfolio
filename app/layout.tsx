import type { Metadata } from 'next';
import './globals.css';

const title = 'Jerison Tian — Robotics & Mechatronics Portfolio';
const description = 'Jerison Tian is a mechatronics and robotics engineering co-op student at the University of Alberta working on autonomous drone research and personal robotics projects.';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nxrgraz.github.io/jerison-portfolio';
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: { title, description, images: [`${siteUrl}/og.png`] },
  twitter: { card: 'summary_large_image', title, description, images: [`${siteUrl}/og.png`] },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
