import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Footer from './partials/footer'

export default function App({ Component, pageProps }: AppProps) {
  return (
	<div>
  <Component {...pageProps} />
  <Footer/>
  </div>
  )
}
