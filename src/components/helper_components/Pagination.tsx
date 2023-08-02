import { useAppSelector, usePagination } from 'context';
import { PaginationChangePage } from 'react-data-table-component/dist/src/DataTable/types';
import styled from 'styled-components';
interface Props {
  onChangePage: PaginationChangePage;
  siblingCount?: number;
  currentPage: number;
  className?: string;
  total: number;
  rowsPerPage?: number;
}
const Pagination = (props: Props) => {
  const { pending } = useAppSelector(({ loading }) => loading);
  const {
    onChangePage,
    siblingCount = 3,
    currentPage = 1,
    className,
    total = 20,
    rowsPerPage = 20,
  } = props;
  const paginationRange = usePagination({
    currentPage: currentPage,
    totalCount: total,
    siblingCount: siblingCount,
    pageSize: rowsPerPage || 20,
  });
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }
  const onNext = () => {
    if (!pending) onChangePage(currentPage + 1, total);
  };

  const onPrevious = () => {
    if (!pending) onChangePage(currentPage - 1, total);
  };
  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <StyledPagination
      className={`pagination-container, ${className}`}
      pending={pending}
    >
      <li
        className={`pagination-item ${currentPage === 1 ? 'disabled' : ''}`}
        onClick={onPrevious}
      >
        {'<'}
      </li>
      {paginationRange.map((pageNumber) => {
        if (pageNumber === '...') {
          return (
            <li key={pageNumber} className="pagination-item dots">
              &#8230;
            </li>
          );
        }
        return (
          <li
            key={pageNumber}
            className={`pagination-item ${
              pageNumber === currentPage ? 'selected' : ''
            }`}
            onClick={() => {
              if (!pending) onChangePage(+pageNumber, total);
            }}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={`pagination-item ${
          currentPage === lastPage ? 'disabled' : ''
        }`}
        onClick={onNext}
      >
        {'>'}
      </li>
    </StyledPagination>
  );
};

const StyledPagination = styled.div<{ pending?: boolean }>`
  display: flex;
  list-style-type: none;
  justify-content: center;
  margin-top: 48px;
  cursor: ${({ pending }) => (pending ? 'not-allowed' : '')};
  .pagination-item {
    width: 40px;
    height: 38px;
    margin: auto 4px;
    cursor: pointer;
    color: ${({ theme }) => theme.font_gray};
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    font-weight: 500;
    font-size: 1.6rem;
    line-height: 22px;
    &.dots:hover {
      background-color: transparent;
      cursor: default;
    }

    &.selected,
    &:hover {
      border: 1px solid #3968fc;
      background-color: #3968fc40;
      color: #3968fc;
    }

    .arrow {
      color: red;
    }

    &.disabled {
      pointer-events: none;
    }
  }
`;

export default Pagination;
