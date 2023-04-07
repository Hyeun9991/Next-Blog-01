import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    /**
     * a_name cookie 생성
     * setHeader로 헤더 만들고, Set-Cookie로 쿠키 만듬
     * 
     * a_name: 쿠키 이름
     * Max-Age: 3600초 (약 한 시간)
     */
    res.setHeader('Set-Cookie', 'a_name=Mike;Max-Age=3600;HttpOnly,Secure');
    res.status(200).json({ message: 'ok' });
  }
}
