import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string | undefined;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // a_name 쿠키가 있는지 확인
  res.status(200).json({ name: req.cookies.a_name });
}
