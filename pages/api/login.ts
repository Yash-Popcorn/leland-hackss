import type { NextApiRequest, NextApiResponse } from 'next'
import Redis from 'ioredis';

type Data = {
  name: string
}

const redis = new Redis(9001);

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  
}
