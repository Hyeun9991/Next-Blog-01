import Head from 'next/head';
import BlogForm from '../../../components/BlogForm';
import { IToast } from '../../../components/Toast';

interface Props {
  addToast: (toast: IToast) => void;
}

const edit = ({ addToast }: Props) => {
  return (
    <>
      <Head>
        <title>Eh | Edit</title>
        <meta name="description" content="Next.js로 만든 블로그" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <BlogForm editing={true} addToast={addToast} />
    </>
  );
};

export default edit;
