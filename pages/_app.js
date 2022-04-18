import "../styles/globals.css"
import GameContextProvider from "../context/GameContextProvider"
function MyApp({ Component, pageProps }) {
  return (
    <GameContextProvider>
      <Component {...pageProps} />
    </GameContextProvider>
  )
}

export default MyApp
