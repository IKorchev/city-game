import "../styles/globals.css"
import type { AppProps } from "next/app"
import GameContextProvider from "../context/GameContextProvider"
import Layout from "../components/Layout"
import CustomModal from "../components/CustomModal"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GameContextProvider>
      <CustomModal />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </GameContextProvider>
  )
}

export default MyApp
