import { useEffect, useLayoutEffect, useState } from "react"

const useScore = (score: number) => {
  const [maxScore, setMaxScore] = useState<number>(0)
  
  useLayoutEffect(() => {
    const maxScoreJSON = window.localStorage.getItem("MAX_SCORE")
    maxScoreJSON ? setMaxScore(JSON.parse(maxScoreJSON)) : setMaxScore(0)
  }, [])

  //updates the score in the local storage if the score is higher
  useEffect(() => {
    const maxScoreInLocalStorage = window.localStorage.getItem("MAX_SCORE")
    if (!maxScoreInLocalStorage) {
      window.localStorage.setItem("MAX_SCORE", JSON.stringify(score))
      return
    }
    parseInt(maxScoreInLocalStorage) < score && setMaxScore(score)
  }, [score])

  return {
    score,
    maxScore,
  }
}

export default useScore
