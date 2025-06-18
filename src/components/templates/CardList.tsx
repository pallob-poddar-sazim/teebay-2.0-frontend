"use client";

import IProduct from "@/interfaces/IProduct";
import Card from "../organisms/Card";
import { useState } from "react";
import Modal from "../organisms/Modal";
import { DELETE_PRODUCT } from "@/graphql/mutations/products";
import { toast } from "react-toastify";
import { Reference, StoreObject, useMutation } from "@apollo/client";
import { useApolloClient } from "@apollo/client";
import {
  GET_SELECTED_PRODUCT,
  GET_MY_PRODUCTS,
} from "@/graphql/queries/products";
import { useRouter } from "next/navigation";
import { useQuery } from "@apollo/client";
import { GET_LOCAL_USER } from "@/graphql/queries/users";

type Props = {
  title?: string;
  products?: IProduct[];
  onDelete?: (id: string) => void;
  onCardClick?: (product: IProduct) => void;
};

const CardList = (props: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState("");

  const client = useApolloClient();
  const router = useRouter();

  const { data: user } = useQuery(GET_LOCAL_USER);
  const { data: productData } = useQuery(GET_MY_PRODUCTS, {
    variables: { sellerId: user?.localUser?.id },
    fetchPolicy: "network-only",
  });

  const products = productData?.getProductsBySellerId?.data || [];

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

    router.push(`/products/${product.id}/update`);
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
      <div className="mx-auto max-w-4/5 md:max-w-3/5">
        <h1 className="text-3xl text-jet-black text-center m-8">
          {props.title}
        </h1>
        <div className="flex flex-col gap-6">
          {products.map((product: IProduct) => (
            <Card
              key={product.id}
              product={product}
              onDelete={() => handleDelete(product.id)}
              onCardClick={(product: IProduct) => handleCardClick(product)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default CardList;
