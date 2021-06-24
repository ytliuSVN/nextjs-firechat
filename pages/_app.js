import Head from 'next/head';
// import '../styles/globals.css';
import '../styles/tailwind.css';
import { ThemeProvider } from 'next-themes';

function MyApp({ Component, pageProps }) {
  <Head>
    <meta name='viewport' content='viewport-fit=cover'></meta>
  </Head>;
  return (
    <ThemeProvider attribute='class'>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
