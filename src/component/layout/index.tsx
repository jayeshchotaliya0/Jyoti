'use client';

import React, { ReactNode, useState } from 'react';
import { usePathname } from 'next/navigation';

import Sidebar from './sidebar/Sidebar';
import Header from './Header';
import Footer from './footer/Footer';
import { formatPathname } from '@/utils/functions/commonFunction';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const excludedPaths = [
    '/login',
    '/signup',
    '/forgot-password',
    '/update-password',
  ];
  const hideSidebarAndNavbar = excludedPaths.includes(pathname);
  const [sidebarOpen, setSidebarOpen] = useState(false);


  return (
    <>
      <div className="flex h-screen overflow-hidden">
        {/* <!-- ===== Sidebar Start ===== --> */}
        {!hideSidebarAndNavbar && <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />}
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* <!-- ===== Header Start ===== --> */}
          {!hideSidebarAndNavbar && <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />}
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
         
            <div className={`${hideSidebarAndNavbar ? '' : 'mx-auto max-w-screen-2x1 p-4 md:py-2 md:px-6 2x1:p-10'}`}>
              {children}
            </div>


          </main>
          {/* <!-- ===== Main Content End ===== --> */}
          <Footer />
        </div>
        {/* <!-- ===== Content Area End ===== --> */}

      </div>
    </>
  );
};

export default Layout;
