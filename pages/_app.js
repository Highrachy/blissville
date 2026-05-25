import Head from 'next/head';
import NextNProgress from 'nextjs-progressbar';
import React from 'react';
import '../sass/import.css';
import '../sass/App.scss';
import UserProvider from 'context/user';
import { ThemeProvider } from 'context/ThemeContext';
import { ToastContainer, Slide } from 'react-toastify';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import XmasFall from '@/components/utils/XmasFall';
import Script from 'next/script';
import { ChatMessageProvider } from 'context/chat';
import FloatingChatButton from '@/components/common/Whatsapp';
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <UserProvider>
        <Toaster />
      <ChatMessageProvider>
        <XmasFall />
        <ToastContainer autoClose={10000} transition={Slide} theme="colored" />
        <NextNProgress color="#1f4e9f" />
        <Head>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
        </Head>
        <Component {...pageProps} />
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
        />
        <Script
          id="google-analytics"
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `,
          }}
        />
        <Script
          type="text/javascript"
          id="hs-script-loader"
          async
          defer
          src="//js-eu1.hs-scripts.com/139575051.js"
        />
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "wfjk9yetbs");
        `}
        </Script>
        <FloatingChatButton />
      </ChatMessageProvider>
    </UserProvider>
    </ThemeProvider>
  );
}

export default MyApp;
