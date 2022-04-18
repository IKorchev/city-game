import Guess from "./Guess"
import { motion } from "framer-motion"

const baseUrl = "https://countryflagsapi.com/png/"
const City = ({ cityName, countryCode, population, showPopulation = true }) => {
  const imageUrl = baseUrl + countryCode.toLowerCase()

  return (
    <motion.div
      layout
      variants={{
        mount: { x: "100%" },
        rest: { x: 0 },
        exit: { x: "-100%" },
      }}
      initial='mount'
      animate='rest'
      transition={{
        type: "spring",
        damping: 20,
        stiffness: 300,
      }}
      style={{
        backgroundImage: `
        linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.7)),
        url(${imageUrl})
        `,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        backgroundPosition: "center",
      }}
      className='flex h-[20rem] w-full flex-col items-center justify-center space-y-2    px-5 text-center '>
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
