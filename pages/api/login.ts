// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Redis } from 'ioredis';

type Data = {
  name: string
}

const redis = new Redis();

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  
}
