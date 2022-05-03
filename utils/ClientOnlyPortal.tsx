import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"

export default function ClientOnlyPortal({ children, selector }: any) {
  const ref = useRef<any>()
  const [mount, setMount] = useState<boolean>(false)

  useEffect(() => {
    ref.current = document.querySelector(selector)
    setMount(true)
  }, [selector])

  return mount ? createPortal(children, ref.current) : null
}
