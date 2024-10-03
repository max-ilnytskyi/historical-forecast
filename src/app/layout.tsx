import type { Metadata } from 'next';

import { AppProvider } from '@/common/AppProvider';
import { AppLayout } from '@/common/components/layouts/AppLayout';
import { strings } from '@/texts';

import './globals.css';

export const metadata: Metadata = {
  title: strings.timeSeriesDataVisualizationFor,
  description: strings.exploreInteractiveTimeSeriesVisualizationsOf,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="h-screen overflow-hidden" lang="en">
      <body className="h-screen overflow-hidden relative text-white">
        <AppProvider>
          <AppLayout>{children}</AppLayout>
        </AppProvider>
      </body>
    </html>
  );
}
