import type { NextApiRequest, NextApiResponse } from 'next';

// 처음 admin페이지에 진입하면 이 api로 로그인 여부를 판단

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
