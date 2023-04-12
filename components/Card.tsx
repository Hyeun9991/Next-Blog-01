interface Props {
  title: string;
  body: string;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler;
}

const Card = ({ title, body, children, onClick }: Props) => {
  return (
    <div
      className="py-10 w-full cursor-pointer bg-gray-50 border-b dark:bg-zinc-900 dark:border-zinc-800"
      onClick={onClick}
    >
      <div className="flex justify-between items-center">
        <div>
          <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h2>
          <pre className="font-notoSans font-normal text-sm text-gray-600/80 dark:text-gray-400">
            {body}
          </pre>
        </div>
        {children && <div>{children}</div>}
      </div>
    </div>
  );
};

Card.defaultProps = {
  children: null,
  onClick: () => {},
};

export default Card;
