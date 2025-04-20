import { IProductItem } from "../product/product";


export interface IGetAllOrder {
  sell_id: number;
  sell_sprice: string;
  sell_time: string;
  sell_date: string;
  cus_id: string;
  payment_status: string;
  payment_image: string;
  shipping_status: string;
  tracking_number: string;
  customer: ICustomer;
  billDetails: IBillDetail;
}

export interface IBillDetail {
  bill_id: number;
  sell_id: number;
  bill_status: string;
  pro_id: number;
  quantity: number;
  price: string;
  product: IProductItem;
}

export interface ICustomer {
  cus_id: number;
  cus_name: string;
  sex: string;
  tel: string;
  address: string;
  cus_status: string;
}
