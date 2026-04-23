import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query"
import { addToCart, getCart, updateCartItem, removeFromCart, clearCart } from "../api/cartApi"


export const useCart = (cartId) => {
    return useQuery({
        queryKey: ["cart", cartId],
        queryFn: () => getCart(cartId),
        enable: !!cartId,
    });
};

export const useAddToCart = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: addToCart,
        
        onSuccess: (data, variables) => {
            //console.log("DATA:", data);
            //console.log("VARIABLES:", variables);
            queryClient.invalidateQueries({
                queryKey: ["cart", variables.cartId],
            });
        },

        onError: (error) => {
            console.error("Add to cart error:", error);

            // 🔥 important pour voir le vrai message backend
            if (error.response) {
                console.error("Backend error:", error.response.data);
            }
        },

    });
};

export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCartItem,

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["cart", variables.cartId],
      });
    },
  });
};

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeFromCart,

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["cart", variables.cartId],
      });
    },
  });
};

export const useClearCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: clearCart,

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["cart", variables.cartId],
      });
    },
  });
}