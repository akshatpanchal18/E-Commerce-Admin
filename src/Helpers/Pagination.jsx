import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Pagination = ({
  currentPage,
  totalPages,
  onNext,
  onPrevious,
  onPageChange,
}) => {
  const getPageNumbers = () => {
    const pages = [];
    const visiblePages = 5;
    let start = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    let end = Math.min(totalPages, start + visiblePages - 1);

    if (end - start < visiblePages - 1) {
      start = Math.max(1, end - visiblePages + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-center space-x-2 mt-6">
      {/* Previous Button */}
      <button
        className={`p-2 rounded-full ${
          currentPage === 1
            ? "text-gray-400 cursor-not-allowed"
            : "text-gray-900 hover:bg-gray-100"
        }`}
        onClick={onPrevious}
        disabled={currentPage === 1}
      >
        <FiChevronLeft className="w-5 h-5" />
      </button>

      {/* Page Numbers */}
      {getPageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)} // ✅ Fix: Calls correct function
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            currentPage === page
              ? "bg-indigo-600 text-white"
              : "text-gray-900 hover:bg-gray-200"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        className={`p-2 rounded-full ${
          currentPage === totalPages
            ? "text-gray-400 cursor-not-allowed"
            : "text-gray-900 hover:bg-gray-100"
        }`}
        onClick={onNext}
        disabled={currentPage === totalPages}
      >
        <FiChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Pagination;
