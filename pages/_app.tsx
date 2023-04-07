import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { Roboto, Noto_Sans_KR } from 'next/font/google';
import Toast from '../components/Toast';
import useToast from '../hooks/toast';
import Layout from '../components/layout';

/**
 * 모든 페이지에 공통적으로 적용되는것은 이 파일에 정의
 */

const notoSansKr = Noto_Sans_KR({
  // preload: true, 기본값
  subsets: ['latin'], // 또는 preload: false
  weight: ['100', '400', '700', '900'], // 가변 폰트가 아닌 경우, 사용할 fontWeight 배열
});

const roboto = Roboto({
  subsets: ['latin'], // preload에 사용할 subsets입니다.
  weight: ['100', '400', '700'],
  variable: '--roboto', // CSS 변수 방식으로 스타일을 지정할 경우에 사용합니다.
});

export const cls = (...classnames: string[]) => {
  return classnames.join(' ');
};

function MyApp({ Component, pageProps }: AppProps) {
  const [toasts, addToast, deleteToast] = useToast();

  return (
    <Layout>
      <main className={cls(notoSansKr.className, roboto.variable)}>
        <Toast toasts={toasts} deleteToast={deleteToast} />

        <Component {...pageProps} addToast={addToast} />
      </main>
    </Layout>
  );
}

export default MyApp;
