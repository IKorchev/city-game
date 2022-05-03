import cities from "../cities.json"
import React, { useState, useContext, createContext, useRef } from "react"
import { generateRandomNumber, canvasStyles } from "../utils/index"
import ReactCanvasConfetti from "react-canvas-confetti"
import useScore from "../hooks/use-score"
import useUpdateLocalStorage from "../hooks/use-update-ls"
import { GameContext, ICity } from "../types"

const Context = createContext({} as GameContext)

const TIME_PER_GUESS: number = 15
const MAX = cities.length

const GameContextProvider = ({ children }: { children: React.ReactNode }) => {
  const refAnimationInstance = useRef<any>(null)
  const [score, setScore] = useState<number>(0)
  const [time, setTime] = useState<number>(TIME_PER_GUESS)
  const [playing, setPlaying] = useState<boolean>(false)
  const [randomCity, setRandomCity] = useState<ICity | null>(cities[generateRandomNumber(0, MAX)])
  const [randomCity2, setRandomCity2] = useState<ICity | null>(cities[generateRandomNumber(0, MAX)])
  const { maxScore } = useScore(score)
  const scoreWasUpdated = useUpdateLocalStorage(score)
  const [shown, setShown] = useState<boolean>(false)

  const handleClose = () => {
    setScore(0)
    setShown(false)
    setRandomCity(cities[generateRandomNumber(0, MAX)])
    setRandomCity2(cities[generateRandomNumber(0, MAX)])
    setPlaying(false)
    setTime(TIME_PER_GUESS)
  }
  const handleOpen = () => setShown(true)

  function resetGame() {
    handleOpen()
    if (scoreWasUpdated) {
      refAnimationInstance.current({
        spread: 150,
        particleCount: Math.floor(500 * 0.5),
      })
    }
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

  const value = {
    time,
    score,
    playing,
    maxScore,
    randomCity,
    randomCity2,
    makeGuess,
    setTime,
    handleClose,
    shown,
    scoreWasUpdated,
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

export const useGame = () => useContext(Context)
export default GameContextProvider
