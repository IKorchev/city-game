import {} from "framer-motion"
import { useState, useEffect, useContext, createContext } from "react"
const Context = createContext()
import cities from "../cities.json"

const generateRandomNumber = (min, max) => Math.floor(Math.random() * (max - min) + min)
const TIME_PER_GUESS = 15

const GameContextProvider = ({ children }) => {
  const max = cities.length
  const randomNumber = generateRandomNumber(0, max)
  const randomNumber2 = generateRandomNumber(0, max)
  const [score, setScore] = useState(0)
  const [time, setTime] = useState(TIME_PER_GUESS)
  const [playing, setPlaying] = useState(false)
  const [maxScore, setMaxScore] = useState(null)
  const [randomCity, setRandomCity] = useState(cities[randomNumber])
  const [randomCity2, setRandomCity2] = useState(cities[randomNumber2])
  const resetTimer = () => {
    setTime(TIME_PER_GUESS)
  }

  const resetGame = () => {
    const randomNum1 = generateRandomNumber(0, max)
    const randomNum2 = generateRandomNumber(0, max)
    confirm(`Game over! Your score was: ${score} !\n Play again?`)
    setScore(0)
    resetTimer()
    setRandomCity(cities[randomNum1])
    setRandomCity2(cities[randomNum2])
    setPlaying(false)
  }
  //get the initial local storage
  useEffect(() => {
    const maxScore = window.localStorage.getItem("MAX_SCORE")
    if (maxScore) {
      setMaxScore(maxScore)
    } else {
      setMaxScore(0)
    }
  }, [])

  const handleCorrectGuess = () => {
    setScore((score) => score + 1)
    setRandomCity(randomCity2)
    setRandomCity2(cities[generateRandomNumber(0, max)])
    resetTimer()
  }

  const handleUpdateLocalStorage = () => {
    const currentScore = window.localStorage.getItem("MAX_SCORE")
    if (currentScore === null || currentScore > score) return
    window.localStorage.setItem("MAX_SCORE", score)
    setMaxScore(score)
  }

  const makeGuess = (guess) => {
    if (!playing) setPlaying(true)
    if (!guess) {
      return resetGame()
    }
    handleUpdateLocalStorage()
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
  }

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export const useGame = () => useContext(Context)
export default GameContextProvider
