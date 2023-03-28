import { GetStaticProps, NextPage } from 'next';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../../../components/layout';
import LoadingSpinner from '../../../components/LoadingSpinner';

interface IPostData {
  title: string;
  body: string;
  id: number;
}

interface Props {
  postGetData: IPostData;
}

const PostDetailPage: NextPage<Props> = ({ postGetData }) => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // 데이터를 받아오면 loading 완료
    if (postGetData) {
      setLoading(false);
    }
  }, [postGetData]);
  
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Layout>
      <h1 className="text-2xl font-bold text-gray-900">{postGetData.title}</h1>
      <p className='text-sm'>{postGetData.body}</p>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (context: any) => {
  const { id } = context.params;
  const res = await axios.get(`http://localhost:3001/posts/${id}`);
  const data = res.data;

  return {
    props: { postGetData: data },
  };
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

export default PostDetailPage;
