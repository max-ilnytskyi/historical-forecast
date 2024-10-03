import React, { ReactNode } from 'react';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <>
      <div className="h-screen bg-gradient-to-br from-indigo-950 via-gray-900 to-pink-950">
        <main className="h-screen">{children}</main>
      </div>
    </>
  );
}
