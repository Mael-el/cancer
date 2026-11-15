import type { Metadata } from 'next';
import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PwaRegister from '../components/PwaRegister';

export const metadata: Metadata = {
  title: 'Ayidodé+ | Prévention du Cancer et Santé Publique au Bénin',
  description:
    'Plateforme béninoise de prévention précoce du cancer : dépistage du col de l’utérus, vaccination VPH des 9-14 ans, et alertes nutritionnelles sans aflatoxines.',
  manifest: '/manifest.json',
  themeColor: '#007048',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="min-h-screen flex flex-col selection:bg-[#00a86b] selection:text-white font-atkinson text-[#1a2e28] bg-[#faf8f3]">
        <PwaRegister />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
