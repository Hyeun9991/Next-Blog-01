import Link from 'next/link';
import Animation from './animation';

const Hero = () => {
  return (
    <>
      <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
        <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
          안녕하세요! <br />
          프론트엔드 개발자 지망생 Eh입니다.
        </h1>
        <p className="mb-8 leading-relaxed">
          이 프로젝트는 Next.js와 Typescript로 제작된 블로그 웹 사이트입니다.
        </p>
        <div className="flex justify-center">
          <Link href='/blogs' className="inline-flex text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg">
            포스터 보러가기
          </Link>
        </div>
      </div>
      <div className="lg: max-w-lg lg:w-full md:w-1/2 w-5/6">
        <Animation />
      </div>
    </>
  );
};

export default Hero;
