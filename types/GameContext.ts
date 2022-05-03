import { ICity } from "./City"

export type GameContext = {
  time: number
  score: number
  playing: boolean
  maxScore: number
  randomCity: ICity | null
  randomCity2: ICity | null
  makeGuess: (guess: boolean) => void
  setTime: React.Dispatch<React.SetStateAction<number>>
  handleClose: () => void
  shown: boolean
  scoreWasUpdated: boolean
}
