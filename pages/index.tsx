import Head from "next/head"
import { useGame } from "../context/GameContextProvider"
import City from "../components/City"
import Timer from "../components/Timer"
import { AnimatePresence, motion } from "framer-motion"
import Link from "next/link"

export default function Home() {
  const { score, maxScore, randomCity, randomCity2 } = useGame()

  return (
    <div className='h-screen overflow-y-scroll bg-gray-800'>
      <Head>
        <title>Countries</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <nav className='bg-gray-900 text-gray-50'>
        <ul>
          <li className='p-3 text-lg'>
            <Link href='/leaderboard'>Leaderboard</Link>
          </li>
        </ul>
      </nav>
      <header className='space-y-4 border-b text-2xl text-white'>
        <h1 className='py-5 text-center text-5xl'>Guess the population</h1>
        <div className='flex justify-evenly py-2'>
          <span>Score: {score}</span>
          <Timer />
          <span>Max Streak: {maxScore}</span>
        </div>
      </header>
      <motion.main className='mx-auto flex max-w-2xl flex-col items-center space-y-5 overflow-hidden py-5  text-5xl '>
        {randomCity && (
          <City
            key={randomCity.fields.country_code}
            cityName={randomCity.fields.name}
            countryCode={randomCity.fields.country_code}
            population={randomCity.fields.population}
          />
        )}
        <h2 className='sr-only'>Versus</h2>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='mx-auto h-12 w-12 text-white '
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth={3}>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4'
          />
        </svg>
        <AnimatePresence>
          {randomCity2 && (
            <City
              key={randomCity2.fields.country_code}
              cityName={randomCity2.fields.name}
              countryCode={randomCity2.fields.country_code}
              population={randomCity2.fields.population}
              showPopulation={false}
            />
          )}
        </AnimatePresence>
      </motion.main>
    </div>
  )
}
