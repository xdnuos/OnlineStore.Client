interface BaseProduct {
  id: number;
  name: string;
  price: number;
  quantity: number;
}
export interface DetailProduct extends BaseProduct {
  description: string;
  thumbnail: string;
  images: string[];
}
export interface SimpleProduct extends BaseProduct {
  shortDescription: string;
  thumbnail: string;
}
