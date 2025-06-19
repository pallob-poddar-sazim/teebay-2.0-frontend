import ProductUpdateForm from "../organisms/ProductUpdateForm";

const ProductUpdateLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-4/5 md:w-3/5">
        <h1 className="text-3xl text-jet-black text-center mb-8">
          Edit Product Details
        </h1>
        <ProductUpdateForm />
      </div>
    </div>
  );
};

export default ProductUpdateLayout;
