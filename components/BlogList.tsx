import axios from 'axios';
import { useRouter } from 'next/router';
import { MouseEvent, useCallback, useEffect, useState } from 'react';
import { HiTrash } from 'react-icons/hi';
import Card from '../components/Card';
import LoadingSpinner from '../components/LoadingSpinner';
import Pagination from './Pagination';

interface IParams {
  _page: number;
  _limit: number;
  _sort: string;
  _order: string;
  publish?: boolean;
}

interface IPostData {
  title: string;
  body: string;
  id: number;
  publish: boolean;
  createdAt: number;
}

interface Props {
  isAdmin: boolean;
}

const BlogList = ({ isAdmin }: Props) => {
  const router = useRouter();
  const params = new URLSearchParams(router.asPath.split(/\?/)[1]);
  const pageParam = params.get('page') ?? '';
  const limit = 5;

  const [posts, setPosts] = useState<IPostData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [numberOfPosts, setNumberOfPosts] = useState<number>(0);
  const [numberOfPages, setNumberOfPages] = useState<number>(0);

  /**
   * db에서 가져온 데이터의 총 개수에 limit(5)를 나눈값으로 페이지 개수 return하기
   * numberOfPosts: params 객체 조건에 맞게 db에서 가져온 데이터의 총 개수
   * numberOfPages: 데이터의 총 개수에 limit(5)를 나눈 값, 페이지 개수
   */
  useEffect(() => {
    setNumberOfPages(Math.ceil(numberOfPosts / limit));
  }, [numberOfPosts]);

  /**
   * url을 기억해서 뒤로 가기 버튼을 누르면 이전 페이지로 이동하는 함수
   */
  const onClickPageButton = (page: number = 1) => {
    router.push(`${router.pathname}?page=${page}`);
    getPosts(page);
  };

  /**
   * db에 get 요청을 보내서 posts data를 가져오는 함수
   */
  const getPosts = useCallback(
    (page = 1) => {
      let params: IParams = {
        _page: page,
        _limit: limit,
        _sort: 'id',
        _order: 'desc',
      };

      // admin이 아니면 공개된 포스트만 요청
      if (!isAdmin) {
        params = { ...params, publish: true };
      }

      // params 객체에 맞는 데이터 요청
      axios
        .get(`http://localhost:3001/posts`, {
          params,
        })
        .then((res) => {
          setNumberOfPosts(res.headers['x-total-count']); // X-Total-Count: params 객체 조건에 맞는 data 총 개수
          setPosts(res.data); // posts state에 요청받은 데이터 담기
          setLoading(false); // 로딩 종료
        });
    },
    [isAdmin]
  );

  /**
   * 처음 admin, blogs 페이지로 접속했을 때 쿼리스트링이 없음으로 null이 return됨
   * , 이걸 방지하기 위해 or 연산자를 이용해서 1을 return 해줌
   *
   * pageParam 을 가져올때 string으로 가져오기 때문에 parseInt를 사용해서 숫자로 바꿔줌
   */
  useEffect(() => {
    setCurrentPage(parseInt(pageParam) || 1);
    getPosts(parseInt(pageParam) || 1);
  }, [getPosts, pageParam]);

  /**
   * db에 delete 요청을 보내서 id가 일치하지 않는 데이터만 return 하는 함수
   */
  const deleteBlog = (e: MouseEvent<HTMLButtonElement>, id: number) => {
    e.stopPropagation();

    axios.delete(`http://localhost:3001/posts/${id}`).then(() => {
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    });
  };

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

  /**
   * 요청받은 posts data를 화면에 출력하는 함수
   */
  const renderBlogList = () => {
    return posts.map((post) => {
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
  return (
    <div className="flex flex-col items-center">
      {renderBlogList()}

      {numberOfPages > 1 && (
        // numberOfPages가 1보다 작으면 화면에 출력 안함
        <Pagination
          currentPage={currentPage}
          numberOfPages={numberOfPages}
          onClick={onClickPageButton}
        />
      )}
    </div>
  );
};

BlogList.defaultProps = {
  isAdmin: false,
};

export default BlogList;
