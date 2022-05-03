import React, { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import Button from "../components/Button"
import { useGame } from "../context/GameContextProvider"
import { motion, AnimatePresence } from "framer-motion"
import ClientOnlyPortal from "../utils/ClientOnlyPortal"

type Props = {
  shown: boolean
  children: React.ReactNode
  handleClose: () => void
}

const Title = ({ children }: { children: React.ReactChild }) => {
  return <h1 className='mt-4 text-center text-4xl '>{children}</h1>
}
const Content = ({ children }: { children: React.ReactNode }) => {
  return <div className='mt-5 w-full text-center'>{children}</div>
}

const Modal = ({ shown, children }: Props) => {
  return (
    <ClientOnlyPortal selector='#modal'>
      <AnimatePresence>
        {shown && (
          <motion.div
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            className='fixed inset-0 z-30 flex items-center justify-center bg-black/40'>
            <motion.div
              className='relative z-40 flex w-96 flex-col justify-evenly rounded-xl bg-gray-900 p-5 text-gray-100  lg:min-h-[24rem] lg:w-[30rem] '
              exit={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              initial={{ y: 100, opacity: 0 }}
              transition={{ duration: 0.2 }}>
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ClientOnlyPortal>
  )
}

Modal.Title = Title
Modal.Content = Content
export default Modal
