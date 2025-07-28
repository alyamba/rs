import { type FC } from 'react';
import type { PaginationProps } from './types';
import { useNavigate } from 'react-router';

export const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onChangePage,
}) => {
  const navigate = useNavigate();

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onChangePage(currentPage - 1);
      navigate(`/?page=${currentPage - 1}`);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onChangePage(currentPage + 1);
      navigate(`/?page=${currentPage + 1}`);
    }
  };

  return (
    <div className="flex items-center justify-center gap-4 w-full">
      <button
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        className="p-2 bg-blue-300 w-10 h-10 rounded-full font-bold text-white hover:cursor-pointer disabled:bg-gray-200 disabled:cursor-default"
      >
        &lt;
      </button>

      <div className="font-semibold">
        Page {currentPage} of {totalPages}
      </div>

      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className="p-2 bg-blue-300 w-10 h-10 rounded-full font-bold text-white hover:cursor-pointer disabled:bg-gray-300 disabled:cursor-default"
      >
        &gt;
      </button>
    </div>
  );
};
