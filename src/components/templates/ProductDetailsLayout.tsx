import IProduct from "../../interfaces/IProduct";
import Button from "../atoms/Button";
import ProductDetailsSection from "../organisms/ProductDetailsSection";

type Props = {
  product: IProduct;
  handleRent: () => void;
  handleBuy: () => void;
};

const ProductDetailsLayout = (props: Props) => {
  return (
    <div className="max-w-4/5 mx-auto my-20">
      <ProductDetailsSection product={props.product} />
      <div className="flex justify-end gap-6 mt-10">
        <Button
          variant="button-primary"
          text="Rent"
          onClick={props.handleRent}
        />
        <Button variant="button-primary" text="Buy" onClick={props.handleBuy} />
      </div>
    </div>
  );
};

export default ProductDetailsLayout;
