import Link from 'next/link';

const Header = () => {
  return (
    <>
      <header className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <Link
            href="/"
            className="title-font font-medium text-xl text-gray-900 mb-4 md:mb-0"
          >
            Eh
          </Link>
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <Link href="/" className="mr-5 hover:text-gray-900">
              홈
            </Link>
            <Link href="/blogs" className="mr-5 hover:text-gray-900">
              블로그
            </Link>
            <Link href="/admin" className="mr-5 hover:text-gray-900">
              관리자
            </Link>
          </nav>
          <a
            href="https://github.com/Hyeun9991"
            target="_blank"
            className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
          >
            Github
          </a>
        </div>
      </header>
    </>
  );
};

export default Header;
