import cities from "../cities.json"
import React, {
  useState,
  useContext,
  createContext,
  useLayoutEffect,
  useEffect,
  useCallback,
  useRef,
} from "react"
import { generateRandomNumber } from "../utils/index"
import { City } from "../components/City.types"
import ReactCanvasConfetti from "react-canvas-confetti"

export interface ContextState {
  time: number
  score: number
  playing: boolean
  maxScore: number
  randomCity: City | null
  randomCity2: City | null
  makeGuess: (guess: boolean) => void
  setTime: (time: number) => void
}

const canvasStyles: any = {
  position: "fixed",
  pointerEvents: "none",
  width: "100%",
  height: "100%",
  zIndex: 5,
  top: 0,
  left: 0,
}

const Context = createContext({} as ContextState)

const TIME_PER_GUESS: number = 15
const MAX = cities.length

const GameContextProvider = ({ children }: { children: React.ReactNode }) => {
  const randomNumber = generateRandomNumber(0, MAX)
  const randomNumber2 = generateRandomNumber(0, MAX)
  const [score, setScore] = useState<number>(0)
  const [time, setTime] = useState<number>(TIME_PER_GUESS)
  const [playing, setPlaying] = useState<boolean>(false)
  const [maxScore, setMaxScore] = useState<number>(0)
  const [randomCity, setRandomCity] = useState<City | null>(cities[randomNumber])
  const [randomCity2, setRandomCity2] = useState<City | null>(cities[randomNumber2])

  const refAnimationInstance = useRef<any>(null)

  const getInstance = useCallback((instance: any) => {
    refAnimationInstance.current = instance
  }, [])

  const makeShot = useCallback((particleRatio: any, opts: any) => {
    refAnimationInstance.current &&
      refAnimationInstance.current({
        ...opts,
        particleCount: Math.floor(500 * particleRatio),
      })
  }, [])

  function resetTimer() {
    setTime(TIME_PER_GUESS)
  }

  function incrementScore() {
    setScore(score + 1)
  }

  function resetGame() {
    const _localStorageScore = window.localStorage.getItem("MAX_SCORE")
    const localStorageScore = _localStorageScore ? parseInt(_localStorageScore) : 0
    console.log(score, localStorageScore)
    if (score > localStorageScore) {
      window.localStorage.setItem("MAX_SCORE", score.toString())
      makeShot(1, {
        spread: 555,
        startVelocity: 45,
      })
    }
    setPlaying(false)
    setScore(0)
    resetTimer()
    setRandomCity(cities[generateRandomNumber(0, MAX)])
    setRandomCity2(cities[generateRandomNumber(0, MAX)])
  }

  function handleCorrectGuess() {
    incrementScore()
    setRandomCity(randomCity2)
    setRandomCity2(cities[generateRandomNumber(0, MAX)])
    resetTimer()
  }

  function makeGuess(guess: boolean) {
    if (!playing) setPlaying(true)
    //if the timer is 0 or the guess is false/incorrect, the game is over
    if (!guess) {
      resetGame()
      return
    }
    handleCorrectGuess()
  }

  //get and set the max score from localStorage
  useLayoutEffect(() => {
    const maxScoreJSON = window.localStorage.getItem("MAX_SCORE")
    maxScoreJSON ? setMaxScore(JSON.parse(maxScoreJSON)) : setMaxScore(0)
  }, [])

  //updates the score in the local storage if the score is higher
  useEffect(() => {
    const maxScoreInLocalStorage = window.localStorage.getItem("MAX_SCORE")
    if (!maxScoreInLocalStorage) {
      window.localStorage.setItem("MAX_SCORE", JSON.stringify(score))
      return
    }
    parseInt(maxScoreInLocalStorage) < score && setMaxScore(score)
  }, [score, makeShot])

  const value: ContextState = {
    time,
    score,
    playing,
    maxScore,
    randomCity,
    randomCity2,
    makeGuess,
    setTime,
  }

  return (
    <Context.Provider value={value}>
      <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
      {children}
    </Context.Provider>
  )
}

export const useGame = (): ContextState => useContext(Context)
export default GameContextProvider
