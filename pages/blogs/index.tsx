import Head from 'next/head';
import Layout from '../../components/layout';

const index = () => {
  return (
    <Layout>
      <Head>
        <title>Eh | Blog</title>
        <meta name="description" content="Next.js로 만든 블로그" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>blog page</h1>
    </Layout>
  );
};

export default index;
