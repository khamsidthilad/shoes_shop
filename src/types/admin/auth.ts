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
