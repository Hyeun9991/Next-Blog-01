import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { RiSendPlaneFill } from 'react-icons/ri';
import { AiFillEdit } from 'react-icons/ai';

interface Props {
  editing: boolean;
}

const BlogForm = ({ editing }: Props) => {
  const router = useRouter();
  const id = router.query.id;

  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');

  useEffect(() => {
    /**
     * axios 404 error 발생
     * 문제: id값을 가져오지 못해서 404 에러 발생
     * 원인: 수정페이지에서 새로고침시 query값이 없어져 id가 undefined가 된다.
     *
     * 해결방안: 서버사이드에서 쿼리값을 넘겨주면 새로고침을 해도 값이 증발하지 않는다.
     * 하지만 pages 폴더가 아닌 components 폴더 컴포넌트인 경우 서버사이드 기능을 사용하지 못 한다.
     */
    if (editing) {
      axios.get(`http://localhost:3001/posts/${id}`).then((res) => {
        setTitle(res.data.title);
        setBody(res.data.body);
      });
    }
  }, [editing, id]);

  /**
   * db에 editing이 true면 patch 메소드를 보내고, false면 post 메소드를 보내는 함수
   */
  const onSubmit = () => {
    if (editing) {
      axios
        .patch(`http://localhost:3001/posts/${id}`, {
          title,
          body,
        })
        .then((res) => {
          console.log(res);
        });
    } else {
      axios
        .post('http://localhost:3001/posts', {
          title,
          body,
          createdAt: Date.now(),
        })
        .then(() => {
          // db에 성공적으로 데이터를 보내면 포스트 리스트 페이지로 이동
          router.push('/blogs');
        });
    }
  };

  return (
    <div className="w-full mx-auto text-gray-600 body-font">
      <div className="flex justify-between items-center mb-12">
        <h1 className="font-bold text-2xl text-gray-900">
          포스트 {editing ? '수정하기' : '생성하기'}
        </h1>
        <div>
          <button
            className="w-7 h-7 sm:w-8 sm:h-8 bg-black flex items-center justify-center rounded-full transition outline-none focus:ring-4 focus:ring-gray-300"
            onClick={onSubmit}
          >
            {editing ? (
              <AiFillEdit className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
            ) : (
              <RiSendPlaneFill className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
            )}
          </button>
        </div>
      </div>
      <div className="mb-8">
        <label
          htmlFor="first_name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        ></label>
        <input
          type="text"
          className="bg-gray-50 text-gray-900 text-4xl outline-none focus:border-gray-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
          value={title}
          placeholder="제목을 입력하세요"
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
      </div>
      <div className="mb-3">
        <label
          htmlFor="first_name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        ></label>
        <textarea
          className="bg-gray-50 text-gray-900 text-md resize-none outline-none	 focus:ring-gray-500 focus:border-gray-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
          rows={18}
          value={body}
          placeholder="당신의 이야기를 적어보세요"
          onChange={(event) => {
            setBody(event.target.value);
          }}
        />
      </div>
    </div>
  );
};

BlogForm.defaultProps = {
  editing: false,
};

export default BlogForm;
