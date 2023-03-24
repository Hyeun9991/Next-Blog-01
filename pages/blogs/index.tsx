import axios from 'axios';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Layout from '../../components/layout';

interface IPostData {
  title: string;
  body: string;
  id: number;
}

// interface Props {
//   posts: IPostData[];
// }

const Index = () => {
  const [posts, setPosts] = useState<IPostData[]>([]);

  const getPosts = () => {
    axios.get('http://localhost:3001/posts').then((res) => {
      setPosts(res.data);
    });
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <Layout>
      <Head>
        <title>Eh | Blogs</title>
        <meta name="description" content="Next.js로 만든 블로그" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section>
        <h1 className="text-2xl font-bold text-gray-900 mb-10">
          포스트 리스트
        </h1>
        {posts.map((post) => {
          return <div key={post.id}>{post.title}</div>;
        })}
      </section>
    </Layout>
  );
};

export default Index;
