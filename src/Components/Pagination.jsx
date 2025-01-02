import React from 'react';
import styled from 'styled-components';

const Pagination = ({ currentPage, totalPages, onNext, onPrevious }) => {
  return (
    <Wrapper>
    <div className="pagination">
      <button 
        onClick={onPrevious} 
        disabled={currentPage === 1} 
        className="pagination-button"
      >
        Previous
      </button>
      <span className="pagination-info">
        Page {currentPage} of {totalPages}
      </span>
      <button 
        onClick={onNext} 
        disabled={currentPage === totalPages} 
        className="pagination-button"
      >
        Next
      </button>
    </div>
    </Wrapper>
  );
};
const Wrapper = styled.div`
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
}

.pagination-button {
  padding: 10px 15px;
  margin: 0 5px;
  border: none;
  // background-color: #007bff; /* Bootstrap primary color */
  background-color: #2c4e41; /* Bootstrap primary color */
  color: white;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.pagination-button:disabled {
  background-color: #ccc; /* Disabled button color */
  cursor: not-allowed;
}

.pagination-info {
  margin: 0 10px;
  font-weight: bold;
}

`
export default Pagination;
