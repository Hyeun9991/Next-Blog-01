import Head from 'next/head';
import Link from 'next/link';
import BlogList from '../components/BlogList';
import Layout from '../components/layout';
import { HiPlusSm } from 'react-icons/hi';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

/**
 * 로그인 기능 구현 (쿠키 여부에 따라서 로그인 상태 판별하기)
 * admin 페이지로 이동하면 쿠키가 있으면 로그인 되었다고 판단하고, admin 페이지로 이동
 * 쿠키가 없으면 로그인 페이지로 이동
 *
 * 1. admin 페이지에 처음 접속하면 checkLogin 함수를 통해 isLogin api로 get 요청을 보냄
 *    성공: 전달받은 data에 status가 200이고,
 *         a_name cookie가 있으면 isLogin state를 true로 업데이트.
 *    실패: login 페이지로 이동시킴.
 *
 * 2. isLogin api에서는 a_name 쿠기가 있는지 확인
 *
 * 3. login 페이지에 접속하면 login 함수를 통해 login api로 post 요청을 보냄
 *    성공: a_name cookie가 있으면 admin 페이지로 이동
 *
 * 4. login api는 한 시간짜리 a_name cookie를 생성
 *
 * 5. logout 함수를 통해 logout api에 get 요청을 보냄
 *    성공: a_name cookie가 삭제되면, 첫 화면으로 이동
 *
 * 6. logout api는 Max-Age를 0으로 설정하고, a_name cookie를 삭제한다.
 */

const Admin = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const checkLogin = () => {
    // isLogin api로 응답을 보냄
    axios.get('/api/isLogin').then((res) => {
      if (res.status === 200 && res.data.name) {
        // 로그인
        setIsLogin(true);
      } else {
        // 로그인 안됨
        router.push('/login');
      }
    });
  };

  const logout = () => {
    axios.get('/api/logout').then((res) => {
      if (res.status === 200) {
        router.push('/');
      }
    });
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <Layout>
      <Head>
        <title>Eh | Admin</title>
      </Head>

      <section>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-4">
            <h1 className="font-bold text-2xl text-gray-900">Eh</h1>
            {isLogin && (
              <button
                onClick={logout}
                className="w-full bg-gray-800/80 text-white bg-primary-600 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-2.5 py-1.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Logout
              </button>
            )}
          </div>
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
