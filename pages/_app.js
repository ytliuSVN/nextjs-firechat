import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  <Head>
    <meta name='viewport' content='viewport-fit=cover'></meta>
  </Head>;
  return <Component {...pageProps} />;
}

export default MyApp;
