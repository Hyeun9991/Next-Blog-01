import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Card from '../../components/Card';
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
        {posts.map((post) => {
          return <Card key={post.id} title={post.title} body={post.body} />;
        })}
      </section>
    </Layout>
  );
};

export default Index;
