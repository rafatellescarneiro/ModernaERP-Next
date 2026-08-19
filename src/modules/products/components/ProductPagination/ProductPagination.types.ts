export interface ProductPaginationProps {

  currentPage: number;

  totalPages: number;

  onPageChange:(
    page: number,

  ) => void;
}
