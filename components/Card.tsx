import Link from 'next/link';

interface Props {
  title: string;
  body: string;
}

const Card = ({ title, body }: Props) => {
  return (
    <Link
      href="#"
      className="flex flex-col py-10 bg-white border-b dark:bg-gray-800"
    >
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {title}
      </h5>
      <p className="font-normal text-sm text-gray-700 dark:text-gray-400">
        {body}
      </p>
    </Link>
  );
};

export default Card;
