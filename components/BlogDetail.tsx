import Link from 'next/link';
import { AiFillEdit } from 'react-icons/ai';

interface Props {
  title: string;
  id: number;
  createdAt: number;
  body: string;
}

const BlogDetail = ({ title, id, createdAt, body }: Props) => {
  const printDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="p-4 sm:px-8 md:px-10">
      <div className="flex items-center mb-2 ">
        <h1 className="flex-grow text-3xl font-bold text-gray-900 dark:text-white">
          {title}
        </h1>
        <Link
          href={`/blogs/${id}/edit`}
          className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-200 hover:bg-black flex items-center justify-center rounded-full transition outline-none focus:ring-4 focus:ring-gray-300 dark:bg-zinc-700 dark:hover:bg-zinc-100"
        >
          <AiFillEdit className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white dark:text-gray-500" />
        </Link>
      </div>
      <p className="mb-8 text-sm text-gray-500 dark:text-gray-400">
        {printDate(createdAt)}
      </p>
      <pre className="text-gray-800 text-md outline-none focus:ring-gray-500 focus:border-gray-500 block w-full dark:text-gray-50">
        {body}
      </pre>
    </div>
  );
};

export default BlogDetail;
