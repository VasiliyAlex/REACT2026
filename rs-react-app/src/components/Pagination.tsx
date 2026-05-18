interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => (
  <div className="flex justify-center my-4 gap-2">
    <button
      disabled={currentPage <= 1}
      onClick={() => onPageChange(currentPage - 1)}
      className="px-3 py-1 bg-gray-300 disabled:opacity-50"
    >
      Prev
    </button>

    <span className="px-3 py-1">
      {currentPage} / {totalPages}
    </span>

    <button
      disabled={currentPage >= totalPages}
      onClick={() => onPageChange(currentPage + 1)}
      className="px-3 py-1 bg-gray-300 disabled:opacity-50"
    >
      Next
    </button>
  </div>
);
