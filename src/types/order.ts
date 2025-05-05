export interface ICreateOrder {
  customerId: number;
  items: Array<IOrderItem>;
  totalPrice: number;
  shippingAddress: string;
  shippingNote: string;
}
export interface IUploadSlip {
  receipt: string;
}
export interface IOrderItem {
  productId: number;
  quantity: number;
  price: number;
}
