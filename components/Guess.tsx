import Button from "./Button"
import { useGame } from "../context/GameContextProvider"
import { City } from "./City.types"

interface Game {
  randomCity: City
  randomCity2: City
  makeGuess: (guess: boolean) => void
}

const Guess = () => {
  const { randomCity, randomCity2, makeGuess }: Game = useGame()
  const population1 = randomCity?.fields.population
  const population2 = randomCity2.fields.population

  return (
    <div className='flex w-full flex-col space-y-4 text-xl'>
      <h3 className='text-3xl text-white'>Population</h3>
      <div className='flex w-full items-center justify-evenly px-12 '>
        <Button onClick={() => makeGuess(population1 <= population2)}>More &uarr;</Button>
        <span className='mx-5 font-semibold text-white'>or</span>
        <Button variant='danger' onClick={() => makeGuess(population1 >= population2)}>
          Less &darr;
        </Button>
      </div>
    </div>
  )
}

export default Guess
