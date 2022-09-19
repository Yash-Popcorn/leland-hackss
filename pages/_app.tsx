import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { createTheme, NextUIProvider } from '@nextui-org/react';
import Script from 'next/script';

function MyApp({ Component, pageProps }: AppProps) {
  const theme = createTheme({
    type: 'dark',
  });

  return (
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}`}
        strategy="afterInteractive"
      />
      <title>SportsHub</title>
      <NextUIProvider theme={theme}>
        <Component {...pageProps} />
      </NextUIProvider>
    </>
  );
}

export default MyApp;
