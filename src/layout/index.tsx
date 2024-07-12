import React from 'react';
import Header from '../components/Header';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-full w-full">
      <Header title={'Магазин машин'} />
      {children}
    </div>
  );
}
