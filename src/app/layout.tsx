import type { Metadata } from 'next';
import './globals.css';
import ClientEffects from '@/components/ClientEffects';
export const metadata: Metadata = { title: 'Wastopia - Blockchain Waste Management', description: 'A blockchain and IoT platform for transparent, incentive-driven waste management.' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientEffects />
        <div className="wrap">{children}</div>
      </body>
    </html>
  );
}