export interface IUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface IProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  rent: number;
  rentOption: "hr" | "day";
  categories: {
    id: string;
    name: string;
  }[];
  seller: IUser;
  createdAt: Date;
}

export interface IRental {
  id: string;
  product: IProduct;
  borrower: IUser;
  rentStartDate: Date;
  rentEndDate: Date;
}

export interface IPurchase {
  id: string;
  product: IProduct;
  buyer: IUser;
}

export interface IMessage {
  id: string;
  sender: {
    id: string;
  };
  text: string;
}

