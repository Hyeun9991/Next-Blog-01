interface Props {
  title: string;
  body: string;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler;
}

const Card = ({ title, body, children, onClick }: Props) => {
  return (
    <div
      className="flex flex-col py-10 cursor-pointer bg-white border-b dark:bg-gray-800"
      onClick={onClick}
    >
      <div className="flex justify-between">
        <div>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
          <p className="font-normal text-sm text-gray-600/80 dark:text-gray-400">
            {body}
          </p>
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
