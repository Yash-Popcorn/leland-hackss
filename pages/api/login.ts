// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import Redis from 'ioredis';
import { setCookie } from 'cookies-next';
import { randomUUID } from 'crypto';

const redis = new Redis(9001);

export default async function handler(req: NextApiRequest, res: NextApiResponse<{ error?: string }>) {
  if (req.method !== 'POST') {
    return res.status(400).json({ error: 'Method not allowed' });
  }

  const { email, password } = req.body;

  const existing = await redis.hget(`user:${email}`, 'users');
  if (existing === password) {
    const id = randomUUID();
    await redis.hset(`rid:${id}`, 'id', email);
    setCookie('rid', id, { req, res });
    return res.send({});
  } else {
    return res.status(500).json({ error: 'Password or Username is not valid' });
  }
}
