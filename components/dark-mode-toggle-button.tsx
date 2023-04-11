import { MdDarkMode } from 'react-icons/md';
import { useTheme } from 'next-themes';
import { BsFillSunFill } from 'react-icons/bs';

const DarkModeToggleButton = () => {
  // theme: 현재 값 가져오기 getter
  // setTheme: 현재 값 바꾸기 setter
  const { theme, setTheme } = useTheme();

  return (
    <>
      <button
        className="w-4 h-4 flex items-center justify-center"
        type="button"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      >
        {/* 라이트 모드 */}
        <BsFillSunFill className="invisible dark:visible dark:w-full dark:h-full w-0 h-0 text-gray-200" />

        {/* 다크 모드 */}
        <MdDarkMode className="visible dark:invisible dark:w-0 dark:h-0 w-full h-full text-gray-800" />
      </button>
    </>
  );
};

export default DarkModeToggleButton;
