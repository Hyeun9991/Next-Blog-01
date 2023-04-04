import axios from 'axios';
import { useRouter } from 'next/router';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { RiSendPlaneFill } from 'react-icons/ri';
import { BsCheckLg } from 'react-icons/bs';
import { IoIosArrowBack } from 'react-icons/io';
import Toast, { IToast } from './Toast';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  editing: boolean;
}

const BlogForm = ({ editing }: Props) => {
  const router = useRouter();
  const id = router.query.id;

  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [originalTitle, setOriginalTitle] = useState<string>('');
  const [originalBody, setOriginalBody] = useState<string>('');
  const [publish, setPublish] = useState<boolean>(false);
  const [originalPublish, setOriginalPublish] = useState<boolean>(false);
  const [titleError, setTitleError] = useState<boolean>(false);
  const [bodyError, setBodyError] = useState<boolean>(false);
  const [, setToastRerender] = useState<boolean>(false);
  const toasts = useRef<IToast[]>([]);

  useEffect(() => {
    /**
     * axios 404 error 발생
     * 문제: id값을 가져오지 못해서 404 에러 발생
     * 원인: 수정페이지에서 새로고침시 query값이 없어져 id가 undefined가 된다.
     *
     * 해결방안: 서버사이드에서 쿼리값을 넘겨주면 새로고침을 해도 값이 증발하지 않는다.
     * 하지만 pages 폴더가 아닌 components 폴더 컴포넌트인 경우 서버사이드 기능을 사용하지 못 한다.
     */
    if (!editing) return;

    axios.get(`http://localhost:3001/posts/${id}`).then((res) => {
      setTitle(res.data.title);
      setBody(res.data.body);
      setOriginalTitle(res.data.title);
      setOriginalBody(res.data.body);
      setPublish(res.data.publish);
      setOriginalPublish(res.data.publish);
    });
  }, [editing, id]);

  /**
   * title과 body state가 수정이 되었는지 체크하는 함수
   */
  const isEdited = () => {
    return (
      title !== originalTitle ||
      body !== originalBody ||
      publish !== originalPublish
    );
  };

  /**
   * 이전 페이지로 이동하는 함수
   */
  const goBack = () => {
    if (editing) {
      router.push(`/blogs/${id}`);
    } else {
      router.push('/blogs');
    }
  };

  /**
   * title, body 유효성 체크하는 함수
   */
  const validateForm = () => {
    let validated = true;

    if (title === '') {
      setTitleError(true);
      validated = false;
    }
    if (body === '') {
      setBodyError(true);
      validated = false;
    }

    return validated;
  };

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

  /**
   * db에 editing이 true면 patch 메소드를 보내고, false면 post 메소드를 보내는 함수
   */
  const onSubmit = () => {
    // 초기화
    setTitleError(false);
    setBodyError(false);

    // 유효성 검사에 통과하지 못하면 return
    if (!validateForm()) return;

    if (editing) {
      axios
        .patch(`http://localhost:3001/posts/${id}`, {
          title,
          body,
          publish,
        })
        .then(() => {
          router.push(`/blogs/${id}`);
        });
    } else {
      axios
        .post('http://localhost:3001/posts', {
          title,
          body,
          publish,
          createdAt: Date.now(),
        })
        .then(() => {
          // 성공 토스트알림 생성
          addToast({
            text: '게시글이 성공적으로 생성되었습니다.',
            bg_color: 'bg-green-100/80',
            border_color: 'border-green-300/30',
            text_color: 'text-green-800',
          });

          // db에 성공적으로 데이터를 보내면 포스트 리스트 페이지로 이동
          // router.push('/admin');
        });
    }
  };

  const onChangePublish = (e: ChangeEvent<HTMLInputElement>) => {
    setPublish(e.target.checked);
  };

  return (
    <div className="w-full mx-auto text-gray-600 body-font">
      <Toast toasts={toasts.current} deleteToast={deleteToast} />
      <div className="flex justify-between items-center mb-12">
        <button
          className="disabled:pointer-events-none w-7 h-7 sm:w-8 sm:h-8 bg-gray-200 hover:bg-black flex items-center justify-center rounded-full transition outline-none focus:ring-4 focus:ring-gray-300"
          onClick={goBack}
        >
          <IoIosArrowBack className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
        </button>
        <div className="flex gap-5">
          <div className="flex items-center">
            <input
              id="public-checkbox"
              type="checkbox"
              checked={publish}
              onChange={onChangePublish}
              className="cursor-pointer w-4 h-4 text-blue-600 bg-blue-100 border-blue-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-blue-800 focus:ring-2 dark:bg-blue-700 dark:border-blue-600"
            />
            <label
              htmlFor="public-checkbox"
              className="cursor-pointer ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Public
            </label>
          </div>
          <button
            className="disabled:pointer-events-none w-7 h-7 sm:w-8 sm:h-8 bg-gray-200 hover:bg-black flex items-center justify-center rounded-full transition outline-none focus:ring-4 focus:ring-gray-300"
            onClick={onSubmit}
            disabled={editing && !isEdited()}
          >
            {editing ? (
              <BsCheckLg
                className="
                  w-3.5 h-3.5 sm:w-5 sm:h-5 text-white"
              />
            ) : (
              <RiSendPlaneFill className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
            )}
          </button>
        </div>
      </div>
      <div className="mb-8">
        <label
          htmlFor="first_name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        ></label>
        <input
          type="text"
          className={`bg-gray-50 text-gray-900 text-4xl outline-none focus:border-gray-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 ${
            titleError ? 'border-b-4 border-red-600' : ''
          }`}
          value={title}
          placeholder="제목을 입력하세요"
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        {titleError && (
          <p className="text-red-600 text-sm">제목을 입력하세요.</p>
        )}
      </div>
      <div className="mb-3">
        <label
          htmlFor="first_name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        ></label>
        <textarea
          className={`bg-gray-50 text-gray-900 text-md resize-none outline-none	 focus:ring-gray-500 focus:border-gray-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 ${
            bodyError ? 'border-b-4 border-red-600' : ''
          }`}
          rows={18}
          value={body}
          placeholder="당신의 이야기를 적어보세요"
          onChange={(event) => {
            setBody(event.target.value);
          }}
        />
        {bodyError && (
          <p className="text-red-600 text-sm">내용을 입력하세요.</p>
        )}
      </div>
    </div>
  );
};

BlogForm.defaultProps = {
  editing: false,
};

export default BlogForm;
