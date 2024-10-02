import React, { ReactNode } from 'react';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <>
      <div className="h-screen bg-gradient-to-br from-indigo-950 via-gray-900 to-pink-950">
        <div className="h-screen flex flex-col overflow-y-auto">
          <main className="flex-1 flex flex-col">{children}</main>
        </div>
      </div>
    </>
  );
}
