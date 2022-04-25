import cities from "../cities.json"
import React, { useState, useContext, createContext, useLayoutEffect, useEffect } from "react"
import { generateRandomNumber } from "../utils/index"

import { City } from "../components/City.types"

export interface ContextState {
  time: number
  score: number
  playing: boolean
  maxScore: number
  randomCity: any
  randomCity2: any
  makeGuess: (guess: boolean) => void
  setTime: (time: number) => void
}

const Context = createContext({} as ContextState)

const TIME_PER_GUESS: number = 15
const MAX = cities.length

const GameContextProvider = ({ children }: { children: any }) => {
  const randomNumber = generateRandomNumber(0, MAX)
  const randomNumber2 = generateRandomNumber(0, MAX)
  const [score, setScore] = useState<number>(0)
  const [time, setTime] = useState<number>(TIME_PER_GUESS)
  const [playing, setPlaying] = useState<boolean>(false)
  const [maxScore, setMaxScore] = useState<number>(0)
  const [randomCity, setRandomCity] = useState<City | null>(cities[randomNumber])
  const [randomCity2, setRandomCity2] = useState<City | null>(cities[randomNumber2])

  const resetTimer = () => {
    setTime(TIME_PER_GUESS)
  }

  const resetGame = () => {
    setPlaying(false)
    //reset the score
    setScore(0)
    resetTimer()
    confirm(`Game over! Your score was: ${score} !\n Play again?`) //TODO: Show modal

    //Generate new random cities
    setRandomCity(cities[generateRandomNumber(0, MAX)])
    setRandomCity2(cities[generateRandomNumber(0, MAX)])
  }
  const incrementScore = () => {
    setScore(score + 1)
  }

  //get and set the max score from localStorage
  useLayoutEffect(() => {
    const maxScoreJSON = window.localStorage.getItem("MAX_SCORE")
    if (maxScoreJSON) {
      const maxScore = JSON.parse(maxScoreJSON)
      setMaxScore(maxScore)
    } else {
      setMaxScore(0)
    }
  }, [])

  //updates the score in the local storage if the score is higher
  useEffect(() => {
    const maxScore = window.localStorage.getItem("MAX_SCORE")
    //if there is no max score in the local storage
    if (!maxScore) {
      window.localStorage.setItem("MAX_SCORE", JSON.stringify(score))
      return
    }
    //if the score is higher than the max score in the local storage
    if (parseInt(maxScore) < score) {
      window.localStorage.setItem("MAX_SCORE", JSON.stringify(score))
      setMaxScore(score)
    }
  }, [score])

  const handleCorrectGuess = () => {
    incrementScore()
    setRandomCity(randomCity2)
    setRandomCity2(cities[generateRandomNumber(0, MAX)])
    resetTimer()
  }

  const makeGuess = (guess: boolean) => {
    if (!playing) setPlaying(true)
    //if the timer is 0 or the guess is false/incorrect, the game is over
    if (!guess) {
      resetGame()
      return
    }
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

export const useGame = () => useContext(Context) as ContextState
export default GameContextProvider
