// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import Redis from 'ioredis';
import { getCookie, setCookie } from 'cookies-next';
import { randomUUID } from 'crypto';

const redis = new Redis(9001);

export default async function handler(req: NextApiRequest, res: NextApiResponse<{ error?: string }>) {
  if (req.method !== 'POST') {
    return res.status(400).json({ error: 'Method not allowed' });
  }

  const id = getCookie('rid', { req, res });
  const { location, sport } = req.body;
  const entryId = randomUUID();

  const match = await redis.hget(`rid:${id}`, 'id');
  if (!match) {
    res.status(500).json({ error: 'Session ID is invalid, try logging in again' });
  }

  const existing = await redis.hget(`user:${match}`, 'users');
  if (existing) {
    await redis.lpush('entries', entryId);
    await redis.hset('entry:' + entryId, 'entry', JSON.stringify({
      location,
      sport,
      user: match,
    }));
  } else {
    res.status(500).json({
      error: 'Session ID points to nonexistent user',
    });
  }
}
