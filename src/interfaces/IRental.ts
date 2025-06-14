import IProduct from "./IProduct";
import IUser from "./IUser";

interface IRental {
  id: string;
  product: IProduct;
  borrower: IUser;
  rentStartDate: Date;
  rentEndDate: Date;
}

export default IRental;
