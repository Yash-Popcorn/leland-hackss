// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import Redis from 'ioredis';

const redis = new Redis(9001);

export default async function handler(req: NextApiRequest, res: NextApiResponse<any[] | { error: string }>) {
  if (req.method !== 'GET') {
    return res.status(400).json({ error: 'Method not allowed' });
  }

  const entries = await redis.lrange('entries', 0, -1);
  const entriesData = await Promise.all(entries.map(async (entry) => {
    return await redis.hget('entry:' + entry, 'entry');
  }));
  res.json(entriesData);
}
