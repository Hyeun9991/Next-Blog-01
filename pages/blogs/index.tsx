import Head from 'next/head';
import BlogList from '../../components/BlogList';
import Layout from '../../components/layout';

const Index = () => {
  return (
    <Layout>
      <Head>
        <title>Eh | Blogs</title>
      </Head>

      <section>
        <div className="flex justify-between items-center mb-4">
          <h1 className="font-bold text-2xl text-gray-900">Eh</h1>
        </div>
        <BlogList />
      </section>
    </Layout>
  );
};

export default Index;
