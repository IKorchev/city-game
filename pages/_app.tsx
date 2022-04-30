import "../styles/globals.css"
import type { AppProps } from "next/app"
import GameContextProvider from "../context/GameContextProvider"
import ModalContext from "../context/ModalContext"
import { v4 as uuidv4 } from "uuid"

function MyApp({ Component, pageProps }: AppProps) {
  const id = uuidv4()
  console.log(id)
  return (
    <GameContextProvider>
      <ModalContext>
        <Component {...pageProps} />
      </ModalContext>
    </GameContextProvider>
  )
}

export default MyApp
