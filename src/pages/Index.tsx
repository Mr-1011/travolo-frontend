import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import MobileIndex from '@/components/index/MobileIndex';
import DesktopIndex from '@/components/index/DesktopIndex';

const Index = () => {
  return (
    <PageLayout>
      {/* Mobile view (default up to lg breakpoint) */}
      <div className="block lg:hidden">
        <MobileIndex />
      </div>

      {/* Desktop view (lg breakpoint and above) */}
      <div className="hidden lg:flex h-full items-center justify-center flex-1">
        <DesktopIndex />
      </div>
    </PageLayout>
  );
};

export default Index;
