import axios from 'axios';
import { useState } from 'react';

const BlogForm = () => {
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');

  const onSubmit = () => {
    axios.post('http://localhost:3001/posts', {
      title,
      body,
    });
  };

  return (
    <div className="w-full text-gray-600 body-font mt-28">
      <h1 className="text-2xl font-bold text-gray-900 mb-10">
        포스트 생성하기
      </h1>
      <div className="mb-3">
        <label
          htmlFor="first_name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Title
        </label>

        <input
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-black	 focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
      </div>
      <div className="mb-3">
        <label
          htmlFor="first_name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Body
        </label>

        <textarea
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-black	 focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
          rows={18}
          value={body}
          onChange={(event) => {
            setBody(event.target.value);
          }}
        />
      </div>
      <button
        type="button"
        className="mt-4 px-3.5 py-2 text-sm font-medium text-center text-white bg-gray-800 rounded-lg hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
        onClick={onSubmit}
      >
        Post
      </button>
    </div>
  );
};

export default BlogForm;
