import Head from 'next/head';
import Link from 'next/link';
import BlogList from '../components/BlogList';
import Layout from '../components/layout';
import { HiPlusSm } from 'react-icons/hi';

const Admin = () => {
  return (
    <Layout>
      <Head>
        <title>Eh | Admin</title>
      </Head>

      <section>
        <div className="flex justify-between items-center mb-4">
          <h1 className="font-bold text-2xl text-gray-900">Eh</h1>
          <div>
            <Link
              href="/blogs/create"
              className="w-7 h-7 sm:w-8 sm:h-8 bg-black flex items-center justify-center rounded-full transition outline-none focus:ring-4 focus:ring-gray-300"
            >
              <HiPlusSm className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </Link>
          </div>
        </div>
        <BlogList isAdmin={true} />
      </section>
    </Layout>
  );
};

export default Admin;
