import React, { createContext, useState } from "react"
import Modal from "../components/Modal"
import Button from "../components/Button"
import { useGame } from "./GameContextProvider"

const Context = createContext(null)
type Props = { children: React.ReactNode }

const ModalContext = (props: Props) => {
  const { scoreWasUpdated, shown, score, maxScore, randomCity, randomCity2, handleClose } = useGame()

  const getAnswer = () => {
    if (randomCity && randomCity2) {
      return randomCity2?.fields.population >= randomCity?.fields.population ? randomCity2 : randomCity
    }
  }
  const LESS = getAnswer() === randomCity

  return (
    <Context.Provider value={null}>
      <Modal shown={shown}>
        <button
          onClick={handleClose}
          className='absolute top-0 right-2 ml-auto px-2 py-1 text-4xl leading-none'>
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
          <div className='flex justify-center py-3'>
            <Button onClick={handleClose}>Play again</Button>
          </div>
        </Modal.Content>
      </Modal>

      {props.children}
    </Context.Provider>
  )
}

export default ModalContext
