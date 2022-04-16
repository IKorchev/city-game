import { useEffect } from "react"

const Timer = ({ isRunning, time, setTime, makeGuess }) => {
  useEffect(() => {
    let timer
    if (isRunning) {
      timer = setInterval(() => {
        if (time > 0) {
          setTime((time) => time - 1)
        } else {
          makeGuess(null)
        }
      }, 1000)
    }
    return () => clearInterval(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time, isRunning])

  return <div>Time: {time}</div>
}

export default Timer
