import Guess from "./Guess"
import { motion } from "framer-motion"

type CityProps = {
  cityName: string
  countryCode: string
  population: number
  showPopulation?: boolean
}

const baseUrl: string = "https://countryflagsapi.com/png/"

const City = ({ cityName, countryCode, population, showPopulation = true }: CityProps) => {
  const imageUrl = baseUrl + countryCode.toLowerCase()
  const isFirstCity = showPopulation
  return (
    <motion.div
      variants={{
        initial: {
          y: isFirstCity ? `calc(100% + 6rem)` : "20%",
          opacity: isFirstCity ? 1 : 0,
        },
        rest: {
          y: 0,
          opacity: 1,
          transition: {
            type: "tween",
            duration: 0.5,
            ease: "easeInOut",
            delay: isFirstCity ? 0 : 0.2,
          },
        },
        exit: {
          opacity: 0,
        },
      }}
      initial='initial'
      animate='rest'
      exit='exit'
      style={{
        backgroundImage: `
        linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.7)),
        url(${imageUrl})
        `,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        backgroundPosition: "center",
      }}
      className='flex min-h-[15rem] min-w-[30rem] flex-col items-center justify-center space-y-2 rounded-2xl px-5 text-center shadow-xl  lg:h-[20rem] lg:w-[40rem] '>
      <h1 className='text-4xl font-semibold text-white'>
        {cityName}, {countryCode}
      </h1>

      {showPopulation ? (
        <div className='text-white'>
          <h2 className='text-3xl'>Population</h2>
          <span className='text-2xl'>{population.toLocaleString()}</span>
        </div>
      ) : (
        <Guess />
      )}
    </motion.div>
  )
}

export default City
