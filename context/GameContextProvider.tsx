import cities from "../cities.json"
import React, { useState, useContext, createContext, useCallback, useRef } from "react"
import { GameContextState } from "./GameContext.types"
import { generateRandomNumber, canvasStyles } from "../utils/index"
import { City } from "../components/City.types"
import ReactCanvasConfetti from "react-canvas-confetti"
import useScore from "../hooks/use-score"
import useUpdateLocalStorage from "../hooks/use-update-ls"

const Context = createContext({} as GameContextState)

const TIME_PER_GUESS: number = 15
const MAX = cities.length

const GameContextProvider = ({ children }: { children: React.ReactNode }) => {
  const refAnimationInstance = useRef<any>(null)
  const randomNumber = generateRandomNumber(0, MAX)
  const randomNumber2 = generateRandomNumber(0, MAX)
  const [score, setScore] = useState<number>(0)
  const [time, setTime] = useState<number>(TIME_PER_GUESS)
  const [playing, setPlaying] = useState<boolean>(false)
  const [randomCity, setRandomCity] = useState<City | null>(cities[randomNumber])
  const [randomCity2, setRandomCity2] = useState<City | null>(cities[randomNumber2])
  const { maxScore } = useScore(score)
  const scoreWasUpdated = useUpdateLocalStorage(score)

  function resetGame() {
    if (scoreWasUpdated) {
      refAnimationInstance.current({
        spread: 150,
        particleCount: Math.floor(500 * 0.5),
      })
    }
    setPlaying(false)
    setScore(0)
    setTime(TIME_PER_GUESS)
    setRandomCity(cities[generateRandomNumber(0, MAX)])
    setRandomCity2(cities[generateRandomNumber(0, MAX)])
  }

  function handleCorrectGuess() {
    setScore(score + 1)
    setRandomCity(randomCity2)
    setRandomCity2(cities[generateRandomNumber(0, MAX)])
    setTime(TIME_PER_GUESS)
  }

  function makeGuess(guess: boolean) {
    if (!playing) setPlaying(true)
    if (!guess) return resetGame()
    handleCorrectGuess()
  }

  const value: GameContextState = {
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
      <ReactCanvasConfetti
        refConfetti={(instance) => (refAnimationInstance.current = instance)}
        style={canvasStyles}
      />
      {children}
    </Context.Provider>
  )
}

export const useGame = (): GameContextState => useContext(Context)
export default GameContextProvider
