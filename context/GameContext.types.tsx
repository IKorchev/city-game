import { City } from "../components/City.types"

export interface GameContextState {
    time: number
    score: number
    playing: boolean
    maxScore: number
    randomCity: City | null
    randomCity2: City | null
    makeGuess: (guess: boolean) => void
    setTime: (time: number) => void
  }
  