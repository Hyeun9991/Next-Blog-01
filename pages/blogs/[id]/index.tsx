import { GetStaticProps, NextPage } from 'next';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../../../components/layout';
import LoadingSpinner from '../../../components/LoadingSpinner';

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

  useEffect(() => {
    // 데이터를 받아오면 로딩 완료
    if (postGetData) {
      setLoading(false);
    }
  }, [postGetData]);

  const printDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  // 로딩중이면 로딩스피너를 화면에 출력
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        {postGetData.title}
      </h1>
      <p className="text-sm text-gray-500 mb-8">
        {printDate(postGetData.createdAt)}
      </p>
      <pre
        className="text-gray-900 text-md outline-none	 focus:ring-gray-500 focus:border-gray-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
      >
        {postGetData.body}
      </pre>
    </Layout>
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
