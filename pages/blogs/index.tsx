import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MouseEvent, useEffect, useState } from 'react';
import { HiTrash, HiPlusSm } from 'react-icons/hi';
import Card from '../../components/Card';
import Layout from '../../components/layout';
import LoadingSpinner from '../../components/LoadingSpinner';

interface IPostData {
  title: string;
  body: string;
  id: number;
}

const Index = () => {
  const router = useRouter();
  const [posts, setPosts] = useState<IPostData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getPosts = () => {
    axios.get('http://localhost:3001/posts').then((res) => {
      setPosts(res.data);
      setLoading(false);
    });
  };

  const deleteBlog = (e: MouseEvent<HTMLButtonElement>, id: number) => {
    e.stopPropagation();

    axios.delete(`http://localhost:3001/posts/${id}`).then(() => {
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    });
  };

  useEffect(() => {
    getPosts();
  }, []);

  /**
   * getPosts() 함수를 통해 db에서 가져온 포스트 데이터를 화면에 출력하는 함수
   */
  const renderBlogList = () => {
    // 로딩중이면 로딩스피너를 화면에 출력
    if (loading) {
      return <LoadingSpinner />;
    }

    // db에 포스트 데이터가 없으면 메세지 출력
    if (posts.length === 0) {
      return (
        <h2 className="text-sm mt-10">
          작성된 게시글이 없습니다. 새로운 글을 작성해보세요.
        </h2>
      );
    }

    // 포스트 데이터를 화면에 출력
    return posts.map((post) => {
      return (
        <Card
          key={post.id}
          title={post.title}
          body={post.body}
          onClick={() => router.push(`/blogs/${post.id}`)}
        >
          <button
            className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-900 transition outline-none focus:ring-4 focus:ring-gray-300"
            onClick={(e) => deleteBlog(e, post.id)}
          >
            <HiTrash className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </button>
        </Card>
      );
    });
  };

  return (
    <Layout>
      <Head>
        <title>Eh | Blogs</title>
        <meta name="description" content="Next.js로 만든 블로그" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section>
        <div className="flex justify-between items-center mb-4">
          <h1 className="font-bold text-2xl text-gray-900">Eh</h1>
          <div>
            <Link
              href="/blogs/create"
              className="w-7 h-7 sm:w-8 sm:h-8 bg-black flex items-center justify-center rounded-full transition outline-none focus:ring-4 focus:ring-gray-300"
            >
              <HiPlusSm className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </Link>
          </div>
        </div>
        {renderBlogList()}
      </section>
    </Layout>
  );
};

export default Index;
