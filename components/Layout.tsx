import Link from "next/link"
import { useRouter } from "next/router"
import React, { useEffect } from "react"

type Props = {
  children: React.ReactNode
}

const Layout = (props: Props) => {
  const router = useRouter()

  return (
    <div className='space-y-5 bg-gray-800'>
      <nav className='flex justify-end border-b border-gray-500 bg-gray-900 px-12 py-2 text-gray-50'>
        <ul>
          <li className='p-3 text-lg'>
            <Link href={router.pathname === "/" ? "/leaderboard" : "/"}>
              <a className='p-3'>{router.pathname === "/" ? "Leaderboard" : "Go back"}</a>
            </Link>
          </li>
        </ul>
      </nav>
      {props.children}
      <footer className='bg-gray-900 py-5 px-12 text-gray-400'>
        <a href='https://ikorchev.com' rel='noreferrer noopener' target='_blank'>
          ikorchev.com
        </a>
      </footer>
    </div>
  )
}

export default Layout
