import Button from "./Button"
import { useGame } from "../context/GameContextProvider"

const Guess = () => {
  const { randomCity, randomCity2, makeGuess } = useGame()

  const handleGuessMore = () => {
    if (!randomCity || !randomCity2) return
    const population1 = randomCity.fields.population
    const population2 = randomCity2.fields.population
    makeGuess(population1 <= population2)
  }

  const handleGuessLess = () => {
    if (!randomCity || !randomCity2) return
    const population1 = randomCity.fields.population
    const population2 = randomCity2.fields.population
    makeGuess(population1 >= population2)
  }

  return (
    <div className='flex w-full flex-col space-y-4 text-xl'>
      <h3 className='text-3xl text-white'>Population</h3>
      <div className='flex w-full items-center justify-evenly px-12 '>
        <Button onClick={handleGuessMore}>More &uarr;</Button>
        <span className='mx-5 font-semibold text-white'>or</span>
        <Button variant='danger' onClick={handleGuessLess}>
          Less &darr;
        </Button>
      </div>
    </div>
  )
}

export default Guess
