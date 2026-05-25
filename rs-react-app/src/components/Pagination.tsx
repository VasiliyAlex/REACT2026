interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ currentPage, onPageChange }: PaginationProps) => (
  <div className="flex justify-center my-4 gap-2">
    <button
      disabled={currentPage <= 1}
      onClick={() => onPageChange(currentPage - 1)}
      className="px-3 py-1 bg-blue-500"
    >
      Prev
    </button>
    <span className="px-3 py-1 text-gray-600 dark:text-white">
      {currentPage}
    </span>
    <button
      onClick={() => onPageChange(currentPage + 1)}
      className="px-3 py-1 bg-blue-500"
    >
      Next
    </button>
  </div>
);
