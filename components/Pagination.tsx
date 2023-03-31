interface Props {
  currentPage: number;
  numberOfPages: number;
}

const Pagination = ({ currentPage, numberOfPages }: Props) => {
  return (
    <nav aria-label="Page navigation example" className="mt-14 my-14">
      <ul className="inline-flex items-center -space-x-px gap-2">
        <li>
          <a
            href="#"
            className="flex items-center justify-center w-8 h-8 text-gray-500 rounded-full hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
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
        {Array(numberOfPages)
          .fill(1)
          .map((value, index) => value + index)
          .map((pageNumber) => {
            return (
              <li key={pageNumber}>
                <a
                  href="#"
                  className={`flex items-center justify-center rounded-full w-8 h-8 text-sm text-black hover:bg-gray-100 hover:text-gray-700 active:bg-black dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                    currentPage === 1
                      ? 'bg-black text-white pointer-events-none'
                      : ''
                  }`}
                >
                  {pageNumber}
                </a>
              </li>
            );
          })}
        <li>
          <a
            href="#"
            className="flex items-center justify-center w-8 h-8 text-gray-500 rounded-full hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
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
      </ul>
    </nav>
  );
};

Pagination.defaultProps = {
  currentPage: 1,
};

export default Pagination;
