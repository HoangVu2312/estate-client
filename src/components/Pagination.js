import React from 'react';
import "../Style/Pagination.css";


const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div>
      {pageNumbers.map((page) => (
        <button key={page} onClick={() => onPageChange(page)} className='pagination-btn' id={`${currentPage === page ? "active" : ""}`}>
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
