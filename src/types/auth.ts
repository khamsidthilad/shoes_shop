export interface IUser {
  id: number;
  username: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IRegister {
  username: string;
  email: string;
  password:string;
  confirm_password:string; 
  
}

