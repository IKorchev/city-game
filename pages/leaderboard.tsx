import Head from "next/head"
import Link from "next/link"
import React, { useEffect, useState } from "react"
type LeaderboardType = {
  id: number
  name: string
  score: number
  created_at: Date
}

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardType[] | []>([])

  useEffect(() => {
    async function getLeaderboard(): Promise<void> {
      const response = await fetch("/api/leaderboard")
      const data: LeaderboardType[] = await response.json()
      console.log(data)
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
      <div className='min-h-screen bg-gray-800 px-12 py-4 text-white'>
        <Link href='/'>Go back</Link>
        <h1 className='py-5 text-center text-4xl'>Leaderboard</h1>
        <table cellPadding={5} className='mx-auto mt-12 w-full max-w-3xl border-collapse text-left text-lg'>
          <thead className='bg-gray-900 '>
            <tr className=''>
              <th className='border border-gray-600 px-4 py-3'>Place</th>
              <th className='border border-gray-600 px-4 py-3'>Name</th>
              <th className='border border-gray-600 px-4 py-3'>Score</th>
              <th className='border border-gray-600 px-4 py-3'>Created at</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((leader, i) => {
              const createdAt = new Date(leader.created_at).toLocaleString()
              return (
                <tr className='' key={leader.id}>
                  <td className='border border-gray-600 px-4 py-3'>{i + 1}</td>
                  <td className='border border-gray-600 px-4 py-3'>{leader.name}</td>
                  <td className='border border-gray-600 px-4 py-3'>{leader.score}</td>
                  <td className='border border-gray-600 px-4 py-3'>{createdAt}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Leaderboard
