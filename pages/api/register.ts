// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import Redis from 'ioredis';

const redis = new Redis(9001);

export default async function handler(req: NextApiRequest, res: NextApiResponse<{ error?: string }>) {
  if (req.method !== 'POST') {
    return res.status(400).json({ error: 'Method not allowed' });
  }

  const { email, password } = req.body;

  const existing = await redis.hget(`user:${email}`, 'users');
  if (existing) {
    return res.status(500).json({ error: 'User already exists' });
  }
  await redis.hset(`user:${email}`, 'users', password);

  res.send({});
}
