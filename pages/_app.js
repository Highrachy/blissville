import Head from 'next/head';
import NextNProgress from 'nextjs-progressbar';
import React from 'react';
import '../sass/App.scss';
import { ToastContainer, Slide } from 'react-toastify';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ToastContainer autoClose={10000} transition={Slide} theme="colored" />
      <NextNProgress color="#ed3237" />
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
    </>
  );
}

export default MyApp;
