import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import DarkModeToggleButton from './dark-mode-toggle-button';

const Header = () => {
  const router = useRouter();

  return (
    <nav className="fixed z-10 t-0 l-0 w-full px-4 py-2.5 bg-gray-50/60 backdrop-blur-md sm:px-0 sm:py-4 dark:bg-zinc-900/90">
      <div className="sm:w-11/12 flex flex-wrap items-center justify-between mx-auto">
        <Link
          href="/"
          className="text-xl font-semibold whitespace-nowrap"
        >
          <Image
            src="/logo.png"
            priority
            width={32}
            height={32}
            alt="logo image"
            blurDataURL={'/logo.png'}
          />
        </Link>
        <div>
          <ul className="flex items-center gap-6 md:gap-8">
            <li>
              <Link
                href="/blogs"
                className={`text-sm text-gray-500 hover:text-gray-800 dark:text-gray-200 md:dark:hover:text-white  md:dark:hover:bg-transparent ${
                  router.pathname === '/blogs' ? 'text-gray-900 font-semibold' : ''
                }`}
              >
                Blogs
              </Link>
            </li>
            <li>
              <Link
                href="/admin"
                className={`text-sm text-gray-500 hover:text-gray-800 dark:text-gray-200 md:dark:hover:text-white  md:dark:hover:bg-transparent ${
                  router.pathname === '/admin' ? 'text-gray-900 font-semibold' : ''
                }`}
              >
                Admin
              </Link>
            </li>
            <li>
              {/* 다크모드 토글 버튼 */}
              <DarkModeToggleButton />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
