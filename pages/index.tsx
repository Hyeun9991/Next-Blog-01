import type { NextPage } from 'next';
import Head from 'next/head';
import Hero from '../components/home/hero';
import Layout from '../components/layout';

const Home: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Eh</title>
        <meta name="description" content="Next.js로 만든 블로그" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col items-center mx-auto md:w-full md:flex-row">
        <Hero />
      </div>
    </Layout>
  );
};

export default Home;
