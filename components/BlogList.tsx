import axios from 'axios';
import { useRouter } from 'next/router';
import { MouseEvent, useEffect, useState } from 'react';
import { HiTrash } from 'react-icons/hi';
import Card from '../components/Card';
import LoadingSpinner from '../components/LoadingSpinner';
import Pagination from './Pagination';

interface IPostData {
  title: string;
  body: string;
  id: number;
  publish: boolean;
}

interface Props {
  isAdmin: boolean;
}

const BlogList = ({ isAdmin }: Props) => {
  const router = useRouter();

  const [posts, setPosts] = useState<IPostData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getPosts = (page: number = 1) => {
    axios
      .get(
        `http://localhost:3001/posts?_page=${page}&_limit=5&_sort=id&_order=desc`
      )
      .then((res) => {
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

  const renderBlogList = () => {
    return posts
      .filter((post) => {
        return isAdmin || post.publish;
      })
      .map((post) => {
        return (
          <Card
            key={post.id}
            title={post.title}
            body={post.body}
            onClick={() => router.push(`/blogs/${post.id}`)}
          >
            {isAdmin ? (
              <button
                className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-900 transition outline-none focus:ring-4 focus:ring-gray-300"
                onClick={(e) => deleteBlog(e, post.id)}
              >
                <HiTrash className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </button>
            ) : undefined}
          </Card>
        );
      });
  };

  // 포스트 데이터를 화면에 출력
  // filter: true를 return하면 그대로 남아있고, false를 return하면 사라진다.
  return (
    <div className="flex flex-col items-center">
      {renderBlogList()}
      <Pagination />
    </div>
  );
};

BlogList.defaultProps = {
  isAdmin: false,
};

export default BlogList;
