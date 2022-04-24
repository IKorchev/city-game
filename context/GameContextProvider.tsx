import cities from "../cities.json"
import React, { useState, useEffect, useContext, createContext } from "react"
import { generateRandomNumber } from "../utils/index"

interface ContextState {
  time: number,
  score: number,
  playing: boolean,
  maxScore: number,
  randomCity: any,
  randomCity2: any,
  makeGuess: (guess: boolean) => void,
  setTime: (time: number) => void,
}

const Context = createContext({} as ContextState)

const TIME_PER_GUESS:number = 15

const GameContextProvider = ({ children }: {children: any}) => {
  const max = cities.length
  const randomNumber = generateRandomNumber(0, max)
  const randomNumber2 = generateRandomNumber(0, max)
  const [score, setScore] = useState<number>(0)
  const [time, setTime] = useState(TIME_PER_GUESS)
  const [playing, setPlaying] = useState(false)
  const [maxScore, setMaxScore] = useState<number>(0)
  const [randomCity, setRandomCity] = useState(cities[randomNumber])
  const [randomCity2, setRandomCity2] = useState(cities[randomNumber2])

  const resetTimer = () => {
    setTime(TIME_PER_GUESS)
  }

  const resetGame = () => {
    const randomNum1 = generateRandomNumber(0, max)
    const randomNum2 = generateRandomNumber(0, max)
    confirm(`Game over! Your score was: ${score} !\n Play again?`) //TODO: Show modal
    //reset the score
    setScore(0)
    //reset the timer
    resetTimer()
    //reset the random cities
    setRandomCity(cities[randomNum1])
    setRandomCity2(cities[randomNum2])
    //stop the game
    setPlaying(false)
  }

  useEffect(() => {
    const maxScoreJSON = window.localStorage.getItem("MAX_SCORE")

    if (maxScoreJSON) {
      console.log(maxScoreJSON);
      const maxScore = JSON.parse(maxScoreJSON)
      console.log(maxScore);
      setMaxScore(maxScore)
    } else {
      setMaxScore(0)
    }
  }, [])

  const handleCorrectGuess = () => {
    //update the score
    setScore((score) => score + 1)
    //swap the cities
    setRandomCity(randomCity2)
    //generate a new random city
    setRandomCity2(cities[generateRandomNumber(0, max)])
    //reset the timer
    resetTimer()
  }

  //updates the score in the local storage
  const handleUpdateLocalStorage = () => {
    const currentScore = window.localStorage.getItem("MAX_SCORE")

    if (!currentScore) return

    window.localStorage.setItem("MAX_SCORE", JSON.stringify(score))
    setMaxScore(score)
  }

  const makeGuess = (guess: boolean) => {
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
