export interface BaseCategory {
  id: number;
  name: string;
}
export interface Category extends BaseCategory {
  description: string;
}
export interface Categories {
  categories: Category[];
}
