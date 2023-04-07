import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // Max-Age: 0초 (0 이면 즉시 쿠키가 소멸됨)
  res.setHeader('Set-Cookie', 'a_name=Mike;Max-Age=0;HttpOnly,Secure');
  res.status(200).json({ message: 'ok' });
}
