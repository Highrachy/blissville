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

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
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
    </UserProvider>
  );
}

export default MyApp;
