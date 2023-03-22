import Head from 'next/head';
import { useState } from 'react';
import Layout from '../../components/layout';

const Index = () => {
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');

  const onSubmit = () => {
    console.log(title, body);
  };

  return (
    <Layout>
      <Head>
        <title>Eh | Blog</title>
        <meta name="description" content="Next.js로 만든 블로그" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="w-11/12 md:w-7/12 mx-auto flex min-h-screen flex-col items-center text-gray-600 body-font">
        <div className="w-full text-gray-600 body-font mt-20">
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
            className="px-3.5 py-2 text-sm font-medium text-center text-white bg-gray-800 rounded-lg hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            onClick={onSubmit}
          >
            Post
          </button>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
