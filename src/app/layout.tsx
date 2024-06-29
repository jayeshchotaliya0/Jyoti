import React, { Suspense } from 'react';
import './globals.css';
import { ToastContainer } from 'react-toastify';
import '../../public/css/custome.css';
// import '../../public/styles/style.css';

import 'react-toastify/dist/ReactToastify.css';
import Script from 'next/script';

import Layout from '@/component/layout';
import Providers from '@/utils/redux/provider';
import "react-datepicker/dist/react-datepicker.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
          integrity="sha384-k6RqeWeci5ZR/Lv4MR0sA0FfDOMTd0p/5JgF2mEapupk8K/xUnUJHfBvBc1p9K23"
          crossOrigin="anonymous"
        />
        <Script strategy="beforeInteractive" src="https://cdn.tailwindcss.com" />
      </head>
      <body className="font-primary">
        <Providers>
          <Layout>
            <Suspense fallback={<div>Loading...</div>}>
              <ToastContainer position="top-right" autoClose={2000} />
              {children}
            </Suspense>
          </Layout>
        </Providers>
      </body>
    </html>
  );
}
