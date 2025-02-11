import React from 'react';

interface PaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  hasMorePages: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  onPageChange,
  hasMorePages,
}) => {
  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        Prev
      </button>
      <span>Page {currentPage}</span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasMorePages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
