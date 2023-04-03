type GetPostsFunction = (
  page?: number,
  startPage?: number,
  limit?: number
) => void;

interface Props {
  currentPage: number;
  numberOfPages: number;
  onClick: GetPostsFunction;
  limit: number;
}

const Pagination = ({ currentPage, numberOfPages, onClick, limit }: Props) => {
  const currentSet = Math.ceil(currentPage / limit); // 현재 페이지 세트 (1 set, 2 set, 3 set ...)
  const lastSet = Math.ceil(numberOfPages / limit); // 마지막 세트
  const startPage = limit * (currentSet - 1) + 1; // 시작 페이지 숫자 (1 set = 1 , 2 set = 6, 3 set = 11)
  const numberOfPageForSet =
    currentSet === lastSet ? numberOfPages % limit : limit;
  // 보통 페이지에는 5개의 아이템이 출력되고, 마지막 세트에는 나머지값을 출력

  return (
    <nav aria-label="Page navigation example" className="mt-14 my-14">
      <ul className="inline-flex items-center -space-x-px gap-2">
        {/* 이전 버튼 */}
        {currentSet !== 1 && (
          <li>
            <a
              href="#"
              className="flex items-center justify-center w-8 h-8 text-gray-500 rounded-full hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              onClick={() => onClick(startPage - limit)}
            >
              <span className="sr-only">Previous</span>
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-black"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </a>
          </li>
        )}

        {/* 페이지 번호 */}
        {Array(numberOfPageForSet)
          .fill(startPage)
          .map((value, index) => value + index)
          .map((pageNumber) => {
            return (
              <li key={pageNumber}>
                <div
                  className={`flex items-center justify-center rounded-full w-8 h-8 cursor-pointer text-sm text-black hover:bg-gray-100 hover:text-gray-700 active:bg-black dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                    currentPage === pageNumber
                      ? 'bg-black text-white pointer-events-none'
                      : ''
                  }`}
                  onClick={() => {
                    onClick(pageNumber);
                  }}
                >
                  {pageNumber}
                </div>
              </li>
            );
          })}

        {/* 다음 버튼 */}
        {currentSet !== lastSet && (
          <li>
            <a
              href="#"
              className="flex items-center justify-center w-8 h-8 text-gray-500 rounded-full hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              onClick={() => onClick(startPage + limit)}
            >
              <span className="sr-only">Next</span>
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-black"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
};

Pagination.defaultProps = {
  currentPage: 1,
  limit: 5,
};

export default Pagination;
