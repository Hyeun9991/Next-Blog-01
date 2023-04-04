import { useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { IToast } from '../components/Toast';

/**
 * useState, useRef는 컴포넌트 안에서만 사용이 가능하다.
 * 그러므로, custom hooks를 사용하면 useState, useRef를 사용할 수 있음.
 */
const useToast = (): [
  IToast[],
  (toast: IToast) => void,
  (id?: string) => void
] => {
  const [, setToastRerender] = useState<boolean>(false);
  const toasts = useRef<IToast[]>([]);

  /**
   * 토스트알림을 클릭하면 토스트알림을 삭제하는 함수
   * @param id Toast component에서 전달받은 toast id
   */
  const deleteToast = (id?: string) => {
    const filteredToasts = toasts.current.filter((toast) => {
      return toast.id !== id;
    });

    toasts.current = filteredToasts; // useState를 useRef로 수정
    setToastRerender((prev) => !prev);
  };

  /**
   * 유니크한 키를 추가해서 토스트알림을 생성하는 함수
   */
  const addToast = (toast: IToast) => {
    console.log('add', toasts);
    const id = uuidv4();
    const toastWithId = {
      ...toast,
      id,
    };

    // id를 추가한 toast 객체로 업데이트
    toasts.current = [...toasts.current, toastWithId]; // useState를 useRef로 수정
    setToastRerender((prev) => !prev);

    // 5초후에 생성된 토스트알림 삭제
    setTimeout(() => {
      deleteToast(id);
    }, 5000);
  };

  return [toasts.current, addToast, deleteToast];
};

export default useToast;
