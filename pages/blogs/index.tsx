import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MouseEvent, useEffect, useState } from 'react';
import Card from '../../components/Card';
import Layout from '../../components/layout';
import { HiTrash } from 'react-icons/hi';
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
          onClick={() => router.push('/blogs/edit')}
        >
          <button
            className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-900 transition outline-none focus:ring-4 focus:ring-red-300"
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
              className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-full text-sm px-3.5 py-2 text-center dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
            >
              Write
            </Link>
          </div>
        </div>
        {renderBlogList()}
      </section>
    </Layout>
  );
};

export default Index;
