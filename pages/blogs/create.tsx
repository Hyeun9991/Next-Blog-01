import Head from 'next/head';
import BlogForm from '../../components/BlogForm';
import { IToast } from '../../components/Toast';

interface Props {
  addToast: (toast: IToast) => void;
}

const create = ({ addToast }: Props) => {
  return (
    <>
      <Head>
        <title>Eh | Create</title>
        <meta name="description" content="Next.js로 만든 블로그" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <BlogForm addToast={addToast} />
    </>
  );
};

export default create;
