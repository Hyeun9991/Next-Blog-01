import { useSelector } from 'react-redux';
import { RootState } from '../store';

interface Props {
  title: string;
  body: string;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler;
}

const Card = ({ title, body, children, onClick }: Props) => {
  const toasts = useSelector((state: RootState) => {
    return state.toast.toasts;
  });
  console.log('card', toasts);

  return (
    <div
      className="flex flex-col py-10 w-full cursor-pointer bg-gray-50 border-b dark:bg-gray-800"
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
