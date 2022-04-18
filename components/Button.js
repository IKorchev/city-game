import React from "react"

const Button = ({ variant, ...props }) => {
  const danger = "bg-rose-400"
  const success = "bg-emerald-400"

  return (
    <button
      className={`${
        variant === "danger" ? danger : success
      } flex flex-grow justify-center rounded-md py-2 px-1 font-semibold`}
      {...props}>
      {props.children}
    </button>
  )
}

export default Button
