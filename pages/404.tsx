import Link from 'next/link';
import { AiFillWarning } from 'react-icons/ai';

const PageNotFound = () => {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-10">
      <div className="flex flex-col items-center">
        <div className="bg-yellow-500 w-10 h-10 rounded-full flex items-center justify-center mb-4">
          <AiFillWarning className="w-6 h-6 text-white mb-1" />
        </div>
        <h1 className="text-gray-900 text-lg font-bold">
          404 해당 페이지를 찾을 수 없습니다.
        </h1>
        <p className="text-gray-500 text-sm">
          올바른 URL 경로인지 확인해주세요.
        </p>
      </div>
      <ul className="flex flex-col gap-2">
        <li>
          <Link
            href="/"
            className="text-sm underline text-gray-500 hover:text-gray-900"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/blogs"
            className="text-sm underline text-gray-500 hover:text-gray-900"
          >
            Blogs
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default PageNotFound;
