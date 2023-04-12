import Image from 'next/image';
import Link from 'next/link';
import { AiFillGithub } from 'react-icons/ai';
import { MdEmail } from 'react-icons/md';
import Card from '../Card';
import {
  useCallback,
  useEffect,
  useState,
  KeyboardEvent,
  ChangeEvent,
} from 'react';
import { IPostData } from '../../pages/blogs/[id]';
import router from 'next/router';
import { IParams } from '../BlogList';
import axios from 'axios';
import useToast from '../../hooks/toast';

interface Props {
  isAdmin: boolean;
}

const Main = ({ isAdmin }: Props) => {
  const [toasts, addToast, deleteToast] = useToast();

  const [posts, setPosts] = useState<IPostData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [searchText, setSearchText] = useState<string>('');
  const limit = 50;

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
        title_like: searchText,
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
          setPosts(res.data); // posts state에 요청받은 데이터 담기
          setLoading(false); // 로딩 종료
        })
        .catch((e) => {
          setLoading(false); // 로딩 종료
          setError('데이터베이스에 문제가 생겼습니다.');
          addToast({
            text: '데이터베이스에 문제가 생겼습니다.',
            bg_color: 'bg-red-100/80',
            border_color: 'border-red-300/30',
            text_color: 'text-red-800',
          });
        });
    },
    [addToast, isAdmin, searchText]
  );

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const renderBlogList = () => {
    return posts.map((post) => {
      return (
        <Card
          key={post.id}
          title={post.title}
          body={post.body}
          onClick={() => router.push(`/blogs/${post.id}`)}
        />
      );
    });
  };

  /**
   * 사용자의 입력값에 따른 data를 화면에 출력하는 함수
   */
  const onSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      router.push(`${router.pathname}?page=1}`);
      getPosts(1);
    }
  };

  if (error) {
    return (
      <h1 className="font-bold text-black dark:text-white p-4 sm:px-8 md:px-10">
        {error}
      </h1>
    );
  }

  return (
    <div className="flex w-full min-h-full">
      {/* 게시글 목록 */}
      <div className="w-full p-4 md:w-2/3 sm:p-8 md:p-10 flex flex-col gap-12">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold text-5xl text-gray-900 dark:text-white">
            Eh
          </h1>
          <ul className="flex gap-3 md:invisible">
            <li>
              <Link
                href="https://github.com/Hyeun9991"
                target="_blank"
                className="bg-gray-800/95 hover:bg-gray-900 rounded-full w-9 h-9 flex items-center justify-center dark:bg-zinc-100/95 dark:hover:bg-zinc-50 outline-none focus:ring-gray-300 focus:ring-4 dark:focus:ring-gray-400"
              >
                <AiFillGithub className="text-4xl text-gray-50 dark:text-gray-900 w-6 h-6" />
              </Link>
            </li>
            <li>
              <Link
                href="mailto:hyeun9991@gmail.com"
                target="_blank"
                className="bg-gray-800/95 hover:bg-gray-900 rounded-full w-9 h-9 flex items-center justify-center dark:bg-zinc-100/95 dark:hover:bg-zinc-50 outline-none focus:ring-gray-300 focus:ring-4 dark:focus:ring-gray-400"
              >
                <MdEmail className="text-4xl text-gray-50 dark:text-gray-900 w-5 h-5" />
              </Link>
            </li>
          </ul>
        </div>
        <form
          className={
            isAdmin === true
              ? `flex items-center gap-2 w-full mt-4 mb-4 `
              : 'flex items-center gap-2 w-full '
          }
        >
          <label htmlFor="simple-search" className="sr-only">
            Search
          </label>
          <div className="relative w-full">
            <input
              type="text"
              id="simple-search"
              className="bg-gray-50 text-gray-900 text-sm border-b block w-full p-1.5 outline-none dark:bg-zinc-900 dark:border-zinc-800 dark:placeholder-gray-500 dark:text-white dark:focus:ring-white"
              placeholder="검색"
              required
              value={searchText}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSearchText(e.target.value)
              }
              onKeyUp={onSearch}
            />
          </div>
        </form>
        <div className="w-ful h-full flex flex-col">{renderBlogList()}</div>
      </div>
      {/* 프로필 */}
      <div className="hidden p-0 md:w-1/3 md:p-8 md:block lg:p-10">
        <div className="w-full h-1/4 sticky top-20">
          <div className="w-1/4 mb-3">
            <Image
              src="/logo.png"
              priority
              width={60}
              height={60}
              alt="logo image"
              blurDataURL={'/logo.png'}
              className="w-full border border-gray-200 dark:border-zinc-700 rounded-full"
            />
          </div>
          <p className="font-semibold text-black dark:text-white mb-1">Eh</p>
          <p className="font-light text-gray-600 dark:text-gray-300 mb-4">
            Front-end Developer
          </p>
          <p className="font-light text-sm text-gray-600 dark:text-gray-300 mb-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
            ratione earum saepe sint unde? Optio ducimus nisi explicabo maiores
            quisquam sequi corrupti, sunt, voluptatum, nemo veritatis debitis
            facere nulla culpa?
          </p>
          <ul className="flex gap-3">
            <li>
              <Link
                href="https://github.com/Hyeun9991"
                target="_blank"
                className="bg-gray-800/95 hover:bg-gray-900 rounded-full w-9 h-9 flex items-center justify-center dark:bg-zinc-100/95 dark:hover:bg-zinc-50 outline-none focus:ring-gray-300 focus:ring-4 dark:focus:ring-gray-400"
              >
                <AiFillGithub className="text-4xl text-gray-50 dark:text-gray-900 w-6 h-6" />
              </Link>
            </li>
            <li>
              <Link
                href="mailto:hyeun9991@gmail.com"
                target="_blank"
                className="bg-gray-800/95 hover:bg-gray-900 rounded-full w-9 h-9 flex items-center justify-center dark:bg-zinc-100/95 dark:hover:bg-zinc-50 outline-none focus:ring-gray-300 focus:ring-4 dark:focus:ring-gray-400"
              >
                <MdEmail className="text-4xl text-gray-50 dark:text-gray-900 w-5 h-5" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

Main.defaultProps = {
  isAdmin: false,
};

export default Main;
