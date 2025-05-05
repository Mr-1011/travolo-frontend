import React from 'react';

type PageLayoutProps = {
  children: React.ReactNode;
  navigationBar?: React.ReactNode;
};

const PageLayout: React.FC<PageLayoutProps> = ({ children, navigationBar }) => {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <main className="py-2 flex-1 flex flex-col justify-center">
        <div className="max-w-4xl mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
};

export default PageLayout;
