import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
    title: 'Mian Mobile Shop - Inventory Management',
    description: 'Mian Mobile Shop - Manage your mobile phone inventory',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <Navbar />
                <main className="container">
                    {children}
                </main>
            </body>
        </html>
    );
}
