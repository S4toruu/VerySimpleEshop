import { SessionProvider } from 'next-auth/react'
import { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import { CartProvider } from 'utils/cart-context'

import 'styles/global.css'
import { quicksand, rubik, montserrat } from 'styles/fonts'

function App({ Component, pageProps }: AppProps, session) {
  return (
    <SessionProvider session={session}>
      <CartProvider>
        {/* eslint-disable-next-line react/no-unknown-property */}
        <style jsx global>
          {`
      :root {
        --font-quicksand: ${quicksand.style.fontFamily};
        --font-rubik: ${rubik.style.fontFamily};
        --font-montserrat: ${montserrat.style.fontFamily};
      }
    `}
        </style>
        <Component {...pageProps} />
      </CartProvider>
    </SessionProvider>
  )
}

export default appWithTranslation(App)
