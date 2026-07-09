import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Frontend Developer Portfolio | React & Next.js Expert',
  description: 'Professional Frontend Developer specializing in React, Next.js, and modern web technologies. Building responsive and performant web applications with clean code.',
  keywords: ['Frontend Developer', 'React', 'Next.js', 'Web Developer', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'Mohamed Abdel Latif', 'المهندس محمد عبداللطيف'],
  authors: [{ name: 'Frontend Developer' }],
  openGraph: {
    title: 'Frontend Developer Portfolio',
    description: 'Professional Frontend Developer specializing in React, Next.js, and modern web technologies.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Frontend Developer Portfolio',
    description: 'Professional Frontend Developer specializing in React, Next.js, and modern web technologies.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
