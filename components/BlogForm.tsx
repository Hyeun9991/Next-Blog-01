import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';

const BlogForm = () => {
  const router = useRouter();
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');

  const onSubmit = () => {
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
  };

  return (
    <div className="w-full mx-auto text-gray-600 body-font ">
      <div className="flex justify-between items-center mb-20">
        <h1 className="font-bold text-2xl text-gray-900">포스트 생성하기</h1>
        <div>
          <button
            className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-full text-sm px-3.5 py-1.5 text-center dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
            onClick={onSubmit}
          >
            Post
          </button>
        </div>
      </div>
      <div className="mb-14">
        <label
          htmlFor="first_name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        ></label>
        <input
          type="text"
          className="border-gray-300 text-gray-900 text-4xl outline-none focus:border-gray-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
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
          className="text-gray-900 text-md outline-none	 focus:ring-gray-500 focus:border-gray-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
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

export default BlogForm;
