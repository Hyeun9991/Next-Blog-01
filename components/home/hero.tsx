import Link from 'next/link';
import Animation from './animation';

const Hero = () => {
  return (
    <div className='w-full flex flex-col md:flex-row items-center mt-16'>
      <div className="flex flex-col items-center text-center lg:flex-grow lg:pr-24 md:w-full md:items-start md:text-left mb-16 md:mb-0">
        <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
          Hello <br />
          I&apos;m Front-end Developer Eh
        </h1>
        <p className="mb-8 leading-relaxed">
          이 프로젝트는 Next.js와 Typescript로 제작된 블로그 웹 사이트입니다.
        </p>
        <div className="flex justify-center gap-2">
          <Link
            href="https://github.com/Hyeun9991"
            target="_blank"
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-md text-sm px-5 py-3 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            Github
          </Link>

          <Link
            href="mailto:hyeun9991@gmail.com"
            target="_blank"
            className="text-white bg-gray-800 hover:bg-gray-900 border border-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-200 font-medium rounded-md text-sm px-5 py-3 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            Contact Me!
          </Link>
        </div>
      </div>
      <div className="lg: max-w-lg lg:w-full md:w-1/2 w-5/6">
        <Animation />
      </div>
    </div>
  );
};

export default Hero;
