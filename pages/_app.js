import Head from 'next/head';
// import '../styles/globals.css';
import '../styles/tailwind.css';

function MyApp({ Component, pageProps }) {
  <Head>
    <meta name='viewport' content='viewport-fit=cover'></meta>
  </Head>;
  return <Component {...pageProps} />;
}

export default MyApp;
