import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Header = () => {
  const router = useRouter();

  return (
    <nav className="fixed t-0 l-0 w-full px-4 py-2.5 bg-gray-50/60 backdrop-blur-md sm:px-0 sm:py-4 dark:bg-gray-900">
      <div className="sm:w-11/12 flex flex-wrap items-center justify-between mx-auto">
        <Link
          href="/"
          className="text-xl font-semibold whitespace-nowrap dark:text-white"
        >
          <Image
            src="/logo.png"
            priority
            width={32}
            height={32}
            alt="logo image"
          />
        </Link>
        <div>
          <ul className="flex gap-8 md:gap-8">
            <li>
              <Link
                href="/blogs"
                className={`text-sm text-gray-500 hover:text-gray-800 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ${
                  router.pathname === '/blogs' ? 'text-gray-900 font-bold' : ''
                }`}
              >
                Blogs
              </Link>
            </li> 
            <li>
              <Link
                href="/admin"
                className={`text-sm text-gray-500 hover:text-gray-800 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ${
                  router.pathname === '/admin' ? 'text-gray-900 font-bold' : ''
                }`}
              >
                Admin
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
