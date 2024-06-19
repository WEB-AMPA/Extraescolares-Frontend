const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="flex justify-center my-4">
      {pageNumbers.map(number => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`px-3 py-1 mx-1 rounded ${
            number === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          {number}
        </button>
      ))}
    </div>
  );
};

export default Pagination;