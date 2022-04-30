import React from "react"
import { motion, AnimatePresence } from "framer-motion"
type Props = {
  shown: boolean
  children: React.ReactNode
}

const Title = ({ children }: { children: React.ReactChild }) => {
  return <h1 className='mt-4 text-center text-4xl '>{children}</h1>
}
const Content = ({ children }: { children: React.ReactNode }) => {
  return <div className='mt-5 w-full text-center'>{children}</div>
}

const Modal = ({ shown, children }: Props) => {
  return (
    <AnimatePresence>
      {shown && (
        <motion.div
          exit={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          className='fixed inset-0 z-30 flex items-center justify-center bg-black/40'>
          <motion.div
            className='relative z-40 w-96 rounded-xl bg-gray-900 p-5  text-gray-100 '
            exit={{ y: 50 }}
            animate={{ y: 0 }}
            initial={{ y: 50 }}
            transition={{ duration: 0.2 }}>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

Modal.Title = Title
Modal.Content = Content
export default Modal
