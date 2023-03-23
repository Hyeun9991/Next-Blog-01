import Head from 'next/head';
import Layout from '../../components/layout';

const edit = () => {
  return (
    <Layout>
      <Head>
        <title>Eh | Edit</title>
        <meta name="description" content="Next.js로 만든 블로그" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="text-2xl font-bold text-gray-900 mb-10">
        포스트 수정하기
      </h1>
    </Layout>
  );
};

export default edit;
