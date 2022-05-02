// eslint-disable-next-line @next/next/no-server-import-in-page
import type { NextApiRequest, NextApiResponse } from "next"
import fs from "fs"

type Body = {
  name: string
  score: number
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const file = fs.readFileSync("./pages/api/leaderboard.json", "utf8")
    const data = JSON.parse(file)
    const sortedData = data.sort((a: any, b: any) => (a.score > b.score ? -1 : 1))
    res.json(sortedData)
  }

  if (req.method === "POST") {

    const body: Body = JSON.parse(req.body)
    const file = fs.readFileSync("./pages/api/leaderboard.json", "utf8")
    const data = JSON.parse(file)
    
    data.push(body)
    fs.writeFileSync("./pages/api/leaderboard.json", JSON.stringify(data))
    res.json(data)
  }
}
