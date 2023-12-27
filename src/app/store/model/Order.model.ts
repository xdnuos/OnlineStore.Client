export interface ProductOrder {
  productID: number;
  quantity: number;
}
export interface orderDetails {
  productName: number;
  thumbnail: string;
  unitPrice: number;
  quantity: number;
}
export interface Order {
  orderID: number;
  createAt: string;
  orderDetails: orderDetails[];
  totalPrice: number;
}

export interface OrderPagination {
  data: Order[];
  totalCount: number;
  currentPage: number;
  limit: number;
}

export interface CancelOrderPagination {
  data: Order[];
  totalCount: number;
  currentPage: number;
  limit: number;
}
