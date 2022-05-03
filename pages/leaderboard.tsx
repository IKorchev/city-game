import Head from "next/head"
import React, { Suspense, useEffect, useState } from "react"
import Table from "../components/Table"
import { Leaderboard } from "../types/Leaderboard"

async function getLeaderboard(): Promise<Leaderboard[]> {
  const response = await fetch("/api/leaderboard")
  const data: Leaderboard[] = await response.json()
  return data
}

function wrapPromise(promise: Promise<Leaderboard[]>) {
  let status = "pending"
  let result: any
  let suspender = promise.then(
    (r) => {
      status = "success"
      result = r
    },
    (e) => {
      status = "error"
      result = e
    }
  )
  return {
    read() {
      if (status === "pending") {
        throw suspender
      } else if (status === "error") {
        throw result
      } else if (status === "success") {
        return result
      }
    },
  }
}

function fetchLeaderboard() {
  const promise = getLeaderboard()
  return wrapPromise(promise)
}

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<Leaderboard[] | []>([])
  const data = fetchLeaderboard()
  return (
    <>
      <Head>
        <title>Leaderboard</title>
        <meta title='description' content='Leaderboard' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <meta name='title' content='Leaderboard' />
      </Head>
      <div className='min-h-screen bg-gray-800 px-12 py-4 text-white'>
        <h1 className='py-5 text-center text-4xl'>Leaderboard</h1>
        <Suspense fallback='Loading'>
          <Table leaderboard={data} />
        </Suspense>
      </div>
    </>
  )
}

export default Leaderboard
