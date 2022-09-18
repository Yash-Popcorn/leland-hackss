// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import Redis from 'ioredis';

const redis = new Redis(9001);

export default async function handler(req: NextApiRequest, res: NextApiResponse<{ error: string } | { email: string }>) {
  if (req.method !== 'GET') {
    return res.status(400).json({ error: 'Method not allowed' });
  }

  const { id } = req.body;

  const match = await redis.hget(`rid:${id}`, 'id');
  if (!match) {
    res.status(500).json({ error: 'Session ID is invalid, try logging in again' });
  }

  const existing = await redis.hget(`user:${match}`, 'users');
  if (existing) {
    return res.json({
      email: match!,
    });
  } else {
    res.status(500).json({
      error: 'Session ID points to nonexistent user',
    });
  }
}
