export interface ILogin {
  username: string;
  password: string;
}

export interface ICreateAdmin {
  username: string;
  password: string;
  name: string;
  sname: string;
  sex: string;
  tel: string;
}

export interface IRegister {
  name: string;
  sname: string;
  sex: string;
  dateOfBirth: string;
  username: string;
  password: string;
  tel: string;
  address: string;
}

export interface IPayloadAuth {
  id: number;
  name: string;
  sname: string;
  username: string;
  role: string;
  customerId: number;
}

interface CustomerDetails {
  cus_id: number;
  cus_name: string;
  sex: string;
  tel: string;
  address: string;
  cus_status: string;
}

export interface IUser {
  uid: number;
  user_id: string;
  name: string;
  sname: string;
  Sex: string;
  Date_of_Birth: string; 
  username: string;
  status: string;
  tel: string;
  address: string;
  Picture: string | null;
  sell_id: number | null;
  role: string;
  customerId: number;
  customerDetails: CustomerDetails;
}
