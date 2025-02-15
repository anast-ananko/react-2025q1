import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { setPage } from '../../store/features/uiStateSlice';

interface PaginatorProps {
  pagesNumber: number;
  hasNext: boolean;
  hasPrev: boolean;
}

const Paginator: FC<PaginatorProps> = ({ pagesNumber, hasNext, hasPrev }) => {
  const dispatch = useAppDispatch();
  const { page: currentPage } = useAppSelector((store) => store.uiState);

  const setSearchParams = useSearchParams()[1];

  const handlePageChange = (newPage: number) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set('page', newPage.toString());
      return params;
    });

    dispatch(setPage(newPage));
  };

  return (
    <div className="flex justify-center mt-4 mb-10 space-x-4">
      <button
        disabled={!hasPrev}
        onClick={() => handlePageChange(currentPage - 1)}
        className={`py-2 sm:px-2 md:px-4 bg-green-600 text-white text-xl rounded-lg hover:bg-green-800 transition-colors duration-200 ${!hasPrev ? 'disabled:bg-gray-400 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        Previous
      </button>
      <div className="flex items-center space-x-2">
        <span className="py-2 sm:px-2 md:px-4 text-black rounded-lg font-semibold text-xl">
          {currentPage}
        </span>
        <span className="text-gray-600 text-xl">/</span>
        <span className="py-2 sm:px-2 md:px-4 text-black rounded-lg font-semibold text-xl">
          {pagesNumber}
        </span>
      </div>

      <button
        disabled={!hasNext}
        onClick={() => handlePageChange(currentPage + 1)}
        className={`py-2 sm:px-2 md:px-4 bg-green-600 text-white text-xl rounded-lg hover:bg-green-800 transition-colors duration-200 ${!hasNext ? 'disabled:bg-gray-400 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        Next
      </button>
    </div>
  );
};

export default Paginator;
