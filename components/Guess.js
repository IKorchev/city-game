
const Guess = ({ makeGuess, city1, city2 }) => {
  const population1 = city1.fields.population
  const population2 = city2.fields.population
  const handleGuess = (guess) => {
    makeGuess(guess)
  }
  return (
    <div className='flex flex-col space-y-3 px-12 py-12 text-xl'>
      <button
        className='bg-emerald-400 py-4'
        onClick={() => handleGuess(population1 <= population2)}>
        Guess more
      </button>
      <button
        className='bg-rose-400 py-4 '
        onClick={() => handleGuess(population1 >= population2)}>
        Guess lower
      </button>
    </div>
  )
}

export default Guess
