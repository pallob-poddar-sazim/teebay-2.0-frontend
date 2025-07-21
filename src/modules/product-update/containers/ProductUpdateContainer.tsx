import ProductUpdateForm from "../components";

const ProductUpdateContainer = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-4/5 md:w-3/5">
        <h1 className="text-3xl text-jet-black text-center mb-8">
          Edit Product Details
        </h1>
        <ProductUpdateForm />
      </div>
    </div>
  );
};

export default ProductUpdateContainer;
