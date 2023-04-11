import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { Inter } from 'next/font/google';
import Toast from '../components/Toast';
import useToast from '../hooks/toast';
import Layout from '../components/layout';
import { ThemeProvider } from 'next-themes';

const inter = Inter({ subsets: ['latin'] });

export const cls = (...classnames: string[]) => {
  return classnames.join(' ');
};

function MyApp({ Component, pageProps }: AppProps) {
  const [toasts, addToast, deleteToast] = useToast();

  return (
    <ThemeProvider attribute="class">
      <Layout>
        <main className={cls(inter.className)}>
          <Toast toasts={toasts} deleteToast={deleteToast} />

          <Component {...pageProps} addToast={addToast} />
        </main>
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
