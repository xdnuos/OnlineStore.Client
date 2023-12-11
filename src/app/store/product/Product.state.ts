import { PaginationProduct } from '../model/Product.model';

export const ProductPaginationState: PaginationProduct = {
  list: [],
  total: 0,
  currentPage: 1,
  limit: 20,
  sortBy: '',
  order: '',
  search: '',
  category: -1,
};
