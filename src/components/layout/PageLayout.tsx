
import React from 'react';

type PageLayoutProps = {
  children: React.ReactNode;
  navigationBar?: React.ReactNode;
};

const PageLayout: React.FC<PageLayoutProps> = ({ children, navigationBar }) => {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#3c83f6]">Travolo</h1>
        </div>
      </header>
      
      <main className="container py-8 flex-1 flex flex-col">
        <div className="max-w-4xl mx-auto flex flex-col flex-1 w-full">
          {children}
        </div>
      </main>

      {navigationBar && (
        <div className="sticky bottom-0 left-0 right-0 z-10 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)]">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              {navigationBar}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PageLayout;
