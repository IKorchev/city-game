import Head from "next/head"
import Link from "next/link"
import React, { useEffect, useState } from "react"

type LeaderboardType = {
  name: string
  score: number
}

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardType[] | []>([])

  useEffect(() => {
    async function getLeaderboard(): Promise<void> {
      const response = await fetch("/api/leaderboard")
      const data: LeaderboardType[] = await response.json()
      setLeaderboard(data)
    }
    getLeaderboard()
  }, [])

  return (
    <>
      <Head>
        <title>Leaderboard</title>
        <meta title='description' content='Leaderboard' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <meta name='title' content='Leaderboard' />
      </Head>
      <div className='h-screen bg-gray-800 px-12 py-4 text-white'>
        <Link href='/'>Go back</Link>
        <h1 className='py-5 text-center text-4xl'>Leaderboard</h1>
        <ul className='mx-auto  mt-12 w-96'>
          {leaderboard.map((el: any, i) => {
            return (
              <li key={i} className='flex w-full justify-between border-b border-gray-600 py-2 text-2xl'>
                <span>{el.name} </span> <span> {el.score}</span>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}

export default Leaderboard
