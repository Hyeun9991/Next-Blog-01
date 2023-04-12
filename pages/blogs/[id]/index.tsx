import { GetStaticProps, NextPage } from 'next';
import { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingSpinner from '../../../components/LoadingSpinner';
import Link from 'next/link';
import { AiFillEdit } from 'react-icons/ai';
import Head from 'next/head';
import BlogDetail from '../../../components/BlogDetail';

export interface IPostData {
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

  // 로딩중이면 로딩스피너를 화면에 출력
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Head>
        <title>Eh | {postGetData.title}</title>
      </Head>

      <BlogDetail
        title={postGetData.title}
        id={postGetData.id}
        createdAt={postGetData.createdAt}
        body={postGetData.body}
      />
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
