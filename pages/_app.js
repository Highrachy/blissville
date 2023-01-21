import Head from 'next/head';
import NextNProgress from 'nextjs-progressbar';
import React from 'react';
import '../sass/import.css';
import '../sass/App.scss';
import UserProvider from 'context/user';
import { ToastContainer, Slide } from 'react-toastify';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import XmasFall from '@/components/utils/XmasFall';
import Script from 'next/script';

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <XmasFall />
      <ToastContainer autoClose={10000} transition={Slide} theme="colored" />
      <NextNProgress color="#446cb2" />
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
        {/* <link rel="manifest" href="/site.webmanifest" /> */}
      </Head>
      <Component {...pageProps} />
      <Script id="tawk-chat">
        {`var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/63c497a447425128790dc183/1gmrv0n7b';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();`}
      </Script>
    </UserProvider>
  );
}

export default MyApp;
