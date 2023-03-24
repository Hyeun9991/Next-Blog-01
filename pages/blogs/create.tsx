import Head from 'next/head';
import BlogForm from '../../components/BlogForm';
import Layout from '../../components/layout';

const create = () => {
  return (
    <Layout>
      <Head>
        <title>Eh | Create</title>
        <meta name="description" content="Next.js로 만든 블로그" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <BlogForm />
    </Layout>
  );
};

export default create;