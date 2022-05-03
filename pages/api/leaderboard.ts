import type { NextApiRequest, NextApiResponse } from "next"
import { supabase } from "../../utils/supabaseClient"
interface IData {
  id: number
  created_at: Date
  name: string
  score: number
}
interface IBody {
  name: string
  score: number
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { data, error }: { data: IData[] | null; error: any } = await supabase
      .from("leaderboard")
      .select("*")
      .order("score", { ascending: false })

    res.status(error ? 500 : 200).json(data ?? error)
  }
  if (req.method === "POST") {
    const body: IBody = JSON.parse(req.body)

    const { data, error } = await supabase.from("leaderboard").insert([body])

    res.status(error ? 500 : 200).json(data ?? error)
  }
}
