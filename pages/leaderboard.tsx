import Link from "next/link"
import React, { useEffect, useState } from "react"

type Props = {}

function Leaderboard({}: Props) {
  const [leaderboard, setLeaderboard] = useState([])

  useEffect(() => {
    const getLeaderboard = async () => {
      const response = await fetch("/api/leaderboard")
      const data = await response.json()
      setLeaderboard(data)
      console.log(data)
    }
    getLeaderboard()
  }, [])

  return (
    <div className='h-screen bg-gray-800 px-12 py-4 text-white'>
      <Link href='/'>Go back</Link>
      <h1 className='py-5 text-center text-4xl'>Leaderboard</h1>
      <ul className=''>
        {leaderboard.map((el: any, i) => {
          return (
            <li key={i} className=' text-2xl'>
              {el.name} - {el.score}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Leaderboard
