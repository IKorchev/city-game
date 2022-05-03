import "../styles/globals.css"
import type { AppProps } from "next/app"
import GameContextProvider from "../context/GameContextProvider"
import ModalContext from "../context/ModalContext"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GameContextProvider>
      <ModalContext>
        <Component {...pageProps} />
      </ModalContext>
    </GameContextProvider>
  )
}

export default MyApp
