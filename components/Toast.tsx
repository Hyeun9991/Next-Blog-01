export interface IToast {
  text: string;
  bg_color?: string;
  border_color?: string;
  text_color?: string;
  id?: string;
}

interface Props {
  toasts: IToast[];
  deleteToast: (id: string | undefined) => void;
}

const Toast = ({ toasts, deleteToast }: Props) => {
  return (
    <div className="fixed bottom-0 right-0 p-2 flex flex-col gap-2">
      {toasts.map((toast) => {
        return (
          <div
            role="alert"
            key={toast.id}
            onClick={() => deleteToast(toast.id)}
            className={`            
              ${toast.bg_color || 'bg-gray-300/60'} 
              ${toast.border_color || 'border-gray-200/30'} 
              ${toast.text_color || 'text-gray-800'} 
              p-4 py-3 text-sm rounded-lg backdrop-blur-md border
              cursor-pointer
              dark:bg-gray-800 dark:text-gray-300
            `}
          >
            <p className="text-sm font-semibold">{toast.text}</p>
          </div>
        );
      })}
    </div>
  );
};

Toast.defaultProps = {
  toasts: [],
};

export default Toast;
