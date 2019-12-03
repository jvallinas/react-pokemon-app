import { useState } from 'react';

const usePaginationHandler = (itemsPerPage, offset) => {
  const initialOffset = offset >= 0 ? offset : 0;
  const initialPage = Math.floor(initialOffset / itemsPerPage);

  const [currentPage, setCurrentPage] = useState(initialPage);

  const goToPage = (page) => setCurrentPage(page);

  const goToPreviousPage = () => {
    if (currentPage > 0) goToPage(currentPage - 1);
    else goToPage(0);
  };

  const goToNextPage = () => goToPage(currentPage + 1);

  return {
    currentPage,
    itemsPerPage,
    goToPage,
    goToPreviousPage,
    goToNextPage,
  };
};

export default usePaginationHandler;
