import { UUID } from "crypto";

export interface IUser {
  id: UUID;
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface ICategory {
  id: string;
  name: string;
}

export interface IProduct {
  id: UUID;
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

export interface IConversation {
  id: string;
  participants: {
    id: UUID;
    name: string;
  }[];
  lastMessage: IMessage;
}

export interface IMessage {
  id: string;
  sender: {
    id: UUID;
  };
  text: string;
}
