import { DELETE_PRODUCT } from "@/shared/graphql/mutations/products";
import { GET_MY_PRODUCTS, GET_SELECTED_PRODUCT } from "@/shared/graphql/queries/products";
import { GET_LOCAL_USER } from "@/shared/graphql/queries/users";
import { IProduct } from "@/shared/typedefs";
import { Reference, StoreObject, useApolloClient, useMutation, useQuery } from "@apollo/client";
import { UUID } from "crypto";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export const useGetProductsBySeller = () => {
  const { data: user } = useQuery(GET_LOCAL_USER);
  const { data: productData } = useQuery(GET_MY_PRODUCTS, {
    variables: { sellerId: user?.localUser?.id },
    fetchPolicy: "network-only",
  });

  const products = productData?.getProductsBySellerId?.data || [];

  return { products };
};

export const useDeleteProduct = (deleteProductId?: UUID) => {
  const [deleteProduct] = useMutation(DELETE_PRODUCT, {
    update(cache, { data }) {
      if (data?.deleteProduct.success) {
        cache.modify({
          fields: {
            getProductsBySellerId(existingProducts = { data: [] }, { readField }) {
              if (!existingProducts || !existingProducts.data) {
                return existingProducts;
              }
              
              return {
                ...existingProducts,
                data: existingProducts.data.filter(
                  (product: Reference | StoreObject) =>
                    readField("id", product) !== deleteProductId,
                ),
              };
            },
          },
        });
      }
    },
  });

  const onConfirm = async () => {
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
  };

  return {
    onConfirm,
  };
};

export const useSelectApolloClientProduct = () => {
  const client = useApolloClient();
  const router = useRouter();

  const selectApolloClientProduct = (product: IProduct) => {
    client.writeQuery({
      query: GET_SELECTED_PRODUCT,
      data: { selectedProduct: product },
    });

    router.push(`/products/${product.id}/update`);
  };

  return { selectApolloClientProduct };
};
