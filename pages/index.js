import Head from "next/head"
import { useState } from "react"
import { useEffect } from "react"
import City from "../components/City"
import Guess from "../components/Guess"
import Timer from "../components/Timer"
import cities from "../cities.json"

const generateRandomNumber = (min, max) => Math.floor(Math.random() * (max - min) + min)
const TIME_PER_GUESS = 15

export default function Home() {
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
      alert(
        `Wrong guess! The population of ${
          randomCity2.fields.name
        } is ${randomCity2.fields.population.toLocaleString()}`
      )
      return resetGame()
    }

    handleCorrectGuess()
    handleUpdateLocalStorage()
  }

  return (
    <div className='h-screen bg-gray-800'>
      <Head>
        <title>Countries</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <header className='space-y-4 border-b text-white'>
        <h1 className='py-5 text-center text-3xl'>Guess the population</h1>
        <div className='flex justify-evenly py-2'>
          <h2>Score: {score}</h2>
          <Timer isRunning={playing} time={time} setTime={setTime} makeGuess={makeGuess} />
          <h3>Max Streak: {maxScore}</h3>
        </div>
      </header>
      <main className='mx-auto flex  flex-col divide-y-2  text-5xl md:flex-row md:divide-x-2 md:divide-y-0'>
        <div className='w-full py-5 '>
          <City
            cityName={randomCity.fields.name}
            countryCode={randomCity.fields.country_code}
            population={randomCity.fields.population}
          />
        </div>
        <div className='w-full '>
          <City
            cityName={randomCity2.fields.name}
            countryCode={randomCity2.fields.country_code}
            population={randomCity2.fields.population}
            showPopulation={false}
          />
          <Guess makeGuess={makeGuess} city1={randomCity} city2={randomCity2} />
        </div>
      </main>
    </div>
  )
}
