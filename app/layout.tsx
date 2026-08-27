import type { Metadata } from 'next';
import './globals.css';

const title = 'Jerison Tian — Robotics & Mechatronics Portfolio';
const description = 'Interactive project deck covering autonomous systems, computer vision, controls, embedded hardware and CAD.';
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

