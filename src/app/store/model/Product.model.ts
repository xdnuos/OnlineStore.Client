interface BaseProduct {
  id: number;
  name: string;
  unitPrice: number;
  stock: number;
}
export interface DetailProduct extends BaseProduct {
  description: string;
  thumbnail: string;
  images: string[];
}
export interface SimpleProduct extends BaseProduct {
  shortDescription: string;
  thumbnail: string;
  categoryName: string;
}
export interface PaginationProduct {
  list: SimpleProduct[];
  total: number;
  currentPage: number;
  limit: number;
  sortBy: string;
  order: string;
  search: string;
  category: number;
}
