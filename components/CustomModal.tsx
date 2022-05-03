import { useEffect, useRef, useState } from "react"
import { useGame } from "../context/GameContextProvider"
import Button from "./Button"
import Modal from "./Modal"

const CustomModal = () => {
  const { scoreWasUpdated, shown, score, maxScore, randomCity, randomCity2, handleClose } = useGame()
  const [error, setError] = useState<{
    message: string
  } | null>(null)
  const btnRef = useRef<HTMLButtonElement>(null)

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    const target = e.target as typeof e.target & {
      name: { value: string }
    }

    const name = target.name.value
    if (name.length <= 3) {
      setError({ message: "Name must be at least 4 characters" })
    }

    if (name.length > 3 && score) {
      const obj = {
        name: name,
        score: score,
      }
      const data = await fetch("/api/leaderboard", {
        method: "POST",
        body: JSON.stringify(obj),
      })
      if (data.ok) {
        handleClose()
        setError(null)
      }
      if (!data.ok) {
        setError({ message: "Something went wrong" })
      }
      setError(null)
      target.name.value = ""
    }
  }
  const getAnswer = () => {
    if (randomCity && randomCity2) {
      return randomCity2?.fields.population >= randomCity?.fields.population ? randomCity2 : randomCity
    }
  }
  const LESS = getAnswer() === randomCity

  useEffect(() => {
    btnRef.current && shown && btnRef.current.focus()
  }, [shown])

  return (
    <Modal handleClose={handleClose} shown={shown}>
      <button
        ref={btnRef}
        type='button'
        onClick={handleClose}
        className='absolute top-0 right-2 ml-auto rounded-lg px-2 py-0 text-4xl ring-white focus:ring'>
        &times;
      </button>
      <Modal.Title>Game over</Modal.Title>
      <Modal.Content>
        {scoreWasUpdated && <span className=' text-xl'>Congratulations you beat your record!</span>}
        <p className=''>{`Your streak was ${score}`}</p>
        <p>{`Your max streak is ${maxScore}`}</p>
        <p>
          The correct answer was
          <span className={`${LESS ? "text-red-300" : " text-emerald-300"}`}>
            {`${LESS ? " Less" : " More"}`}
          </span>
        </p>
        <p className='mb-3'>{`${
          randomCity2?.fields.name
        } has a population of ${randomCity2?.fields.population.toLocaleString("en-UK")} .`}</p>
        {score > 1 && (
          <form className='flex flex-col px-5' onSubmit={handleSubmit}>
            <input
              type='text'
              name='name'
              id='name'
              className='rounded-md p-1 text-lg text-gray-600'
              placeholder='Enter your name'
            />
            <div className='flex justify-center py-2 text-left'>
              <label className='sr-only ml-3 text-lg' htmlFor='submit_form'>
                Save to leaderboard ?
              </label>
              <input
                type='submit'
                value='Save to leaderboard'
                id='submit_form'
                className='bg-gray-100 px-3 py-1 text-black'
              />
            </div>
            {error && (
              <div className='text-red-300'>
                <p>{error.message}</p>
              </div>
            )}
          </form>
        )}
        <div className='flex justify-center py-3'>
          <Button onClick={handleClose}>Play again</Button>
        </div>
      </Modal.Content>
    </Modal>
  )
}

export default CustomModal
