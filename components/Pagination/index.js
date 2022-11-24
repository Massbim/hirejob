const Pagination = ({
  increment,
  decrement,
  workerPerPage,
  totalWorker,
  paginate,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalWorker / workerPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        <li class="page-item mx-1">
          <a
            class="page-link rounded text-secondary"
            href="#"
            aria-label="Previous"
            onClick={decrement}
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <a
              onClick={() => paginate(number)}
              className="page-link text-dark me-1"
            >
              {number}
            </a>
          </li>
        ))}
        <li class="page-item mx-1">
          <a
            class="page-link rounded text-secondary"
            href="#"
            aria-label="Next"
            onClick={increment}
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
