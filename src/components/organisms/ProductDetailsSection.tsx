import IProduct from "../../interfaces/IProduct";
type Props = {
  product: IProduct;
};

const ProductDetailsSection = (props: Props) => {
  return (
    <article className="py-3 px-5 md:py-6 md:px-10">
      <h1 className="text-2xl text-jet-black mb-3">{props.product.title}</h1>
      <p className="text-slate-gray font-medium mb-3">
        Categories:{" "}
        {props.product.categories
          .map((category: { name: string }) => category.name)
          .join(", ")}
      </p>
      <p className="text-slate-gray font-medium mb-3">
        Price: ${props.product.price} | Rent: ${props.product.rent}{" "}
        {props.product.rentOption === "hr" ? "hourly" : "daily"}
      </p>
      <p className="mb-3">{props.product.description}</p>
    </article>
  );
};

export default ProductDetailsSection;
