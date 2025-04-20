export interface IDashBoard {
  orders: IDashBoardOrder;
  inventory: IInventory;
  revenue: number;
}
export interface IDashBoardOrder {
  pendingPayment: number;
  verifiedPayment: number;
  processing: number;
  shipped: number;
  delivered: number;
}

export interface IInventory {
  lowStock: number;
  outOfStock: number;
}
