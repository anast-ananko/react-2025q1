import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';

interface PaginatorProps {
  hasNext: boolean;
  hasPrev: boolean;
}

const Paginator: FC<PaginatorProps> = ({ hasNext, hasPrev }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get('page')) || 1;

  const handlePageChange = (newPage: number) => {
    const currentParams = Object.fromEntries(searchParams.entries());
    setSearchParams({ ...currentParams, page: newPage.toString() });
  };

  return (
    <div className="flex justify-center mt-10 space-x-4">
      <button
        disabled={!hasPrev}
        onClick={() => handlePageChange(page - 1)}
        className={`py-2 px-4 bg-green-500 text-white rounded-lg ${!hasPrev ? 'disabled:bg-gray-400 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        Previous
      </button>
      <span className="py-2 px-4">Page {page}</span>
      <button
        disabled={!hasNext}
        onClick={() => handlePageChange(page + 1)}
        className={`py-2 px-4 bg-green-500 text-white rounded-lg ${!hasNext ? 'disabled:bg-gray-400 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        Next
      </button>
    </div>
  );
};

export default Paginator;
