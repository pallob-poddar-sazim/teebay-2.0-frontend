import ProductCreationForm from "../components";

const ProductCreationContainer = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-4/5 md:w-3/5">
        <ProductCreationForm />
      </div>
    </div>
  );
};

export default ProductCreationContainer;
