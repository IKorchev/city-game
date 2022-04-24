import React from "react"

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  variant?: "success" | "danger"
}

const Button = ({ variant, ...props }: ButtonProps) => {
  const danger = "bg-rose-400"
  const success = "bg-emerald-400"

  return (
    <button
      className={`${
        variant === "danger" ? danger : success
      } flex max-w-[10rem] flex-grow justify-center rounded-md py-2 px-1 font-semibold`}
      {...props}>
      {props.children}
    </button>
  )
}

export default Button
