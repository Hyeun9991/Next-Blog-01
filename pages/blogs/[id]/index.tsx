import { GetStaticProps, NextPage } from 'next';
import { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingSpinner from '../../../components/LoadingSpinner';
import Link from 'next/link';
import { AiFillEdit } from 'react-icons/ai';
import Head from 'next/head';

interface IPostData {
  title: string;
  body: string;
  id: number;
  createdAt: number;
}

interface Props {
  postGetData: IPostData;
}

const PostDetailPage: NextPage<Props> = ({ postGetData }) => {
  const [loading, setLoading] = useState<boolean>(true);

  const printDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  useEffect(() => {
    // 데이터를 받아오면 로딩 완료
    if (postGetData) {
      setLoading(false);
    }
  }, [postGetData]);

  // 로딩중이면 로딩스피너를 화면에 출력
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Head>
        <title>Eh | {postGetData.title}</title>
      </Head>

      <div className="flex items-center mb-2">
        <h1 className="text-3xl font-bold text-gray-900 flex-grow ">
          {postGetData.title}
        </h1>
        <Link
          href={`/blogs/${postGetData.id}/edit`}
          className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-200 hover:bg-black flex items-center justify-center rounded-full transition outline-none focus:ring-4 focus:ring-gray-300"
        >
          <AiFillEdit className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
        </Link>
      </div>
      <p className="text-sm text-gray-500 mb-8">
        {printDate(postGetData.createdAt)}
      </p>
      <pre className="font-notoSans text-gray-900 text-md outline-none focus:ring-gray-500 focus:border-gray-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500">
        {postGetData.body}
      </pre>
    </>
  );
};

export const getStaticPaths = async () => {
  const res = await axios.get(`http://localhost:3001/posts`);
  const data = res.data;
  const ids = data.map((post: IPostData) => post.id);
  const paths = ids.map((id: IPostData) => {
    return {
      params: { id: id.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context: any) => {
  const { id } = context.params;

  const res = await axios.get(`http://localhost:3001/posts/${id}`);
  const data = res.data;

  return {
    props: { postGetData: data },
  };
};

export default PostDetailPage;
