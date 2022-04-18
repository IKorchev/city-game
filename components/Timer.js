import { useEffect } from "react"
import { useGame } from "../context/GameContextProvider"
import { AnimatePresence, motion } from "framer-motion"
const Timer = () => {
  const { time, setTime, playing, makeGuess } = useGame()
  useEffect(() => {
    let timer
    if (playing) {
      timer = setInterval(() => {
        if (time > 0) {
          setTime((time) => time - 1)
        }
        if (time === 1) {
          makeGuess(null)
        }
      }, 1000)
    }
    return () => clearInterval(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time, playing])

  return (
    <motion.div className='flex items-center space-x-3 text-lg font-semibold'>
      <span>Time: </span>
      <AnimatePresence exitBeforeEnter>
        <motion.h1
          className='text-3xl text-red-300'
          key={time}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}>
          {time}
        </motion.h1>
      </AnimatePresence>
    </motion.div>
  )
}

export default Timer
