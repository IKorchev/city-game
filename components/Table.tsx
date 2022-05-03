import React from "react"
import { Leaderboard } from "../types"

const Table = ({ leaderboard }: { leaderboard: any }) => {
  return (
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
        {leaderboard.read().map((leader: Leaderboard, i: number) => {
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
  )
}

export default Table
