import IProduct from "./IProduct";
import IUser from "./IUser";

interface IPurchase {
  id: string;
  product: IProduct;
  buyer: IUser;
}

export default IPurchase;
