export interface CartItem {
  productID: number;
  quantity: number;
}
export interface Cart {
  items: CartItem[];
}
export interface CartItemDetail {
  productID: number;
  quantity: number;
  name: string;
  price: number;
  thumbnail: string;
  stock: number;
}
