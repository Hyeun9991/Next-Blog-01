import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  id: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const id = req.query.id as string;
  res.status(200).json({ id: id });
}