import Head from 'next/head';
import BlogForm from '../../../components/BlogForm';
import Layout from '../../../components/layout';

const edit = () => {
  return (
    <Layout>
      <Head>
        <title>Eh | Edit</title>
        <meta name="description" content="Next.js로 만든 블로그" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <BlogForm editing={true}/>
    </Layout>
  );
};

export default edit;
