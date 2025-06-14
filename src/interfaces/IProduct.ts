import IUser from "./IUser";

interface IProduct {
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

export default IProduct;
