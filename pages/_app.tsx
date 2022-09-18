import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { createTheme, NextUIProvider } from '@nextui-org/react';

function MyApp({ Component, pageProps }: AppProps) {
  const theme = createTheme({
    type: "dark"
  })
  
  return <>
  <title>SportsHub</title>
  <NextUIProvider theme={theme}>
    <Component {...pageProps} />
  </NextUIProvider></>;
}

export default MyApp
