import type { NextPage } from 'next';
import Head from 'next/head';
import Hero from '../components/home/hero';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Eh | Home</title>
        <meta name="description" content="Next.js로 만든 블로그" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col items-center mx-auto md:w-full md:flex-row">
        <Hero />
      </div>
    </>
  );
};

export default Home;
