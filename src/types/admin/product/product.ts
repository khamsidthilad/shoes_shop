export interface ICategoryItem {
  id: number;
  product_id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface ICategory {
  cate_id: number;
  cate_name: string;
  cate_remark: string;
}

export interface IProductItem {
  pro_id: number;
  pro_name: string;
  pro_detail: string;
  pro_qty: number;
  pro_image: string;
  cate_id: number;
  gen_id: number;
  category: ICategory;
}

export interface ICreateProduct {
  pro_id: number;
  pro_name: string;
  pro_detail: string;
  pro_qty: string;
  image: string;
  cate_id: ICategoryItem;
}
