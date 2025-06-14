import Button from "../atoms/Button";
import CardList from "../templates/CardList";
import { useState } from "react";
import Modal from "../organisms/Modal";
import { Link } from "react-router-dom";
import { GET_MY_PRODUCTS } from "../../graphql/queries/products";
import { Reference, StoreObject, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { GET_LOCAL_USER } from "../../graphql/queries/users";
import { useApolloClient } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import { DELETE_PRODUCT } from "../../graphql/mutations/products";
import { GET_SELECTED_PRODUCT } from "../../graphql/queries/products";
import IProduct from "../../interfaces/IProduct";

const MyProducts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState("");
  const { data: user } = useQuery(GET_LOCAL_USER);
  const { data: productData } = useQuery(GET_MY_PRODUCTS, {
    variables: { sellerId: user?.localUser.id },
    fetchPolicy: "network-only",
  });
  const [deleteProduct, { error }] = useMutation(DELETE_PRODUCT, {
    update(cache, { data }) {
      if (data?.deleteProduct.success) {
        cache.modify({
          fields: {
            getProductsBySellerId(
              existingProducts = { data: [] },
              { readField }
            ) {
              return {
                ...existingProducts,
                data: existingProducts.data.filter(
                  (product: Reference | StoreObject) =>
                    readField("id", product) !== deleteProductId
                ),
              };
            },
          },
        });
      }
    },
  });

  if (error) {
    toast.error(error.message);
  }

  const products = productData?.getProductsBySellerId?.data || [];

  const client = useApolloClient();
  const navigate = useNavigate();

  const handleSignOut = () => {
    client.writeQuery({ query: GET_LOCAL_USER, data: { localUser: null } });
    navigate("/signin");
  };

  const handleConfirm = async () => {
    try {
      const { data } = await deleteProduct({
        variables: { deleteProductId: deleteProductId },
        fetchPolicy: "network-only",
      });

      if (!data.deleteProduct.success) {
        toast.error(data.deleteProduct.message, { theme: "colored" });
      }
    } catch (err) {
      console.error("Error deleting product:", err);
    }
    setIsModalOpen(false);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    setDeleteProductId(id);
    setIsModalOpen(true);
  };

  const handleCardClick = (product: IProduct) => {
    client.writeQuery({
      query: GET_SELECTED_PRODUCT,
      data: { selectedProduct: product },
    });

    navigate(`/products/${product.id}/update`);
  };

  return (
    <>
      {isModalOpen && (
        <Modal
          variant="delete"
          onConfirm={handleConfirm}
          onClose={handleClose}
        />
      )}
      <div className="flex justify-end gap-4 mx-6 my-4">
        <Link
          to={`/users/${user.localUser.id}/products/history`}
          className="text-blue"
        >
          <Button text="TRANSACTIONS" variant="button-primary" />
        </Link>
        <Link to={"/products"} className="text-blue">
          <Button text="ALL PRODUCTS" variant="button-primary" />
        </Link>
        <Link to={"/products/creation"} className="text-blue">
          <Button text="ADD PRODUCT" variant="button-primary" />
        </Link>
        <Button
          text="LOGOUT"
          variant="button-secondary"
          onClick={handleSignOut}
        />
      </div>
      <CardList
        title="MY PRODUCTS"
        products={products}
        onDelete={(id) => handleDelete(id)}
        onCardClick={handleCardClick}
      />
    </>
  );
};

export default MyProducts;
