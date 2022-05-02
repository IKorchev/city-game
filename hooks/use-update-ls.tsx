import { useEffect, useState } from "react"

const useUpdateLocalStorage = (score: number) => {
  const [wasScoreUpdated, setWasScoreUpdated] = useState<boolean>(false)

  useEffect(() => {
    const _localStorageScore = window.localStorage.getItem("MAX_SCORE")
    const localStorageScore = _localStorageScore ? parseInt(_localStorageScore) : 0
    if (score > localStorageScore) {
      window.localStorage.setItem("MAX_SCORE", score.toString())
      setWasScoreUpdated(true)
    }
  }, [score])

  return wasScoreUpdated
}

export default useUpdateLocalStorage
