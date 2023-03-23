import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="text-gray-600 body-font">
      <div className="bg-gray-100/80">
        <div className="sm:w-11/12 py-6 mx-auto flex items-center sm:flex-row flex-col">
          <Link
            href="/"
            className="text-xl font-semibold whitespace-nowrap dark:text-white"
          >
            <Image src="/logo.png" width={32} height={32} alt="logo image" />
          </Link>
          <p className="text-sm text-gray-500 sm:ml-6 sm:mt-0 mt-4">
            © 2020 Tailblocks —
            <a
              href="https://twitter.com/knyttneve"
              rel="noopener noreferrer"
              className="text-gray-600 ml-1"
              target="_blank"
            >
              @knyttneve
            </a>
          </p>
          <span className="inline-flex gap-6 sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
            <a
              href="https://github.com/Hyeun9991"
              target="_blank"
              className="text-sm text-bold hover:underline"
            >
              Github
            </a>
            <a
              href="mailto:hyeun9991@gmail.com"
              target="_blank"
              className="text-sm text-bold hover:underline"
            >
              Email
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
